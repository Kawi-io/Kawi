import { useRouter } from "next/router";
import { Grid, Card, Row, Button } from "@nextui-org/react";
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

  // Esta accion se llama al hacer click en mint, solo hay que modificarla
  // TODO: Pasar como query param el id del NFT
  const transfer = () => {
    // router.push(`/transfer/${nft}`)
    router.push('/dashboard/transfer')
  };

  return (
    <Grid.Container gap={2} justify="center">
      {nfts.map((item) => (
        <Grid lg={3} sm={4} key={nfts.indexOf(item)}>
          <NftCard
            title={item.title}
            image={item.image}
            description={item.description}
            btnText="Transfer"
            event={transfer}
          />
        </Grid>
      ))}
      <Grid lg={3} sm={4}>
        <Button
          bordered
          ghost
          auto
          css={{ w: "100%", h: "250px" }}
          onPress={() => router.push("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </Grid>
    </Grid.Container>
  );
};
