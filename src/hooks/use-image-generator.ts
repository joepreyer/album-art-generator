import { useState } from 'react'

export default function useVideoGenerator() {
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)

    const handleError = (error: any) => {
        console.error('There was an error when generating the image')
        console.error(error)
        const errorMessage =
            error.message || 'Unknown error occurred while generating image - please try again.'
        setIsLoading(false)
        throw new Error(errorMessage)
    }

    const generateImage = async (lyrics: string, stylePrompt?: string) => {
        if (!lyrics) {
            console.error('Lyrics must be provided')
            throw new Error('Lyrics must be provided')
        }
        setImage(null)
        setIsLoading(true)
        try {
            const response = await fetch('/api/openapi/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lyrics: lyrics,
                    stylePrompt: stylePrompt,
                }),
            })
            if (!response.ok) {
                const errorResponse = await response.json()
                throw new Error(errorResponse)
            }
            let data = await response.json()
            setImage(data.imageURL)
            setIsLoading(false)
        } catch (error: any) {
            handleError(error)
        }
    }

    return { isLoading, image, generateImage }
}
