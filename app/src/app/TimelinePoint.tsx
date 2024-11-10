import React, { useState} from 'react';

interface Props {
    Heading: string;
    year: number;
    data: string;
    dimension: string;
    link: string;
    isOpen: boolean;
    enabled: boolean;
}

const TimelinePoint = ({Heading, year, data, dimension, link, isOpen, enabled}: Props) => {
    const [onHover, setOnHover] = useState(false);

    const isShown = isOpen || (onHover && enabled);

    return (
        <>
            <div>
            </div>
            <div 
            className="timeline-point"
            style={{
                position: 'absolute',
                left: `${(year - 2000) / 23 * 100}%`,
                width: '10px',
                height: '10px',
                transform: 'rotate(45deg)',
                backgroundColor: 'white',
                transition: 'opacity 0.4s',
                cursor: 'pointer',
                opacity: isShown ? 1 : 0.5
            }}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}>
            </div>
            <div style={{
                position: 'absolute',
                left: `${(year - 2000) / 23 * 100}%`,
                bottom: '10px',
                width: '2px',
                height: '30px',
                marginLeft: '4px',
                backgroundColor: 'white',
                cursor: 'pointer',
                visibility: isShown ? 'visible' : 'hidden',
                opacity: isShown ? 1 : 0,
                transition: 'opacity 0.4s'
            }}>
            </div>
            <div style={{
                position: 'absolute',
                left: 0,
                bottom: '30px',
                width: '100%',
                height: '4px',
                marginLeft: '4px',
            }}>
                <div style={{
                    width: '52%',
                    minWidth: '300px',
                    height: 'fit-content',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid white',
                    color: 'white',
                    transform: 'translateY(-100%)',
                    visibility: isShown ? 'visible' : 'hidden',
                    opacity: isShown ? 1 : 0,
                    transition: 'opacity 0.4s',
                    float: (year - 2000) / 23 > 0.5 ? 'right' : 'left',
                }}>
                    <h4 style={{
                        fontSize: '20px',
                        margin: 0,
                        padding: '7px 14px 7px 14px',
                    }}>
                        {Heading}
                    </h4>
                    <p style={{
                        fontWeight: 350,
                        padding: '0 14px 14px 14px',
                    }}>
                        {data}
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '7px',
                        fontSize: '12px',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        color: 'black',
                    }}>
                        <span className="mono">
                            {year}
                        </span>
                        <a className="mono" href={link} target="_black">{'More >'}</a>
                    </div>
                </div>
            </div>
            <div style={{
                position: 'absolute',
                left: `${(year - 2000) / 23 * 100}%`,
                bottom: '30px',
                width: '10px',
                height: '10px',
                transform: 'rotate(45deg)',
                backgroundColor: 'white',
                cursor: 'pointer',
                visibility: isShown ? 'visible' : 'hidden',
                opacity: isShown ? 1 : 0,
                transition: 'opacity 0.4s',
            }}></div>
        </>
        
    );
}

export default TimelinePoint;