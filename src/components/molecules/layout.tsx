import Head from 'next/head'

type LayoutProps = {
    title?: string
    children: React.ReactNode
}

const Layout = ({ title = 'Artify', children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </>
    )
}

export default Layout
