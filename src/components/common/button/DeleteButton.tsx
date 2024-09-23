import React from 'react';
import Image from 'next/image';
import delete_icon from '@public/images/common/delete-icon.svg';

interface CartButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<CartButtonProps> = ({ onClick }: CartButtonProps) => {
  return (
    <button className='delete-button border-2 border-red-500 rounded-lg w-6 h-6 flex items-center justify-center' onClick={onClick}>
      <span>
        <Image src={delete_icon} alt="delete icon" className='w-5 h-5' />
      </span>
    </button>
  );
}

export default DeleteButton;