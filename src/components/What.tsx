import {
  DocumentTextIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

export const What = () => {
  return (
    <div
      id="what"
      className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4x1">
                What is <span className="text-purple">Kawi</span> ?
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Kawi is a platform that allows companies to certificate their
                employees for their experience or achievements through
                Blockchain.
              </p>
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
            alt=""
            width={1000}
            height={1000}
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <TrophyIcon
                    className="mt-1 h-5 w-5 flex-none text-purple"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Show your enterprise’s value.
                    </strong>
                    Show the world they want to work in your company. All given
                    certificates will make up statistics that show how great
                    your enterprise is.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <DocumentTextIcon
                    className="mt-1 h-5 w-5 flex-none text-purple"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Share your verifiable professional experience.
                    </strong>{" "}
                    By receiving certificates from your employers, you will have
                    a digital resume which shows your professional experiece.
                    100% legitimate.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <UserGroupIcon
                    className="mt-1 h-5 w-5 flex-none text-purple"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      {" "}
                      Find people for your team based on veracious information.
                    </strong>{" "}
                    Find people on Kawi for your work team. With 100% legitimate
                    certificates, you will easily find someone with the adequate
                    experience for the job.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TrophyIcon
                    className="mt-1 h-5 w-5 flex-none text-purple"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      No more false information on resumes.
                    </strong>{" "}
                    By working with Blockchain, all certificates given and
                    received will be 100% legitimate.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Kawi is a unique platform that allows you to certify and
                demonstrate your work experience in a secure and reliable
                format. There are many reasons why you should consider using
                Kawi.
                <span className="text-purple"> What are you waiting for?</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
