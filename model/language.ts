export interface Languages {
  id: number;
  code: string;
  name: string;
}


export interface SelectedLanguage {
  id: string; // This is the language ID that backend expects
  code: string; // Language code for display
  name: string;
  fullName: string;
  specialization: string;
}

export interface SelectedLanguageDoctor {
  id: string; // Language ID as string
  code: string;
  name: string;
  fullName: string; // Doctor's name in this language
  specialization?: string; // For Nanny compatibility
  bio?: string; // Doctor's bio in this language
  education?: string; // Doctor's education in this language
  address?: string; // Doctor's address in this language
}