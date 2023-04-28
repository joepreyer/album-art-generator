import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const { lyrics, stylePrompt } = req.body
    const promptText = "\n\n Generate one creative, succinct visually descriptive sentence, based on the following song lyrics: " + "\n\n" + lyrics
    const textResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: promptText,
        temperature: 0.3,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 1,
    });
    if (textResponse.status !== 200) {
        let error = await response.json();
        res.statusCode = 500;
        console.error(error)
        res.end(error);
        return;
    }
    console.log("Text response")
    console.log(textResponse.data)
    console.log(textResponse.status)
    const imagePromptText = textResponse.data.choices[0].text + " The image should contain no text. With style: " + stylePrompt
    const imageResponse = await openai.createImage({
        prompt: imagePromptText,
        n: 1,
        size: "1024x1024",
    });

    console.log("Image response")
    console.log(imageResponse.data)
    console.log(imageResponse.status)

    if (!imageResponse.data) throw new Error('Unable to get image');

    res.status(200).json({ imageURL: imageResponse.data.data[0].url })
}