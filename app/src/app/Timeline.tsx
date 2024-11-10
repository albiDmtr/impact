import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TimelinePoint from './TimelinePoint';

interface Props {
    value: number[];
    data?: any;
    handleChange: (event: Event, newValue: number | number[]) => void;
}

const Timeline = ({value, handleChange, data}: Props) => {
    const innerData = data ? data['data' as keyof typeof data]['data' as keyof typeof data.data] : null;
    const changes: any[] = innerData ? (innerData['legislative_changes' as keyof typeof innerData] || []) : [];
    const changeYears = changes.map(change => change['year' as keyof typeof change]);
    const layoversDisabled = changeYears.includes(value[1]);
    
    return (
        data &&
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
                {changes.filter(change => (change['dimension'] === 'deforestation' && 
                    change['year' as keyof typeof change] >= 2000 && 
                    change['year' as keyof typeof change] <= 2023
                ))
                    .map((change, index) => {
                    return (
                        <TimelinePoint
                            key={index}
                            year={change['year' as keyof typeof change]}
                            Heading={change['Heading' as keyof typeof change] || '' }
                            data={change['data' as keyof typeof change] || '' }
                            dimension={change['dimension' as keyof typeof change] || '' }
                            link={change['link' as keyof typeof change] || '' }
                            enabled={!layoversDisabled}
                            isOpen={change['year' as keyof typeof change] === value[1] ? true : false}
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