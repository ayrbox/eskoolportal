import clsx from 'clsx'
import { FunctionComponent, ReactElement} from 'react'

export interface PanelProps {
  children: ReactElement | ReactElement[];
  className?: string;
} 

const Panel: FunctionComponent<PanelProps> = ({ children, className }: PanelProps) => {
  return (
    <div className={clsx({
      ibox: true,
      [className]: !!className
    })}>
      <div className="ibox-content">{children}</div>
    </div>
  );
};

export default Panel;
