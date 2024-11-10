'use client';
import Visualization from './Visualization';
import React, { useEffect } from 'react';
import Timeline from './Timeline';
import Logo from './Logo';

const Home = () => {
    // 0 - 100
    const [years, setYears] = React.useState<number[]>([2000, 2004]);

    const handleChange = (event: Event, newValue: number | number[]) => {
      setYears(newValue as number[]);
    };

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
      <Visualization
        years={years}
        country='fr'
      />
      <div style={filterStyle}></div>
      <Timeline
        value={years}
        handleChange={handleChange}
      />
      <Logo />
    </div>
  );
}

export default Home;