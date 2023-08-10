import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Book } from './component/bookComponent/book';

function App () {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element= { <Book/>} />
        </Routes>
      </Router>
    );
}

export default App;