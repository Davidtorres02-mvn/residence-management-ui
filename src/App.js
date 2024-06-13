import logo from './logo.svg';
import './App.css';
import Login from './login/Login';
import Register from './login/Register';
import Main from "./pages/main"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/home" element={<Main/>} />
                </Routes>
            </div>
      </>
  );
}

export default App;
