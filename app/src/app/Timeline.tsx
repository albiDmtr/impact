import React, { useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import exampleData from './exampleData.json';
import TimelinePoint from './TimelinePoint';

interface Props {
    value: number[];
    handleChange: (event: Event, newValue: number | number[]) => void;
}

const Timeline = ({value, handleChange}: Props) => {
    const data = exampleData['data' as keyof typeof exampleData];
    const changes: any[] = data['legislative_changes' as keyof typeof data];
    const changeYears: number[] = changes.map(change => change['year' as keyof typeof change]);

    const avg = (value[0] + value[1])/ 2;
    const closestChangeIndex = changeYears.reduce((closestIndex, currentYear, currentIndex) => {
        return Math.abs(currentYear - avg) < Math.abs(changeYears[closestIndex] - avg) ? currentIndex : closestIndex;
    }, 0);

    return (
        <Box sx={{
                width: '80vw',
                maxWidth: '800px',
                position: 'fixed',
                bottom: '14vh',
                left: '50%',
                transform: 'translateX(-50%)'
            }}>
            <Box sx={{
                width: '100%',
                height: '10px',
                marginBottom: '16px',
                position: 'relative'
            }}>
                {changes.filter(change => change['dimension'] === 'deforestation').map((change, index) => {
                    return (
                        <TimelinePoint
                            key={index}
                            year={change['year' as keyof typeof change]}
                            Heading={change['Heading' as keyof typeof change] || '' }
                            data={change['data' as keyof typeof change] || '' }
                            dimension={change['dimension' as keyof typeof change] || '' }
                            link={change['link' as keyof typeof change] || '' }
                            isOpen={index === closestChangeIndex ? true : false}
                        />
                    );
                })}
            </Box>
            <Slider
                sx={{
                    color: 'white',
                    '& .MuiSlider-thumb': {
                        color: 'white',
                    },
                    '& .MuiSlider-track': {
                        color: 'white',
                    },
                    '& .MuiSlider-rail': {
                        color: 'white',
                    },
                    '& .MuiSlider-mark': {
                        color: 'transparent',
                    },
                    '& .MuiSlider-markLabel': {
                        color: 'white'
                    },
                }}
            value={value}
            step={1}
            marks={[
                {value: 2000, label: '2000'},
                {value: 2023, label: '2023'},
            ]}
            min={2000}
            max={2023}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={(value) => `${value}`}
            />
        </Box>
      );
}

export default Timeline;