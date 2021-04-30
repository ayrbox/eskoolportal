import {
  ChangeEventHandler,
  useState,
  MouseEventHandler,
  FunctionComponent,
} from 'react';
import { Input } from 'reactstrap';
import useSWR from 'swr';
import { Student } from '~/database/entities/Student';
import Panel from './Panel';
import { useRouter } from 'next/router';

export interface SearchProps {
  onClose?: () => void;
}

const Search: FunctionComponent<SearchProps> = ({ onClose }: SearchProps) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const { data } = useSWR<Student[], unknown>(`/api/students?q=${searchTerm}`);

  const handleResultClick = (
    href: string
  ): MouseEventHandler<HTMLAnchorElement> => e => {
    e.preventDefault();
    router.replace(href);
    if (onClose) onClose();
  };

  return (
    <Panel className="shadow-lg">
      <div className="m-5">
        <Input
          placeholder="Search"
          onChange={handleChange}
          value={searchTerm}
        />

        {data && (
          <ul className="list-group">
            {data.map(student => (
              <li className="list-group-item">
                <a
                  href="#"
                  onClick={handleResultClick(`/students/${student.id}`)}
                >
                  {student.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Panel>
  );
};

export default Search;
