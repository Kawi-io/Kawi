/* eslint-disable */
import { Popover } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import WalletComponent from "./WalletComponent";

const headerElements = [
  { name: "What is Kawi", href: "/#what" },
  { name: "Who are we", href: "/#who" },
  { name: "What is Blockchain", href: "/#blockchain" },
];

const logo = {
  name: "Kawi",
  src: "/images/kawi.png",
  href: "/",
};

const LandingElements = () => {
  return (
    <Popover.Group className="hidden lg:flex lg:gap-x-12">
      {headerElements.map((item) => (
        <Link
          key={headerElements.indexOf(item)}
          scroll={false}
          href={item.href}
          className="text-sm font-semibold leading-6 hover:text-gray-700 text-gray-900"
        >
          {item.name}
        </Link>
      ))}
    </Popover.Group>
  );
};

// TODO: DashboardElements y check log para mostrar icono de perfil en lugar de "acceder"

export const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href={logo.href} className="-m-1.5 p-1.5 flex items-center">
            <Image
              className="h-16 w-auto"
              width={200}
              height={200}
              src={logo.src}
              alt={`${logo.name} logo`}
            />
            <span className="font-title text-2xl inlines text-black">{logo.name}</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <WalletComponent />
        </div>

        {router.pathname === "/" ? <LandingElements /> : ""}

        {/* Login btn */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <WalletComponent />
        </div>
      </nav>

      <hr className="border-1 border-black" />
    </header>
  );
};
/* eslint-disable */
