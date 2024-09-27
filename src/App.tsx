import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PostReactQuery from './components/PostReactQuery';
// import Posts from './components/Posts';
// import PostDetails from './components/PostDetails';

function App() {

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            
            <li>
              <Link to="/PostReactQuery">RQ Posts</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route  path='/PostReactQuery' element={<PostReactQuery />} /> 

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;