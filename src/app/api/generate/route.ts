import { NextResponse } from 'next/server';

class HuggingFaceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'HuggingFaceError';
    }
}

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        
        if (!process.env.HUGGING_FACE_API_KEY) {
            console.error('HUGGING_FACE_API_KEY is not set');
            return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
        }

        console.log('Making request to Hugging Face API with prompt:', prompt);

        const maxRetries = 3;
        let retryCount = 0;
        let lastError;
        const baseDelay = 2000;

        while (retryCount < maxRetries) {
            try {
                const response = await fetch(
                    "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify({
                            inputs: `mdjrny-v4 style professional portrait, ${prompt}, cyberpunk, detailed face, neon lighting, highly detailed, sharp focus, cinematic lighting, 8k uhd, hyperrealistic, trending on artstation`,
                            parameters: {
                                guidance_scale: 7.5,
                                num_inference_steps: 30,
                                negative_prompt: "blurry, bad anatomy, bad proportions, extra limbs, duplicate, deformed, mutation, ugly, poorly drawn face"
                            }
                        }),
                    }
                );

                if (!response.ok) {
                    let errorMessage;
                    try {
                        const errorData = await response.text();
                        errorMessage = errorData;
                    } catch {
                        errorMessage = 'No error details available';
                    }

                    if (response.status === 429) {
                        const retryAfter = response.headers.get('retry-after');
                        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : baseDelay * Math.pow(2, retryCount);
                        console.log(`Rate limit hit. Waiting ${waitTime}ms before retry ${retryCount + 1}/${maxRetries}`);
                        await new Promise(resolve => setTimeout(resolve, waitTime));
                        retryCount++;
                        continue;
                    }

                    switch (response.status) {
                        case 503:
                            throw new HuggingFaceError('Hugging Face API is temporarily unavailable. Please try again in a few minutes.');
                        case 500:
                            throw new HuggingFaceError('Internal server error from Hugging Face API');
                        default:
                            throw new HuggingFaceError(`API returned status ${response.status}: ${errorMessage}`);
                    }
                }

                const result = await response.arrayBuffer();
                const base64Image = Buffer.from(result).toString('base64');
                const imageUrl = `data:image/jpeg;base64,${base64Image}`;
                
                console.log('Successfully generated image');
                return NextResponse.json({ imageUrl });
            } catch (error) {
                lastError = error as Error;
                const isRetryableError = error instanceof Error && (
                    error.message.includes('Rate limit exceeded') || 
                    error.message.includes('temporarily unavailable') ||
                    error.message.includes('Internal server error')
                );
                
                if (isRetryableError && retryCount < maxRetries) {
                    const waitTime = baseDelay * Math.pow(2, retryCount);
                    console.log(`Error encountered: ${error.message}. Waiting ${waitTime}ms before retry ${retryCount + 1}/${maxRetries}`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    retryCount++;
                } else {
                    throw error;
                }
            }
        }

        return NextResponse.json({ 
            error: `Failed after ${maxRetries} retries. Last error: ${lastError instanceof Error ? lastError.message : 'Unknown error'}` 
        }, { status: 500 });
    } catch (error) {
        console.error('Error in generate route:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Failed to generate image' 
        }, { status: 500 });
    }
}