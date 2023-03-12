import { useRouter } from "next/router";
import { Grid, Button } from "@nextui-org/react";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Loading, UserCard } from "../index";

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
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/getEmployees", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: sessionStorage.getItem("publicKey"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        console.log(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid.Container gap={2} justify="center">
          {employees.length > 0 ? (
            <>
              {employees.map((item) => (
                <Grid lg={3} sm={4} key={users.indexOf(item)}>
                  <UserCard
                    name={item.name}
                    email={item.email}
                    wallet={item.wallet}
                  />
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
            </>
          ) : (
            <div className="text-center py-20">
              <p className="mt-6 text-base leading-7 text-gray-600 text-lg md:text-xl">
                Nothing here...{" "}
                <Link
                  className="hover:underline font-bold"
                  href="/dashboard/new"
                >
                  {" "}
                  Try adding a new employee to your company{" "}
                </Link>
              </p>
            </div>
          )}
        </Grid.Container>
      )}
    </>
  );
};
