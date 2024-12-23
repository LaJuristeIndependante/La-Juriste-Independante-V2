"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo_la_juriste_independante from '@public/images/common/logo-la-juriste-indépendante.svg';
import { FaArrowDown } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <Image src={logo_la_juriste_independante} alt="404" width={100} height={100} className='mb-5' />
      <div className='flex-col space-y-4 flex items-center justify-center'>
        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-center">La page n'existe pas</h1>
        <p>Pour retourner à l'accueil, cliquez sur ce bouton</p>
        <FaArrowDown className='animate-bounce text-xl' />
        <Link href="/" className="bg-primary-color hover:bg-black text-white font-bold py-2 px-4 rounded">
          Retourner à l'accueil
        </Link>
      </div>
    </main>
  )
}
