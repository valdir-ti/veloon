import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import logo from '../assets/Logo_Veloon_v1_02.png'

import ConfirmationDialog from './ConfirmationDialog'

function Header() {
    const navigate = useNavigate()
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const handleLogout = () => {
        setIsLogoutDialogOpen(true);
    }

    const confirmLogout = () => {
        localStorage.removeItem('authToken');
        navigate("/login");
    }

    return <nav className='min-h-24 w-full border-b border-b-[#4011677a] mb-12'>
        <div className='flex h-full items-center justify-between w-full md:w-[60vw] mx-auto px-6 md:px-0'>
            <Link to='/'>
                <img src={logo} alt='Veloon' width={128} />
            </Link>
            <ul className='flex justify-center items-center gap-6 h-full'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/historico'>Histórico</Link>
                </li>
                <li>
                    <button onClick={handleLogout} className='cursor-pointer'>Logout</button>
                </li>
            </ul>
        </div>
        <ConfirmationDialog
            isOpen={isLogoutDialogOpen}
            setIsOpen={setIsLogoutDialogOpen}
            onConfirm={confirmLogout}
            title="Confirmar Logout"
            message="Deseja realmente sair do sistema?"
        />
    </nav>
}

export default Header
