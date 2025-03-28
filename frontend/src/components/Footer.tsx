import { Link } from 'react-router';
import logo from '../assets/veloon-logo-branca.png';

function Footer() {
    return <footer className="h-32 bg-[#401167] flex items-center justify-center">
        <Link to='/'>
            <img src={logo} alt="Veloon" width={156} />
        </Link>
    </footer>
}

export default Footer
