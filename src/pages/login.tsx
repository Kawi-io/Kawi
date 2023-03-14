import { Container, Row } from "@nextui-org/react";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import WalletComponent from "~/components/WalletComponent";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { CustomModal } from "../components/index";
import ModalLoader from "../components/ModalLoader"
import { useAutoConnect } from "~/components/AutoConnectProvider";
import { FormControlLabel, Switch, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';

const Home: NextPage = () => {
  const router = useRouter();
  const { wallet, publicKey } = useWallet();
  const [profileData, setProfileData] = useState<any>();
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<any>({
    visible: false,
    title: "",
    text: "",
    onAcept:null,
    onCancel:null,
  });
  const checkUserSession:any = () => {
    console.log("Checking user session")
    const is_loged:boolean = ( sessionStorage.getItem("publicKey") != "" &&
    sessionStorage.getItem("publicKey") == publicKey!.toBase58()) ? true : false
    console.log("is loged: "+is_loged)
    const is_company =(sessionStorage.getItem("isCompany") == "true") ? true : false
    // console.log(is_company)
    if(is_loged){
      is_company ? router.push("/dashboard") : router.push("/profile/"+sessionStorage.getItem("publicKey"));
    }
    return is_loged
  }
  async function fetchData() {
    if( publicKey == null || checkUserSession()) return
    setLoading(true)
    //aqui tenemos que revisar si la wallet esta registrada
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
      
      if(data != null){
        console.log(1)
        setProfileData(data)
      }
      else{
        console.log(2) 
        setModal({
            ...modal,
            title: "Error",
            visible:true,
            text: "You are not registered, register to Kawi to continue",
            onAcept:()=>{onModalCancel(); setLoading(true); router.push("/register"); },
            onCancel:() => {onModalCancel()}
          });
        }
    } catch (error) {
      console.error(error);
    }

    setLoading(false)
  }

  useEffect(() => {
    if(!publicKey || checkUserSession()) return

    setModal({
      ...modal,
      title: "Wallet detected",
      text: "Do you wish to use this wallet? " + publicKey?.toBase58(),
      visible:true,
      onAcept:()=>{onModalAcept()},
      onCancel:()=>{
        onModalCancel();
        setModal({
          ...modal,
          title: "Change your wallet",
          text: "Please change your wallet to continue.",
          visible:true,
        })}
    });

  }, [publicKey]);

  const onModalAcept = () => {
    fetchData();
    setModal({
      ...modal,
      visible:false
    });
  }
  const onModalCancel = () => {
    setModal({
      ...modal,
      visible:false,
      onAcept:null,
      onCancel:null,
    });
  }
  useEffect(() =>{
    if(!profileData) return
     //guardamos la pbkey
    console.log(profileData);
    sessionStorage.setItem("isCompany", profileData.is_company);
    sessionStorage.setItem("publicKey", profileData._id);
    console.log("Session set, sent to revision")
    checkUserSession()
    
  },[profileData])

  return (
    <>
      <CustomModal
        visible={modal.visible}
        title={modal.title}
        text={modal.text}
        close={() => setModal({ ...modal, visible: false })}
        onAcept={ modal.onAcept }
        onCancel={ modal.onCancel}
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
      </Container>
      <ModalLoader loading={loading}/>
    </>
    );
};

export default Home;
