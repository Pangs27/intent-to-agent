import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AgentPlan {
  goal: string;
  objects: string[];
  action: string;
  frequency: string;
  threshold?: string;
}

const Builder = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'll help you create an AI agent. Just tell me what you want to automate in plain English. For example: 'Alert me when sneakers drop below ₹7,000 on VegNonVeg'"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentPlan, setAgentPlan] = useState<AgentPlan | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (in real app, this would call Lovable AI)
    setTimeout(() => {
      // Simple pattern matching for demo
      const lowerInput = userMessage.toLowerCase();
      
      if (messages.length === 1) {
        // First user message - parse intent
        if (lowerInput.includes("alert") || lowerInput.includes("notify")) {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Got it! I understand you want to receive alerts. How often should I check? (e.g., 'daily', 'every hour', 'every 6 hours')"
          }]);
        } else if (lowerInput.includes("email") || lowerInput.includes("summary")) {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Perfect! I'll set up an email summary for you. What time should I send it? (e.g., '9 AM', 'every morning')"
          }]);
        } else {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "I'd love to help! Could you tell me more about what you want to happen? For example, do you want alerts, summaries, or something else?"
          }]);
        }
      } else if (messages.length === 3) {
        // Second user message - confirm frequency
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Great! Let me summarize what I understood. Does this look correct?"
        }]);
        
        // Create agent plan
        setAgentPlan({
          goal: "Price monitoring with alerts",
          objects: ["VegNonVeg", "Superkicks"],
          action: "WhatsApp notification",
          frequency: userMessage,
          threshold: "₹7,000"
        });
      } else if (messages.length === 5) {
        // Confirmation
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Perfect! Your agent is ready to go. I'll start monitoring right away. 🎉"
        }]);
        setIsComplete(true);
        toast.success("Agent created successfully!");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold">Agent Builder</span>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Column */}
          <div className="lg:col-span-2">
            <Card className="p-6 min-h-[600px] flex flex-col bg-card/50 backdrop-blur-sm border-border/50">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-12"
                          : "bg-muted text-foreground mr-12"
                      }`}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-4 rounded-2xl bg-muted">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              {!isComplete && (
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 bg-background/50"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className="bg-gradient-to-r from-primary to-primary-glow"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Agent Plan Column */}
          <div>
            <Card className="p-6 sticky top-24 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {isComplete ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    Agent Created
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-primary" />
                    Agent Plan
                  </>
                )}
              </h3>
              
              {agentPlan ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Goal</p>
                    <p className="text-foreground font-medium">{agentPlan.goal}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Monitoring</p>
                    <div className="flex flex-wrap gap-2">
                      {agentPlan.objects.map((obj, i) => (
                        <span key={i} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-sm">
                          {obj}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Action</p>
                    <p className="text-foreground font-medium">{agentPlan.action}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Frequency</p>
                    <p className="text-foreground font-medium">{agentPlan.frequency}</p>
                  </div>
                  {agentPlan.threshold && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Threshold</p>
                      <p className="text-foreground font-medium">{agentPlan.threshold}</p>
                    </div>
                  )}
                  
                  {!isComplete && (
                    <Button
                      onClick={() => {
                        setMessages(prev => [...prev, { role: "user", content: "Yes, looks perfect!" }]);
                        handleSend();
                      }}
                      className="w-full mt-4 bg-gradient-to-r from-primary to-primary-glow"
                    >
                      Confirm & Create
                    </Button>
                  )}
                  
                  {isComplete && (
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <p className="text-sm text-accent font-medium">✓ Agent is now active</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">
                    Start chatting to build<br />your agent plan
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
