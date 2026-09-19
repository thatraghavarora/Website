export interface DeepStudyNote {
  heading: string;
  subheading?: string;
  points: string[];
  callout?: string;
  diagramOrCode?: string;
}

export interface RoadmapLesson {
  id: string;
  lessonNumber: string;
  title: string;
  duration: string;
  badge?: string;
  summary: string;
  studyNotes?: DeepStudyNote[];
  keyTopics: string[];
  terminalCommands?: string[];
  proTips?: string[];
}

export interface RoadmapChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description: string;
  iconName: string;
  lessons: RoadmapLesson[];
  handsOnLab: {
    title: string;
    target: string;
    goal: string;
    steps: string[];
    verification: string;
  };
  checklist: { id: string; label: string }[];
}
