interface Props {
    className?: string;
}

export const MainLogo:React.FC<Props> = ({className}) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={48}
            height={48}
            viewBox="0 0 48 48"
        >
            <defs>
                <mask id="ipSGhost0">
                    <g fill="none" strokeLinejoin="round" strokeWidth={4}>
                        <path
                            fill="#fff"
                            stroke="#fff"
                            d="m8 44l4-4l4 4l4-6l4 6l4-6l4 6l4-4l4 4V20c0-8.837-7.163-16-16-16S8 11.163 8 20z"
                        />
                        <path stroke="#000" strokeLinecap="round" d="M19 20h2m10 0h2"/>
                    </g>
                </mask>
            </defs>
            <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSGhost0)"/>
        </svg>
    )
}
export const TelegramLogo:React.FC<Props> = ({className}) => {
    return (
        <svg
            viewBox="-0.5 -0.5 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="Telegram--Streamline-Iconoir"
             height={24} width={24}>
            <desc>{"Telegram Streamline Icon: https://streamlinehq.com"}</desc>
            <path
                d="M14.3121875 2.1219375 0.6878125 7.5l5.0195 0.7170624999999999m8.604875 -6.095125 -1.7926875 10.756125 -6.8121875 -4.6610000000000005m8.604875 -6.095125L5.7073125000000005 8.217062499999999m0 0v3.9439374999999997l2.329625 -2.3499375000000002"
                stroke={className} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}/>
        </svg>

    )
}
export const XLogo: React.FC<Props> = ({className}) => {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_1_10)">
                <mask
                    id="mask0_1_10"
                    style={{maskType: "luminance"}}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={24}
                    height={24}
                >
                    <path d="M0 0H24V24H0V0Z" fill="white"/>
                </mask>
                <g mask="url(#mask0_1_10)">
                    <path
                        d="M18.9 1.12457H22.5806L14.5406 10.3371L24 22.8754H16.5943L10.7897 15.2726L4.15543 22.8754H0.471429L9.07029 13.0183L0 1.12629H7.59429L12.8331 8.07429L18.9 1.12457ZM17.6057 20.6674H19.6457L6.48 3.21772H4.29257L17.6057 20.6674Z"
                        fill={className}
                    />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_1_10">
                    <rect width={24} height={24} fill={className}/>
                </clipPath>
            </defs>
        </svg>
    )
}