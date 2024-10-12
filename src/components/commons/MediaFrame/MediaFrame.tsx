import React, { useRef, useState, useEffect, Suspense } from 'react'
import './styles.scss'

import t from '@/lib/lang/eng'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const MediaFrame: React.FC<{
    src: string
    alt: string
    width?: string | number
    height?: string | number
    frameClass?: string
    mediaClass?: string
    delay?: number
}> = ({ src, alt, frameClass, mediaClass, delay = 0 }) => {
    const wrap = useRef<HTMLDivElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    const [error, setError] = useState<boolean>(false)
    const [attempts, setAttempts] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const maxRetries = 3

    const handleError = () => {
        if (attempts < maxRetries) {
            setAttempts(attempts + 1)
            setLoading(true)
        } else {
            setError(true)
            setLoading(false)
        }
    }

    const handleLoad = () => {
        setError(false)
        setLoading(false)
    }

    useGSAP(
        () => {
            gsap.from(wrap.current, { opacity: 0, duration: 0.5, ease: 'power1.inOut', delay })

            gsap.from(imgRef.current, { opacity: 0, duration: 0.5, ease: 'power1.inOut', delay: delay + 0.15 })

            gsap.from(imgRef.current, {
                scale: 0.8,
                scrollTrigger: {
                    trigger: wrap.current,
                    scroller: document.querySelector('main .inner'),
                    start: 'top 90%',
                    end: 'center center',
                    scrub: 2,
                },
            })
        },
        { scope: wrap }
    )

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (loading) {
                handleError()
            }
        }, 5000)

        return () => clearTimeout(timeout)
    }, [loading])

    return (
        <div className={`media-frame ${frameClass}`} ref={wrap}>
            {!error ? (
                <Suspense fallback={<div className="fallback" />}>
                    {loading && <div className="fallback" />}
                    <img
                        ref={imgRef}
                        src={src}
                        alt={alt}
                        className={mediaClass}
                        onLoad={handleLoad}
                        onError={handleError}
                        style={loading ? { display: 'none' } : {}}
                    />
                </Suspense>
            ) : (
                <div className="error-fallback">
                    <p>{t.errors[0]}</p> {/* Error message */}
                    <button onClick={() => setAttempts(0)}>Retry</button>
                </div>
            )}
        </div>
    )
}

export default MediaFrame
