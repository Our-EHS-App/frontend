import { FC } from 'react';
import { Table, TableProps } from 'antd';
import classNames from 'classnames';

import { WhiteContainer } from '../WhiteContainer';

import classes from './HaseenTable.module.scss';

export const HaseenTable: FC<TableProps<any>> = (props) => {
  return (
    <WhiteContainer>
      <Table
        showSorterTooltip={false}
        scroll={{ x: 1300 }}
        {...props}
        className={classNames(props.className, classes.tableDesign)}
        rowKey={props.rowKey ?? 'uuid'}
        pagination={{
          showSizeChanger: false,
          hideOnSinglePage: true,
          ...props.pagination,
        }}
      />
    </WhiteContainer>
  );
};
