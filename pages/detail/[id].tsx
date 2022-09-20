import useAuthStore from '../../store/auth';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { IoVolumeLowSharp } from 'react-icons/io5';
import { BsVolumeUpFill, BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { MdVerifiedUser, MdOutlineCancel } from 'react-icons/md';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Video } from '../../types/types';
import { Comment, LikeButton } from '../../components';

interface Props {
  postDetails: Video;
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/posts/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

const Detail = ({ postDetails }: Props) => {
  const { userProfile }: any = useAuthStore();
  const videoButtons =
    'text-white text-2xl  m-2 rounded border-black lg:text-3xl';
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const [post, setPost] = useState(postDetails);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      //use put to update
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: data.likes });
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [post, isMuted]);

  if (!post) {
    return null;
  }

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap z-20">
      <div className="relative flex-2 w-[1000px] lg:w-3/4 flex justify-center items-center bg-black">
        <div className=" absolute top-10 lg:top-8 left-2 lg:left-6 flex gap-6 z-50">
          <p
            className="cursor-pointer "
            onClick={() => {
              router.back();
            }}
          >
            <MdOutlineCancel className="text-white text-3xl hover:opacity-90" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post?.video?.asset.url}
              onClick={() => {}}
              ref={videoRef}
              loop
              className=" h-full cursor-pointer"
            ></video>
          </div>
          <div className="absolute top-[50%] lg:top-[50%] left-[45%] lg:left-[40%] ">
            {!isPlaying && (
              <button
                onClick={() => {
                  onVideoClick();
                }}
              >
                <BsFillPlayFill className="text-white text-3xl lg:text-5xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isMuted ? (
            <button onClick={() => setIsMuted(false)}>
              <IoVolumeLowSharp className={videoButtons} />
            </button>
          ) : (
            <button onClick={() => setIsMuted(true)}>
              <BsVolumeUpFill className={videoButtons} />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-full h-[40vh] lg:h-auto md:w-[900px] lg:w-[700px] z-40 bg-white">
        <div className=" mt-10 mx-10">
          <div className="flex gap-2 mb-2 py-2  cursor-pointer font-semibold rounded">
            <div className="md:w-12 md:h-12 w-10 h-10">
              <Link href="/">
                <Image
                  width={60}
                  height={60}
                  className="rounded object-cover"
                  src={post.postedBy.image}
                  layout="responsive"
                  alt="profile"
                />
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className="flex flex-col ">
                  <p className="flex items-center gap-2 md:text-md text-black font-bold">
                    {post.postedBy.userName}
                    <MdVerifiedUser className="text-blue-400 text-base xl:text-md" />
                  </p>
                  <p className="capitalize hidden md:block  text-sm text-gray-500">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className=" text-md text-gray-600">{post.caption}</p>

          <div>
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default Detail;
