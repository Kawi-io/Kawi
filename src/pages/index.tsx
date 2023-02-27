import { type NextPage } from "next";
import { Landing } from '../components/Landing';
import { What } from '../components/What';

const Home: NextPage = () => {
  return (
    <>
      <Landing />
      <What />
    </>
  );
};

export default Home;
