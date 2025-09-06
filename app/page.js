"use client"
import { useState } from "react";

export default function Home() {
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState("")
  const [issending, setIssending] = useState(false)

  const handleSend = async () => {
    if (message.trim() === "") return;

    const newChats = [...chats, { role: "user", content: message }];
    setChats(newChats);
    setMessage("");

    try {
      setIssending(true);
      const response = await fetch("/api/get-responce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response from server:", data);

      setChats((prevChats) => [
        ...prevChats,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChats((prevChats) => [
        ...prevChats,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    }
    setIssending(false);
  }

  return (
    <div className="bg-[#ededed] min-h-screen font-sans">
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen relative">
        <img src="./refresh-icon.png" alt="" className="absolute top-2 right-0 w-9 bg-[#a5d92e] cursor-pointer invert p-2 rounded-2xl" onClick={()=> {window.location.reload()}} />
        <h1 className="text-3xl text-[#7346ed] font-bold">Hello, I&apos;m Liyon</h1>

        <div className="chat-area md:w-[80%] w-full rounded-2xl p-4 mt-4 mb-15 h-[70vh] overflow-y-auto">
          {chats.map((chat, index) => (
            <div key={index} className={`flex w-[100%] ${chat.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
              <p className={`text-lg p-4 md:max-w-[60%] max-w-[70%] ${chat.role === "user"? "bg-[#e0e0e0] text-[#7b51e3] rounded-2xl" : "bg-[#6529e9] text-white rounded-2xl" }`}>{chat.content}</p>
            </div>
          ))}
          {issending && (
            <div className="flex w-[100%] justify-start mb-4">
              <p className="text-lg p-4 md:max-w-[60%] max-w-[70%] bg-[#6529e9] text-white rounded-2xl animate-pulse">Generating...</p>
            </div>
          )}
        </div>

        <div className="input-area bg-[#5a26d1] absolute bottom-0 md:w-[80%] w-full rounded-2xl p-4">
          <div className="flex items-center justify-around bg-[#733bff] rounded-2xl p-2">
            <img src="./robot-logo.png" alt="" className="md:w-9 w-8 invert" />
            <input type="text" value={message} onChange={(e)=> {setMessage(e.target.value)}} placeholder="Message" className="outline-none text-white text-[18px] md:w-[80%] w-[70%]" />
            <button onClick={()=> {!issending && handleSend(message)}} ><img src={issending ? "generating-icon.png" : "send-icon.png"} alt="" className="md:w-9 w-7 invert cursor-pointer" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
