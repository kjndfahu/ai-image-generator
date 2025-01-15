'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState, useEffect} from "react";
import {Modal} from "@/shared/ui/modal";
import {AvatarArea} from "./avatar-area";
import {GeneratedAvatars} from "./generated-avatars";
import {Textarea} from "@/components/ui/textarea";

interface GeneratedAvatar {
    id: string;
    imageUrl: string;
    prompt: string;
    timestamp: number;
}

export const FormControls = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [cooldown, setCooldown] = useState(0);
    const [generatedAvatars, setGeneratedAvatars] = useState<GeneratedAvatar[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('generatedAvatars');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('generatedAvatars', JSON.stringify(generatedAvatars));
        }
    }, [generatedAvatars]);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const generateAvatar = async () => {
        if (!prompt || !title || !text) {
            setError("Fill in all fields");
            return;
        }
        if (cooldown > 0) {
            setError(`Wait ${cooldown} seconds before trying again`);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({prompt}),
            });

            const data = await response.json();

            if (data.error) {
                if (data.error.toLowerCase().includes('rate limit exceeded')) {
                    setCooldown(30); 
                    setError('Request limit has been exceeded. Wait 30 seconds');
                    return;
                }
                if (data.error.includes('retries')) {
                    setCooldown(15);
                    setError('The server is overloaded. Wait 15 seconds and try again');
                    return;
                }
                setError(data.error || 'Error during image generation');
                return;
            }

            if (!data.imageUrl) {
                setError('Failed to retrieve the image');
                return;
            }

            setError(null);
            setImageUrl(data.imageUrl);

            const newAvatar: GeneratedAvatar = {
                id: Date.now().toString(),
                imageUrl: data.imageUrl,
                prompt: title,
                timestamp: Date.now()
            };

            setGeneratedAvatars(prev => [...prev, newAvatar]);
        } catch (error) {
            console.error('Error generating avatar:', error);
            setError('There\'s been an error. Try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8 space-y-12 relative z-10">
            <div className="max-w-2xl mx-auto space-y-6 relative">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/20 via-[#ff00ff]/20 to-[#00ff00]/20 blur-3xl animate-pulse"/>
                <div
                    className="relative bg-black/60 border border-[#00ffff]/50 rounded-lg p-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                    <div className="space-y-8">

                        <AvatarArea imageUrl={imageUrl}/>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Describe the avatar (for example: a warrior with blue hair)"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    disabled={loading || cooldown > 0}
                                    className="bg-black/60 border-[#00ffff]/50 text-[#00ffff] placeholder:text-[#00ffff]/50 focus:border-[#ff00ff]/50 focus:ring-[#ff00ff]/20"
                                />

                                <Button
                                    onClick={generateAvatar}
                                    disabled={loading || !prompt || !title || !text || cooldown > 0}
                                    className="bg-[#00ffff] hover:bg-[#00ffff]/80 text-black font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-300 whitespace-nowrap px-8"
                                >
                                    {loading ? 'Generation...' : cooldown > 0 ? `${cooldown}с` : 'Generate'}
                                </Button>
                            </div>
                            <div className="text-center space-y-4">
                                <Input
                                    placeholder="Name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={loading || cooldown > 0}
                                    className="bg-black/60 border-[#00ffff]/50 text-[#00ffff] placeholder:text-[#00ffff]/50 focus:border-[#ff00ff]/50 focus:ring-[#ff00ff]/20"
                                />
                                <Textarea
                                    placeholder="Description"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    disabled={loading || cooldown > 0}
                                    className="bg-black/60 border-[#00ffff]/50 text-[#00ffff] placeholder:text-[#00ffff]/50 focus:border-[#ff00ff]/50 focus:ring-[#ff00ff]/20"
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center">
                                    {error}
                                </div>
                            )}
                            {cooldown > 0 && !error && (
                                <div className="text-yellow-500 text-sm text-center">
                                    Подождите {cooldown} секунд перед следующей генерацией
                                </div>
                            )}
                        </div>


                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-[#ff00ff] hover:bg-[#ff00ff]/80 text-black font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:shadow-[0_0_30px_rgba(255,0,255,0.5)] transition-all duration-300">
                            Connect API
                        </Button>

                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
                    </div>
                </div>
            </div>
            <GeneratedAvatars avatars={generatedAvatars}/>
            {/*<GeneratedAi/>*/}
        </main>
    );
}