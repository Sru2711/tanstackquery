import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PostReactQuery from './components/PostReactQuery';
import PostsDetails from './components/PostsDetails';
// import Posts from './components/Posts';
// import PostDetails from './components/PostDetails';

function App() {

  return (
    <BrowserRouter>
      <div className="nav-div">
        <nav className="">
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
          <Route path="/PostQueryDetails/:id" element={<PostsDetails/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;