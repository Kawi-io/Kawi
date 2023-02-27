import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Why blockchain?",
    description:
      "Blockchain allows Kawi and its users to have completely authenticate certifications. Providing security and trust to recruiters, employees, employers, companies, everyone !",
    icon: CloudArrowUpIcon,
  },
  {
    name: "What is an NFT?",
    description:
      "A type of digital asset that is unique and cannot be replaced or exchanged for something else.NFTs are stored on a blockchain, which means they are secure and can be easily tracked and verified as authentic.",
    icon: LockClosedIcon,
  },
  {
    name: "Why an NFT?",
    description:
      'A simple certification with plain text and a big "certification" title is boring. NFTs show a person\'s professional experience in an aesthetic and visually pleasing way',
    icon: LockClosedIcon,
  },
  {
    name: "What is Kawi?",
    description:
      "A blockchain platform to give and receive certifications in the shape of NFTs on your professional experience.",
    icon: LockClosedIcon,
  },
];

export const Blockchain = () => {
  return (
    <div id="blockchain" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What is Blockchain?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Blockchain is a digital system for keeping track of information or
            data. It`&apos;`s different from traditional ledgers because
            it`&apos;`s decentralized, which means it`&apos;`s not owned by any
            one person or organization.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
