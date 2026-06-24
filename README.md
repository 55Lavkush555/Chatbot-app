# Liyon AI Chatbot

Liyon is a modern dark-theme AI chatbot built with Next.js. It provides a clean frontend chat interface where users can send a message, call the existing API route, and display the generated assistant response in the conversation view.

The project is intentionally lightweight: there is no chat history system, database, authentication flow, or message storage. The app focuses on a polished chatbot UI connected to one API endpoint.

Live Demo: [https://chatbot-app-orpin-kappa.vercel.app/](https://chatbot-app-orpin-kappa.vercel.app/)

## What It Does

- Accepts a user message from the chatbot input.
- Sends the message and current in-memory chat context to `/api/get-responce`.
- Fetches the assistant response from the API route.
- Displays user and assistant messages in a responsive dark-mode chat interface.

## Features

- Modern dark-mode chatbot UI
- Responsive layout for desktop and mobile
- Polished user and assistant chat bubbles
- Sticky message composer
- Loading state while the assistant response is generated
- Enter-to-send support
- Auto-scroll to the latest message
- Refresh button to reset the current session
- API-powered response flow using `/api/get-responce`

## Tech Stack

- [Next.js](https://nextjs.org/) 15
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- JavaScript
- ESLint
- OpenRouter API integration through a Next.js API route

## Project Structure

```text
Chatbot-app/
|-- app/
|   |-- api/
|   |   `-- get-responce/
|   |       `-- route.js          # API route used by the chatbot UI
|   |-- globals.css               # Global styles and Tailwind import
|   |-- layout.js                 # Root layout and metadata
|   `-- page.js                   # Main chatbot interface
|-- public/
|   |-- favicon.png
|   |-- generating-icon.png
|   |-- refresh-icon.png
|   |-- robot-logo.png
|   `-- send-icon.png
|-- eslint.config.mjs
|-- jsconfig.json
|-- next.config.mjs
|-- package-lock.json
|-- package.json
|-- postcss.config.mjs
`-- README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18.18 or newer
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone <your-repository-url>
cd Chatbot-app
npm install
```

## Environment Variables

The API route uses OpenRouter to generate chatbot responses. Create a `.env.local` file in the project root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Keep this file private. It is ignored by Git and should never be committed.

## Run Locally

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the app in development mode.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run start
```

Starts the production server after building the app.

```bash
npm run lint
```

Runs ESLint checks.

## API Usage

The chatbot frontend sends a `POST` request to:

```text
/api/get-responce
```

Request body:

```json
{
  "message": "Hello",
  "chats": [
    {
      "role": "user",
      "content": "Hello"
    }
  ]
}
```

Expected response:

```json
{
  "message": "Data received successfully!",
  "receivedData": {},
  "response": "Assistant reply"
}
```

The endpoint name is currently spelled `get-responce` in the project and should be used exactly as-is unless the frontend and route are updated together.

## Screenshots

![Chatbot App](/public/screenshot.png)

## Future Improvements

- Add better API error messages for users
- Add markdown rendering for assistant responses
- Add copy-to-clipboard for assistant replies
- Add message retry support
- Add streaming responses for a more natural AI chat experience
- Add unit or integration tests for the chat flow

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Run lint and build checks.
5. Open a pull request with a clear description.

Please keep changes focused and avoid modifying backend logic unless the pull request is specifically about API behavior.

## License

No license file is currently included in this repository. Add a license such as MIT before distributing or accepting public contributions.
