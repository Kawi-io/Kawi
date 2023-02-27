import { type NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";

const user_fields = [
  {
    key: 1,
    label: "Name",
    type: "text",
    name: "name",
    autoComplete: "given-name",
    placeholder: "Your full name",
  },
  {
    key: 2,
    label: "Birthdate",
    type: "date",
    name: "birthdate",
    autoComplete: "",
  },
  {
    key: 3,
    label: "Profession",
    type: "text",
    name: "profession",
    autoComplete: "",
    placeholder: "What do you do for a living?",
  },
  {
    key: 4,
    label: "Country of residence",
    type: "text",
    name: "country_residence",
    autoComplete: "country-name",
    placeholder: "Your country of residence",
  },
  {
    key: 5,
    label: "Nationality",
    type: "text",
    name: "nationality",
    autoComplete: "country-name",
    placeholder: "Your country of nationality",
  },
  {
    key: 6,
    label: "Email",
    type: "email",
    name: "email",
    autoComplete: "email",
    placeholder: "youremail@here.com",
  },
];

const company_fields = [
  {
    key: 1,
    label: "Company's name",
    type: "text",
    name: "company_name",
    autoComplete: "organization",
    placeholder: "Your company's name",
  },
  {
    key: 2,
    label: "Business Field",
    type: "text",
    name: "business_field",
    autoComplete: "",
    placeholder: "What is your company about?",
  },
];

const Register: NextPage = () => {
  const [isCompany, setIsCompany] = useState(false);
  const [formData, setFormData] = useState({
    _id: "", // TODO: Wallet id here, aun no funcinal
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

  console.log(publicKey?.toBase58());

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
          // event.target.reset();
          console.log(data);

          data.acknowledged
            ? alert("Te has registrado con éxito")
            : alert("El usuario ya fue registrado");
        })
        .catch((error) => alert("El usuario ya fue registrado"));

        return
    }

    alert("Please connect your wallet first")

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
      <div className="py-10 px-8 sm:px-40">
        <h2 className="text-center">
          Create your {isCompany ? "company" : "user"} account
        </h2>

        <p className="text-center mt-2 text-center text-sm text-gray-600">
          Want to register as a {isCompany ? "company" : "user"}?{" "}
          <button
            onClick={() => setIsCompany(!isCompany)}
            className="font-medium text-gray-600 hover:text-gray-500"
          >
            Click here
          </button>
        </p>

        <form onSubmit={handleFormSubmit} className="mt-5">
          <div>
            {isCompany
              ? company_fields.map(
                  ({ key, name, label, type, autoComplete, placeholder }) => (
                    <div key={key} className="mt-5 col-span-6 sm:col-span-3">
                      <label
                        htmlFor={name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        id={name}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )
                )
              : user_fields.map(
                  ({ key, name, label, type, autoComplete, placeholder }) => (
                    <div>
                      <label
                        htmlFor={name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        id={name}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )
                )}
          </div>
          <div className="mt-5">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              About your company
            </label>
            <textarea
              name="about"
              id="about"
              rows={3}
              placeholder="Brief description for your company's profile."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              onChange={handleInputChange}
            />
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
    </>
  );
};

export default Register;
