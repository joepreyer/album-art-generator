# Artify

Artify is an AI-powered album art generator. Feed it your song lyrics / vibe of your song and it will generate an album artwork for you, for just $1.

In order to generate art, you must sign up to pay through [Mash](https://mash.com/). This can be done in the app.

## Tech Stack

This project was built using Next.js, Material UI and Mash.

## Running this project locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

NB: Make sure you have all the relevant env variables set correctly in a .env.local file at the root of your project. You can find the env variables in the .env.example file.

Future improvements/work:

-   Improve error handling to give more descriptive error messages
-   Add tests
-   Add a user login system, and store all art generations for a user in a database which they can access later (look into if possible to link this with Mash)
-   Send an email to the user with the generated art upon completion
-   Add a page to generate a Spotify Canvas video from the song lyrics/album art
