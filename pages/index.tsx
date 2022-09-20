import type { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../types/types';
import { NoVideosFound, VideoCard } from '../components';
import { BASE_URL } from '../utils';

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/posts`);
  }

  return {
    props: {
      videos: response.data,
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
        <NoVideosFound />
      )}
    </div>
  );
};

export default Home;
