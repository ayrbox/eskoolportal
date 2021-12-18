import clsx from "clsx";
import { FunctionComponent, ReactElement } from "react";

export interface PanelProps {
  children: ReactElement | ReactElement[];
  className?: string;
}

const Panel: FunctionComponent<PanelProps> = ({
  children,
  className,
}: PanelProps) => {
  return (
    <div
      className={clsx(
        className
          ? {
              ibox: true,
              [className]: !!className,
            }
          : { ibox: true }
      )}
    >
      <div className="ibox-content">{children}</div>
    </div>
  );
};

export default Panel;
