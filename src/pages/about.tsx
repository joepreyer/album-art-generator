import AboutTemplate from '@/components/templates/about-template'
import { aboutParagraphs } from '@/content'

export default function About() {
    return (
        <>
            <AboutTemplate paragraphs={aboutParagraphs} heading="About" />
            {/* @ts-ignore */}
            <mash-boost-button display-mode="icon-only" float-location="bottom-left" />
        </>
    )
}
