import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Container, Button, Card, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import ModalLoader from "../../components/ModalLoader"

import { NftGrid, UserGrid } from "~/components/index";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Index: NextPage = () => {
  const [isNftList, setIsNftList] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const publicKey = sessionStorage.getItem('publicKey');
    //si no hay pubkey, o si la que hay no esta registrada como empresa
    if (!publicKey) {
      router.push('/');
    }
    else{
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Container className="p-3">
        {/* <div className="py-4">
          <h3 className="text-center">{isNftList ? "Your NFTs" : "Your employees"}</h3>
        </div> */}

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

        <div className="">{isNftList ? <NftGrid /> : <UserGrid />}</div>
      </Container>
      ) : (
        <ModalLoader loading={true}/>
      )}
      
    </>
  );
};

export default Index;
