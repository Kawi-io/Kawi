import { type NextPage } from "next";
import How from "~/components/How";
import { Blockchain, Landing, What, Who } from "~/components/index";

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
