'use client';
import Visualization from './Visualization';
import React, { useEffect } from 'react';

const Home = () => {
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
      <Visualization />
      <div style={filterStyle}></div>
    </div>
  );
}

export default Home;