import { Container, Row } from "@nextui-org/react";
import { type NextPage } from "next";
import Head from "next/head";
import WalletComponent from "~/components/WalletComponent";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login to your account</title>
      </Head>

      <Container>
        <div className="py-10 px-8 sm:px-40">
          <h1 className="text-center px-4 sm:px-0 text-3xl sm:text-5xl">
            Login to your <span className="text-purple">account</span>
          </h1>
        </div>
        <div className="my-3">
          <hr className="border-1 h-0.5 bg-black" />
        </div>
        <Row className="py-24" justify="center">
          <WalletComponent />
        </Row>
      </Container>
    </>
  );
};

export default Home;
