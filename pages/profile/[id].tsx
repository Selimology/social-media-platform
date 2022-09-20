import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { VideoCard, NoVideosFound } from '../../components';
import { User, Video } from '../../types/types';
import { MdVerifiedUser } from 'react-icons/md';
import { BASE_URL } from '../../utils';
import { BsGridFill } from 'react-icons/bs';
interface Props {
  data: {
    user: User;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

const Profile = ({ data }: Props) => {
  const [showUserVideos, setshowUserVideos] = useState(true);
  const { user, userVideos, userLikedVideos } = data;
  const videos = showUserVideos ? 'border-b-2 border-black' : ' text-gray-400';
  const [videoList, setVideoList] = useState<Video[]>([]);
  const likedVidoes = !showUserVideos
    ? ' border-b-2 border-black'
    : 'text-gray-400';

  useEffect(() => {
    if (showUserVideos) {
      setVideoList(userVideos);
    } else {
      setVideoList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full  ">
      <div className="flex  items-center justify-center cursor-pointer p-2 font-bold gap-3 ">
        <div className="w-16 h-16 md:w-24 md:h-24  ">
          <Image
            src={user.image}
            width="120"
            height="120"
            className="rounded object-cover"
            alt="user"
          />
        </div>

        <div>
          <p className="flex gap-1 items-center lowercase text-xl  md:text-2xl font-semibold text-black">
            {user.userName.replaceAll(' ', '')}
            <MdVerifiedUser className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-base">{user.userName}</p>
        </div>
      </div>

      <div className="px-2 md:px-3">
        <div className="flex justify-center gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl items-center font-semibold cursor-pointer mt-2 flex gap-2 ${videos}`}
            onClick={() => setshowUserVideos(true)}
          >
            <BsGridFill className="text-sm" />
            Videos
          </p>

          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${likedVidoes}`}
            onClick={() => setshowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex flex-wrap  gap-10 mb-10 justify-center">
          {videoList.length > 0 ? (
            videoList.map((post: Video, index: number) => (
              <VideoCard post={post} key={index} />
            ))
          ) : (
            <NoVideosFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
