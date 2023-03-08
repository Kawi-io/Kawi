/* eslint-disable */
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";

import { LandingElements, DashboardElements } from "../components/index";

const logo = {
  name: "Kawi",
  src: "/images/kawi.png",
  href: "/",
};

// TODO: DashboardElements y check log para mostrar icono de perfil en lugar de "acceder"

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // TODO: Este state es para ver si hay una sesion o no
  const [session, setSession] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-white">
      {/* Menu web */}
      <nav
        className="mx-auto flex items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        {/* Elements */}
        <div className="flex lg:flex-1">
          <Link href={logo.href} className="-m-1.5 p-1.5 flex items-center">
            <Image
              className="h-16 w-auto"
              width={200}
              height={200}
              src={logo.src}
              alt={`${logo.name} logo`}
            />
            <span className="font-title text-2xl inlines text-black">
              {logo.name}
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {router.pathname === "/" ? <LandingElements /> : ""}
          {router.pathname.includes("/dashboard") ? <DashboardElements /> : ""}
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {session ? (
            <Button color="primary" size="lg" auto>
              Access
            </Button>
          ) : (
            ""
          )}
          <Button
            auto
            color="primary"
            ghost
            className="mx-2"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          <Button
            auto
            color="primary"
            ghost
            className="mx-2"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>
      </nav>

      {/* Menu mobile */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href={logo.href} className="-m-1.5 p-1.5 flex items-center">
              <Image
                className="h-16 w-auto"
                width={200}
                height={200}
                src={logo.src}
                alt={`${logo.name} logo`}
              />
              <span className="font-title text-2xl inlines text-black">
                {logo.name}
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {router.pathname === "/" ? <LandingElements /> : ""}
                {router.pathname.includes("/dashboard") ? (
                  <DashboardElements />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
/* eslint-disable */
