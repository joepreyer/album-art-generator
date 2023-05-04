import Head from 'next/head'

type LayoutProps = {
    title?: string
    children: React.ReactNode
}

const Layout = ({ title = 'artify', children }: LayoutProps) => {
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
