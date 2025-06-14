
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Sparkles } from "lucide-react";
import { LLMService } from "@/services/llmService";

interface EnhancedRecommendationsProps {
  grades: any;
  ruleBasedRecommendations: any[];
}

const EnhancedRecommendations = ({ grades, ruleBasedRecommendations }: EnhancedRecommendationsProps) => {
  const [llmRecommendations, setLlmRecommendations] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);

  useEffect(() => {
    checkModelStatus();
  }, []);

  const checkModelStatus = () => {
    setIsModelReady(LLMService.isReady());
  };

  const generateEnhancedRecommendations = async () => {
    setIsLoading(true);
    setShowEnhanced(true);
    
    try {
      const enhanced = await LLMService.generateEnhancedRecommendations(grades, ruleBasedRecommendations);
      setLlmRecommendations(enhanced);
    } catch (error) {
      console.error('Failed to generate enhanced recommendations:', error);
      setLlmRecommendations("Failed to generate enhanced recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeModel = async () => {
    setIsLoading(true);
    try {
      await LLMService.initialize();
      setIsModelReady(true);
    } catch (error) {
      console.error('Failed to initialize model:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showEnhanced) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 backdrop-blur mt-6">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-900">
            <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
            AI-Enhanced Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span className="text-gray-600">Generating personalized insights...</span>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {llmRecommendations}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 backdrop-blur mt-6">
      <CardHeader>
        <CardTitle className="flex items-center text-purple-900">
          <Brain className="h-6 w-6 mr-2 text-purple-600" />
          Get AI-Enhanced Recommendations
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Get personalized insights and additional major suggestions powered by AI
        </p>
      </CardHeader>
      <CardContent>
        {!isModelReady ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Load the AI model to get enhanced, personalized recommendations based on your grades.
            </p>
            <Button 
              onClick={initializeModel}
              disabled={isLoading || LLMService.isInitializing()}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              {isLoading || LLMService.isInitializing() ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading AI Model (~3GB)...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Load AI Assistant
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500">
              The AI model runs locally in your browser for complete privacy
            </p>
          </div>
        ) : (
          <Button 
            onClick={generateEnhancedRecommendations}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Get AI Insights
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedRecommendations;
