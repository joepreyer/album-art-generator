import { Code } from '@mui/icons-material'
import { useState } from 'react'

export default function useVideoGenerator() {
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)

    const generateImage = async (lyrics: string, stylePrompt?: string) => {
        setIsLoading(true)
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
            const errorMessage =
                errorResponse.error.message || 'Unknown error occurred while generating image - please try again.'
            console.error('Error generating image', errorMessage)
            setIsLoading(false)
            throw new Error(errorMessage)
        }
        let data = await response.json()
        setImage(data.imageURL)
        setIsLoading(false)
    }

    return { isLoading, image, generateImage }
}
