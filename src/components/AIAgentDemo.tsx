
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { aiAgent, AgentDecision, StudentProfile } from "@/services/aiAgentService";
import { toast } from "sonner";

const AIAgentDemo = () => {
  const [currentDecision, setCurrentDecision] = useState<AgentDecision | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [agentStatus, setAgentStatus] = useState<'idle' | 'analyzing' | 'deciding' | 'acting'>('idle');

  const studentId = "demo-student-001";

  useEffect(() => {
    // Initialize demo student profile
    const demoProfile: StudentProfile = {
      id: studentId,
      grades: {
        mathematics: 16,
        physics: 15,
        chemistry: 14,
        biology: 13,
        english: 17,
        arabic: 16
      },
      personalityTraits: ['analytical', 'creative', 'logical'],
      goals: ['Find suitable major', 'Improve weak subjects', 'Plan career path'],
      careerInterests: ['Technology', 'Healthcare'],
      learningStyle: 'visual',
      academicLevel: 'high_school'
    };

    aiAgent.updateStudentProfile(studentId, demoProfile);
    setStudentProfile(demoProfile);
  }, []);

  const triggerAutonomousDecision = async () => {
    setIsProcessing(true);
    setAgentStatus('analyzing');
    
    try {
      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAgentStatus('deciding');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAgentStatus('acting');
      
      // Get AI agent decision
      const decision = await aiAgent.makeAutonomousDecision(studentId);
      setCurrentDecision(decision);
      
      toast.success("AI Agent has made an autonomous decision!");
      console.log("AI Agent Decision:", decision);
      
    } catch (error) {
      toast.error("AI Agent encountered an error");
      console.error("AI Agent Error:", error);
    } finally {
      setIsProcessing(false);
      setAgentStatus('idle');
    }
  };

  const executeDecision = async () => {
    if (!currentDecision) return;
    
    toast.success(`Executing: ${currentDecision.action}`);
    
    // Simulate decision execution
    console.log("Executing AI decision:", currentDecision);
    
    // Update student profile based on decision
    if (currentDecision.action === 'recommend_major' && currentDecision.data.recommendedMajors) {
      const topMajor = currentDecision.data.recommendedMajors[0];
      aiAgent.updateStudentProfile(studentId, { 
        currentMajor: topMajor.major 
      });
      setStudentProfile(aiAgent.getStudentProfile(studentId) || null);
    }
  };

  const getStatusIcon = () => {
    switch (agentStatus) {
      case 'analyzing': return <Brain className="h-4 w-4 animate-pulse text-blue-600" />;
      case 'deciding': return <Target className="h-4 w-4 animate-pulse text-purple-600" />;
      case 'acting': return <TrendingUp className="h-4 w-4 animate-pulse text-green-600" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = () => {
    switch (agentStatus) {
      case 'analyzing': return 'Analyzing student data...';
      case 'deciding': return 'Making autonomous decision...';
      case 'acting': return 'Implementing solution...';
      default: return 'Ready for next interaction';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-6 w-6 mr-2 text-blue-600" />
            Autonomous AI Agent - Live Demo
          </CardTitle>
          <p className="text-gray-600">
            Watch our goal-driven AI agent analyze student data and make autonomous decisions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className="font-medium">{getStatusText()}</span>
            </div>
            <Badge variant={agentStatus === 'idle' ? 'secondary' : 'default'}>
              {agentStatus.toUpperCase()}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              onClick={triggerAutonomousDecision}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isProcessing ? 'AI Agent Processing...' : 'Trigger Autonomous Decision'}
            </Button>
            
            {currentDecision && (
              <Button 
                onClick={executeDecision}
                variant="outline"
                className="w-full"
              >
                Execute Decision
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Student Profile Display */}
      {studentProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Current Student Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Academic Performance</h4>
                <div className="space-y-1 text-sm">
                  {Object.entries(studentProfile.grades || {}).map(([subject, grade]) => (
                    <div key={subject} className="flex justify-between">
                      <span className="capitalize">{subject}:</span>
                      <span className="font-medium">{grade}/20</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Goals & Interests</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Goals:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {studentProfile.goals.map((goal, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Career Interests:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {studentProfile.careerInterests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">AI Insights</h4>
                <div className="space-y-2 text-sm">
                  <div>Current Major: {studentProfile.currentMajor || 'Not set'}</div>
                  <div>Learning Style: {studentProfile.learningStyle}</div>
                  <div>Level: {studentProfile.academicLevel}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Decision Display */}
      {currentDecision && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <AlertCircle className="h-5 w-5 mr-2" />
              Autonomous AI Decision
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Decision Details</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Action:</strong> {currentDecision.action}</div>
                  <div><strong>Confidence:</strong> {Math.round(currentDecision.confidence * 100)}%</div>
                  <div>
                    <strong>Reasoning:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-700">
                      {currentDecision.reasoning.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Recommended Actions</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {currentDecision.nextSteps.map((step, index) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ul>
              </div>
            </div>

            {currentDecision.data && (
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <h4 className="font-semibold mb-2">AI Decision Data</h4>
                <pre className="text-xs text-gray-600 overflow-auto">
                  {JSON.stringify(currentDecision.data, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAgentDemo;
