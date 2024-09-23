import Image from 'next/image';
import menu_icon from '@public/images/common/menu-icon.svg';

function BurgerButton({ toggleSidebar }: { toggleSidebar: () => void }) {
    const handleClick = () => {
        toggleSidebar(); 
    };

    return (
        <button 
            className="btn btn-primary btn-lg burger_button ml-3"
            onClick={handleClick}
        >
            <span className="fa fa-bars">
                <Image src={menu_icon} alt="menu-icon" className='w-8 h-8'/>
            </span>
        </button>   
    );
}

export default BurgerButton;
