import { useEffect, useState } from 'react'
import useResizeObserver from './UseResizeObserver'

const breakpoints = {
    mob: 767, // Maximum width for mobile devices
    tab: 1023, // Maximum width for tablets (between mobile and desktop)
    dk: 1024, // Minimum width for desktops
}

interface BreakpointFlags {
    mob: boolean // True if width is <= 767px (mobile)
    tab: boolean // True if width is > 767px and <= 1023px (tablet)
    dk: boolean // True if width is >= 1024px (desktop)
    tabUp: boolean // True if width is >= 768px (tablets and above)
    tabDown: boolean // True if width is <= 1023px (tablets and below)
}

const useDevice = (): BreakpointFlags => {
    const { width } = useResizeObserver(100)
    const [flags, setFlags] = useState<BreakpointFlags>({
        mob: false,
        tab: false,
        dk: false,
        tabUp: false,
        tabDown: false,
    })

    useEffect(() => {
        const newFlags: BreakpointFlags = {
            mob: width <= breakpoints.mob, // Mobile devices (≤ 767px)
            tab: width > breakpoints.mob && width <= breakpoints.tab, // Tablets (768px to 1023px)
            dk: width >= breakpoints.dk, // Desktop devices (≥ 1024px)
            tabUp: width >= breakpoints.mob, // Tablets and larger (≥ 768px)
            tabDown: width <= breakpoints.tab, // Tablets and smaller (≤ 1023px)
        }

        setFlags(newFlags)
    }, [width])

    return flags
}

export default useDevice
