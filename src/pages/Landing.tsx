import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, MessageSquare, Zap, Bot } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-lg text-foreground">Genie-us</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Button>
            </Link>
            <Link to="/builder">
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity">
                Start Building
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_hsl(250_80%_65%_/_0.12),_transparent_50%)]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary-glow/8 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(240_8%_18%_/_0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(240_8%_18%_/_0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass animate-fade-in">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI Agent Builder</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Turn plain English into{" "}
            <span className="gradient-text">working AI agents.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            No code. Just intent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/builder">
              <Button size="lg" className="group h-14 px-8 text-lg bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-all glow-primary">
                Start Building
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {/* Example prompts */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: "🔔", text: "Alert me when sneakers drop below ₹7,000" },
              { icon: "📧", text: "Email me a daily sales summary at 9 AM" },
              { icon: "📱", text: "Notify me when my favorite YouTuber posts" }
            ].map((example, i) => (
              <div 
                key={i}
                className="group p-4 rounded-xl glass hover:border-primary/30 transition-all cursor-pointer"
              >
                <span className="text-2xl mb-2 block">{example.icon}</span>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{example.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to automation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                step: "01",
                title: "Describe your goal",
                description: "Just tell the AI what you want in plain English. No technical jargon needed."
              },
              {
                icon: Sparkles,
                step: "02",
                title: "Refine with AI",
                description: "The assistant asks smart follow-ups to understand exactly what you need."
              },
              {
                icon: Zap,
                step: "03",
                title: "Create & run",
                description: "Your agent is ready instantly. It runs automatically on your schedule."
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={i}
                  className="relative p-8 rounded-2xl glass hover:border-primary/30 transition-all group"
                >
                  <span className="absolute top-6 right-6 text-5xl font-heading font-bold text-muted/30 group-hover:text-primary/20 transition-colors">
                    {feature.step}
                  </span>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl glass-strong relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5" />
            <div className="relative">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Ready to build your first agent?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                No credit card. No setup. Just start chatting.
              </p>
              <Link to="/builder">
                <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-all glow-primary">
                  Create Your First Agent
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-heading font-medium text-sm text-muted-foreground">Genie-us</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Genie-us. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;