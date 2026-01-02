import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Sparkles, CheckCircle2, Menu, Plus, Bot, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AgentPlan {
  goal: string;
  inputs: string[];
  actions: string[];
  tools: string[];
  output: string;
}

const Builder = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm here to help you create an AI agent. Just describe what you want to automate in plain English.\n\nFor example:\n• \"Alert me when sneakers drop below ₹7,000\"\n• \"Email me a daily summary of my sales\"\n• \"Notify me when my favorite YouTuber posts\""
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentPlan, setAgentPlan] = useState<AgentPlan | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase();
      
      if (messages.length === 1) {
        // First user message - parse intent
        if (lowerInput.includes("alert") || lowerInput.includes("notify") || lowerInput.includes("tell me when")) {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "I understand you want to receive alerts. Let me ask a few questions:\n\nHow often should I check for updates?\n• Every hour\n• Daily\n• Every 6 hours"
          }]);
          setAgentPlan({
            goal: "Monitor and alert",
            inputs: ["Price threshold", "Target websites"],
            actions: ["Check prices", "Compare values"],
            tools: ["Web scraper", "Notifier"],
            output: "Alert notification"
          });
          setShowPanel(true);
        } else if (lowerInput.includes("email") || lowerInput.includes("summary") || lowerInput.includes("report")) {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Perfect! I'll help you set up an automated summary.\n\nWhat time would you like to receive it?\n• Morning (9 AM)\n• Evening (6 PM)\n• Custom time"
          }]);
          setAgentPlan({
            goal: "Generate and send summary",
            inputs: ["Data source", "Time preference"],
            actions: ["Gather data", "Summarize", "Send email"],
            tools: ["Data fetcher", "AI summarizer", "Email sender"],
            output: "Daily email summary"
          });
          setShowPanel(true);
        } else {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "I'd love to help! Could you tell me a bit more?\n\nWhat would you like the agent to do:\n• Monitor something and alert you\n• Create summaries or reports\n• Automate a repetitive task"
          }]);
        }
      } else if (messages.length === 3) {
        // Second response - frequency/time
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Great choice! One more thing:\n\nHow would you like to be notified?\n• WhatsApp message\n• Email\n• Both"
        }]);
        
        if (agentPlan) {
          setAgentPlan({
            ...agentPlan,
            tools: [...agentPlan.tools, "Scheduler"]
          });
        }
      } else if (messages.length === 5) {
        // Third response - notification method
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Perfect! I've configured everything. Your agent plan is ready.\n\nTake a look at the summary on the right and click \"Create Agent\" when you're happy with it."
        }]);
        
        if (agentPlan) {
          setAgentPlan({
            ...agentPlan,
            output: lowerInput.includes("both") ? "WhatsApp + Email" : 
                    lowerInput.includes("whatsapp") ? "WhatsApp notification" : "Email notification"
          });
        }
        setIsReady(true);
      }
      
      setIsLoading(false);
    }, 1200);
  };

  const handleCreateAgent = () => {
    toast.success("Agent created successfully!", {
      description: "Your agent is now active and running."
    });
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border/50 bg-card/30">
        <div className="p-4 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-foreground">Genie-us</span>
          </Link>
        </div>
        
        <div className="p-3">
          <Button variant="outline" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground" onClick={() => window.location.reload()}>
            <Plus className="w-4 h-4" />
            New Agent
          </Button>
        </div>
        
        <div className="flex-1 p-3">
          <p className="text-xs text-muted-foreground px-2 mb-2">Recent</p>
          <div className="space-y-1">
            <div className="p-2 rounded-lg bg-muted/50 text-sm text-muted-foreground">
              Current conversation
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-border/50">
          <Link to="/dashboard">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              View Dashboard
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-border/50">
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-foreground">Genie-us</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setShowPanel(!showPanel)}>
            <Sparkles className="w-5 h-5" />
          </Button>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
            {messages.map((message, i) => (
              <div
                key={i}
                className="flex gap-4 animate-fade-in"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === "assistant" 
                    ? "bg-gradient-to-br from-primary to-primary-glow" 
                    : "bg-muted"
                }`}>
                  {message.role === "assistant" ? (
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <User className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4 animate-fade-in">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex items-center gap-1 pt-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border/50">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Describe what you want your agent to do..."
                disabled={isLoading}
                className="pr-12 h-14 rounded-xl bg-muted/50 border-border/50 focus-visible:ring-primary/50 text-base"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-30"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Press Enter to send your message
            </p>
          </div>
        </div>
      </main>

      {/* Right Panel - Agent Plan */}
      <aside className={`${showPanel ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} fixed lg:relative right-0 top-0 h-full w-80 border-l border-border/50 bg-card/30 backdrop-blur-xl transition-transform z-50 lg:z-0`}>
        <div className="p-6 border-b border-border/50">
          <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
            {isReady ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-success" />
                Your agent is ready
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-primary" />
                Your Agent Plan
              </>
            )}
          </h3>
        </div>
        
        <div className="p-6">
          {agentPlan ? (
            <div className="space-y-6">
              <div className="animate-slide-in">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Goal</p>
                <p className="text-foreground font-medium">{agentPlan.goal}</p>
              </div>
              
              <div className="animate-slide-in" style={{ animationDelay: '0.05s' }}>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Inputs</p>
                <div className="flex flex-wrap gap-2">
                  {agentPlan.inputs.map((input, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-muted text-sm text-foreground">
                      {input}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Actions</p>
                <div className="space-y-2">
                  {agentPlan.actions.map((action, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {action}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="animate-slide-in" style={{ animationDelay: '0.15s' }}>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {agentPlan.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Output</p>
                <p className="text-foreground font-medium">{agentPlan.output}</p>
              </div>
              
              {isReady && (
                <div className="pt-4 space-y-3 animate-fade-in">
                  <Button
                    onClick={handleCreateAgent}
                    className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity font-medium"
                  >
                    Create Agent
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsReady(false);
                      setMessages(prev => [...prev, { role: "user", content: "I'd like to make some changes." }]);
                    }}
                  >
                    Refine
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground">
                Start chatting to build<br />your agent plan
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Builder;