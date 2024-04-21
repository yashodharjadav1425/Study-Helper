import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
// import Register from './components/Register/Register';
import Home from './components/home/Home';
import Learning from './components/learning/Learning'; // Update import path
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Quiz from './components/quiz/Quiz';
import Videoplayer from './components/videoplayer/Videoplayer';
import Register from './components/login/Register';

// // Update import paths for renamed folder and file
// import VideoPlayer from './videoplayer/VideoPlayer';
// import QuizPage from './components/quiz/QuizPage';
// import GoalSetter from './components/goalsetter/GoalSetter';

function App() {
  return (
    <>
      <Router>
       
        <Routes>
          <Route path='/' element={<Home/>} /> 
          <Route path='/video/:id' element={<Videoplayer />} />
          <Route path='/QuizPage' element={<Quiz />} />
          {/* <Route path='/GoalSetter' element={<GoalSetter />} /> */}
          <Route path='/Register' element={<Register/>} />
          <Route path='/Learning' element={<Learning />} />
          <Route path='/Login'element={<Login/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
