import { Dayjs } from 'dayjs';

export interface IPage {
  name?: string;
  uuid?: string;
  type?: PageStatus;
  createdAt?: Dayjs;
  createdName?: string;
  deletedAt?: Dayjs;
  lastUpdatedAt?: Dayjs;
  updatedName?: string;
  content?: string;
  orderNumber: number;

  surveyList?: ISurvey[];
}

export interface ISurvey {
  createdAt?: Dayjs;
  createdName?: string;
  deletedAt?: Dayjs;
  description?: string;
  lastUpdatedAt?: Dayjs;
  orderNumber?: number;
  rowSize?: number;
  type?: 'BASIC' | 'ADVANCE' | 'TABLE';
  updatedName?: string;
  uuid?: string;
}
type PageStatus = 'SURVEY' | 'CONTENT';
