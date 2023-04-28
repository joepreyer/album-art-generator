import { useState } from 'react'

export default function useVideoGenerator() {
    const [isLoading, setIsLoading] = useState(false)
    const [video, setVideo] = useState(null)
    const [isStarting, setIsStarting] = useState(false)

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

    const summariseLyrics = async (lyrics: string) => {
        const response = await fetch('/api/openapi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: lyrics,
            }),
        })
        if (response.status !== 200) {
            console.error('API Error: ', response.status)
            throw new Error('API Error: ' + response.status)
        }
        let data = await response.json()
        return data.result.choices[0].text
    }

    const generateVideo = async (lyrics: string, stylePrompt?: string) => {
        setIsLoading(true)
        try {
            const summarisedLyrics = await summariseLyrics(lyrics)
            const response = await fetch('/api/predictions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: summarisedLyrics,
                    style: stylePrompt,
                }),
            })
            let prediction = await response.json()
            if (response.status !== 201) {
                console.error('API Error: ', prediction.detail)
                alert('API Error: ' + prediction.detail) //TODO replace with toast using mui
                return
            }

            while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
                if (prediction.status === 'starting') setIsStarting(true)
                await sleep(1000)
                const response = await fetch('/api/predictions/' + prediction.id)
                prediction = await response.json()
                if (response.status !== 200) {
                    console.error('API Error: ', prediction.detail)
                    alert('API Error: ' + prediction.detail) //TODO replace with toast using mui
                    return
                }
            }
            setVideo(prediction)
            setIsLoading(false)
        } catch (error) {
            console.error('API error: ', error)
        }
    }

    return { isLoading, video, generateVideo, isStarting }
}
