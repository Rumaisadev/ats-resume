export interface Flag {
  id: string;
  type: "weak_verb" | "unquantified" | "passive_voice" | "unclear";
  line: string;
  suggestion: string;
}

export interface AnalysisResult {
  filename: string;
  word_count: number;
  preview: string;
  job_description_length: number;
  checks: {
    contact: { has_email: boolean; has_phone: boolean; passed: boolean };
    length: { word_count: number; status: string; score: number };
    sections: {
      sections_found: string[];
      has_experience: boolean;
      has_education: boolean;
      has_skills: boolean;
      score: number;
    };
    layout: { issues: string[]; score: number };
    ats_score: number;
    structure_score: number;
  };
  keywords: {
    required_skills: string[];
    matched_skills: string[];
    missing_skills: string[];
    score: number;
  };
  flags: Flag[];
  summary: string;
  reviewed: boolean;
}

export interface BulletState {
  accepted: boolean;
  currentText: string;
  manuallyEdited: boolean;
}
