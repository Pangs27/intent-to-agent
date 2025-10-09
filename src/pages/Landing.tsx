import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 lg:py-32">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Text to Agent. No code. No setup.</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Create AI Agents<br />Just By Chatting
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Turn plain English into working automations in under 3 minutes. 
            No technical skills needed. Just describe what you want, and watch it happen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/builder">
              <Button size="lg" className="group bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all">
                Start Building
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
          
          {/* Example queries */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              "Alert me when sneakers drop below ₹7,000",
              "Email me daily sales summary",
              "Notify when new posts appear"
            ].map((example, i) => (
              <div 
                key={i}
                className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <p className="text-sm text-muted-foreground">{example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The Gamma Moment for Automation
            </h2>
            <p className="text-xl text-muted-foreground">
              From no-code → no-think
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Natural Conversation",
                description: "Just describe what you want in plain English. Our AI understands intent and asks smart follow-up questions."
              },
              {
                icon: Zap,
                title: "Instant Execution",
                description: "From idea to working agent in under 3 minutes. No configuration, no API keys, no technical setup."
              },
              {
                icon: Shield,
                title: "Reliable & Smart",
                description: "Agents run automatically on schedule. Get notified via WhatsApp, email, or your preferred channel."
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={i}
                  className="p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:shadow-card"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for Real People
            </h2>
            <p className="text-xl text-muted-foreground">
              No developers required
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Retail Watcher",
                input: "Tell me when Nike sneakers go below ₹7,000 on VegNonVeg",
                output: "Daily price checks + WhatsApp alerts"
              },
              {
                title: "Social Media Summary",
                input: "Every morning, email me top 3 posts from my LinkedIn feed",
                output: "Daily digest + personalized summary"
              },
              {
                title: "Startup Ops",
                input: "Every Friday, WhatsApp me new investor signups from FoundrFuse",
                output: "Weekly reports + automated tracking"
              },
              {
                title: "Personal Assistant",
                input: "Remind me when my favorite YouTubers post new videos",
                output: "Real-time notifications + smart filtering"
              }
            ].map((useCase, i) => (
              <div 
                key={i}
                className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
              >
                <h3 className="text-lg font-semibold mb-3 text-primary">{useCase.title}</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">You say:</p>
                    <p className="text-foreground">"{useCase.input}"</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-primary mb-1">You get:</p>
                    <p className="text-foreground">{useCase.output}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your First Agent?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            No credit card. No setup. Just start chatting.
          </p>
          <Link to="/builder">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all">
              Create Your First Agent
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
