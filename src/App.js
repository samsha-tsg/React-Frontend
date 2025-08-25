import './App.css';
import React from 'react';
// We use Route in order to define the different routes of our application
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import PostList from "./components/postList";
import PostEdit from "./components/postEdit";
import PostCreate from "./components/postCreate";
import Register from "./components/register";
import Login from "./components/login"

const App = () => {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<PostList />} />
        <Route path="/edit/:id" element={<PostEdit />}  />
        <Route path='/create' element={<PostCreate />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
    </Router>
    
  );
};

export default App;
