import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
    try {
        const { lyrics, stylePrompt } = req.body
        const promptText =
            '\n\n Write one simple visually descriptive sentence based on these lyrics that could be used to describe an image, to feed into the dall-e image generator: \n\n' +
            lyrics +
            '\n\n'
        const textResponse = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: promptText,
            temperature: 0.3,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 1,
        })
        if (textResponse.status !== 200) {
            let error = await textResponse.json()
            res.statusCode = 500
            console.error(error)
            res.end(error)
            return
        }
        let imagePromptText = textResponse.data.choices[0].text
        if (!!stylePrompt) imagePromptText += ' ' + stylePrompt
        const imageResponse = await openai.createImage({
            prompt: imagePromptText,
            n: 1,
            size: '512x512',
        })

        return res.status(200).json({ imageURL: imageResponse.data.data[0].url })
    } catch (error) {
        console.error('There was an error using the generate-image API: ', error.message)
        const status = error.response.status || 500
        return res.status(status).json(error.message)
    }
}
