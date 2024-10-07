import FakePage from '@/components/tools/FakePage'
import eng from '@/lib/lang/eng'

export type Ecosystem = 'visitor' | 'app' | 'auth'

export type LinkType = 'main' | 'quick' | 'sub'

export type LinkData = {
    type: LinkType
    parent?: string
    ecosystems: Array<Ecosystem>
    label: string
    link: string
    element: JSX.Element
    sublinks?: Array<LinkData>
}

export const nav: (t: typeof eng) => Array<LinkData> = (t: typeof eng) => [
    {
        type: 'main',
        ecosystems: ['visitor'],
        label: t.pages.home,
        link: '/',
        element: <FakePage name="Home" />,
    },
    {
        type: 'main',
        ecosystems: ['visitor'],
        label: t.pages.profile,
        link: '/profile',
        element: <FakePage name="Profile" />,
    },
    {
        type: 'main',
        ecosystems: ['visitor'],
        label: t.pages.identity,
        link: '/identity',
        element: <FakePage name="Identity" />,
    },
    {
        type: 'main',
        ecosystems: ['visitor'],
        label: t.pages.vision,
        link: '/vision',
        element: <FakePage name="The Vision" />,
    },
    {
        type: 'quick',
        ecosystems: ['visitor'],
        label: t.pages.pricing,
        link: '/pricing',
        element: <FakePage name="Pricing" />,
    },
    {
        type: 'quick',
        ecosystems: ['visitor', 'app', 'auth'],
        label: t.pages.contact,
        link: '/contact-us',
        element: <FakePage name="Contact Us" />,
    },
    {
        type: 'quick',
        ecosystems: ['visitor', 'app', 'auth'],
        label: t.pages.faqs,
        link: '/faqs',
        element: <FakePage name="FAQs" />,
    },
    {
        type: 'main',
        ecosystems: ['app'],
        label: t.pages.dashboard,
        link: '/app',
        element: <FakePage name="Dashboard" />,
    },
    {
        type: 'main',
        ecosystems: ['app'],
        label: t.pages.profile,
        link: '/app/profile',
        element: <FakePage name="Profile" />,
        subLinks: [
            {
                type: 'sub',
                ecosystem: ['app'],
                label: t.pages.preview,
                link: '/app/profile/preview',
                element: <FakePage name="Preview" />,
            },
            {
                type: 'sub',
                ecosystem: ['app'],
                label: t.pages.edit,
                link: '/app/profile/edit',
                element: <FakePage name="Edit" />,
            },
        ],
    },
    {
        type: 'main',
        ecosystems: ['app'],
        label: t.pages.identity,
        link: '/app/identity',
        element: <FakePage name="Identity" />,
        subLinks: [
            {
                type: 'sub',
                ecosystem: ['app'],
                label: t.pages.results,
                link: '/app/identity/test-results',
                element: <FakePage name="Results" />,
            },
            {
                type: 'sub',
                ecosystem: ['app'],
                label: t.pages.learn,
                link: '/app/identity/learn',
                element: <FakePage name="Learn" />,
            },
        ],
    },
    {
        type: 'main',
        ecosystems: ['app'],
        label: t.pages.account,
        link: '/app/account',
        element: <FakePage name="Account" />,
    },
    {
        type: 'main',
        ecosystems: ['auth'],
        label: t.pages.login,
        link: '/auth',
        element: <FakePage name="Log In" />,
    },
    {
        type: 'main',
        ecosystems: ['auth'],
        label: t.pages.signup,
        link: '/auth/sign-up',
        element: <FakePage name="Sign Up" />,
    },
]