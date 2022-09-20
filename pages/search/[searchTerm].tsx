import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VideoCard, NoVideosFound } from '../../components';
import { User, Video } from '../../types/types';
import { BASE_URL } from '../../utils';
import { useRouter } from 'next/router';
import useAuthStore from '../../store/authStore';
import { BsGridFill } from 'react-icons/bs';
import { MdVerifiedUser } from 'react-icons/md';

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

const SearchTerm = ({ videos }: { videos: Video[] }) => {
  const [isAccount, setIsAccount] = useState(false);
  const { allUsers } = useAuthStore();
  const router = useRouter();
  const { searchTerm }: any = router.query;

  const searchedAccounts = allUsers.filter((user: User) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const accounts = isAccount ? ' border-b-2 border-black' : 'text-gray-400';
  const isvideos = !isAccount ? 'border-b-2 border-black' : ' text-gray-400';

  return (
    <div className="w-full">
      <div className="flex justify-center gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl items-center font-semibold cursor-pointer mt-2 flex gap-2 ${accounts}`}
          onClick={() => setIsAccount(true)}
        >
          <BsGridFill className="text-sm" />
          Accounts
        </p>

        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isvideos}`}
          onClick={() => setIsAccount(false)}
        >
          Videos
        </p>
      </div>
      {isAccount ? (
        <div className="md:mt-8">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: User, index: number) => (
              <Link href={`/profile/${user._id}`} key={index}>
                <div className="flex  gap-2 py-3 cursor-pointer border-b-2 border-gray-200 hover:bg-gray-100">
                  <div>
                    <Image
                      src={user.image}
                      width={40}
                      height={40}
                      className="rounded"
                      alt="profile"
                    />
                  </div>
                  <div className=" xl:block">
                    <p className="flex gap-1 items-center lowercase text-small font-semibold text-black">
                      {user.userName.replaceAll(' ', '')}
                      <MdVerifiedUser className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoVideosFound />
          )}
        </div>
      ) : (
        <div className="md:mt-8 flex flex-wrap gap-3 justify-center">
          {videos.length ? (
            videos.map((video: Video, index: number) => (
              <VideoCard key={index} post={video} />
            ))
          ) : (
            <NoVideosFound />
          )}
        </div>
      )}
    </div>
  );
};
export default SearchTerm;
