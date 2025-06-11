
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Play, Square, Activity } from "lucide-react";
import AutonomousAIAgent from "@/services/aiAgentService";

const AIAgentDemo = () => {
  const [agent] = useState(() => new AutonomousAIAgent());
  const [status, setStatus] = useState(agent.getStatus());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(agent.getStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, [agent]);

  const handleStart = async () => {
    setIsRunning(true);
    agent.startAutonomousMode();
  };

  const handleStop = () => {
    setIsRunning(false);
    agent.stopAutonomousMode();
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mb-3">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-lg font-bold text-gray-900">Autonomous AI Agent</CardTitle>
        <p className="text-sm text-gray-600">Live demonstration of goal-driven AI decision making</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium">Status:</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              status.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {status.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Progress: {status.completedGoals}/{status.totalGoals}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-gray-500 uppercase tracking-wide">Current Goals</div>
          <div className="space-y-1">
            {status.goals.slice(0, 2).map((goal) => (
              <div key={goal.id} className="flex items-center justify-between text-xs">
                <span className="truncate">{goal.description}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  goal.status === 'completed' ? 'bg-green-100 text-green-600' :
                  goal.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                  goal.status === 'failed' ? 'bg-red-100 text-red-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {goal.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          {!isRunning ? (
            <Button 
              onClick={handleStart} 
              size="sm" 
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
            >
              <Play className="h-3 w-3 mr-2" />
              Start Agent
            </Button>
          ) : (
            <Button 
              onClick={handleStop} 
              size="sm" 
              variant="outline" 
              className="w-full"
            >
              <Square className="h-3 w-3 mr-2" />
              Stop Agent
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentDemo;
