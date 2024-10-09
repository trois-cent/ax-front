import './styles.scss'
import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Ecosystem, levelLinks, LinkData, nav } from './Structure'

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
    const [sublinks, setSublinks] = useState<Array<LinkData>>([])
    const [refreshTabLine, setRefreshTabLine] = useState<boolean>(false)

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
        if (eco !== ecosystem) setEcosystem(eco)
        setMainLinks(nav(t).filter(l => l.ecosystems.includes(eco) && l.type === 'main'))
    }, [url])

    useEffect(() => {
        setSublinks(() => {
            const activeLink = mainLinks[activeLinkIndex]
            return activeLink?.sublinks || []
        })
        setHoveredLink(activeLinkIndex)
        setTimeout(() => setCSSVariables(), 400)
    }, [mainLinks, width])

    useEffect(() => {
        setTimeout(() => setRefreshTabLine(prev => !prev), 750)
    }, [width, ecosystem])

    const setCSSVariables = () => {
        frameRef.current?.style.setProperty('--page-count', `${mainLinks.length}`)
        frameRef.current?.style.setProperty('--index', `${mainLinks.findIndex(l => l.link === url)}`)
        frameRef.current?.style.setProperty('--top-offset', `${findYOffset(menuRef.current)}px`)
    }

    return (
        <motion.div
            layout
            transition={{ duration: 0.55, ease: 'cubic.inOut' }}
            id="navigation-frame"
            className={`${isOpen ? 'open' : ''} ${
                ecosystem === 'auth' && url.includes('/sign-up') ? 'sign-up' : ecosystem === 'auth' ? 'log-in' : ''
            }`}
            ref={frameRef}
        >
            <div className="auth-left"></div>
            <div className="frame">
                <header className="absolute z-30 top-0 left-0 right-0 mx-gutter flex items-center justify-between py-6 lg:py-10">
                    {!(sublinks.length > 0 && !isOpen) && (
                        <Link to="/">
                            <Logo height={mob ? 16 : 20} fill={isOpen ? 'var(--black)' : 'var(--white)'} />
                        </Link>
                    )}
                    {sublinks.length > 0 && !isOpen && (
                        <ul className="sub-links flex space-x-1.5">
                            {sublinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.link}
                                        className={`small-button ${url.includes(link.link) ? 'primary' : ''}`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className={`right flex space-x-2 ${tabDown ? 'impact-text' : ''}`}>
                        {ecosystem !== 'auth' ? (
                            <button className="small-button" onClick={() => setIsOpen(prev => !prev)}>
                                {isOpen ? t.kw.close : t.kw.menu}
                            </button>
                        ) : (
                            <Link
                                to={url.includes('/auth/sign-up') ? '/auth' : '/auth/sign-up'}
                                className="small-button primary"
                            >
                                {url.includes('/auth/sign-up') ? t.pages.login : t.pages.signup}
                            </Link>
                        )}
                        {ecosystem === 'visitor' && ( // add auth status constraint
                            <Link to={'/auth'} className={`small-button ${isOpen ? 'black' : 'primary'}`}>
                                {t.pages.login}
                            </Link>
                        )}
                    </div>
                </header>

                <div
                    className="menu absolute top-0 left-1/2 -translate-x-1/2 w-full px-gutter pt-[78px] lg:pt-[96px]"
                    ref={menuRef}
                >
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
                    {dk && <TabLine i={hoveredLink} cols={mainLinks.length} refresh={refreshTabLine} />}

                    <div className="w-full quick-links py-8 lg:py-12 flex items-start md:items-end justify-between">
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
                        <div className="right">
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
                        <p className="font-semibold uppercase">
                            {levelLinks(nav(t)).find(l => l.link === url)?.type !== 'sub'
                                ? levelLinks(nav(t)).find(l => l.link === url)?.label
                                : `${mainLinks[activeLinkIndex].label}  >  ${
                                      sublinks.find(l => l.link === url)?.label
                                  }`}
                        </p>
                    </button>
                </main>
            </div>
            <div className="auth-right"></div>
        </motion.div>
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
