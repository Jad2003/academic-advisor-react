import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Add types for backend selection
type AnalysisEngineType = "rule" | "ml";

const GradesAnalysis = () => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [engine, setEngine] = useState<AnalysisEngineType>("rule");
  const [isLoading, setIsLoading] = useState(false);

  const [mathGrade, setMathGrade] = useState("");
  const [scienceGrade, setScienceGrade] = useState("");
  const [englishGrade, setEnglishGrade] = useState("");
  const [historyGrade, setHistoryGrade] = useState("");
  const [artGrade, setArtGrade] = useState("");

  // Add a selector for backend engine
  const handleEngineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEngine(e.target.value as AnalysisEngineType);
  };

  // This function should POST to a backend endpoint (see README for details)
  const analyzeGrades = (gradesPayload: any) => {
    setIsLoading(true);
    fetch(`/api/grade-analysis?engine=${engine}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gradesPayload),
    })
    .then((res) => res.json())
    .then((data) => {
      setResults(data.recommendations ?? []);
      setShowResults(true);
      toast.success(`Analysis complete [${engine === "rule" ? "Rule-based" : "ML-based"} engine]!`);
    })
    .catch(() => toast.error("Analysis failed"))
    .finally(() => setIsLoading(false));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate grades (basic check for numbers between 0 and 100)
    const grades = {
      math: parseFloat(mathGrade),
      science: parseFloat(scienceGrade),
      english: parseFloat(englishGrade),
      history: parseFloat(historyGrade),
      art: parseFloat(artGrade),
    };

    for (const subject in grades) {
      if (isNaN(grades[subject]) || grades[subject] < 0 || grades[subject] > 100) {
        toast.error(`Please enter a valid grade (0-100) for ${subject}.`);
        return;
      }
    }

    analyzeGrades(grades);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Grade-Based Analysis</h1>
        </div>

        {/* New: Engine Selector */}
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label htmlFor="engine" className="font-semibold text-gray-800">
            Select Analysis Engine:
          </label>
          <select
            id="engine"
            value={engine}
            onChange={handleEngineChange}
            className="border border-gray-300 rounded py-1 px-3"
          >
            <option value="rule">Rule-based</option>
            <option value="ml">ML-based</option>
          </select>
        </div>

        {!showResults ? (
          <Card className="max-w-md mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Enter Your Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="math">Math Grade</Label>
                  <Input
                    type="number"
                    id="math"
                    placeholder="Enter grade (0-100)"
                    value={mathGrade}
                    onChange={(e) => setMathGrade(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="science">Science Grade</Label>
                  <Input
                    type="number"
                    id="science"
                    placeholder="Enter grade (0-100)"
                    value={scienceGrade}
                    onChange={(e) => setScienceGrade(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="english">English Grade</Label>
                  <Input
                    type="number"
                    id="english"
                    placeholder="Enter grade (0-100)"
                    value={englishGrade}
                    onChange={(e) => setEnglishGrade(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="history">History Grade</Label>
                  <Input
                    type="number"
                    id="history"
                    placeholder="Enter grade (0-100)"
                    value={historyGrade}
                    onChange={(e) => setHistoryGrade(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="art">Art Grade</Label>
                  <Input
                    type="number"
                    id="art"
                    placeholder="Enter grade (0-100)"
                    value={artGrade}
                    onChange={(e) => setArtGrade(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" disabled={isLoading}>
                  {isLoading ? "Analyzing..." : "Analyze Grades"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Recommended Majors</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <ul className="list-disc pl-5">
                  {results.map((major, index) => (
                    <li key={index} className="py-2">
                      {major}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recommendations found.</p>
              )}
              <Button onClick={() => setShowResults(false)} variant="outline" className="mt-4">
                Retake Analysis
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GradesAnalysis;
