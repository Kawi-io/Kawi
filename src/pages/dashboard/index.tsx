import { useState } from "react";
import { NextPage } from "next";
import { Container, Button, Card, Row, Text } from "@nextui-org/react";

import { NftGrid, UserGrid } from "~/components/index";

const Index: NextPage = () => {
  const [isNftList, setIsNftList] = useState(true);

  return (
    <>
      <Container className="p-3">
        <div className="">
          <h3>{isNftList ? "Your NFTs" : "Your employees"}</h3>
        </div>

        <div className="py-2">
          <Button.Group color="primary">
            <Button
              bordered={!isNftList}
              onPress={() => setIsNftList(true)}
            >
              Minted NFTs
            </Button>
            <Button
              bordered={isNftList}
              onPress={() => setIsNftList(false)}
            >
              Employees
            </Button>
          </Button.Group>

          <div className="m-2">
            <hr className="border-1 h-0.5 bg-black" />
          </div>
        </div>

        <div className="">{isNftList ? <NftGrid /> : <UserGrid />}</div>
      </Container>
    </>
  );
};

export default Index;
