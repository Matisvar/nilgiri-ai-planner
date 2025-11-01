import { useState } from "react";
import { Send, Sparkles, ChevronRight, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ItineraryItem {
  id: string;
  day: number;
  type: "hotel" | "activity" | "restaurant";
  name: string;
  time?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Tripzy AI, your Nilgiris travel assistant. Let's plan your perfect mountain escape! Where are you traveling from?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [itineraryOpen, setItineraryOpen] = useState(true);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Great! I can help you with that. When are you planning to visit the Nilgiris?",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Chat Section */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        itineraryOpen ? "mr-96" : "mr-0"
      )}>
        {/* Chat Header */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Tripzy AI</h2>
              <p className="text-sm text-muted-foreground">Your AI Travel Assistant</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-card border border-border shadow-card backdrop-blur-sm"
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border-border focus:border-primary"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-xl bg-primary hover:bg-primary-glow transition-colors"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Itinerary Panel */}
      <div
        className={cn(
          "fixed right-0 top-16 bottom-0 w-96 bg-card border-l border-border transition-transform duration-300 flex flex-col",
          itineraryOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Panel Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Your Itinerary</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setItineraryOpen(!itineraryOpen)}
            className="rounded-lg"
          >
            <ChevronRight className={cn("w-5 h-5 transition-transform", itineraryOpen && "rotate-180")} />
          </Button>
        </div>

        {/* Itinerary Content */}
        <ScrollArea className="flex-1 p-4">
          {itinerary.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <GripVertical className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Your itinerary will appear here as you chat with Tripzy AI
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Itinerary items will be added dynamically */}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Toggle Button (when panel is closed) */}
      {!itineraryOpen && (
        <Button
          onClick={() => setItineraryOpen(true)}
          className="fixed right-4 top-24 rounded-xl shadow-glow z-50"
          size="sm"
        >
          <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
          Itinerary
        </Button>
      )}
    </div>
  );
}
