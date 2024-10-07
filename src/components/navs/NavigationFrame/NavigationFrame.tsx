import './styles.scss'
import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { Ecosystem, LinkData, nav } from './Structure'

import t from '../../../lib/lang/eng'
import Logo from '@/components/tools/Logo'
import TabLine from '@/components/tools/TabLine'
import useDevice from '@/lib/utils/hooks/UseDevice'
import useResizeObserver from '@/lib/utils/hooks/UseResizeObserver'

const NavigationFrame = () => {
    const { mob, tabDown, dk } = useDevice()
    const { width } = useResizeObserver()

    const frameRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const url = useLocation().pathname
    const [ecosystem, setEcosystem] = useState<Ecosystem>('visitor')
    const [mainLinks, setMainLinks] = useState<Array<LinkData>>(
        nav(t).filter(l => l.ecosystems.includes(ecosystem) && l.type === 'main')
    )

    const activeLinkIndex =
        Array.from(mainLinks).length -
        1 -
        Array.from(mainLinks)
            .reverse()
            .findIndex(l => url.includes(l.link))

    const [isOpen, setIsOpen] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<number>(activeLinkIndex)

    useEffect(() => {
        if (isOpen) setIsOpen(false)
        const eco = url.includes('/auth') ? 'auth' : url.includes('/app') ? 'app' : 'visitor'
        setEcosystem(eco)
        setMainLinks(nav(t).filter(l => l.ecosystems.includes(eco) && l.type === 'main'))
    }, [url])

    useEffect(() => {
        setHoveredLink(activeLinkIndex)
        setTimeout(() => setCSSVariables(), 200)
    }, [mainLinks, width])

    const setCSSVariables = () => {
        frameRef.current?.style.setProperty('--page-count', `${mainLinks.length}`)
        frameRef.current?.style.setProperty('--index', `${mainLinks.findIndex(l => l.link === url)}`)
        frameRef.current?.style.setProperty('--top-offset', `${findYOffset(menuRef.current)}px`)
    }

    return (
        <div id="navigation-frame" className={isOpen ? 'open' : ''} ref={frameRef}>
            <header className="fixed z-30 top-0 left-1/2 -translate-x-1/2 w-cont flex items-center justify-between py-6 lg:py-10">
                <Link to="/">
                    <Logo height={mob ? 16 : 20} fill={isOpen ? 'var(--black)' : 'var(--white)'} />
                </Link>
                <div className={`right flex space-x-2 ${tabDown ? 'impact-text' : ''}`}>
                    <button className="small-button" onClick={() => setIsOpen(prev => !prev)}>
                        {isOpen ? t.kw.close : t.kw.menu}
                    </button>
                    {ecosystem === 'visitor' && ( // add auth status constraint
                        <Link to={'/app'} className={`small-button ${isOpen ? 'black' : 'primary'}`}>
                            {t.pages.login}
                        </Link>
                    )}
                </div>
            </header>

            <div className="menu fixed top-0 left-1/2 -translate-x-1/2 w-cont pt-[78px] lg:pt-[96px]" ref={menuRef}>
                <div className="main-links">
                    {mainLinks.map((link, i) => (
                        <Link
                            key={i}
                            to={link.link}
                            className={activeLinkIndex === i ? 'active' : ''}
                            onMouseEnter={() => setHoveredLink(i)}
                            onMouseLeave={() => setHoveredLink(activeLinkIndex)}
                        >
                            <p className="w-full flex lg:justify-center items-center py-4 md:py-6">
                                {dk && <span className="pr-6">0{i + 1}.</span>}
                                <span>{link.label}</span>
                            </p>
                        </Link>
                    ))}
                </div>
                {dk && <TabLine i={hoveredLink} cols={mainLinks.length} />}

                <div className="w-full quick-links py-8 lg:py-12 flex items-end justify-between">
                    <div className="left flex flex-col space-y-3 md:space-y-4">
                        {nav(t)
                            .filter(l => l.type === 'quick' && l.ecosystems.includes(ecosystem))
                            .map((link, i) => (
                                <Link
                                    key={i}
                                    to={link.link}
                                    className={`menu-link {url.includes(link.link) ? 'active' : ''}`}
                                >
                                    <p>{link.label}</p>
                                </Link>
                            ))}
                    </div>
                    <div className="right mt-3 lg:mt-none">
                        <button className="menu-link">{'ENG'}</button>
                    </div>
                </div>
            </div>

            {/* Page Render */}
            <main>
                <div className="inner">
                    <Outlet />
                </div>
                <button className="overlay" onClick={() => setIsOpen(prev => !prev)}>
                    <p className="font-semibold uppercase">{nav(t).find(l => l.link === url)?.label}</p>
                </button>
            </main>
        </div>
    )
}

const findYOffset = (el: HTMLElement | null) => {
    if (!el) {
        console.log('caliss')
        return 0
    }

    const rect = el.getBoundingClientRect()
    const y = rect.top + rect.height

    return y
}

export default NavigationFrame
