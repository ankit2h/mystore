import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot,Send } from "lucide-react";
import useAskModel from "../hooks/useChatAsk";
import useMessages from "../hooks/useMessages";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { setSidebar } from "../redux/sideSlice";
import { useDispatch } from "react-redux";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/clerk-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebar(false));
  }, [dispatch]);
  // trigger loading messages into the store (hook runs fetch on mount)
  useMessages();

  const storeMessages = useSelector((s: RootState) => s.sidebar.messages || []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { askModel } = useAskModel();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // When storeMessages updates, normalize them into local chat message shape
  useEffect(() => {
    if (!Array.isArray(storeMessages) || storeMessages.length === 0) {
      // fallback greeting when no stored messages
      setMessages([
        {
          id: "greeting-1",
          role: "assistant",
          content: "Hello! I'm your AI assistant. How can I help you today?",
          timestamp: new Date(),
        },
      ]);
      return;
    }

    // storeMessages expected shape: { query, response, timestamp, svg }
    // Convert to chronological order (oldest first)
    const ordered = [...storeMessages].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    const normalized: Message[] = [];
    for (const item of ordered) {
      const ts = item.timestamp ? new Date(item.timestamp) : new Date();
      const tsId = ts.toISOString();
      // user message
      normalized.push({
        id: `${tsId}-u`,
        role: "user",
        content: String(item.query || ""),
        timestamp: ts,
      });
      // assistant message
      normalized.push({
        id: `${tsId}-a`,
        role: "assistant",
        content: String(item.response || ""),
        timestamp: ts,
      });
    }
    setMessages(normalized);
  }, [storeMessages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "50px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const apiResponse = await askModel(userMessage.content, "");
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `${apiResponse}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background ">
      {/* Messages Area (leave space for fixed header) */}
      <div className="flex-1 overflow-y-auto pt-[130px]">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border shadow-card"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SignedIn>
                      <div className="w-4 h-4 text-secondary-foreground">
                        <UserButton />
                      </div>
                    </SignedIn>
                    {/* <User className="w-4 h-4 text-secondary-foreground" /> */}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-card border border-border shadow-card rounded-lg p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-gradient-subtle border-t border-border backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[50px] max-h-[200px] resize-none bg-card border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              className="h-[50px] w-[50px] bg-gradient-primary hover:shadow-soft transition-all duration-300 hover:scale-105 flex-shrink-0"
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
