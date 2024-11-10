'use client';
import FrontPageEarth from './FrontPageEarth';
import React, { useEffect } from 'react';
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import Logo from './Logo';

const Home = () => {
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
        top: '36vh',
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
          <Option value="Tanzania">Tanzania</Option>
          <Option value="Brazil">Brazil</Option>
          <Option value="Indonesia">Indonesia</Option>
          <Option value="Germany">Germany</Option>
        </Select>
          ?</h1>
      </div>
      <Logo />
    </div>
  );
}

export default Home;