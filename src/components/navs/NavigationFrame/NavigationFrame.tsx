import './styles.scss'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import t from '../../../lib/lang/eng'
import Logo from '@/components/tools/Logo'

const NavigationFrame = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div id="navigation-frame" className={isOpen ? 'open' : ''}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 header w-cont py-10 mx-auto flex items-center justify-between">
                    <Logo height={20} fill={isOpen ? "var(--black)" : "var(--white)"} />
                    <button className="small-button" onClick={() => setIsOpen(prev => !prev)}>{isOpen ? t.actions.close : t.pages.menu}</button>
                </div>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default NavigationFrame
