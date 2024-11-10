'use clinet';

interface Props {
    data: any;
}

const CountryText = ({ data }: Props) => {
    const facts = data ? data['data' as keyof typeof data]['basic_facts' as keyof typeof data.data] : {};

    return (
        <div style={{
            position: 'fixed',
            top: '130px',
            left: '10vw',
            color: 'rgba(255, 255, 255, 0.9)',
            width: '80vw',
            maxWidth: '800px',
            textAlign: 'left'
        }}>
            <span style={{
                fontSize: '12px',
                margin: '0 0 -4px 0',
            }}>DEFORESTATION</span>
            <h1 className="inter" style={{
                fontSize: '38px',
                marginBottom: '12px'
            }}>{facts ? facts['country' as keyof typeof facts]?.toUpperCase() : ''}</h1>
            <p className="inter">{`${facts ? facts['governmental_model' as keyof typeof facts] : ''}, ${facts ? facts['election_term' as keyof typeof facts] : ''} election term`}</p>
            <p className="inter">{facts ? facts['population' as keyof typeof facts] : ''}</p>
            <p className="inter">{facts ? facts['area' as keyof typeof facts] : ''}</p>
        </div>
    );
}

export default CountryText;