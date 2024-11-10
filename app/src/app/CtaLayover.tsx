const CtaLayover = () => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '24vh',
            right: '5vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'right',
            width: '350px',
        }}>
            <a href='https://www.kansalaisaloite.fi/fi' target="_blank" style={{textAlign: 'right'}}>
                <button className="btn no-mobile" style={{
                whiteSpace: 'nowrap'
            }}>{'Take immediate action >'}</button></a>
            <a href='https://www.sitra.fi/hankkeet/polis-alustan-kokeilut/' target="_blank" style={{textAlign: 'right'}}>
                <button className="btn no-mobile" style={{
                whiteSpace: 'nowrap'
            }}>{'Find conversational companions >'}</button></a>
            <a href='https://www.sitra.fi/en/projects/lifestyle-test-2/' target="_blank" style={{textAlign: 'right'}}>
                <button className="btn" style={{
                whiteSpace: 'nowrap'
            }}>{'See the effect of your daily choices >'}</button></a>
        </div>
    );
}

export default CtaLayover;