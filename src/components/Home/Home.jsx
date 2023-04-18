import React from 'react';

import Dashboard from "./Dashboard/Dashboard";
import PersonalInfo from "./PersonalInfo/PersonalInfo";

const Home = () => {
  return (
    <div style={{display: 'flex', width: '100%'}}>
      <Dashboard />
      <PersonalInfo />
    </div>
  )
};

export default Home;
