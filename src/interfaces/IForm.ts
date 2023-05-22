import { Dayjs } from 'dayjs';

export interface IForm {
  name: string;

  description?: string;
  active?: boolean;
  createdAt?: Dayjs;
  deletedAt?: Dayjs;
  dueDate?: Dayjs;
  endDate?: Dayjs;
  formNumber?: number;
  formOrder?: number;
  lastUpdatedAt?: Dayjs;
  startDate?: Dayjs;
  status?: FormStatus;
  uuid?: string;
  createdName?: string;
  updatedName?: string;
  completed?: boolean;
  assigned?: boolean;
  numberOfPartners?: number;
  assignedAt?: Dayjs;
  assignedBy?: string;
}

type FormStatus = 'DRAFT' | 'COMPLETED' | 'ASSIGNED';
