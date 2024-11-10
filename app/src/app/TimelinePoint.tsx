interface Props {
    Heading: string;
    year: number;
    data: string;
    dimension: string;
    link: string;
    isOpen: boolean;
}

const TimelinePoint = ({Heading, year, data, dimension, link, isOpen}: Props) => {
    return (
        <>
            <div 
            className="timeline-point"
            style={{
                position: 'absolute',
                left: `${(year - 2000) / 23 * 100}%`,
                width: '10px',
                height: '10px',
                transform: 'rotate(45deg)',
                backgroundColor: 'white',
                cursor: 'pointer',
                opacity: isOpen ? 1 : 0.5
            }}>
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
                display: isOpen ? 'block' : 'none',
                opacity: isOpen ? 1 : 0
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
                    padding: '10px',
                    border: '2px solid white',
                    color: 'white',
                    cursor: 'pointer',
                    transform: 'translateY(-100%)',
                    display: isOpen ? 'block' : 'none',
                    opacity: isOpen ? 1 : 0,
                    float: (year - 2000) / 23 > 0.5 ? 'right' : 'left',
                }}>
                    <h4 className="mono">
                        {Heading}
                    </h4>
                    <p className="mono">
                        {data}
                    </p>
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
                display: isOpen ? 'block' : 'none',
                opacity: isOpen ? 1 : 0
            }}></div>
        </>
        
    );
}

export default TimelinePoint;