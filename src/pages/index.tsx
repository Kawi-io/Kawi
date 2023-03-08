import { type NextPage } from "next";
import { Blockchain } from "~/components/Blockchain";
import { Landing } from '../components/Landing';
import { What } from '../components/What';
import { Who } from '../components/Who';
import How from "~/components/How";

const Home: NextPage = () => {
  return (
    <>
      <Landing />
      <What />
      <How />
      <Blockchain />
      <Who />
    </>
  );
};

export default Home;
