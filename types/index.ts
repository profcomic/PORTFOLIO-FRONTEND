export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[]; // This matches the JSONField in Django
  github_url: string;
  live_demo: string;
  image: string;
  project_date: string; // Date when project was completed
  created_at: string;
  updated_at: string;
}