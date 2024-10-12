import { FC, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from '../tools/SplitText/SplitText'
import { appearScroll } from '@/lib/animations/textAnimations'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type SectionTitleProps = {
    title: string
}

const SectionTitle: FC<SectionTitleProps> = ({ title }) => {
    const ref = useRef<HTMLHeadingElement>(null)

    return (
        <h2 className="section-title" ref={ref}>
            <SplitText animation={() => appearScroll('.line-wrap')}>{title}</SplitText>
        </h2>
    )
}

export default SectionTitle
