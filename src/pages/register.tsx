/* eslint-disable */

import { type NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container } from "@nextui-org/react";

import { CustomModal } from "~/components/index";
import Head from "next/head";
import WalletComponent from "~/components/WalletComponent";

const user_fields = [
  {
    label: "Name",
    type: "text",
    name: "name",
    autoComplete: "given-name",
    placeholder: "Your full name",
  },
  {
    label: "Birthdate",
    type: "date",
    name: "birthdate",
    autoComplete: "",
  },
  {
    label: "Profession",
    type: "text",
    name: "profession",
    autoComplete: "",
    placeholder: "What do you do for a living?",
  },
  {
    label: "Country of residence",
    type: "text",
    name: "country_residence",
    autoComplete: "country-name",
    placeholder: "Your country of residence",
  },
  {
    label: "Nationality",
    type: "text",
    name: "nationality",
    autoComplete: "country-name",
    placeholder: "Your country of nationality",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    autoComplete: "email",
    placeholder: "youremail@here.com",
  },
];

const company_fields = [
  {
    label: "Company's name",
    type: "text",
    name: "company_name",
    autoComplete: "organization",
    placeholder: "Your company's name",
  },
  {
    label: "Business Field",
    type: "text",
    name: "business_field",
    autoComplete: "",
    placeholder: "What is your company about?",
  },
];

const Register: NextPage = () => {
  const [isCompany, setIsCompany] = useState(false);
  const router = useRouter();
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    text: "",
  });
  const [formData, setFormData] = useState({
    _id: "",
    population_registry: "",
    about: "",
    name: "",
    profession: "",
    nationality: "",
    birthdate: "",
    country_residence: "",
    email: "",
    business_field: "",
    is_company: "",
  });

  const { publicKey } = useWallet();

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      _id: publicKey?.toBase58(),
    }));
  }, [publicKey]);

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      is_company: isCompany,
    }));
  }, [isCompany]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    if (formData._id) {
      fetch("/api/postDocument", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.acknowledged && publicKey) {
            event.target.reset();
            sessionStorage.setItem("publicKey", publicKey?.toBase58());
            router.push(`/profile/${publicKey}`);
          } else {
            setModal({
              ...modal,
              visible: true,
              title: "Error",
              text: "El usuario ya esta registrado",
            });
          }
        })
        .catch((error) =>
          setModal({ ...modal, visible: true, title: "Error", text: error })
        );

      return;
    }
    setModal({
      ...modal,
      visible: true,
      title: "Error",
      text: "Please connect your wallet to proceed",
    });
  };

  // Manejo de cambios en los campos del form
  const handleInputChange = ({ target }: any) => {
    const { name, value } = target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <CustomModal
        visible={modal.visible}
        title={modal.title}
        text={modal.text}
        close={() => setModal({ ...modal, visible: false })}
      />

      <Container className="p-3">
        <div className="py-5 px-8 sm:px-40">
          <h1 className="text-center px-4 sm:px-0 sm:text-5xl">
            <span className="text-purple">
              {isCompany ? "Company" : "Professional"}
            </span>{" "}
            acount
          </h1>
        </div>
        <p className="text-center mt-2 text-center text-sm text-gray-600">
          Want to register as a {isCompany ? "user" : "company"}?{" "}
          <button
            onClick={() => setIsCompany(!isCompany)}
            className="font-medium text-gray-600 hover:text-gray-500"
          >
            Click here
          </button>
        </p>
        <div className="my-3">
          <hr className="border-1 h-0.5 bg-black" />

          <form onSubmit={handleFormSubmit} className="mt-5">
            <div>
              <div className="mt-5 col-span-6 sm:col-span-3">
                <label
                  htmlFor="population_registry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Population Registry
                </label>
                <input
                  type="text"
                  name="population_registry"
                  id="population_registry"
                  placeholder="Your country's population registry"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  onChange={handleInputChange}
                  required
                />
              </div>
              {isCompany
                ? company_fields.map((item) => (
                    <div
                      key={company_fields.indexOf(item)}
                      className="mt-5 col-span-6 sm:col-span-3"
                    >
                      <label
                        htmlFor={item.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        name={item.name}
                        id={item.name}
                        placeholder={item.placeholder}
                        autoComplete={item.autoComplete}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  ))
                : user_fields.map((item) => (
                    <div
                      key={user_fields.indexOf(item)}
                      className="mt-5 col-span-6 sm:col-span-3"
                    >
                      <label
                        htmlFor={item.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        name={item.name}
                        id={item.name}
                        placeholder={item.placeholder}
                        autoComplete={item.autoComplete}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  ))}
            </div>
            <div className="mt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                About {isCompany ? "your company" : "you"}
              </label>
              <textarea
                name="about"
                id="about"
                rows={3}
                placeholder={
                  isCompany
                    ? "Brief description for your company's profile"
                    : "Brief description for your profile"
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-5 flex justify-center">
              <WalletComponent />
            </div>
            <div className="px-4 py-3 text-center sm:px-6">
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
              >
                <p>Register</p>
              </button>{" "}
            </div>
          </form>

          {isCompany ? "" : ""}
        </div>
      </Container>
    </>
  );
};

export default Register;
/* eslint-disable */
