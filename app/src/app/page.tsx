'use client';
import FrontPageEarth from './FrontPageEarth';
import React, { useEffect, useState } from 'react';
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import Logo from './Logo';

const Home = () => {
  const [country, setCountry] = React.useState('de');


    // 0 - 100
    const filterStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      boxShadow: 'inset 0px 0px 30vw 10vw rgb(0,0,0)',
      pointerEvents: 'none'
    } as React.CSSProperties;

    const screenStyle = {
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      overflow: 'hidden'
    }

  return (
    <div style={screenStyle}>
      <FrontPageEarth />
      <div style={filterStyle}></div>
      <div style={{
        position: 'fixed',
        top: '32vh',
        left: '10vw',
        color: 'white',
        textAlign: 'left',
        zIndex: 100,
      }}>
        <h1 style={{
          fontSize: '56px',
          fontWeight: '550',
          lineHeight: '1.4',
        }}>How do political decisions affect<br />
        <Select defaultValue="deforestation" id="named-select" name="named-select">
          <Option value="deforestation">deforestation</Option>
        </Select>
          in 
        <Select defaultValue="Tanzania" id="country" name="country">
          <Option value="tz">Tanzania</Option>
          <Option value="br">Brazil</Option>
          <Option value="de">Germany</Option>
        </Select>
          ?</h1>
      </div>
      <button className='btn' style={{
        position: 'fixed',
        top: '62vh',
        right: '10vw',
        fontSize: '22px',
        backgroundColor: 'rgba(255,255,255,0.9)',
        fontWeight: '550',
        color: 'black'
      }}>
        {'Find out >'}
      </button>
      <Logo />
    </div>
  );
}

export default Home;