
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MajorRecommendation {
  major: string;
  match: number;
  description: string;
  reasons: string[];
}

interface RecommendationCardProps {
  recommendation: MajorRecommendation;
  index: number;
}

const RecommendationCard = ({ recommendation, index }: RecommendationCardProps) => {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-3">
              #{index + 1}
            </span>
            <CardTitle className="text-xl text-gray-900">{recommendation.major}</CardTitle>
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600 mr-2">{Math.round(recommendation.match)}%</div>
            <div className="text-sm text-gray-500">Match</div>
          </div>
        </div>
        <p className="text-gray-600">{recommendation.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">Why this major fits you:</h4>
          <ul className="space-y-1">
            {recommendation.reasons.map((reason, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 bg-blue-50 rounded-lg p-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${recommendation.match}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
