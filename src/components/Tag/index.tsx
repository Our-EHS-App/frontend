import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  color?: tagColor;
}

type tagColor = 'gold' | 'blue' | 'teal';

export const Tag: FC<Props> = ({ children, color }) => {
  const getColor = () => {
    switch (color) {
      case 'gold':
        return 'bg-[#D4930221] text-[#D49302]';
      case 'blue':
        return 'bg-[#2E398221] text-[#2E3982]';
      case 'teal':
        return 'bg-[#027B8A21] text-[#027B8A]';
      default:
        return 'bg-[#00000021] text-[#000000]';
    }
  };
  return (
    <div className={`w-fit ${getColor()} px-6 py-1 text-sm`}>{children}</div>
  );
};
