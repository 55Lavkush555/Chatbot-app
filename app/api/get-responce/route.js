import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const userMessage = data.message;
    const chatHistory = data.chats

    // 🔥 OpenRouter call
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Talk like a cool Indian coder bhai" },
          ...chatHistory.slice(-6),
          { role: "user", content: userMessage },
        ],
      }),
    });

    const aiData = await aiRes.json();

    const aiReply = aiData.choices?.[0]?.message?.content || "No response";

    // 🔥 Final response
    return NextResponse.json(
      {
        message: "Data received successfully!",
        receivedData: data,
        response: aiReply, // 👈 yaha magic ho raha hai
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}