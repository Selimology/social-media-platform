import type { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../types/types';
import { NoVideosFound, VideoCard } from '../components';

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/posts`);
  return {
    props: {
      videos: data,
    },
  };
};

interface Props {
  videos: Video[];
}

const Home = ({ videos }: Props) => {
  console.log(videos);
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoVideosFound text={'No Videos'} />
      )}
    </div>
  );
};

export default Home;
