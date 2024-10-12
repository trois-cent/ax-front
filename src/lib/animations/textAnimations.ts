import gsap from 'gsap'

export const impactTextIn = (delay?: number) =>
    gsap.from('.word-wrap', {
        y: '120%',
        stagger: 0.2,
        duration: 1.25,
        ease: 'power3.inOut',
        delay: delay || 0,
    })

export const bigPIn = (delay?: number, scrollTrigger?: boolean) =>
    gsap.from('.line-wrap', {
        y: '100%',
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.inOut',
        duration: 0.85,
        delay: delay || 0,
        scrollTrigger: scrollTrigger
            ? {
                  trigger: '.letter-wrap',
                  scroller: document.querySelector('main .inner'),
                  start: 'top 90%',
              }
            : undefined,
    })

export const appearScroll = (target: GSAPTweenTarget) =>
    gsap.from(target, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.inOut',
        scrollTrigger: {
            trigger: '.letter-wrap',
            scroller: document.querySelector('main .inner'),
            start: 'top 90%',
        },
    })

export const appear = (target: GSAPTweenTarget, delay?: number) =>
    gsap.from(target, { opacity: 0, duration: 0.5, ease: 'power1.inOut', delay })

export const sectionTitleIn = () =>
    gsap.from('.letter-wrap', {
        padding: '0 8px 0 0',
        opacity: 0,
        duration: 0.55,
        ease: 'power3.inOut',
        stagger: 0.05,
        scrollTrigger: {
            trigger: '.letter-wrap',
            scroller: document.querySelector('main .inner'),
            start: 'top 90%',
        },
    })
