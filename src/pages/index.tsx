import { type NextPage } from "next";
import { Blockchain } from "~/components/Blockchain";
import { Landing } from '../components/Landing';
import { What } from '../components/What';
import { Who } from '../components/Who';

const Home: NextPage = () => {
  return (
    <>
      <Landing />
      <What />
      <Who />
      <Blockchain />
    </>
  );
};

export default Home;
