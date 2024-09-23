import React from 'react';
import Image from 'next/image';
import auth_icon from '@public/images/common/auth-icon.svg';
interface AuthButtonProps {
    toggleSidebar: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ toggleSidebar }) => {
    const handleClick = () => {
        toggleSidebar();
    };

    return (
        <button 
            className="btn btn-primary btn-lg auth_button"
            onClick={handleClick}
        >
            <span className="fa fa-user">
                <Image src={auth_icon} alt="auth-icon" className='w-6 h-6'/>
            </span>
        </button>   
    );
}

export default AuthButton;
