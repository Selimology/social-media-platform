import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineLogout, MdOutlineSearch } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import { BsSearch } from 'react-icons/bs';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createOrSignUser } from '../utils';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const router = useRouter();
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/search/${searchText}`);
    }
  };
  const [searchText, setSearchText] = useState('');
  const { userProfile, addUser, removeUser } = useAuthStore();
  return (
    <div className="w-full bg-white justify-between items-center flex border-b-2 border-gray-300 px-4 py-2 ">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <h2 className="font-bold text-3xl">NotTiktok</h2>
        </div>
      </Link>
      <div className=" relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search"
            className="bg-gray-100 p-2 md:text-md border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] md:top-0   
            "
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 top-3   pl-4 text-xl right-6 text-gray-400"
          >
            <BsSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-4">
            <Link href="/upload">
              <button className="border-2 bg-black text-white  hover:bg-white hover:text-black ease-in-out transform duration-200 shadow-sm px-2 py-1 rounded md:px-6 text-md font-semibold flex items-center gap-2">
                <IoAdd className="text-xl" />
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <Image
                  width={35}
                  height={35}
                  className="rounded object-cover"
                  src={userProfile.image}
                  alt="profile"
                />
              </Link>
            )}
            <button
              type="button"
              className="p-1 md:p-2 bg-gray-200 rounded-full"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <MdOutlineLogout className=" text-xl md:text-2xl" />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrSignUser(response, addUser)}
            onError={() => console.log('error')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
