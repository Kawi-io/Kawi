import { type NextPage } from "next";
import { Landing } from '../components/Landing';
import { What } from '../components/What';
import { Who } from '../components/Who';

const Home: NextPage = () => {
  return (
    <>
      <Landing />
      <What />
      <Who />
    </>
  );
};

export default Home;
