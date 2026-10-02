export interface ArticleSection {
  heading: string;
  body?: string;
  codeSnippet?: {
    language: string;
    code: string;
    explanation?: string;
  };
  tips?: string;
  bulletPoints?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  meetingNumber: number;
  category: 'Dasar Web' | 'CSS & UI' | 'JavaScript' | 'Modern JS & React' | 'Deploy & Git';
  readingTime: string;
  publishedDate: string;
  author: string;
  excerpt: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  exercisePrompt?: string;
  exerciseInitialCode?: {
    html: string;
    css: string;
    js: string;
  };
}

export interface SyllabusItem {
  meeting: number;
  title: string;
  category: string;
  cpmk: string; // Capaian Pembelajaran Mata Kuliah
  description: string;
  materials: string[];
  practicalTask?: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dateSchedule: string;
}

export interface Assignment {
  id: string;
  title: string;
  meetingRelated: number;
  deadline: string;
  status: 'open' | 'submitted' | 'graded';
  description: string;
  requirements: string[];
  rubric: { criteria: string; weight: number }[];
  templateRepo?: string;
}

export interface StudentSubmission {
  assignmentId: string;
  studentName: string;
  studentNim: string;
  classGroup: string;
  githubUrl: string;
  cloudflareUrl: string;
  notes?: string;
  submittedAt: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
