import { useState } from 'react'
import PropTypes from 'prop-types';
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import  Link from 'next/link';
import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid';
import  Image  from "next/image";
import WalletComponent from './WalletComponent';

const headerElements = [
  { key: 1, name: 'What is Kawi', href: '#what' },
  { key: 2, name: 'Who are we', href: '#who' },
  { key: 3, name: 'What is Blockchain', href: '#blockchain' },
];

const logo = {
  name: 'Kawi',
  src: '/images/kawi.png',
  href: '/'
}

export const Header = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">

      <nav className="mx-auto flex items-center justify-between p-3 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href={logo.href} className="-m-1.5 p-1.5 flex items-center">
            <Image className="h-16 w-auto" width={200} height={200} src={logo.src} alt={`${logo.name} logo`} />
            <span className="font-title text-2xl inlines">{logo.name}</span>
          </Link>
        </div>

        {/* Mobile menu btn */}

        

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

        


        {/* Header elements */}
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            {headerElements.map((item) => (
              <Link key={item.key} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </Link>
            ))}
          </Popover.Group>



        {/* Login btn */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <WalletComponent />
          </div>

      </nav>

      {/* Mobile menu */}


        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel
            focus="true"
            className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >

            {/* Logo */}
            <div className="flex items-center justify-between">
              <a href={logo.href} className="-m-1.5 p-1.5">
                <span className="sr-only">{logo.name}</span>
                <Image
                  className="h-8 w-auto"
                  src={logo.src}
                  alt={`${logo.name} logo`}
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Elements */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {headerElements.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}

                </div>
                {/* TODO: Solo mostrar si no hay una sesión iniciada */}
                <div className="py-6">
                  <Link
                    href="/register/user"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Join
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>

      <hr className="border-1 border-black" />
    </header>
  )
}
