type SplitTeytTarget = 'lines' | 'words' | 'letters'

import gsap from 'gsap'

export const splitTextLines = () =>
    gsap.from('.line-wrap', {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        ease: 'circ.out',
        duration: 0.3,
        delay: 0.5,
    })

export const splitTextWords = () =>
    gsap.from('.word-wrap', {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        ease: 'circ.out',
        duration: 0.3,
        delay: 0.5,
    })

export const splitTextLetters = () =>
    gsap.from('.letter-wrap', {
        y: '100%',
        opacity: 0,
        stagger: 0.05,
        ease: 'circ.out',
        duration: 0.25,
        delay: 0.4,
        scale: 0.3,
        transformOrigin: 'bottome left',
    })
