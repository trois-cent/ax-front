import { useState, useEffect } from 'react'

// Utility to debounce the resize handler
const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

interface WindowSize {
    width: number
    height: number
}

const useResizeObserver = (delay: number = 100): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEffect(() => {
        // Debounced handler to update window size
        const handleResize = debounce(() => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }, delay)

        // Add event listener
        window.addEventListener('resize', handleResize)

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize)
    }, [delay]) // Rerun effect if the debounce delay changes

    return windowSize
}

export default useResizeObserver
