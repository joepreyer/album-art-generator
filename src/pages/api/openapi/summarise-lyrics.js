import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const promptText = "\n\n Generate one creative, succinct visually descriptive sentence, based on the following song lyrics: " + "\n\n" + req.body.text
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: promptText,
        temperature: 0.3,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 1,
    });
    if (response.status !== 200) {
        let error = await response.json();
        res.statusCode = 500;
        console.error(error)
        res.end(error);
        return;
    }
    res.status(200).json({ result: response.data });
}