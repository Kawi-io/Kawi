/* eslint-disable */
import { type NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Metaplex } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, type PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Container, Button, Row, Col, Text, Dropdown } from "@nextui-org/react";

import { NftCard } from "../../components/index";

// TODO: Eliminar despues, esto es para pruebas
const users = [
  {
    name: "John Doe",
    wallet: "fys78d6fas211c341fd2s",
  },
  {
    name: "John Doe",
    wallet: "fys78d6fas211c341fd2s",
  },
  {
    name: "John Doe",
    wallet: "fys78d6fas211c341fd2s",
  },
];

type Option = {
  key: string;
  value: string;
};

const _connection = new Connection(clusterApiUrl("devnet"));
const mx = Metaplex.make(_connection);

const Transfer: NextPage = () => {
  const { publicKey } = useWallet();

  const [list, setList] = useState<any[]>([]);

  const fetchNFTs = async (length: number, _publicKey: PublicKey) => {
    if (length === 0) {
      try {
        const aux = await mx.nfts().findAllByOwner({ owner: _publicKey });
        console.log(aux);
        aux.forEach((item) => {
          if (item.model == "metadata")
            addElementsToList(item.name, item.mintAddress.toString());
        });
        addElementsToList("", "");
        // return aux;
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (publicKey == null) {
      return;
    }
    fetchNFTs(list.length, publicKey);
  }, [publicKey]);

  const [formData, setFormData] = useState({
    wallet: "",
    certificate: "",
    privateKey: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // await PrepareTransaction();
    if (
      formData.privateKey === "" ||
      formData.wallet === "" ||
      formData.certificate === ""
    ) {
      alert("missing data");
    }
    console.log(formData.certificate);
    const response = await fetch("/api/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        OwnerSecretKey: formData.privateKey,
        reciberWaller: formData.wallet,
        tokenHash: formData.certificate,
      }),
    });
    console.log(response);
    if (response.status === 200) {
      alert("transfer made");
    } else {
      alert("transfer error");
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addElementsToList = (text: string, value: string) => {
    const newOption: Option = { key: text, value: value };
    setList((prevList) => [...prevList, newOption]);
  };

  return (
    <>
      <Container className="p-3">
        <div className="py-10 px-8 sm:px-40">
          <h1 className="text-center px-4 sm:px-0 text-3xl sm:text-5xl">
            Certificate an <span className="text-purple">employee</span>
          </h1>
        </div>
        <div className="my-3">
          <hr className="border-1 h-0.5 bg-black" />
        </div>

        <Row justify="center" className="my-5">
          <Col span={6}>
            <NftCard
              title="TitleTest"
              image="https://nextui.org/images/card-example-6.jpeg"
              description="Description"
              symbol="Symbol"
            />
          </Col>
          <Col span={6}>
            <div className="p-10">
              <div>
                <Text>You're about to send an "NFT name" </Text>
                <Text>From: "Wallet" </Text>
              </div>

              <form onSubmit={handleFormSubmit} className="mt-5 block">
                <div className="col-span-6 sm:col-span-3">
                  <div className="mt-5 col-span-6 sm:col-span-3">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="employee"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Employee ...
                      </label>
                      <select
                        id="employee"
                        name="employee"
                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {users.map((user) => (
                          <option key={users.indexOf(user)} value={user.wallet}>
                            {user.name}: {user.wallet}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 text-center sm:px-6 mt-4">
                  <button
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      px-10
                      py-3
                      text-sm
                      font-medium
                      shadow-sm
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-offset-2
                      bg-teal
                      hover:bg-teal-900
                      focus:ring-teal-500
                      text-white
                      border-transparent
                      w-full
                      flex justify-center
                    "
                    type="button"
                  >
                    <span>Transfer</span>
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Transfer;
/* eslint-disable */
