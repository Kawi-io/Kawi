import { useRouter } from "next/router";
import { Grid, Card, Row } from "@nextui-org/react";
import { NftCard } from "./NftCard";
import { PlusIcon } from "@heroicons/react/20/solid";

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

// TODO: Optimizar NFTGrid y UserGrid
export const NftGrid = () => {
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
