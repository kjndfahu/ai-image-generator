import {Button} from "@/components/ui/button";

export const GeneratedAi = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-mono text-[#00ffff] border-b border-[#00ffff]/30 pb-2 inline-block">
                Generated AIs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="group relative">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/20 via-[#ff00ff]/20 to-[#00ff00]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                        <div
                            className="relative bg-black/60 border border-[#00ffff]/30 rounded-lg p-4 backdrop-blur-md space-y-4 group-hover:border-[#ff00ff]/30 transition-colors duration-300 shadow-[0_0_15px_rgba(0,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,0,255,0.2)]">
                            <div className="aspect-square cursor-pointer border-2 border-dashed border-[#00ffff]/30 rounded-lg flex items-center justify-center text-[#00ffff]/50 group-hover:border-[#ff00ff]/30 group-hover:text-[#ff00ff]/50 transition-colors duration-300 relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ffff]/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"/>
                                <span className="font-mono">AI LOGO</span>
                            </div>
                            <div
                                className="text-center text-[#00ffff] font-mono group-hover:text-[#ff00ff] transition-colors duration-300">
                                AI NAME
                            </div>
                            <Button
                                className="w-full bg-transparent hover:bg-[#ff00ff]/10 text-[#00ffff] hover:text-[#ff00ff] border border-[#00ffff]/30 hover:border-[#ff00ff]/50 font-mono transition-all duration-300">
                                Connect API
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}