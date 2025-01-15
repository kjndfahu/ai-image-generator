export const AvatarArea = ({ imageUrl }: { imageUrl?: string }) => {
    return (
        <div
            className="border-2 cursor-pointer border-dashed border-[#00ffff]/50 rounded-lg aspect-square mb-6 flex items-center justify-center text-[#00ffff] hover:border-[#ff00ff]/50 hover:text-[#ff00ff] transition-all duration-300 group relative overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ffff]/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"/>
            {imageUrl ? (
                <div className="w-full h-full">
                    <img 
                        src={imageUrl} 
                        alt="Generated Avatar" 
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => console.error('Image loading error:', e)}
                    />
                </div>
            ) : (
                <span className="font-mono opacity-20 md:text-[250px] text-[80px]">?</span>
            )}
        </div>
    )
}