import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import { MdOutlineCancel, MdOutlineMenu, MdHomeFilled } from 'react-icons/md';
import { Discover, Recommended, Footer } from '.';

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const loggedIn = false;
  const normalLink =
    'flex items-center gap-3  justify-center xl:justify-start cursor-pointer px-4 py-2 text-xl xl:text-md mb-4 xl:mb-0 border-2 bg-black text-white rounded ease-in-out transform duration-100 hover:bg-white hover:text-black xl:border-0 xl:bg-white xl:text-black xl:hover:tracking-wider ';
  return (
    <nav className="overflow-hidden">
      <div
        className="flex justify-end  xl:hidden m-2 ml-4 mt-3 text-2xl"
        onClick={() => setToggleSidebar((prev) => !prev)}
      >
        {toggleSidebar ? <MdOutlineCancel /> : <MdOutlineMenu />}
      </div>
      {toggleSidebar && (
        <div className=" flex flex-col w-20 mt-2 border-gray-100 border-l-2 xl:w-[400px] p-2 mb-6 justify-start overflow-hidden">
          <div className="xl:border-b-2 border-gray-200 xl:pb-2 xl:pr-4">
            <Link href="/">
              <div className={normalLink}>
                <p>
                  <MdHomeFilled />
                </p>
                <span className="text-xl hidden xl:block"> For You</span>
              </div>
            </Link>
          </div>
          {!loggedIn && (
            <div className="px-2 py-4 hidden  xl:block">
              <p className="text-gray-400 text-base">
                Log in to like and comment on videos
              </p>
              <div className="pr-4">
                <GoogleLogin
                  clientId=""
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy={'single_host_origin'}
                  render={(renderProps) => (
                    <button
                      className=" font-bold px-4 py-2 rounded  hover:border-gray-400 border-[2px]   w-full mt-2   cursor-pointer
                      text-white  bg-black hover:bg-white hover:text-black"
                      disabled={renderProps.disabled}
                      onClick={renderProps.onClick}
                    >
                      Login
                    </button>
                  )}
                />
              </div>
            </div>
          )}
          <Discover />
          <Recommended />
          <Footer />
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
