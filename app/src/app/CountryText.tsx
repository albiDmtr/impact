interface Props {
    data: any;
}

const CountryText = ({ data }: Props) => {
    const facts = data ? data['data' as keyof typeof data]['basic_facts' as keyof typeof data.data] : {};

    console.log(facts);

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
            <h1 className="inter" style={{
                fontSize: '38px'
            }}>{facts ? facts['country' as keyof typeof facts] : ''}</h1>
            <p className="inter">{`${facts ? facts['governmental_model' as keyof typeof facts] : ''}, ${facts ? facts['election_term' as keyof typeof facts] : ''} election term`}</p>
            <p className="inter">{facts ? facts['population' as keyof typeof facts] : ''}</p>
            <p className="inter">{facts ? facts['area' as keyof typeof facts] : ''}</p>
        </div>
    );
}

export default CountryText;