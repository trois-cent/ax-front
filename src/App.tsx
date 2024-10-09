import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import WebFont from 'webfontloader'
import FakePage from './components/tools/FakePage'
import NavigationFrame from './components/navs/NavigationFrame/NavigationFrame'
import Preview from './pages/app/profile/Preview'

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
                    <Route index element={<FakePage name="Home" />} />

                    <Route path="/profile" element={<FakePage name="V Profile" />} />
                    <Route path="/identity" element={<FakePage name="V Identity" />} />
                    <Route path="/vision" element={<FakePage name="The Vision" />} />
                    <Route path="/pricing" element={<FakePage name="Pricing" />} />
                    <Route path="/contact" element={<FakePage name="Contact Us" />} />
                    <Route path="/faqs" element={<FakePage name="FAQs" />} />

                    <Route path="/auth">
                        <Route index element={<FakePage name="Login" />} />
                        <Route path="sign-up" element={<FakePage name="Sign Up" />} />
                        <Route path="reset-password" element={<FakePage name="Reset Password" />} />
                    </Route>

                    <Route path="/app">
                        <Route index element={<FakePage name="Dashboard" />} />

                        <Route path="profile" element={<Navigate to="preview" />} />
                        <Route path="profile/preview" element={<Preview />} />
                        <Route path="profile/edit" element={<FakePage name="Edit" />} />
                        <Route path="profile/share" element={<FakePage name="Share" />} />

                        <Route path="identity" element={<FakePage name="Identity" />} />
                        <Route path="identity/test" element={<FakePage name="Test" />} />
                        <Route path="identity/test-results" element={<FakePage name="Results" />} />
                        <Route path="identity/learn" element={<FakePage name="Learn" />} />

                        <Route path="account" element={<FakePage name="Account" />} />
                    </Route>

                    <Route path="*" element={<FakePage name="404" />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
