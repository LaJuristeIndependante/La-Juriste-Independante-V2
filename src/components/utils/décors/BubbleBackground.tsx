interface BubbleBackground {
    size : number
    position : string
}

export default function BubbleBackground({size, position} : BubbleBackground) {
    return <div className={`absolute rounded-full bg-[#DA1A32] z-10  shadow-lg flex size-${size} ${position}`}/>
}