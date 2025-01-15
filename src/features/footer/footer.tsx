import {TelegramLogo, XLogo} from "@/shared/ui/logos";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="relative border-t border-[#ff00ff]/20 bg-black/40 backdrop-blur-md mt-12">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <span className="text-[#00ffff]/70 font-mono">Copyright 2023</span>
                <div className="flex items-center gap-4">
                    <Link href="#" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">
                        <TelegramLogo className="#00ffff"/>
                    </Link>
                    <Link href="#" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">
                        <XLogo className="#00ffff"/>
                    </Link>
                </div>
            </div>
        </footer>
    )
}