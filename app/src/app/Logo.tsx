import Image from 'next/image';
import logo from '../../public/logo.svg';

const Logo = () => {
    return (
        <div style={{
            position: 'fixed',
            top: `36px`,
            left: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            zIndex: 10000,
            opacity: 0.9
        }}>
            <Image src={logo} alt="Logo" width={48} height={48} />
            <p className='logo-text' style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: '550',
                margin: '0 0 0 16px',
                padding: 0
            }}>verda</p>
        </div>
    );
}

export default Logo;