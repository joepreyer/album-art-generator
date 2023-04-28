import { useState, useEffect } from 'react'
import useImageGenerator from '@/hooks/use-image-generator'
import useMash from '@/hooks/use-mash'
import ArtForm from '@/components/templates/art-generator'

export default function Home() {
    const [error, setError] = useState<string | null>(null)
    const [lyrics, setLyrics] = useState('')
    const [stylePrompt, setStylePrompt] = useState('')

    //Clear error message when lyrics or style prompt changes
    useEffect(() => {
        setError(null)
    }, [lyrics, stylePrompt])
    const devMode = process.env.NODE_ENV === 'development'
    const PRICE_CATEGORY_TAG = process.env.NEXT_PUBLIC_MASH_PRICE_CATEGORY_TAG as string
    const mash = useMash(process.env.NEXT_PUBLIC_MASH_EARNER_ID as string)

    const { isLoading, image, generateImage } = useImageGenerator()

    //Submit lyrics to generate image
    const generateArt = async () => {
        if (!lyrics) return setError('Please enter some lyrics')
        const hasAccess = devMode || (await mash.access(PRICE_CATEGORY_TAG))
        if (hasAccess) {
            generateImage(lyrics, stylePrompt)
        } else console.log("You don't have access to this feature yet")
    }

    const getLoadingMessage = () => {
        if (isLoading) return 'Generating your image...'
        else if (mash.isInitializing) return 'Setting up the app...'
        else if (mash.isRequesting) return 'Contributing with Mash...'
        else return ''
    }

    const loadingMessage = getLoadingMessage()

    return (
        <>
            <ArtForm
                title="Album Art Generator"
                subtitle="Enter your song lyrics and we'll make you an album artwork:"
                generateArt={generateArt}
                loadingMessage={loadingMessage}
                error={error}
                lyrics={lyrics}
                setLyrics={setLyrics}
                stylePrompt={stylePrompt}
                setStylePrompt={setStylePrompt}
                image={image}
            />
            {/* @ts-ignore */}
            <mash-boost-button display-mode="icon-only" float-location="bottom-left" />
        </>
    )
}
