import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { FC, useEffect, useRef, useState } from 'react'
import useResizeObserver from '@/lib/utils/hooks/UseResizeObserver'

type TabLineProps = {
    i: number
    cols: number
    color?: string
}

gsap.registerPlugin(useGSAP)

const TabLine: FC<TabLineProps> = ({ i, cols, color = 'var(--black)' }) => {
    const wrap = useRef<HTMLDivElement>(null)
    const bar = useRef<HTMLDivElement>(null)
    const animRef = useRef<gsap.core.Tween>()

    const [barWidth, setBarWidth] = useState<number>(0)
    const [index, setIndex] = useState<number>(0)

    const { contextSafe } = useGSAP()
    const { width } = useResizeObserver()

    const moveLine = contextSafe(() => {
        if (animRef.current && animRef.current.rawTime() < 0.1) {
            animRef.current.kill()
            animRef.current = gsap.to(bar.current, {
                x: `${barWidth * i}`,
                duration: 0.45,
                ease: 'cubic.inOut',
                delay: 0.075,
            })
        } else if (animRef.current && animRef.current.progress()) {
            animRef.current.then(() => {
                animRef.current = gsap.to(bar.current, {
                    x: `${barWidth * i}`,
                    duration: 0.45,
                    ease: 'cubic.inOut',
                    delay: 0.075,
                })
            })
        } else {
            animRef.current = gsap.to(bar.current, {
                x: `${barWidth * i}`,
                duration: 0.45,
                ease: 'cubic.inOut',
                delay: 0.075,
            })
        }
    })

    useEffect(() => {
        if (!wrap.current) return
        const newBarWidth = wrap.current.clientWidth / cols
        setBarWidth(newBarWidth)
        gsap.to(bar.current, { x: `${newBarWidth * i}`, duration: 0.35, ease: 'cubic.inOut' })
    }, [cols, width])

    useEffect(() => {
        moveLine()
    }, [index])

    useEffect(() => {
        if (i !== index) setIndex(i)
    }, [i])

    return (
        <div className="w-full" ref={wrap}>
            <div className="h-[6px]" style={{ backgroundColor: color, width: `${barWidth}px` }} ref={bar} />
            <div className="h-[2px] w-full" style={{ backgroundColor: color }} />
        </div>
    )
}

export default TabLine
