import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../utils/constants';

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopic =
    'text-black border-gray-700 hover:text-white hover:bg-black hover:border-gray-100  cursor-pointer  flex items-center justify-center   px-4 py-2 w-full xl:w-auto rounded gap-2  border-2 rounded-full shadow-md xl:shadow-lg ';
  const anyTopic =
    'xl:border-gray-400 hover:bg-gray-200 cursor-pointer  flex items-center justify-center   px-4 py-2 w-full xl:w-auto rounded gap-2  border-2 rounded-full';
  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-3 ">
      <h2 className="hidden xl:block  text-gray-400 text-base tracking-wider m-2 ">
        Popular topics
      </h2>
      <div className="flex gap-4 xl:gap-3 flex-wrap">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopic : anyTopic}>
              <span className="font-semibold text-base xl:text-md">
                {item.icon}
              </span>
              <span className="hidden xl:block capitalize text-base">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
