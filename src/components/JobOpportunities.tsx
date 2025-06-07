
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobDataService, MajorJobData } from "@/services/jobDataService";
import { TrendingUp, Users, DollarSign, Briefcase } from "lucide-react";

interface JobOpportunitiesProps {
  majorName: string;
}

const JobOpportunities = ({ majorName }: JobOpportunitiesProps) => {
  const jobData = JobDataService.getJobDataForMajor(majorName);

  if (!jobData) {
    return null;
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-gray-900">
            <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
            Career Opportunities in {jobData.major}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-600">{jobData.industryGrowth}</div>
              <div className="text-sm text-gray-600">Industry Growth</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-600">
                {jobData.totalJobs > 0 ? `${(jobData.totalJobs / 1000000).toFixed(1)}M+` : 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Total Jobs Available</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-600">
                {JobDataService.formatSalary(
                  jobData.jobOpportunities.reduce((avg, job) => avg + job.averageSalary, 0) / 
                  jobData.jobOpportunities.length
                )}
              </div>
              <div className="text-sm text-gray-600">Average Salary</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 text-lg mb-4">Top Career Paths</h4>
            {jobData.jobOpportunities.map((job, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-900 text-lg">{job.title}</h5>
                      <p className="text-gray-600 text-sm mt-1">{job.description}</p>
                    </div>
                    <Badge className={getDemandColor(job.demandLevel)}>
                      {job.demandLevel} Demand
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-600">Average Salary</div>
                      <div className="text-xl font-bold text-green-600">
                        {JobDataService.formatSalary(job.averageSalary)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Salary Range</div>
                      <div className="text-lg text-gray-700">
                        {JobDataService.formatSalary(job.salaryRange.min)} - {JobDataService.formatSalary(job.salaryRange.max)}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Required Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobOpportunities;
