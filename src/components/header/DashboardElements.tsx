import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

const icons = [
  {
    name: "Home",
    pathname: "/dashboard",
    path: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
    ),
  },
  {
    name: "Mint",
    pathname: "/dashboard/mint",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Add employee",
    pathname: "add",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
      </svg>
    ),
  },
];

const CustomButton = ({ bordered, icon, event }: any) => {
  return (
    <Button
      bordered={bordered}
      className="mx-2"
      auto
      icon={icon}
      onPress={event}
    />
  );
};

export const DashboardElements = ({ mobile = false }) => {
  const router = useRouter();

  const event = (path: string) => {
    router.push(path);
  };

  return (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      {icons.map((icon) => {
        if (!mobile) {
          return (
            <CustomButton
              key={icons.indexOf(icon)}
              bordered={!(router.pathname === icon.pathname)}
              color="primary"
              icon={icon.icon}
              event={() => event(icon.pathname)}
            />
          );
        } else {
          return (
            <Link
              key={icons.indexOf(icon)}
              scroll={false}
              href={icon.pathname}
              className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              {icon.name}
            </Link>
          );
        }
      })}
    </div>
  );
};
