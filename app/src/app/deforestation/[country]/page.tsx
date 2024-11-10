'use client';
import Visualization from '../../Visualization';
import React, { useEffect } from 'react';
import Timeline from '../../Timeline';
import Logo from '../../Logo';
import { createClient } from '@supabase/supabase-js';
import CountryText from '../../CountryText';
import CtaLayover from '../../CtaLayover';
import { useParams } from 'next/navigation';

const Home = () => {
    // 0 - 100
    const params = useParams<{ country: string; }>();
    const { country } = (params || { country: 'de' }) as {country: string};
    const [years, setYears] = React.useState<number[]>([2000, 2004]);
    const [countriesData, setCountriesData] = React.useState<any[]>([]);

    const supabaseUrl = 'https://ggescsgnpefhayvxbwnk.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZXNjc2ducGVmaGF5dnhid25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNjY5NjEsImV4cCI6MjA0Njc0Mjk2MX0.xiewG7JMpOIXp-B5aZNwl6VNCTORd165p98Z7A768Ns';
    const supabase = createClient(supabaseUrl, supabaseKey);

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

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('timeline-data')
        .select('*')

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setCountriesData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={screenStyle}>
      <Visualization
        years={years}
        country={country}
      />
      <div style={filterStyle}></div>
      <CtaLayover />
      <Timeline
        value={years}
        handleChange={handleChange}
        data={countriesData.find((data: any) => data['country_code' as keyof typeof data] === country.toUpperCase())}
      />
      <CountryText
        data={countriesData.find((data: any) => data['country_code' as keyof typeof data] === country.toUpperCase())}
      />
      <a href="/" className="btn" style={{
        position: 'fixed',
        top: '36px',
        right: '36px',
        background: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
        fontWeight: '550',
        margin: 0
      }}>
        {'< Go Back'}
      </a>
      <Logo />
    </div>
  );
}

export default Home;