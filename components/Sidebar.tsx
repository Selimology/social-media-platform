import React, { useState } from 'react';
import { NextPage } from 'next';
import useRouter from 'next/router';
import Link from 'next/link';
import { MdOutlineCancel, MdOutlineMenu, MdHomeFilled } from 'react-icons/md';
import { Discover, Recommended, Footer } from '.';

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const normalLink =
    'flex items-center gap-3  justify-center xl:justify-start cursor-pointer px-4 py-2 text-xl xl:text-md mb-4 xl:mb-0 border-2 bg-black text-white rounded ease-in-out transform duration-100 hover:bg-white hover:text-black xl:border-0 xl:bg-white xl:text-black xl:hover:tracking-wider ';
  return (
    <div className="overflow-hidden  ">
      <div
        className="flex justify-end   xl:hidden m-2 ml-4 mt-3 text-2xl"
        onClick={() => setToggleSidebar((prev) => !prev)}
      >
        {toggleSidebar ? <MdOutlineCancel /> : <MdOutlineMenu />}
      </div>
      {toggleSidebar && (
        <div className=" flex flex-col w-20 mt-2 border-gray-100 border-l-2 xl:w-[400px] p-2 mb-6 justify-start overflow-hidden ">
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

          <Discover />
          <Recommended />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
