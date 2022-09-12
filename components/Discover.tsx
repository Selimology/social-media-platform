import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../utils/constants';

const Discover = () => {
  const activeTopic = '';
  const anyTopic =
    ' hover:bg-gray-200 xl:border-gray-400 hover:bg-gray-100 cursor-pointer  flex items-center justify-center   px-4 py-2 w-full xl:w-auto rounded gap-2  border-2 rounded';
  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-8">
      <h2 className="hidden xl:block text-gray-400    text-lg tracking-wider m-2 w-">
        Popular topics
      </h2>
      <div className="flex gap-4 flex-wrap">
        {topics.map((topic) => (
          <Link href={`/?topic=${topic.name}`} key={topic.name}>
            <div className={anyTopic}>
              <span className="font-semibold text-xl xl:text-md">
                {topic.icon}
              </span>
              <span className="hidden xl:block capitalize text-base">
                {topic.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
