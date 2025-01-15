'use client'

import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy } from 'lucide-react'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";

interface Props {
    isOpen: boolean
    onClose: () => void
}

const generateApiKey = (length: number = 45): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'sk-';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}



export function Modal({ isOpen, onClose }: Props) {
    const [isCopied, setIsCopied] = useState(false)
    const apiKey = generateApiKey()

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0a0612] border border-[#00ffff]/50 text-[#00ffff]">
                <DialogHeader>
                    <DialogTitle className="text-[#ff00ff] font-mono text-xl">API Connection</DialogTitle>
                    <DialogDescription className="text-[#00ffff]/70 font-mono">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="text-[#00ffff]/70 font-mono">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <div className="flex items-center space-x-2">
                        <Input
                            value={apiKey}
                            readOnly
                            className="bg-black/60 border-[#00ffff]/50 text-[#00ffff] font-mono"
                        />
                        <Button
                            onClick={copyToClipboard}
                            className="bg-[#ff00ff] hover:bg-[#ff00ff]/80 text-black"
                        >
                            {isCopied ? 'Copied!' : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}