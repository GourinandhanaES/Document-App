import Docs from './components/Docs'
import Edit from './components/Edit';
import LandingPage from './components/LandingPage';
import { app,database } from './firebase';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App({app,database}) {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<Docs/>}  />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </>
  )
}

export default App
