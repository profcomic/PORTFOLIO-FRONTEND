// Django API Integration Utilities
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `HTTP error! status: ${response.status}`,
      response.status,
      response
    );
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  throw new ApiError('Invalid response format', response.status, response);
};

export const api = {
  // GET requests
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  },

  // POST requests
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },

  // PUT requests
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      console.error(`PUT ${endpoint} failed:`, error);
      throw error;
    }
  },

  // DELETE requests
  delete: async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'include',
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error);
      throw error;
    }
  },
};

// CSRF Token handling for Django
const getCSRFToken = (): string => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return decodeURIComponent(value);
    }
  }
  return '';
};

// Specific API endpoints
export const portfolioApi = {
  // Contact form submission
  submitContact: (data: ContactData) => 
    api.post<ContactData>('/contact/', data),
  
  // Get projects
  getProjects: () => 
    api.get<ProjectData[]>('/projects/'),
  
  // Get single project
  getProject: (id: number) => 
    api.get<ProjectData>(`/projects/${id}/`),
  
  // Get skills/experience data
  getAboutData: () => 
    api.get<any>('/about/'),
};
