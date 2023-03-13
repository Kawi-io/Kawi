import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Container } from "@nextui-org/react";
import { NftGrid, UserGrid } from "~/components/index";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { ModalLoader, CustomModal } from "~/components/index";
import Head from 'next/head';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Index: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [isNftList, setIsNftList] = useState(true);
  
  const [isValidProfile, setIsValidProfile]= useState(false);
  
  const router = useRouter();
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    text: "",
    close:()=>{},
  });
  const { publicKey} = useWallet();

  useEffect(() => {
    if (publicKey == null) return
    const _publicKey = sessionStorage.getItem("publicKey");
    const isCompany = sessionStorage.getItem("isCompany")
    if(isCompany!="true"){ router.push("/") }
    if (publicKey.toBase58() != _publicKey){
      setModal({
        visible: true,
        title: "Error",
        text: "The wallet has been changed, plase use the owner's wallet to continue",
        close: () => setModal({ ...modal, visible: false }),
      })
      setIsValidProfile(false)
      return
    }
    setIsValidProfile(true)
    setLoading(false);
    
  }, [publicKey]);

  return (
    <>
    <CustomModal
        visible={modal.visible}
        title={modal.title}
        text={modal.text}
        close={modal.close}
      />

      <Head>
        <title>Your dashboard</title>
      </Head>

      <Container className="p-3">
        <div className="py-2">
          <div className="hidden sm:block">
            <div
              className="isolate flex divide-x divide-gray-200 rounded-lg"
              aria-label="Tabs"
            >
              <button
                onClick={() => setIsNftList(true)}
                className={classNames(
                  isNftList
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-700",
                  "rounded-l-lg",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                )}
                aria-current={isNftList}
              >
                <span className="text-lg"> My certificates </span>
              </button>
              <button
                onClick={() => setIsNftList(false)}
                className={classNames(
                  !isNftList
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-700",
                  "rounded-r-lg",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                )}
                aria-current={!isNftList}
              >
                <span className="text-lg">My employees</span>
              </button>
            </div>
          </div>

          <div className="m-2">
            <hr className="border-1 h-0.5 bg-black" />
          </div>
        </div>
        { isValidProfile ? isNftList ? <NftGrid /> : <UserGrid /> : null }
      </Container>
      <ModalLoader loading={loading} />
    </>
  );
};

export default Index;
