import { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Container } from "@nextui-org/react";
import { NftGrid, UserGrid } from "~/components/index";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { ModalLoader, CustomModal } from "~/components/index";
import Head from 'next/head';
type Props = { host: string | null };
export const getServerSideProps: GetServerSideProps<any> = async (context) => ({
  props: { host: context.req.headers.host || null },
});

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}


const Index: NextPage<Props> = ({ host }) => {
  const [loading, setLoading] = useState(false);
  const [isNftList, setIsNftList] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [isValidProfile, setIsValidProfile]= useState(false);
  
  const router = useRouter();
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    text: "",
    close:()=>{},
  });
  const wallet = useAnchorWallet();

  useEffect(() => {
    if (wallet == null) return
    const publicKey = sessionStorage.getItem("publicKey");
    const isCompany = sessionStorage.getItem("isCompany")

    if (wallet.publicKey.toBase58() != publicKey){
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
    setLoading(true);
    


    if (!publicKey || isCompany == "false") {
      router.push("/");
    } else {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

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
        {(isNftList && isValidProfile) ? <NftGrid /> : <UserGrid /> }
      </Container>
      <ModalLoader loading={loading} />
    </>
  );
};

export default Index;
