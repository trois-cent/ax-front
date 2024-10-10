import React, { forwardRef, useState, useEffect, CSSProperties, ComponentType, ReactNode } from 'react'
import { debounce } from './utils'
import { LineWrapperProp, WordWrapperProp, LetterWrapperProp } from './Wrappers'
import { SplitTextInner } from './SplitTextInner'

export interface SplitTextProps<T = any> {
    className?: string
    children: ReactNode
    style?: CSSProperties
    ref?: ((instance: HTMLSpanElement) => void) | React.MutableRefObject<unknown> | null
    LineWrapper?: ComponentType<LineWrapperProp>
    WordWrapper?: ComponentType<WordWrapperProp>
    LetterWrapper?: ComponentType<LetterWrapperProp>
    extraProps?: T
    animation?: () => GSAPAnimation
}

const SplitText = forwardRef<HTMLSpanElement, SplitTextProps>(function SplitText({ children, ...props }, ref) {
    const [key, setKey] = useState(0)

    const onResize = debounce(() => setKey(v => v + 1), 300)

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    return (
        <SplitTextInner key={key} {...props} ref={ref}>
            {children}
        </SplitTextInner>
    )
})

export default SplitText
