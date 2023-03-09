import { useRouter } from "next/router";
import { Grid, Card, Row, Button } from "@nextui-org/react";
import { UserCard } from "./UserCard";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid";

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

// TODO: Redireccionar a pagina linkear usuario
export const UserGrid = () => {
  const router = useRouter();

  return (
    <Grid.Container gap={2} justify="center">
      {users.map((item) => (
        <Grid lg={3} sm={4} key={users.indexOf(item)}>
          <UserCard name={item.name} email={item.email} wallet={item.wallet} />
        </Grid>
      ))}
      <Grid lg={3} sm={4}>
        <Button
          bordered
          ghost
          auto
          css={{ w: "100%", h: "180px" }}
          onPress={() => router.push("/dashboard/new")}
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
