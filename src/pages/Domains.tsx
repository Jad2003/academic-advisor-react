
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Briefcase, Star, Clock } from "lucide-react";
import Header from "@/components/Header";

const Domains = () => {
  const inDemandJobs = [
    {
      title: "AI/ML Engineer",
      demand: "Very High",
      growth: "+32%",
      avgSalary: 130000,
      requirements: ["Python", "TensorFlow", "Machine Learning", "Statistics"],
      description: "Develop artificial intelligence and machine learning systems"
    },
    {
      title: "Cybersecurity Specialist",
      demand: "High",
      growth: "+28%",
      avgSalary: 95000,
      requirements: ["Network Security", "Risk Assessment", "Incident Response", "Security Protocols"],
      description: "Protect organizations from cyber threats and security breaches"
    },
    {
      title: "Data Scientist",
      demand: "High",
      growth: "+25%",
      avgSalary: 110000,
      requirements: ["Python/R", "Statistics", "Data Mining", "SQL"],
      description: "Analyze complex data to extract insights and drive business decisions"
    },
    {
      title: "Cloud Architect",
      demand: "High",
      growth: "+22%",
      avgSalary: 125000,
      requirements: ["AWS/Azure", "Cloud Computing", "Architecture Design", "DevOps"],
      description: "Design and implement cloud infrastructure solutions"
    },
    {
      title: "UX/UI Designer",
      demand: "High",
      growth: "+13%",
      avgSalary: 75000,
      requirements: ["Design Tools", "User Research", "Prototyping", "Visual Design"],
      description: "Create user-friendly interfaces and experiences for digital products"
    }
  ];

  const highestPayingJobs = [
    {
      title: "Surgeon",
      avgSalary: 350000,
      range: { min: 250000, max: 500000 },
      requirements: ["Medical Degree", "Residency", "Board Certification", "Manual Dexterity"],
      description: "Perform surgical procedures to treat diseases and injuries"
    },
    {
      title: "Investment Banking Director",
      avgSalary: 300000,
      range: { min: 200000, max: 450000 },
      requirements: ["Finance Degree", "CFA", "Financial Modeling", "Client Relations"],
      description: "Lead investment banking operations and client relationships"
    },
    {
      title: "Software Engineering Manager",
      avgSalary: 180000,
      range: { min: 140000, max: 250000 },
      requirements: ["Software Development", "Leadership", "Project Management", "Team Building"],
      description: "Lead software development teams and technical strategy"
    },
    {
      title: "Petroleum Engineer",
      avgSalary: 160000,
      range: { min: 120000, max: 220000 },
      requirements: ["Engineering Degree", "Reservoir Analysis", "Drilling Technology", "Project Management"],
      description: "Design and develop methods for extracting oil and gas"
    },
    {
      title: "Data Science Manager",
      avgSalary: 155000,
      range: { min: 120000, max: 200000 },
      requirements: ["Data Science", "Machine Learning", "Leadership", "Business Strategy"],
      description: "Lead data science teams and drive data-driven decision making"
    }
  ];

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Market Domains</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the most in-demand careers and highest-paying opportunities in today's job market
          </p>
        </div>

        {/* In-Demand Jobs Section */}
        <div className="mb-12">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <TrendingUp className="h-7 w-7 mr-3 text-green-600" />
                Most In-Demand Jobs
              </CardTitle>
              <p className="text-gray-600">Careers with the highest demand and growth potential</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {inDemandJobs.map((job, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                          <p className="text-gray-600 mb-3">{job.description}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getDemandColor(job.demand)}>
                            {job.demand} Demand
                          </Badge>
                          <div className="flex items-center text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span className="font-semibold">{job.growth}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Average Salary</div>
                          <div className="text-2xl font-bold text-green-600">
                            {formatSalary(job.avgSalary)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Key Requirements</div>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, reqIndex) => (
                              <Badge key={reqIndex} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Highest Paying Jobs Section */}
        <div>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <DollarSign className="h-7 w-7 mr-3 text-purple-600" />
                Highest Paying Jobs
              </CardTitle>
              <p className="text-gray-600">Careers with the highest earning potential</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {highestPayingJobs.map((job, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 mr-3">{job.title}</h3>
                            {index < 3 && <Star className="h-5 w-5 text-yellow-500" />}
                          </div>
                          <p className="text-gray-600 mb-3">{job.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Average Salary</div>
                          <div className="text-3xl font-bold text-purple-600">
                            {formatSalary(job.avgSalary)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Salary Range</div>
                          <div className="text-lg text-gray-700">
                            {formatSalary(job.range.min)} - {formatSalary(job.range.max)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Key Requirements</div>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, reqIndex) => (
                              <Badge key={reqIndex} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Domains;
