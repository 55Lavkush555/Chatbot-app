"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState("")
  const [issending, setIssending] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats, issending])

  const handleSend = async () => {
    if (message.trim() === "") return;

    const userMessage = message.trim();
    const newChats = [...chats, { role: "user", content: userMessage }];
    setChats(newChats);
    setMessage("");

    try {
      setIssending(true);
      const response = await fetch("/api/get-responce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, chats: newChats}),
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
    } finally {
      setIssending(false);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!issending) handleSend();
    }
  }

  return (
    <main className="min-h-screen bg-[#07080d] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between border-b border-white/10 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-lg shadow-violet-950/30">
              <Image src="/robot-logo.png" alt="Liyon" width={28} height={28} className="invert" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Liyon</h1>
              <p className="text-sm text-slate-400">Modern AI chatbot</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Refresh chat"
            onClick={() => { window.location.reload() }}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-violet-400/50 hover:bg-violet-500/15 hover:text-white"
          >
            <Image src="/refresh-icon.png" alt="" width={20} height={20} className="invert" />
          </button>
        </header>

        <section className="flex min-h-0 flex-1 flex-col">
          <div className="chat-area flex-1 overflow-y-auto py-6 pr-1 sm:py-8">
            {chats.length === 0 && (
              <div className="mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center text-center">
                <div className="mb-6 grid h-16 w-16 place-items-center rounded-3xl border border-violet-400/20 bg-violet-500/15 shadow-2xl shadow-violet-950/40">
                  <Image src="/robot-logo.png" alt="" width={40} height={40} className="invert" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Hello, I&apos;m Liyon</h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                  Ask anything and I&apos;ll reply right here. Clean, fast, no chat history drama.
                </p>
              </div>
            )}

            <div className="space-y-5">
              {chats.map((chat, index) => (
                <div key={index} className={`flex w-full ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[88%] gap-3 sm:max-w-[76%] ${chat.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border ${chat.role === "user" ? "border-cyan-300/20 bg-cyan-400/10" : "border-violet-300/20 bg-violet-500/15"}`}>
                      <span className="text-xs font-bold text-slate-200">{chat.role === "user" ? "You" : "AI"}</span>
                    </div>
                    <p className={`whitespace-pre-wrap rounded-3xl px-4 py-3 text-[15px] leading-7 shadow-xl sm:px-5 sm:text-base ${
                      chat.role === "user"
                        ? "rounded-tr-md bg-cyan-400 text-slate-950 shadow-cyan-950/20"
                        : "rounded-tl-md border border-white/10 bg-white/[0.07] text-slate-100 shadow-black/20"
                    }`}>
                      {chat.content}
                    </p>
                  </div>
                </div>
              ))}

              {issending && (
                <div className="flex w-full justify-start">
                  <div className="flex max-w-[88%] gap-3 sm:max-w-[76%]">
                    <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-violet-300/20 bg-violet-500/15">
                      <span className="text-xs font-bold text-slate-200">AI</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-3xl rounded-tl-md border border-white/10 bg-white/[0.07] px-5 py-4 text-slate-300 shadow-xl shadow-black/20">
                      <span className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-violet-300 [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-violet-300 [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-violet-300"></span>
                      </span>
                      <span className="text-sm">Generating response</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!issending) handleSend();
            }}
            className="sticky bottom-0 border-t border-white/10 bg-[#07080d]/95 py-4 backdrop-blur-xl"
          >
            <div className="flex items-end gap-3 rounded-3xl border border-white/10 bg-white/[0.06] p-2 shadow-2xl shadow-black/30 transition focus-within:border-violet-400/60 focus-within:bg-white/[0.08]">
              <textarea
                rows="1"
                value={message}
                onChange={(e) => { setMessage(e.target.value) }}
                onKeyDown={handleKeyDown}
                placeholder="Message Liyon..."
                className="max-h-36 min-h-12 flex-1 resize-none bg-transparent px-4 py-3 text-base leading-6 text-white outline-none placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={issending || message.trim() === ""}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
                aria-label="Send message"
              >
                <Image src={issending ? "/generating-icon.png" : "/send-icon.png"} alt="" width={24} height={24} />
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
