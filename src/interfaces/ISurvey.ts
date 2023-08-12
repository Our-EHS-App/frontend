export interface Question {
  required?: boolean;
  title?: string;
  nameAr?: string;
  fieldType?: '1' | '2' | '3' | '4';
  values?: string[];
  orderNumber?: number;
  hasOthers?: boolean;
}

export interface Level {
  title?: string;
  orderNumber?: number;
}

export interface QuestionWithSub extends Question {
  questionList?: Question[];
}

export interface thirdLevel extends Level {
  levelList?: Level[];
}

export interface secondLevel extends Level {
  levelList?: thirdLevel[];
}

export type AdvancedQuestionList = {
  rowSize?: number;
  description: string;
  titleEn?: string;
  titleAr?: string;
  questionList: QuestionWithSub[];
  levelList: secondLevel[];
};

export type AdvancedSurveyI = {
  type: 'ADVANCE';
  pageUuid: string;
  uuid?: string;
  pageName?: string;
  completed?: boolean;
  assigned?: boolean;
} & AdvancedQuestionList;

export type QuestionList = {
  rowSize?: number;
  titleAr: string;
  titleEn: string;
  questionList: Question[];
};

export type SurveyI = {
  type?: 'BASIC' | 'TABLE';
  pageUuid?: string;
  uuid?: string;
  pageName?: string;
  completed?: boolean;
  assigned?: boolean;
} & QuestionList;
