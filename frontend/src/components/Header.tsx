import { Link } from "react-router"

import logo from '../assets/Logo_Veloon_v1_02.png';

function Header() {
    return <nav className="h-24 w-full border-b border-b-[#4011677a] mb-12">
        <div className="flex h-full items-center justify-between w-[60vw] mx-auto">
            <Link to='/'>
                <img src={logo} alt="Veloon" width={128} />
            </Link>
            <ul className="flex justify-center items-center gap-6 h-full">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/historico'>Histórico</Link>
                </li>
            </ul>
        </div>
    </nav>
}

export default Header
