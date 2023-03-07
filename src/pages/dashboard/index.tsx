import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { NextPage } from "next";
import { Grid, Container, Button, Card, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

import { NftCard } from "~/components/dashboard/NftCard";
import { UserCard } from "~/components/dashboard/UserCard";

// TODO: Eliminar, for testing
const nfts = [
  {
    title: "NFT Title",
    image: "https://nextui.org/images/card-example-6.jpeg",
    description:
      "This is a very cool NFT which shows you have been working in the company for x amount of time, congrats!",
  },
  {
    title: "NFT Title",
    image: "https://nextui.org/images/card-example-6.jpeg",
    description:
      "This is a very cool NFT which shows you have been working in the company for x amount of time, congrats!",
  },
  {
    title: "NFT Title",
    image: "https://nextui.org/images/card-example-6.jpeg",
    description:
      "This is a very cool NFT which shows you have been working in the company for x amount of time, congrats!",
  },
];

// TODO: Eliminar, for testing
const users = [
  {
    name: "John Smith",
    email: "john@smith.com",
    wallet: "DqUXJ7vP3poUJ46MnfxwNetKQQ64S8GowTbKRVNnhPJV",
  },
  {
    name: "John Smith",
    email: "john@smith.com",
    wallet: "9U7ZTupH5jVP51F91d8gc79NNVbV9am29RtQTuuMxmow",
  },
  {
    name: "John Smith",
    email: "john@smith.com",
    wallet: "6vAAaogpRsZM3ZoLGFtJqLdPTsGVtT1h7S7qg9CMCvds",
  },
];

// TODO: Optimizar NFTGrid y UserGrid
const NftGrid = () => {
  const router = useRouter();

  return (
    <Grid.Container gap={2} justify="center">
      {nfts.map((item) => (
        <Grid lg={3} sm={4} key={nfts.indexOf(item)}>
          <NftCard
            title={item.title}
            image={item.image}
            description={item.description}
          />
        </Grid>
      ))}
      <Grid lg={3} sm={4}>
        <Card
          isHoverable
          isPressable
          variant="shadow"
          onPress={() => router.push("/mint")}
          css={{ w: "100%", h: "250px" }}
        >
          <Card.Body css={{ h: "100", w: "100%" }}>
            <Row justify="center" align="center" css={{ h: "100%", w: "100%" }}>
              <PlusIcon className="h-16 w-16 text-teal" />
            </Row>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

// TODO: Redireccionar a pagina linkear usuario
const UserGrid = () => {

  const router = useRouter();

  return (
    <Grid.Container gap={2} justify="center">
      {users.map((item) => (
        <Grid lg={3} sm={4} key={users.indexOf(item)}>
          <UserCard name={item.name} email={item.email} wallet={item.wallet} />
        </Grid>
      ))}
      <Grid lg={3} sm={4}>
        <Card
          isHoverable
          isPressable
          variant="shadow"
          onPress={() => router.push("/")}
          css={{ w: "100%", h: "200px" }}
        >
          <Card.Body>
            <Row justify="center" align="center" css={{ h: "100%", w: "100%" }}>
              <PlusIcon className="h-16 w-16 text-teal" />
            </Row>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

const Index: NextPage = () => {
  const [isNftList, setIsNftList] = useState(false);

  return (
    <>
      <Container className="p-3">
        <div className="">
          <h3>{isNftList ? "Your NFTs" : "Your employees"}</h3>
        </div>

        <div className="py-2">
          <Button.Group color="primary" bordered ghost>
            <Button
              disabled={isNftList}
              onPress={() => setIsNftList(!isNftList)}
            >
              Minted NFTs
            </Button>
            <Button
              disabled={!isNftList}
              onPress={() => setIsNftList(!isNftList)}
            >
              Employees
            </Button>
          </Button.Group>

          <hr className="border-1 h-0.5 bg-black" />
        </div>

        <div className="">{isNftList ? <NftGrid /> : <UserGrid />}</div>
      </Container>
    </>
  );
};

export default Index;
