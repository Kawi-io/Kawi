import { Container, Row } from "@nextui-org/react";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import WalletComponent from "~/components/WalletComponent";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { CustomModal } from "../components/index";

const Home: NextPage = () => {
  const router = useRouter();
  const { wallet, publicKey } = useWallet();
  const [profileData, setProfileData] = useState<any>();
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    text: "",
  });

  useEffect(() => {
    if (
      sessionStorage.getItem("publicKey") &&
      sessionStorage.getItem("isCompany")
    ) {
      router.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log("useEfect");
      // if(wallet == null || publicKey == null) return

      if (
        sessionStorage.getItem("publicKey") &&
        sessionStorage.getItem("isCompany")
      ) {
        return;
      }

      //aqui tenemos que revisar si la wallet esta registrada
      if (publicKey) console.log(publicKey.toBase58());

      if (publicKey) {
        try {
          const response = await fetch("/api/getDocument", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              coll: "users",
              id: publicKey,
            }),
          });
          const data = await response.json();
          data ? setProfileData(data) : setModal({...modal, title:"Error", text: "You are not registered, register to Kawi to continue"});
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }

      //guardamos la pbkey
      if (publicKey) sessionStorage.setItem("publicKey", publicKey.toBase58());
      console.log(profileData);
      if (profileData) {
        sessionStorage.setItem("isCompany", profileData.is_company);
      }
    }

    fetchData();
  }, [publicKey]);

  return (
    <>
      <CustomModal
        visible={modal.visible}
        title={modal.title}
        text={modal.text}
        close={() => setModal({ ...modal, visible: false })}
      />
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
      <WalletComponent />
      </Container>
    </>
    );
};

export default Home;
