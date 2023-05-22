export interface Question {
  required?: boolean;
  title?: string;
  type?: 'TEXT' | 'NUMBER' | 'SELECT_ONE' | 'MULTI_SELECT';
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
  description: string;
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
