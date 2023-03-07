import { useRouter } from "next/router";
import { Grid, Card, Row } from "@nextui-org/react";
import { UserCard } from "./UserCard";
import { PlusIcon } from "@heroicons/react/20/solid";

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
        <Card
          isHoverable
          isPressable
          variant="shadow"
          onPress={() => router.push("/")}
          css={{ w: "100%", h: "180px" }}
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
