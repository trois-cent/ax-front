import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import WebFont from 'webfontloader'
import NavigationFrame from './components/navs/NavigationFrame/NavigationFrame'

function App() {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Poppins:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900'],
            },
        })
    }, [])

    return (
        <>
            <Routes>
                <Route path="/" element={<NavigationFrame />}>
                    <Route index element={<div className="w-full h-[150vh] bg-black">Home</div>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
