import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BackgroundGradient } from "../BackgroundGradient";

const DynamicCILBalance = dynamic(() => import("./CILBalance"), {
  ssr: false,
});

const navigation = [
  { name: "Presale", href: "/" },
  {
    name: "Airdrop",
    children: [
      {
        name: "OG",
        href: "/airdrop/og",
      },
      {
        name: "True OG",
        href: "/airdrop/trueOg",
      },
    ],
  },
];

const DropdownMenu = ({ navs }: any) => {
  return (
    <div className="relative group">
      <div className="text-sm font-semibold leading-6 text-white hover:text-slate-300">
        Airdrop{" "}
        <span className="text-sm inline-block rotate-180 -translate-y-0.5 scale-110">
          ^
        </span>
      </div>
      <ul className="hidden absolute group-hover:block bg-sky-500/[.06] px-4 py-2 rounded">
        {navs.map((nav: any) => (
          <li key={nav.name}>
            <Link
              href={nav.href}
              className="text-xs font-semibold leading-6 text-white whitespace-nowrap hover:text-indigo-300"
            >
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MobileDropdownMenu = ({ navs, setMobileMenuOpen }: any) => {
  return (
    <div className="relative group">
      <div className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-gray-800">
        Airdrop{" "}
        <span className="text-base inline-block rotate-180 -translate-y-0.5 scale-110">
          ^
        </span>
      </div>
      <ul className="absolute hidden translate-x-3 group-hover:block">
        {navs.map((nav: any) => (
          <li className="text-white list-disc" key={nav.name}>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              href={nav.href}
              className="text-xs font-semibold leading-6 text-white whitespace-nowrap hover:text-slate-300"
            >
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="z-0 bg-gray-900 isolate">
      <div className="absolute inset-x-0 top-[-10rem] transform-gpu overflow-hidden blur-3xl sm:top-[-20rem] -z-10">
        <BackgroundGradient />
      </div>
      <nav
        className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Cilistia</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              className="h-7"
              viewBox="0 0 3180.722891566265 831.3253012048193"
            >
              <g transform="scale(9.036144578313253) translate(10, 10)">
                <g
                  transform="matrix(0.763504469775618,0,0,0.763504469775618,-2.175224216915505,-2.175224216915505)"
                  fill="#6466f1"
                >
                  <g xmlns="http://www.w3.org/2000/svg">
                    <path d="M59.402,24.168l6.729-18.486c-2.553-0.93-5.206-1.644-7.942-2.123l-3.416,19.379   C56.365,23.217,57.915,23.626,59.402,24.168z"></path>
                    <path d="M77.483,50L77.483,50c0,15.178-12.306,27.483-27.483,27.483c-15.179,0-27.483-12.306-27.483-27.483   c0-15.179,12.305-27.483,27.483-27.483V2.849C23.959,2.849,2.849,23.958,2.849,50c0,26.04,21.111,47.151,47.151,47.151   c26.04,0,47.151-21.111,47.151-47.151l0,0H77.483z"></path>
                    <path d="M67.663,28.95l12.645-15.068c-2.097-1.76-4.347-3.343-6.729-4.721L63.74,26.201C65.128,27.005,66.442,27.924,67.663,28.95z   "></path>
                    <path d="M77.063,45.228l19.379-3.417c-0.479-2.736-1.194-5.39-2.122-7.941l-18.487,6.728   C76.373,42.085,76.782,43.634,77.063,45.228z"></path>
                    <path d="M73.799,36.26l17.04-9.838c-1.379-2.383-2.961-4.633-4.721-6.729L71.05,32.337C72.076,33.558,72.994,34.871,73.799,36.26z"></path>
                  </g>
                </g>
                <g
                  transform="matrix(1.5655277802688818,0,0,1.5655277802688818,88.86894481271314,-6.293112246700733)"
                  fill="#f7f0f0"
                >
                  <path d="M14.6 40 c-2.36 0 -4.52 -0.56 -6.44 -1.68 c-1.92 -1.16 -3.44 -2.72 -4.52 -4.68 s-1.64 -4.16 -1.64 -6.6 c0 -2.36 0.56 -4.56 1.68 -6.52 c1.12 -1.92 2.68 -3.48 4.6 -4.6 c1.96 -1.12 4.16 -1.68 6.48 -1.68 c1.76 0 3.48 0.4 5.16 1.12 c1.68 0.76 3.12 1.76 4.32 3.04 c0.16 0.2 0.16 0.48 0 0.68 l-3.8 3.12 c-0.12 0.12 -0.24 0.2 -0.4 0.2 s-0.32 -0.08 -0.4 -0.2 c-2.04 -2.48 -5.32 -3 -8.08 -1.28 c-2.4 1.48 -3.28 4.2 -3.16 6.92 c0.12 2.76 2.12 5.12 4.76 5.92 c2.4 0.72 4.76 0.16 6.48 -1.68 c0.12 -0.08 0.24 -0.16 0.4 -0.12 c0.16 0 0.28 0.04 0.36 0.16 l3.88 2.72 c0.16 0.2 0.16 0.48 0 0.68 c-1.28 1.36 -2.8 2.48 -4.48 3.28 c-1.72 0.8 -3.48 1.2 -5.2 1.2 z M29.657 40 c-0.28 0 -0.52 -0.24 -0.52 -0.52 l0 -23.96 c0 -0.28 0.24 -0.52 0.52 -0.52 l5.2 0 c0.28 0 0.52 0.24 0.52 0.52 l0 23.96 c0 0.28 -0.24 0.52 -0.52 0.52 l-5.2 0 z M40.63400000000001 40 c-0.28 0 -0.52 -0.24 -0.52 -0.52 l0 -23.96 c0 -0.28 0.24 -0.52 0.52 -0.52 l5.2 0 c0.28 0 0.52 0.24 0.52 0.52 l0 18.72 l9 0 c0.28 0 0.52 0.24 0.52 0.52 l0 4.72 c0 0.28 -0.24 0.52 -0.52 0.52 l-14.72 0 z M61.13100000000001 40 c-0.28 0 -0.52 -0.24 -0.52 -0.52 l0 -23.96 c0 -0.28 0.24 -0.52 0.52 -0.52 l5.2 0 c0.28 0 0.52 0.24 0.52 0.52 l0 23.96 c0 0.28 -0.24 0.52 -0.52 0.52 l-5.2 0 z M82.268 40.24 c-1.92 0 -3.84 -0.36 -5.68 -1.08 c-1.84 -0.68 -3.48 -1.68 -4.84 -2.88 c-0.16 -0.16 -0.2 -0.4 -0.12 -0.6 l1.4 -4.76 c0.08 -0.16 0.2 -0.28 0.36 -0.28 c0.16 -0.04 0.32 0 0.44 0.12 c2.12 2 4.52 3.8 7.52 3.96 c0.8 0.04 1.68 0.08 2.44 -0.16 c2.36 -0.76 1.36 -3.16 -0.4 -3.88 c-0.6 -0.24 -1.44 -0.52 -2.52 -0.84 c-1.6 -0.44 -2.92 -0.92 -3.92 -1.4 c-1.08 -0.48 -2 -1.24 -2.8 -2.24 c-0.76 -1.04 -1.16 -2.4 -1.16 -4.04 c0 -1.56 0.4 -2.92 1.2 -4.08 s1.92 -2.08 3.32 -2.68 s3.04 -0.92 4.88 -0.92 c1.64 0 3.24 0.24 4.84 0.76 c1.56 0.48 2.96 1.16 4.2 1.96 c0.2 0.16 0.28 0.4 0.16 0.64 l-1.32 4.48 c-0.04 0.16 -0.16 0.24 -0.32 0.28 c-0.12 0.04 -0.28 0.04 -0.4 -0.04 c-1.8 -1.12 -3.6 -2.48 -5.72 -2.76 c-1.4 -0.2 -3.52 -0.12 -4 1.56 c-0.6 2.16 2.56 2.72 4 3.16 c1.6 0.48 2.92 0.96 3.96 1.44 c1.08 0.52 2.04 1.32 2.8 2.32 c0.8 1.04 1.2 2.44 1.2 4.12 c0 1.64 -0.44 3.04 -1.28 4.24 c-0.8 1.2 -1.96 2.08 -3.4 2.72 c-1.44 0.56 -3.04 0.88 -4.84 0.88 z M103.00500000000001 40 c-0.28 0 -0.48 -0.24 -0.48 -0.52 l0 -18.88 l-5.48 0 c-0.28 0 -0.52 -0.2 -0.52 -0.48 l0 -4.6 c0 -0.28 0.24 -0.52 0.52 -0.52 l17.16 0 c0.32 0 0.52 0.24 0.52 0.52 l0 4.6 c0 0.28 -0.2 0.48 -0.52 0.48 l-5.48 0 l0 18.88 c0 0.28 -0.24 0.52 -0.52 0.52 l-5.2 0 z M119.982 40 c-0.28 0 -0.52 -0.24 -0.52 -0.52 l0 -23.96 c0 -0.28 0.24 -0.52 0.52 -0.52 l5.2 0 c0.28 0 0.52 0.24 0.52 0.52 l0 23.96 c0 0.28 -0.24 0.52 -0.52 0.52 l-5.2 0 z M130.959 40 c-0.16 0 -0.32 -0.08 -0.4 -0.24 c-0.12 -0.12 -0.12 -0.32 -0.08 -0.48 l9.32 -23.96 c0.08 -0.2 0.28 -0.32 0.48 -0.32 l5.36 0 c0.2 0 0.4 0.12 0.48 0.32 l9.16 23.96 c0.04 0.16 0.04 0.32 -0.08 0.48 c-0.08 0.16 -0.24 0.24 -0.4 0.24 l-5.56 0 c-0.2 0 -0.4 -0.12 -0.48 -0.32 l-1.48 -3.68 l-9 0.04 l-1.48 3.64 c-0.08 0.2 -0.28 0.32 -0.48 0.32 l-5.36 0 z M139.91899999999998 31 l5.76 0 l-2.88 -8.48 z"></path>
                </g>
              </g>
            </svg>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) =>
            item?.children ? (
              <DropdownMenu key={0} navs={item.children} />
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white hover:text-slate-300"
              >
                {item.name}
              </Link>
            )
          )}
        </div>
        <div className="items-center hidden lg:flex lg:flex-1 lg:justify-end">
          <DynamicCILBalance />
          <ConnectButton />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Cilistia</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                className="h-7"
                viewBox="0 0 3180.722891566265 831.3253012048193"
              >
                <g transform="scale(9.036144578313253) translate(10, 10)">
                  <g
                    transform="matrix(0.763504469775618,0,0,0.763504469775618,-2.175224216915505,-2.175224216915505)"
                    fill="#6466f1"
                  >
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path d="M59.402,24.168l6.729-18.486c-2.553-0.93-5.206-1.644-7.942-2.123l-3.416,19.379   C56.365,23.217,57.915,23.626,59.402,24.168z"></path>
                      <path d="M77.483,50L77.483,50c0,15.178-12.306,27.483-27.483,27.483c-15.179,0-27.483-12.306-27.483-27.483   c0-15.179,12.305-27.483,27.483-27.483V2.849C23.959,2.849,2.849,23.958,2.849,50c0,26.04,21.111,47.151,47.151,47.151   c26.04,0,47.151-21.111,47.151-47.151l0,0H77.483z"></path>
                      <path d="M67.663,28.95l12.645-15.068c-2.097-1.76-4.347-3.343-6.729-4.721L63.74,26.201C65.128,27.005,66.442,27.924,67.663,28.95z   "></path>
                      <path d="M77.063,45.228l19.379-3.417c-0.479-2.736-1.194-5.39-2.122-7.941l-18.487,6.728   C76.373,42.085,76.782,43.634,77.063,45.228z"></path>
                      <path d="M73.799,36.26l17.04-9.838c-1.379-2.383-2.961-4.633-4.721-6.729L71.05,32.337C72.076,33.558,72.994,34.871,73.799,36.26z"></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1.5655277802688818,0,0,1.5655277802688818,88.86894481271314,-6.293112246700733)"
                    fill="#f7f0f0"
                  >
                    <path d="M14.6 40 c-2.36 0 -4.52 -0.56 -6.44 -1.68 c-1.92 -1.16 -3.44 -2.72 -4.52 -4.68 s-1.64 -4.16 -1.64 -6.6 c0 -2.36 0.56 -4.56 1.68 -6.52 c1.12 -1.92 2.68 -3.48 4.6 -4.6 c1.96 -1.12 4.16 -1.68 6.48 -1.68 c1.76 0 3.48 0.4 5.16 1.12 c1.68 0.76 3.12 1.76 4.32 3.04 c0.16 0.2 0.16 0.48 0 0.68 l-3.8 3.12 c-0.12 0.12 -0.24 0.2 -0.4 0.2 s-0.32 -0.08 -0.4 -0.2 c-2.04 -2.48 -5.32 -3 -8.08 -1.28 c-2.4 1.48 -3.28 4.2 -3.16 6.92 c0.12 2.76 2.12 5.12 4.76 5.92 c2.4 0.72 4.76 0.16 6.48 -1.68 c0.12 -0.08 0.24 -0.16 0.4 -0.12 c0.16 0 0.28 0.04 0.36 0.16 l3.88 2.72 c0.16 0.2 0.16 0.48 0 0.68 c-1.28 1.36 -2.8 2.48 -4.48 3.28 c-1.72 0.8 -3.48 1.2 -5.2 1.2 z M29.657 40 c-0.28 0 -0.52 -0.24 -0.52 -0.52 l0 -23.96 c0 -0.28 0.24 -0.52 0.52 -0.52 l5.2 0 c0.28 0 0.52 0.24 0.52 0.52 l0 23.96 c0 0.28 -0.24 0.52 -0.52 0.52 l-5.2 0 z M40.63400000000001 40 c-0.28 0 -0.52 -0.24 -0.52 -0.52 l0 -23.96 c0 -0.28 0.24 -0.52 0.52 -0.52 l5.2 0 c0.28 0 0.52 0.24 0.52 0.52 l0 18.72 l9 0 c0.28 0 0.52 0.24 0.52 0.52 l0 4.72 c0 0.28 -0.24 0.52 -0.52 0.52 l-14.72 0 z M61.13100000000001 40 c-0.28 0 -0.52 -0.24 -0.52 -0.52 l0 -23.96 c0 -0.28 0.24 -0.52 0.52 -0.52 l5.2 0 c0.28 0 0.52 0.24 0.52 0.52 l0 23.96 c0 0.28 -0.24 0.52 -0.52 0.52 l-5.2 0 z M82.268 40.24 c-1.92 0 -3.84 -0.36 -5.68 -1.08 c-1.84 -0.68 -3.48 -1.68 -4.84 -2.88 c-0.16 -0.16 -0.2 -0.4 -0.12 -0.6 l1.4 -4.76 c0.08 -0.16 0.2 -0.28 0.36 -0.28 c0.16 -0.04 0.32 0 0.44 0.12 c2.12 2 4.52 3.8 7.52 3.96 c0.8 0.04 1.68 0.08 2.44 -0.16 c2.36 -0.76 1.36 -3.16 -0.4 -3.88 c-0.6 -0.24 -1.44 -0.52 -2.52 -0.84 c-1.6 -0.44 -2.92 -0.92 -3.92 -1.4 c-1.08 -0.48 -2 -1.24 -2.8 -2.24 c-0.76 -1.04 -1.16 -2.4 -1.16 -4.04 c0 -1.56 0.4 -2.92 1.2 -4.08 s1.92 -2.08 3.32 -2.68 s3.04 -0.92 4.88 -0.92 c1.64 0 3.24 0.24 4.84 0.76 c1.56 0.48 2.96 1.16 4.2 1.96 c0.2 0.16 0.28 0.4 0.16 0.64 l-1.32 4.48 c-0.04 0.16 -0.16 0.24 -0.32 0.28 c-0.12 0.04 -0.28 0.04 -0.4 -0.04 c-1.8 -1.12 -3.6 -2.48 -5.72 -2.76 c-1.4 -0.2 -3.52 -0.12 -4 1.56 c-0.6 2.16 2.56 2.72 4 3.16 c1.6 0.48 2.92 0.96 3.96 1.44 c1.08 0.52 2.04 1.32 2.8 2.32 c0.8 1.04 1.2 2.44 1.2 4.12 c0 1.64 -0.44 3.04 -1.28 4.24 c-0.8 1.2 -1.96 2.08 -3.4 2.72 c-1.44 0.56 -3.04 0.88 -4.84 0.88 z M103.00500000000001 40 c-0.28 0 -0.48 -0.24 -0.48 -0.52 l0 -18.88 l-5.48 0 c-0.28 0 -0.52 -0.2 -0.52 -0.48 l0 -4.6 c0 -0.28 0.24 -0.52 0.52 -0.52 l17.16 0 c0.32 0 0.52 0.24 0.52 0.52 l0 4.6 c0 0.28 -0.2 0.48 -0.52 0.48 l-5.48 0 l0 18.88 c0 0.28 -0.24 0.52 -0.52 0.52 l-5.2 0 z M119.982 40 c-0.28 0 -0.52 -0.24 -0.52 -0.52 l0 -23.96 c0 -0.28 0.24 -0.52 0.52 -0.52 l5.2 0 c0.28 0 0.52 0.24 0.52 0.52 l0 23.96 c0 0.28 -0.24 0.52 -0.52 0.52 l-5.2 0 z M130.959 40 c-0.16 0 -0.32 -0.08 -0.4 -0.24 c-0.12 -0.12 -0.12 -0.32 -0.08 -0.48 l9.32 -23.96 c0.08 -0.2 0.28 -0.32 0.48 -0.32 l5.36 0 c0.2 0 0.4 0.12 0.48 0.32 l9.16 23.96 c0.04 0.16 0.04 0.32 -0.08 0.48 c-0.08 0.16 -0.24 0.24 -0.4 0.24 l-5.56 0 c-0.2 0 -0.4 -0.12 -0.48 -0.32 l-1.48 -3.68 l-9 0.04 l-1.48 3.64 c-0.08 0.2 -0.28 0.32 -0.48 0.32 l-5.36 0 z M139.91899999999998 31 l5.76 0 l-2.88 -8.48 z"></path>
                  </g>
                </g>
              </svg>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="py-6 space-y-2">
                {navigation.map((item) =>
                  item?.children ? (
                    <MobileDropdownMenu
                      key={0}
                      navs={item.children}
                      setMobileMenuOpen={setMobileMenuOpen}
                    />
                  ) : (
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-gray-800"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
              <div className="items-center hidden lg:flex lg:flex-1 lg:justify-end">
                <DynamicCILBalance />
                <ConnectButton />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
