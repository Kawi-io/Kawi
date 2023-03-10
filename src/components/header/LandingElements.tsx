import Link from 'next/link';

const headerElements = [
    { name: "What is Kawi?", href: "/#what" },
    { name: "How does it work?", href: "/#How" },
    { name: "What is Blockchain?", href: "/#blockchain" },
    { name: "Who are we?", href: "/#who" },
  ];
  
export const LandingElements = () => {
    return (
      <>
        {headerElements.map((item: any) => (
          <Link
            key={headerElements.indexOf(item)}
            scroll={false}
            href={item.href}
            className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          >
            {item.name}
          </Link>
        ))}
      </>
    );
  };