import React, { ReactNode } from 'react'

export interface LineWrapperProp<T = any> {
    lineIndex: number
    extraProps?: T
    children: ReactNode
}

export const LineWrapper: React.FC<LineWrapperProp> = ({ children }) => (
    <span className="line-wrap block align-top overflow-hidden">{children}</span>
)

export interface WordWrapperProp<T = any> {
    lineIndex: number
    wordIndex: number
    countIndex: number
    extraProps?: T
    children: ReactNode
}

export const WordWrapper: React.FC<WordWrapperProp> = ({ children }) => (
    <span className="word-wrap inline-block leading-[1em] align-top overflow-hidden" style={{ whiteSpace: 'pre' }}>
        {children}
    </span>
)

export interface LetterWrapperProp<T = any> {
    lineIndex: number
    wordIndex: number
    letterIndex: number
    countIndex: number
    extraProps?: T
    children: ReactNode
}

export const LetterWrapper: React.FC<LetterWrapperProp> = ({ children }) => (
    <span className="letter-wrap inline-block leading-[1em] align-top overflow-hidden">{children}</span>
)
