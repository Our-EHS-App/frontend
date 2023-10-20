import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { ReactNode } from 'react';

interface PageConfig {
  size: number;
  totalElements: number | null;
  totalPages: number | null;
  page: number;
  sort?: string | null;
  name?: string | null;
}

interface Page<DATA_TYPE> extends PageConfig {
  content: DATA_TYPE[];
}

type HandleChangeArgs<RecordType> = (
  pagination: TablePaginationConfig,
  filters?: Record<string, FilterValue | null>,
  sorter?: SorterResult<RecordType> | SorterResult<RecordType>[]
) => void;
type FCProps = {
  children?: ReactNode;
};
export type { Page, PageConfig, HandleChangeArgs, FCProps };
