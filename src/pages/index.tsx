import { useState, useEffect } from "react";
import Head from "next/head";
import Column from "@/components/atoms/column";
import { Box, Button, Container, TextField, Typography, CircularProgress, Alert } from "@mui/material";
import useImageGenerator from "../hooks/use-image-generator";
import useMash from "@/hooks/use-mash";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState("")
  const [stylePrompt, setStylePrompt] = useState("")
  const { isLoading, image, generateImage } = useImageGenerator()

  //Clear error message when lyrics or style prompt changes
  useEffect(() => {
    setError(null)
  }, [lyrics, stylePrompt])

  const devMode = process.env.NODE_ENV === "development"
  const PRICE_CATEGORY_TAG = process.env.NEXT_PUBLIC_MASH_PRICE_CATEGORY_TAG as string;
  const mash = useMash(process.env.NEXT_PUBLIC_MASH_EARNER_ID as string);

  //Submit lyrics to generate image
  const submitLyrics = async () => {
    if (!lyrics) return setError("Please enter some lyrics");
    const hasAccess = devMode || await mash.access(PRICE_CATEGORY_TAG);
    if (hasAccess) {
      generateImage(lyrics, stylePrompt)
    }
    else console.log("You don't have access to this feature yet");
  }

  let loadingMessage = "";
  if (isLoading) loadingMessage = "Generating your image...";
  else if (mash.isInitializing) loadingMessage = "Setting up the app...";
  else if (mash.isRequesting) loadingMessage = "Contributing with Mash...";

  return (
    <Container sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
      <Head>
        <title>Song To Video</title>
      </Head>

      <Typography sx={{ mb: "16px", mt: "32px" }}>
        Enter your song lyrics and we&apos;ll make you an album artwork:
      </Typography>

      <Column styles={{ width: "100%", maxWidth: "600px", mb: '32px' }}>
        <TextField onChange={e => setLyrics(e.target.value)} type="textarea" name="prompt" placeholder="Enter your song lyrics here. If your song doesn't have lyrics, write a description about how the song makes you feel, or some imagery that you think suits the song." sx={{ mb: "16px", width: "100%", }} multiline rows={8} />
        <TextField onChange={e => setStylePrompt(e.target.value)} type="text" name="style" placeholder="Enter a style (eg. abstract Picasso, high detail)" sx={{ mb: "16px", width: "100%" }} />
        <Button onClick={submitLyrics} sx={{ width: "fit-content" }} variant="contained" type="submit">Create Album Art</Button>
        <Box sx={{ pt: "32px" }}>
          {error && <Alert sx={{ mt: "16px" }} severity="error">This is an error alert — check it out!</Alert>}
          {loadingMessage && (
            <Column>
              <CircularProgress />
              <Typography sx={{ mb: "16px", mt: "32px" }}>{loadingMessage}</Typography>
            </Column>
          )}
          {image && (
            <>
              <Typography sx={{ mb: "16px" }}> Click the image to download:</Typography>
              <a href={image} download>
                <Box
                  component="img"
                  src={image}
                  sx={{ width: "100%" }}
                />
              </a>
            </>
          )}
        </Box>
      </Column>
      <mash-boost-button
        display-mode="icon-only"
        float-location="bottom-left"
      />


    </Container>
  );
}