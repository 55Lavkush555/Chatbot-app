import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();

    console.log("Received data:", data);

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Ab system role hata diya, sirf ek hi prompt bhejna hai
    const response = await model.generateContent(
      `You are Liyon, a desi coding bhai. Talk in mix of Hindi + English, chill tone. Limit answer to 40–50 words only. Explain shortly like coding buddy. \n\nUser: ${data.message}`
    );

    const aiText = response.response.text();

    return NextResponse.json(
      {
        message: "Data received successfully!",
        receivedData: data,
        response: aiText,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

