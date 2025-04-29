"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/logo carre.png'
import { SignedOut } from '@clerk/nextjs'
import { Search } from 'lucide-react'

const MenuMobile = () => {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div className="md:hidden">
            <div 
            className="flex flex-col gap-[4.5px] cursor-pointer"
            onClick={() => setIsOpen ((prev) => !prev)}
            >
                <div className={`w-6 h-1 bg-black rounded-sm 
                ${isOpen ? "rotate-45" : ""} origin-left ease-in-out duration-600`}
                />
                <div className={`w-6 h-1 bg-black rounded-sm 
                ${isOpen ? "opacity-0" : ""} ease-in-out duration-100`}
                />
                <div className={`w-6 h-1 bg-black rounded-sm 
                ${isOpen ? "-rotate-45" : ""} origin-left ease-in-out duration-600`}
                />
            </div>
            {isOpen && (
                <div className='absolute left-0 top-32 w-full h-[calc(100vh_96px)] bg-white 
                flex flex-col items-center justify-center gap-8 font-medium text-xl z-10 '>
                    <Link href="/">
                    <Image 
                    src={logo}
                    alt="logo herafyin"
                    width={150}
                    />
                </Link>
                    <Link href="/" className='uppercase hover:text-gray-600'>Accueil</Link>
                    <Link href="/" className='uppercase hover:text-gray-600'>Ateliers</Link>
                    <Link href="/" className='uppercase hover:text-gray-600'>à propos</Link>
                    <Link href="/" className='uppercase hover:text-gray-600'>Espaces</Link>
                    <Link href="/" className='uppercase hover:text-gray-600'>Blogs</Link>
                    <Link href="/" className='uppercase hover:text-gray-600'>Contact</Link>
                    <SignedOut> 
                            <Link href="/sign-in" className="bg-[#FE5733] px-4 py-2 rounded-full text-white hover:bg-[#FE5733]/80 w-40 text-center">
                                S'inscrire
                            </Link>
                    </SignedOut>
                </div>
            ) }
        </div>
    )
}
export default MenuMobile