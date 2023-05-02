import AboutTemplate from '@/components/templates/about-template'
import { aboutParagraphs } from '@/content'
import { MashContext } from '@/context/mash-context'
import { useContext, useState } from 'react'

export default function About() {
    const [emailHidden, setEmailHidden] = useState(true)
    const mash = useContext(MashContext)
    const PRICE_CATEGORY_TAG = process.env.NEXT_PUBLIC_MASH_PRICE_CATEGORY_TAG_EMAIL as string
    const emailAddress = process.env.NEXT_PUBLIC_EMAIL_ADDRESS as string

    const revealEmail = async () => {
        const hasAccess = await mash.access(PRICE_CATEGORY_TAG)
        if (hasAccess) {
            setEmailHidden(false)
        } else console.log('You need to pay to reveal the email address')
    }

    const openEmail = () => (window.location.href = `mailto:${emailAddress}?subject=Hello Artify!`)

    return (
        <>
            <AboutTemplate
                paragraphs={aboutParagraphs}
                heading="About"
                revealEmail={revealEmail}
                emailHidden={emailHidden}
                emailButtonLoading={mash.isRequesting}
                openEmail={openEmail}
                emailAddress={emailAddress}
            />
            {/* @ts-ignore */}
            <mash-boost-button display-mode="icon-only" float-location="bottom-left" />
        </>
    )
}
