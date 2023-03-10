/* eslint-disable */
import { type NextPage } from "next";
import Head from "next/head";
import {  useState } from "react";
import { Container, Grid } from "@nextui-org/react";
import ModalLoader from "./../../components/ModalLoader"


const Mint: NextPage = () => {
  const [formData, setFormData] = useState({
    nftName: "",
    nftDesc: "",
    nftSymbol: "",
    nftImage: "",
  });

  const handleInputChange = ({ target }: any) => {
    const { name, value } = target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event:any) => {
    event.preventDefault();
    console.log(formData)
    const res = await fetch('/api/postJsonMetadata', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(res.status)
  }

  const [loading, setLoading] = useState(false)

  return (
    <>
      <Head>
        <title>Mint a new certificate</title>
      </Head>

      <Container className="p-3">
        <div className="py-10 px-8 sm:px-40">
          <h1 className="text-center px-4 sm:px-0 sm:text-5xl">
            Mint a new <span className="text-purple">certificate</span>
          </h1>
        </div>
        <div className="my-3">
          <hr className="border-1 h-0.5 bg-black" />
        </div>
        <form onSubmit={(e) => {handleFormSubmit(e) }}>
          
        <input
            placeholder={"Titulo"}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            onChange={handleInputChange}
            required
            name="nftName"/>

        <input
            placeholder={"Descripcion"}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            onChange={handleInputChange}
            required
            name="nftDesc"/>
          
        <input
          placeholder={"Simbolo"}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          onChange={handleInputChange}
          required
          name="nftSymbol"/>
        <input
          placeholder={"Imagen"}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          onChange={handleInputChange}
          required
          name="nftImage"/>
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
              w-100
              flex justify-center
            "
              type="submit"
            />
          </form>
        <Grid.Container gap={2} justify="center">
        </Grid.Container>
      </Container>
      <ModalLoader loading={loading} />
    </>
  );
};

export default Mint;
/* eslint-disable */
