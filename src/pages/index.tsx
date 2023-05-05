import { useState, useEffect } from 'react'
import useImageGenerator from '@/hooks/use-image-generator'
import ArtGeneratorTemplate from '@/components/templates/art-generator-template'
import { styleOptions } from '../content'
import { UseMashProps } from '@/hooks/use-mash'
import Layout from '@/components/molecules/layout'

type HomeProps = {
    mash: UseMashProps
}

export default function Home({ mash }: HomeProps) {
    const [error, setError] = useState<string | null>(null)
    const [lyrics, setLyrics] = useState('')
    const [stylePrompt, setStylePrompt] = useState('')

    useEffect(() => {
        setError(null)
    }, [lyrics, stylePrompt])

    const devMode = process.env.NODE_ENV === 'development'
    const PRICE_CATEGORY_TAG = process.env
        .NEXT_PUBLIC_MASH_PRICE_CATEGORY_TAG_ART_DISCOUNT as string
    const imageGenerator = useImageGenerator()

    const generateArt = async () => {
        if (!lyrics) return setError('Please enter some lyrics')
        try {
            const hasAccess = devMode || (await mash.access(PRICE_CATEGORY_TAG))
            if (hasAccess) {
                await imageGenerator.generateImage(lyrics, stylePrompt)
            } else console.log("You don't have access to this feature yet")
        } catch (e: any) {
            const errorMessage = 'Error generating image: ' + e.message + ' - Please try again.'
            console.error(errorMessage)
            setError(errorMessage)
        }
    }

    const getLoadingMessage = () => {
        if (imageGenerator.isLoading) return 'Generating your image...'
        else if (mash.isInitializing) return 'Setting up the app...'
        else if (mash.isRequesting) return 'Contributing with Mash...'
        else return ''
    }

    const loadingMessage = getLoadingMessage()

    return (
        <Layout title="Album Art Generator">
            <ArtGeneratorTemplate
                heading="Album Art Generator"
                subtitle="Enter your song lyrics and we'll make you an album artwork for $0.1:"
                generateArt={generateArt}
                loadingMessage={loadingMessage}
                error={error}
                lyrics={lyrics}
                setLyrics={setLyrics}
                stylePrompt={stylePrompt}
                setStylePrompt={setStylePrompt}
                image={imageGenerator.image}
                styleOptions={styleOptions}
            />
            {/* @ts-ignore */}
            <mash-boost-button display-mode="icon-only" float-location="bottom-left" />
        </Layout>
    )
}
