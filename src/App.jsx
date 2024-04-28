import React from 'react';
import './App.css';
import { Typography } from 'antd';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import Home from './components/Home/home';
import Addition from './components/Addition/addition';
import Service from './components/AppService/appService';
const { Title } = Typography;


const App = () => {
 

  return (

    <>
      <header>
        <Title level={5} style={{ color: 'white', margin: 0 }}>Travel Advisor</Title>
      </header>
      <Home />
      <Addition />
      <Service/>
    </>
  );


};
export default App;
