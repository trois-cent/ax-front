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
import SplitText from '@/components/tools/SplitText/SplitText'
import { splitTextLetters } from '@/lib/animations/textAnimations'

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
                                className="small-button"
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
                                <p className="w-full flex lg:justify-center items-center py-4 md:py-6">{link.label}</p>
                            </Link>
                        ))}
                    </div>
                    {dk && <TabLine i={hoveredLink} cols={mainLinks.length} refresh={refreshTabLine} />}

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
                                        <p>
                                            {link.label}{' '}
                                            <span className="arrow pl-1 inline-block">
                                                <svg
                                                    height={14}
                                                    viewBox="0 0 17 17"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.99089 0L6.98574 2.12049L13.3472 2.11533L0 15.4625L1.53748 17L14.8847 3.65281V10.0194L17 10.0091L17 7.69757e-07L6.99089 0Z"
                                                        fill="#171717"
                                                    />
                                                </svg>
                                            </span>
                                        </p>
                                    </Link>
                                ))}
                        </div>
                        <div className="right">
                            <button className="menu-link">
                                <span className="switch inline-block">
                                    <svg height={15} viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0.716797 8.76555L2.05338 10.1021L3.70338 8.45214V8.75005C3.70338 10.9592 4.48367 12.8413 6.0406 14.3843C7.59703 15.9271 9.4885 16.7 11.7034 16.7C12.3431 16.7 12.9712 16.6207 13.5871 16.462C14.2025 16.3033 14.7985 16.0688 15.3751 15.759L15.612 15.6316L14.1984 14.218L14.072 14.276C13.691 14.4508 13.3011 14.5818 12.9019 14.6692C12.5023 14.7565 12.1029 14.8 11.7034 14.8C10.0013 14.8 8.56379 14.2129 7.37881 13.0361C6.19395 11.8592 5.60338 10.4344 5.60338 8.75005V8.45214L7.25338 10.1021L8.58997 8.76555L4.65338 4.8287L0.716797 8.76555Z"
                                            fill="black"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M14.7168 8.73454L18.6534 12.6714L22.59 8.73454L21.2534 7.39796L19.6034 9.04796V8.75005C19.6034 6.54087 18.8231 4.65883 17.2662 3.11576C15.7097 1.57298 13.8183 0.800049 11.6034 0.800049C10.9637 0.800049 10.3356 0.879402 9.71971 1.03813C9.10431 1.19677 8.50824 1.43127 7.9317 1.74113L7.69473 1.86849L9.10835 3.28211L9.23481 3.22407C9.61575 3.04924 10.0057 2.91829 10.4049 2.83092C10.8045 2.7436 11.2039 2.70005 11.6034 2.70005C13.3054 2.70005 14.743 3.28722 15.9279 4.46394C17.1128 5.64091 17.7034 7.06569 17.7034 8.75005V9.04796L16.0534 7.39796L14.7168 8.73454ZM9.76963 1.2318C9.1703 1.3863 8.58958 1.61475 8.02675 1.91725L9.15167 3.04217C9.15158 3.04221 9.15176 3.04213 9.15167 3.04217L8.02675 1.91725C8.08851 1.88406 8.15012 1.8518 8.21232 1.82039C8.71696 1.56554 9.23607 1.36935 9.76963 1.2318Z"
                                            fill="black"
                                        />
                                    </svg>
                                </span>{' '}
                                {'ENG'}
                            </button>
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
