/* eslint-disable */
import { type NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Metaplex } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, type PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";

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
      <div className="py-10 px-8 sm:px-40">
        <h2 className="text-center">Transfer a <span className="text-purple">certificate</span> </h2>
        <p className="mt-4 text-center">
          Let's get started! Send a certification to your employees in the shape
          of an NFT.
          <br />
          No NFTs yet ?{" "}
          <Link
            className="font-medium text-gray-600 hover:text-gray-500"
            href="/mint"
          >
            {" "}
            Mint one here !{" "}
          </Link>
        </p>

        <form onSubmit={handleFormSubmit} className="mt-5">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="certificate"
              className="block text-sm font-medium text-gray-700"
            >
              Choose the certificate
            </label>
            <select
              id="certificate"
              name="certificate"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              onChange={handleSelectChange}
              value={formData.certificate}
            >
              {list.map(({ key, value }) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
            </select>

            <div className="mt-5 col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Wallet ID
              </label>
              <input
                name="wallet"
                type="text"
                placeholder="e.g. a6ffed9-4252-427e-af7d-3dcaaf2db2df"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                onChange={handleInputChange}
                value={formData.wallet}
              />
            </div>
          </div>
          <div className="mt-5 col-span-6 sm:col-span-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Private Key
              </label>
              <input
                name="privateKey"
                type="text"
                placeholder="e.g. a6ffed9-4252-427e-af7d-3dcaaf2db2df"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                onChange={handleInputChange}
                value={formData.privateKey}
              />
            </div>
          </div>

          <div className="px-4 py-3 text-center sm:px-6 mt-4">
            <button
              type="submit"
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
              w-60
              flex justify-center
          "
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Transfer;
/* eslint-disable */
