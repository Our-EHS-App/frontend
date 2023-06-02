import Icon from '@ant-design/icons';

import {
  FilterSVG,
  AddressSVG,
  radioSVG,
  exportIcon,
  ContentSVG,
  FilesSVG,
  EditSVG,
} from '../svg';
import React from 'react';
export const AddressIcon = (props: any) => (
  <Icon component={AddressSVG} {...props} />
);

export const RadioIcon = (props: any) => (
  <Icon component={radioSVG} {...props} />
);

export const FilterIcon = (props: any) => (
  <Icon component={FilterSVG} {...props} />
);

export const ExportIcon = (props: any) => (
  <Icon component={exportIcon} {...props} />
);

export const ContentIcon = (props: any) => (
  <Icon component={ContentSVG} {...props} />
);

export const FilesIcon = (props: any) => (
  <Icon component={FilesSVG} {...props} />
);

export const EditIcon = (props: any) => <Icon component={EditSVG} {...props} />;
