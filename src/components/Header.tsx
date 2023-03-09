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
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {session ? (
            <Button color="primary" size="lg" auto>
              Access
            </Button>
          ) : (
            ""
          )}
          {/* TODO:  Agregar aqui check si esta en perfil propio */}
          {router.pathname.includes("/dashboard") || router.pathname.includes("/profile")  ? <DashboardElements /> : ""}
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
