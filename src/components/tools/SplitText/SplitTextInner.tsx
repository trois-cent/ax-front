import React, { useRef, useLayoutEffect, useState, memo, forwardRef, MutableRefObject } from 'react'
import { LineWrapper, WordWrapper, LetterWrapper } from './Wrappers'
import { SplitTextProps } from './SplitText'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const DefaultLineWrapper = memo(LineWrapper)
const DefaultWordWrapper = memo(WordWrapper)
const DefaultLetterWrapper = memo(LetterWrapper)

export const SplitTextInner = forwardRef<HTMLSpanElement, SplitTextProps>(function SplitTextInner(
    {
        children,
        className,
        style,
        LineWrapper = DefaultLineWrapper,
        WordWrapper = DefaultWordWrapper,
        LetterWrapper = DefaultLetterWrapper,
        extraProps,
        animation,
    },
    ref
) {
    let text = ''
    React.Children.map(children, child => {
        if (typeof child === 'string' || typeof child === 'number') {
            text += String(child)
        } else {
            throw new Error(`SplitText expect a text as children`)
        }
    })

    const elRef = useRef<HTMLSpanElement | null>(null)
    const [lines, setLines] = useState<string[]>([])
    const maxCharPerLine = useRef<number>(0)

    function makeLines() {
        const el = elRef.current
        if (!el) return

        if (lines.length > 0) {
            return refreshLines(lines, text)
        }

        let lastY
        let newLines: string[] = []
        let words: string[] = []
        for (const child of Array.from(el.children)) {
            const y = child.getBoundingClientRect().top
            if (lastY == null) lastY = y
            if (y !== lastY) {
                newLines.push(words.join(' '))
                words = []
            }
            lastY = y
            words.push((child.textContent || '').trim())
        }
        newLines.push(words.join(' '))
        setLines(newLines)
    }

    function refreshLines(previous: string[], newText: string) {
        const charPerLine = maxCharPerLine.current || previous.map(line => line.length).sort((a, b) => b - a)[0]
        const lines: string[] = []
        let line: string = ''
        let charCount = 0
        const words = newText.split(' ')
        for (const [_, word] of words.entries()) {
            charCount += word.length + 1
            if (charCount > charPerLine + 1) {
                lines.push(line)
                line = ''
                charCount = 0
            }
            line += word.trim() + ' '
        }
        lines.push(line)
        setLines(lines.map(line => line.trim()))
        if (charPerLine > maxCharPerLine.current) {
            maxCharPerLine.current = charPerLine
        }
    }

    useLayoutEffect(() => makeLines(), [text])

    let wordCount = 0
    let letterCount = 0

    useGSAP(
        () => {
            const domLines = elRef.current?.querySelectorAll('.line-wrap')

            if (!domLines || domLines.length <= 0 || !animation) return

            animation()
        },
        { scope: elRef, dependencies: [lines, animation], revertOnUpdate: true }
    )

    return lines.length ? (
        <span
            className={className}
            ref={span => {
                elRef.current = span
                if (typeof ref == 'function') {
                    ref(span)
                } else if (ref) {
                    ;(ref as MutableRefObject<HTMLSpanElement | null>).current = span
                }
            }}
            style={style}
        >
            {lines.map((line, i) => {
                let words = line.split(' ')
                words = words.map((word, i) => (i === words.length - 1 ? word : word + ' '))
                return (
                    <LineWrapper key={i} lineIndex={i} extraProps={extraProps}>
                        {words.map((word, j) => {
                            const letters = word.split('')
                            return (
                                <WordWrapper
                                    key={j}
                                    lineIndex={i}
                                    wordIndex={j}
                                    countIndex={wordCount++}
                                    extraProps={extraProps}
                                >
                                    {letters.map((char, k) => (
                                        <LetterWrapper
                                            key={k}
                                            lineIndex={i}
                                            wordIndex={j}
                                            letterIndex={k}
                                            countIndex={letterCount++}
                                            extraProps={extraProps}
                                        >
                                            {char}
                                        </LetterWrapper>
                                    ))}
                                </WordWrapper>
                            )
                        })}
                    </LineWrapper>
                )
            })}
        </span>
    ) : (
        <span className={className} ref={elRef} style={style}>
            {text.split(' ').map((word, i) => (
                <span key={i}>{word} </span>
            ))}
        </span>
    )
})
