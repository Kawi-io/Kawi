import { Container, Input, Text } from "@nextui-org/react";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Mint: NextPage = () => {
  const [wallet, setWallet] = useState("");

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    console.log(wallet);
    console.log("something is done here");
  };

  const handleInputChange = ({ target }: any) => {
    setWallet(target.value);
  };

  return (
    <>
      <Head>
        <title>New employee</title>
      </Head>

      <Container className="p-3">
        <div className="py-10 px-8 sm:px-40">
          <h1 className="text-center px-4 sm:px-0 sm:text-5xl">
            Add an <span className="text-purple">employee</span> to your company
          </h1>
        </div>
        <div className="my-3">
          <hr className="border-1 h-0.5 bg-black" />
        </div>
        <div className="text-center my-5">
          <div className="">
            <Text>
              Before you start giving certifications to your employees you must
              register in your organization. Remember your employee must be
              registered to Kawi to do this.
            </Text>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="flex justify-center my-5">
              <div className=" mt-5 w-3/4 col-span-6 sm:col-span-3">
                <label
                  htmlFor="wallet"
                  className="block text-sm font-medium text-gray-700"
                >
                  Wallet
                </label>
                <input
                  type="text"
                  name="wallet"
                  id="wallet"
                  placeholder="Your employee's wallet"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
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
                w-60
                flex justify-center
            "
              type="submit"
            >
              <span>Register</span>
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Mint;
