import React from 'react';
import { DOMAttributes } from 'react';

interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={['border border-violet-200 px-4 py-2 rounded', className].join(
        ' '
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
