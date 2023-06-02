import { Dayjs } from 'dayjs';

export interface IForm {
  titleAr?: string;
  titleEn?: string;
  frequency?: string;
  templateType?: string;
}

type FormStatus = 'DRAFT' | 'COMPLETED' | 'ASSIGNED';
