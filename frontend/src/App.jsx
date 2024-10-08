import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import UserContextProvider from './context/UserContextProvider';
import Alert from './components/Alert';

const App = () => {
  return (
    <UserContextProvider>
    <Router>
      <Navbar />
      <Alert message={'This is delete'}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
    </UserContextProvider>
  );
}

export default App;