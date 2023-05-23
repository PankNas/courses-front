import React, {useEffect} from 'react';

import PersonalArea from "./pages/PersonalArea/PersonalArea";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./redux/slices/auth";
import styles from './App.module.css'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path={'/*'} element={<Main />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        {/*<Route path="/*" element={<PersonalArea/>}/>*/}
      </Routes>
    </div>
  );
}

export default App;
