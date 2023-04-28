export default async function handler(req, res) {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // Pinned to a specific version of Stable Diffusion
            // See https://replicate.com/stability-ai/stable-diffussion/versions
            version: "dfb636aa9c04fe5b7d9897e6159ef88e3ecb3e1eb274c3f072dca7b495823280",

            // This is the text prompt that will be submitted by a form on the frontend
            input: {
                prompts: req.body.prompt,
                style_suffix: req.body.style,
                frame_interpolation: true,
                frame_rate: 5,
                diffusion_steps: 5,
                audio_file: "https://cdn.pixabay.com/download/audio/2021/09/08/audio_718782db3d.mp3?filename=censor-beep-10sec-8113.mp3",
            },
        }),
    });

    if (response.status !== 201) {
        let error = await response.json();
        res.statusCode = 500;
        res.end(JSON.stringify({ detail: error.detail }));
        return;
    }

    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
}