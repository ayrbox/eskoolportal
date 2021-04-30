import React, { FC, ReactElement as RE, ReactNode, useEffect } from 'react';
import clsx from 'clsx';

// import CloseButton from '../buttons/CloseButton';

export interface OverlayProps {
  children: ReactNode;
  open: boolean;
  light?: boolean;
  onClose?: () => void;
}

const Overlay: FC<OverlayProps> = ({
  children,
  open,
  onClose,
  light,
}: OverlayProps): RE => {
  const handleEscapePress = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.classList.add('no-scroll');
    if (onClose) {
      document.addEventListener('keyup', handleEscapePress);
    }

    return (): void => {
      document.body.classList.remove('no-scroll');
      if (onClose) {
        document.removeEventListener('keyup', handleEscapePress);
      }
    };
  }, []);

  return (
    <div
      className={clsx({
        overlay: true,
        'light-background': light,
        open: open,
      })}
    >
      {children}
      {/* {onClose && <CloseButton onClose={onClose} size="large" />} */}
    </div>
  );
};

export default Overlay;
