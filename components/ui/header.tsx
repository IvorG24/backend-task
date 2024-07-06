'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { UserImage } from './userImage';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
  { href: '/upload', label: 'Upload' },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <nav className='bg-gray-700 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Navigation Links */}
        <ul className='flex gap-4'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-white hover:text-gray-400 transition-colors ${pathname === link.href ? 'border-b-2' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign Out Button */}
        {/* <form action={signOutButton.href} method={signOutButton.method}>
          <button
            type='submit'
            className={signOutButton.classes}
          >
            {signOutButton.label}
          </button>
        </form> */}
      </div>
    </nav>
  );
};

export default Header;
