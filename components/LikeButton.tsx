import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/auth';

interface Props {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDislike, likes }: Props) => {
  const [userAlreadyLiked, setUserAlreadyLiked] = useState(true);
  const { userProfile }: any = useAuthStore();
  let filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setUserAlreadyLiked(true);
    } else {
      setUserAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="gap-6  z-[90]">
      <div className="mt-4 flex cursor-pointer flex-col  md:justify-center items-center p-3 ">
        {userAlreadyLiked ? (
          <div
            onClick={handleDislike}
            className=" bg-gray-100 rounded-full p-2 md:p-4  text-red-600  my-2  hover:scale-125 transition-all duration-200"
          >
            <MdFavorite className="text-base md:text-xl" />
          </div>
        ) : (
          <div
            onClick={handleLike}
            className=" bg-gray-100 rounded-full p-2 md:p-4  text-gray-400 hover:scale-125 transition-all duration-200 my-2"
          >
            <MdFavorite className="text-base md:text-xl" />
          </div>
        )}
        <p className="text-base font-semibold text-gray-500 px-3">
          {likes?.length || 0}
        </p>
      </div>
    </div>
  );
};
export default LikeButton;
