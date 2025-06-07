
export interface JobOpportunity {
  title: string;
  averageSalary: number;
  salaryRange: {
    min: number;
    max: number;
  };
  demandLevel: 'High' | 'Medium' | 'Low';
  description: string;
  requiredSkills: string[];
}

export interface MajorJobData {
  major: string;
  jobOpportunities: JobOpportunity[];
  industryGrowth: string;
  totalJobs: number;
}

export class JobDataService {
  private static jobDatabase: { [key: string]: MajorJobData } = {
    "Engineering": {
      major: "Engineering",
      industryGrowth: "+8% (2023-2033)",
      totalJobs: 2800000,
      jobOpportunities: [
        {
          title: "Software Engineer",
          averageSalary: 95000,
          salaryRange: { min: 70000, max: 150000 },
          demandLevel: "High",
          description: "Design and develop software applications and systems",
          requiredSkills: ["Programming", "Problem-solving", "Mathematics", "Software Design"]
        },
        {
          title: "Mechanical Engineer",
          averageSalary: 88000,
          salaryRange: { min: 65000, max: 120000 },
          demandLevel: "Medium",
          description: "Design and develop mechanical systems and products",
          requiredSkills: ["CAD Software", "Physics", "Manufacturing", "Project Management"]
        },
        {
          title: "Data Engineer",
          averageSalary: 102000,
          salaryRange: { min: 80000, max: 140000 },
          demandLevel: "High",
          description: "Build and maintain data infrastructure and pipelines",
          requiredSkills: ["SQL", "Python", "Cloud Computing", "Data Architecture"]
        }
      ]
    },
    "Computer Science": {
      major: "Computer Science",
      industryGrowth: "+15% (2023-2033)",
      totalJobs: 1600000,
      jobOpportunities: [
        {
          title: "Software Developer",
          averageSalary: 93000,
          salaryRange: { min: 68000, max: 145000 },
          demandLevel: "High",
          description: "Create applications and software solutions",
          requiredSkills: ["Programming Languages", "Algorithms", "Software Development", "Testing"]
        },
        {
          title: "Cybersecurity Analyst",
          averageSalary: 85000,
          salaryRange: { min: 62000, max: 125000 },
          demandLevel: "High",
          description: "Protect systems from cyber threats and attacks",
          requiredSkills: ["Security Protocols", "Risk Assessment", "Network Security", "Incident Response"]
        },
        {
          title: "Machine Learning Engineer",
          averageSalary: 115000,
          salaryRange: { min: 90000, max: 165000 },
          demandLevel: "High",
          description: "Develop AI and machine learning models",
          requiredSkills: ["Python", "Machine Learning", "Statistics", "Deep Learning"]
        }
      ]
    },
    "Medicine/Pre-Med": {
      major: "Medicine/Pre-Med",
      industryGrowth: "+6% (2023-2033)",
      totalJobs: 9200000,
      jobOpportunities: [
        {
          title: "Physician",
          averageSalary: 220000,
          salaryRange: { min: 180000, max: 350000 },
          demandLevel: "High",
          description: "Diagnose and treat patients' medical conditions",
          requiredSkills: ["Medical Knowledge", "Patient Care", "Critical Thinking", "Communication"]
        },
        {
          title: "Medical Research Scientist",
          averageSalary: 95000,
          salaryRange: { min: 70000, max: 140000 },
          demandLevel: "Medium",
          description: "Conduct research to advance medical knowledge",
          requiredSkills: ["Research Methods", "Data Analysis", "Laboratory Skills", "Scientific Writing"]
        },
        {
          title: "Pharmacist",
          averageSalary: 125000,
          salaryRange: { min: 95000, max: 160000 },
          demandLevel: "Medium",
          description: "Dispense medications and provide pharmaceutical care",
          requiredSkills: ["Pharmacology", "Patient Counseling", "Drug Interactions", "Healthcare Systems"]
        }
      ]
    },
    "Business Administration": {
      major: "Business Administration",
      industryGrowth: "+5% (2023-2033)",
      totalJobs: 8100000,
      jobOpportunities: [
        {
          title: "Management Consultant",
          averageSalary: 87000,
          salaryRange: { min: 60000, max: 140000 },
          demandLevel: "Medium",
          description: "Advise organizations on business strategy and operations",
          requiredSkills: ["Strategic Thinking", "Data Analysis", "Communication", "Project Management"]
        },
        {
          title: "Marketing Manager",
          averageSalary: 82000,
          salaryRange: { min: 55000, max: 125000 },
          demandLevel: "Medium",
          description: "Develop and execute marketing strategies",
          requiredSkills: ["Marketing Strategy", "Digital Marketing", "Analytics", "Creative Thinking"]
        },
        {
          title: "Financial Analyst",
          averageSalary: 75000,
          salaryRange: { min: 55000, max: 105000 },
          demandLevel: "Medium",
          description: "Analyze financial data to guide business decisions",
          requiredSkills: ["Financial Modeling", "Excel", "Data Analysis", "Business Acumen"]
        }
      ]
    },
    "Psychology": {
      major: "Psychology",
      industryGrowth: "+6% (2023-2033)",
      totalJobs: 1800000,
      jobOpportunities: [
        {
          title: "Clinical Psychologist",
          averageSalary: 85000,
          salaryRange: { min: 60000, max: 120000 },
          demandLevel: "Medium",
          description: "Provide therapy and psychological treatment",
          requiredSkills: ["Counseling", "Assessment", "Empathy", "Research Methods"]
        },
        {
          title: "UX Researcher",
          averageSalary: 78000,
          salaryRange: { min: 58000, max: 110000 },
          demandLevel: "High",
          description: "Study user behavior to improve product design",
          requiredSkills: ["User Research", "Data Analysis", "Psychology", "Design Thinking"]
        },
        {
          title: "HR Specialist",
          averageSalary: 65000,
          salaryRange: { min: 45000, max: 90000 },
          demandLevel: "Medium",
          description: "Manage employee relations and organizational development",
          requiredSkills: ["Human Resources", "Communication", "Conflict Resolution", "Policy Development"]
        }
      ]
    },
    "Fine Arts": {
      major: "Fine Arts",
      industryGrowth: "+4% (2023-2033)",
      totalJobs: 650000,
      jobOpportunities: [
        {
          title: "Graphic Designer",
          averageSalary: 52000,
          salaryRange: { min: 35000, max: 75000 },
          demandLevel: "Medium",
          description: "Create visual content for digital and print media",
          requiredSkills: ["Design Software", "Creativity", "Typography", "Brand Development"]
        },
        {
          title: "Art Director",
          averageSalary: 72000,
          salaryRange: { min: 50000, max: 110000 },
          demandLevel: "Medium",
          description: "Lead creative teams and oversee visual projects",
          requiredSkills: ["Creative Leadership", "Project Management", "Visual Design", "Brand Strategy"]
        },
        {
          title: "UI/UX Designer",
          averageSalary: 68000,
          salaryRange: { min: 48000, max: 95000 },
          demandLevel: "High",
          description: "Design user interfaces and experiences for digital products",
          requiredSkills: ["Design Tools", "User Research", "Prototyping", "Visual Design"]
        }
      ]
    },
    "English Literature": {
      major: "English Literature",
      industryGrowth: "+3% (2023-2033)",
      totalJobs: 1200000,
      jobOpportunities: [
        {
          title: "Content Writer",
          averageSalary: 55000,
          salaryRange: { min: 38000, max: 78000 },
          demandLevel: "Medium",
          description: "Create written content for websites, blogs, and marketing",
          requiredSkills: ["Writing", "SEO", "Research", "Content Strategy"]
        },
        {
          title: "Editor",
          averageSalary: 62000,
          salaryRange: { min: 42000, max: 85000 },
          demandLevel: "Medium",
          description: "Review and improve written content for publications",
          requiredSkills: ["Editing", "Grammar", "Publishing", "Content Management"]
        },
        {
          title: "Technical Writer",
          averageSalary: 70000,
          salaryRange: { min: 50000, max: 95000 },
          demandLevel: "Medium",
          description: "Create technical documentation and manuals",
          requiredSkills: ["Technical Writing", "Documentation", "Research", "Software Knowledge"]
        }
      ]
    },
    "History": {
      major: "History",
      industryGrowth: "+2% (2023-2033)",
      totalJobs: 800000,
      jobOpportunities: [
        {
          title: "Museum Curator",
          averageSalary: 58000,
          salaryRange: { min: 40000, max: 80000 },
          demandLevel: "Low",
          description: "Manage museum collections and exhibitions",
          requiredSkills: ["Historical Knowledge", "Research", "Curation", "Public Speaking"]
        },
        {
          title: "Historian",
          averageSalary: 65000,
          salaryRange: { min: 45000, max: 90000 },
          demandLevel: "Low",
          description: "Research and analyze historical events and trends",
          requiredSkills: ["Research", "Analysis", "Writing", "Critical Thinking"]
        },
        {
          title: "Policy Analyst",
          averageSalary: 72000,
          salaryRange: { min: 52000, max: 100000 },
          demandLevel: "Medium",
          description: "Analyze policies and their impacts on society",
          requiredSkills: ["Policy Analysis", "Research", "Writing", "Government Knowledge"]
        }
      ]
    }
  };

  static getJobDataForMajor(majorName: string): MajorJobData | null {
    // Normalize the major name to match our database keys
    const normalizedMajor = Object.keys(this.jobDatabase).find(
      key => key.toLowerCase() === majorName.toLowerCase() ||
             majorName.toLowerCase().includes(key.toLowerCase()) ||
             key.toLowerCase().includes(majorName.toLowerCase())
    );

    if (normalizedMajor) {
      return this.jobDatabase[normalizedMajor];
    }

    // Return a default job data if no match found
    return {
      major: majorName,
      industryGrowth: "Data not available",
      totalJobs: 0,
      jobOpportunities: [
        {
          title: "General Professional",
          averageSalary: 60000,
          salaryRange: { min: 40000, max: 85000 },
          demandLevel: "Medium",
          description: "Various career opportunities available in this field",
          requiredSkills: ["Communication", "Problem-solving", "Teamwork", "Adaptability"]
        }
      ]
    };
  }

  static formatSalary(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
}
