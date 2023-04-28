import { useState } from "react";

export default function useVideoGenerator() {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);

    const generateImage = async (lyrics, stylePrompt) => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/openapi/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lyrics: lyrics,
                    stylePrompt: stylePrompt,
                }),
            });
            let data = await response.json();
            if (response.status !== 200) {
                console.error("API Error: ", data.detail);
                alert("API Error: " + data.detail) //TODO replace with toast using mui
                return;
            }
            setImage(data.imageURL);
            setIsLoading(false)
        } catch (error) {
            console.error("API error: ", error)
        }
    }

    return { isLoading, image, generateImage }
}