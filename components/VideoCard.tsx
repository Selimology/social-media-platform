import React, { useState, useRef, useEffect } from 'react';
import { Video } from '../types/types';
import Image from 'next/image';
import Link from 'next/link';
import { IoVolumeLowSharp } from 'react-icons/io5';
import { BsVolumeUpFill, BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { MdVerifiedUser } from 'react-icons/md';
import { NextPage } from 'next';

interface Props {
  post: Video;
}

const VideoCard: NextPage<Props> = ({ post }) => {
  const videoButtons =
    'text-black text-2xl  m-2 rounded border-black lg:text-3xl';

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHover, setIsHover] = useState(true);

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

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div className="flex gap-2 mb-4 py-2  cursor-pointer font-semibold rounded">
        <div className="md:w-16 md:h-16 w-10 h-10">
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
            <div className="flex gap-2 items-center">
              <p className="flex items-center gap-2 md:text-md text-black font-bold">
                {post.postedBy.userName}
                <MdVerifiedUser className="text-blue-400 text-base xl:text-md" />
              </p>
              <p className="capitalize hidden md:block text-sm text-gray-500">
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="lg:mr-20 flex gap-4 relative justify-center md:justify-start">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              loop
              className="h-[350px] w-[200px] md:h-[400px] md:w-[350px] lg:h-[500px] rounded-xl  cursor-pointer bg-gray-100"
              src={post.video.asset.url}
            ></video>
          </Link>

          {isHover && (
            <div className="absolute cursor-pointer bottom-6  flex w-[200px] justify-evenly   gap-8 p-3 md:w-[350px] ">
              {isPlaying ? (
                <button onClick={onVideoClick}>
                  <BsPauseFill className={videoButtons} />
                </button>
              ) : (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill className={videoButtons} />
                </button>
              )}

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
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
