import type { NextPage } from 'next';
import axios from 'axios';

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/posts`);
  return {
    props: {
      videos: data,
    },
  };
};

// interface Props{
//   videos:
// }

const Home: NextPage = ({ videos }) => {
  console.log(videos);
  return <div>hello</div>;
};

export default Home;
