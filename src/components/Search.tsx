import { Input } from 'reactstrap';
import Panel from './Panel';

const Search = () => {
  return (
    <Panel className="shadow-lg">
      <div className="m-5">
        <Input placeholder="Search" />
      </div>
    </Panel>
  );
};

export default Search;
