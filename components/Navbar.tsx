import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineLogout, MdOutlineSearch } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';

const Navbar = () => {
  return (
    <div className="w-full bg-white justify-between items-center flex border-b-2 border-gray-300 px-4 py-2 ">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <h2 className="font-bold text-3xl">NotTiktok</h2>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
