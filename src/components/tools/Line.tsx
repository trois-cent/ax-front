import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FC, useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type LineProps = {
    scrollRoot?: React.RefObject<HTMLDivElement>
}

const Line: FC<LineProps> = ({ scrollRoot }) => {
    const line = useRef<HTMLDivElement>(null)

    useGSAP(
        () => {
            if (line.current) {
                gsap.fromTo(
                    line.current,
                    { clipPath: 'inset(0 100% 0 0)' },
                    {
                        clipPath: 'inset(0 0% 0 0)',
                        scrollTrigger: {
                            scroller: scrollRoot?.current || document.querySelector('main .inner'),
                            trigger: line.current,
                            start: 'top 95%',
                            end: 'top 50%',
                            scrub: true,
                        },
                    }
                )
            }
        },
        { dependencies: [line.current, scrollRoot] }
    )

    return <div className="h-[2px] w-full bg-line" ref={line} />
}

export default Line
