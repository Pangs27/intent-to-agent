import { Button } from "@/components/ui/button";
import { Sparkles, Plus, Play, Pause, Clock, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

interface Agent {
  id: string;
  name: string;
  status: "active" | "paused";
  lastRun: string;
  description: string;
}

const Dashboard = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Sneaker Price Watcher",
      status: "active",
      lastRun: "2 hours ago",
      description: "Monitors VegNonVeg for Nike sneakers under ₹7,000"
    },
    {
      id: "2",
      name: "Daily Sales Summary",
      status: "active",
      lastRun: "Today at 9:00 AM",
      description: "Sends daily email summary of sales data"
    },
    {
      id: "3",
      name: "YouTube Notifier",
      status: "paused",
      lastRun: "3 days ago",
      description: "Alerts when favorite channels post new videos"
    }
  ]);

  const toggleStatus = (id: string) => {
    setAgents(prev => prev.map(agent => {
      if (agent.id === id) {
        const newStatus = agent.status === "active" ? "paused" : "active";
        toast.success(`Agent ${newStatus === "active" ? "activated" : "paused"}`);
        return { ...agent, status: newStatus };
      }
      return agent;
    }));
  };

  const deleteAgent = (id: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
    toast.success("Agent deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-lg text-foreground">Genie-us</span>
          </Link>
          <Link to="/builder">
            <Button className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4 mr-2" />
              New Agent
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Your Agents</h1>
          <p className="text-muted-foreground">Manage and monitor your AI agents</p>
        </div>

        {agents.length > 0 ? (
          <div className="grid gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="p-6 rounded-xl glass hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {agent.name}
                      </h3>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        agent.status === "active" 
                          ? "bg-success/10 text-success" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          agent.status === "active" ? "bg-success" : "bg-muted-foreground"
                        }`} />
                        {agent.status === "active" ? "Active" : "Paused"}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">{agent.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Last run: {agent.lastRun}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleStatus(agent.id)}
                      className="h-9 w-9"
                    >
                      {agent.status === "active" ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleStatus(agent.id)}>
                          {agent.status === "active" ? "Pause Agent" : "Resume Agent"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Agent</DropdownMenuItem>
                        <DropdownMenuItem>View Logs</DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => deleteAgent(agent.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          Delete Agent
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">No agents yet</h3>
            <p className="text-muted-foreground mb-6">Create your first AI agent to get started</p>
            <Link to="/builder">
              <Button className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Agent
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;