import AboutTemplate from '@/components/templates/about-template'
import { aboutParagraphs } from '@/content'
import { useState } from 'react'
import Layout from '@/components/molecules/layout'
import { UseMashProps } from '@/hooks/use-mash'

type AboutPageProps = {
    mash: UseMashProps
}

export default function About({ mash }: AboutPageProps) {
    const [error, setError] = useState<string | null>(null)
    const [emailHidden, setEmailHidden] = useState(true)
    const PRICE_CATEGORY_TAG = process.env.NEXT_PUBLIC_MASH_PRICE_CATEGORY_TAG_EMAIL as string
    const emailAddress = process.env.NEXT_PUBLIC_EMAIL_ADDRESS as string

    const revealEmail = async () => {
        try {
            const hasAccess = await mash.access(PRICE_CATEGORY_TAG)
            if (hasAccess) {
                setEmailHidden(false)
            } else console.log('You need to pay to reveal the email address')
        } catch (e: any) {
            const errorMessage = 'Error revealing email: ' + e.message + ' - Please try again.'
            console.error(errorMessage)
            setError(errorMessage)
        }
    }

    const openEmail = () => (window.location.href = `mailto:${emailAddress}?subject=Hello Artify!`)

    return (
        <Layout title="About Artify">
            <AboutTemplate
                paragraphs={aboutParagraphs}
                heading="About"
                revealEmail={revealEmail}
                emailHidden={emailHidden}
                emailButtonLoading={mash.isRequesting}
                openEmail={openEmail}
                emailAddress={emailAddress}
                error={error}
            />

            {/* @ts-ignore */}
            <mash-boost-button display-mode="icon-only" float-location="bottom-left" />
        </Layout>
    )
}
