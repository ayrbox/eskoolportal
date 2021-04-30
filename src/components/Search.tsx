import {
  ChangeEventHandler,
  useState,
  MouseEventHandler,
  FunctionComponent,
  useRef,
  useEffect,
} from 'react';
import { Input } from 'reactstrap';
import useSWR from 'swr';
import { Student } from '~/database/entities/Student';
import Panel from './Panel';
import { useRouter } from 'next/router';

export interface SearchProps {
  onClose?: () => void;
  open?: boolean;
}

const Search: FunctionComponent<SearchProps> = ({
  onClose,
  open,
}: SearchProps) => {
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

  const searchTermRef = useRef(null);

  useEffect(() => {
    if (searchTermRef.current && open) {
      setTimeout(() => {
        searchTermRef.current.focus();
      }, 1);
    }
  }, [searchTermRef.current, open]);

  return (
    <Panel className="shadow-lg">
      <div className="m-5">
        <input
          className="form-control"
          placeholder="Search"
          onChange={handleChange}
          value={searchTerm}
          ref={searchTermRef}
          onFocus={e => e.currentTarget.select()}
        />

        {data && (
          <ul className="list-group">
            {data.map(student => (
              <li className="list-group-item" key={student.id}>
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
