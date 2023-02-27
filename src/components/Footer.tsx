/* eslint-disable */
import  Link  from 'next/link';
import  Image  from "next/image";

const social = [
  { key: 1, name: 'Github', href: 'https://github.com/Kawi-io/Kawi', src: '/icons/github.svg' },
  { key: 2, name: 'Youtube', href: '#', src: '/icons/youtube.svg' },
]

const recursos = [
  { key: 1, name: 'Solana', href: 'https://solana.com/es' },
  { key: 2, name: 'TailwindCSS', href: 'https://tailwindcss.com/' },
  { key: 3, name: 'MongoDB', href: 'https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=bing&utm_campaign=search_bs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-mx_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=415204517&adgroup=1221557888421229&msclkid=0a0253bc91c9176da6b130479dcb11a7' },
  { key: 4, name: 'T3', href: 'https://create.t3.gg/' },
  { key: 5, name: 'Metaplex', href: 'https://www.metaplex.com/' },
  { key: 6, name: 'Candy Machine', href: 'https://www.metaplex.com/' },
  { key: 7, name: 'NextJS', href: 'https://nextjs.org/' },
  { key: 7, name: 'Sugar CLI', href: 'https://docs.metaplex.com/developer-tools/sugar/guides/sugar-for-cmv3' },
]

export const Footer = () => {
  return (
    <>
      <footer className="p-4 bg-black-400 text-white sm:p-6 dark:bg-gray-800 bottom-0 w-full">
        <div className="md:flex md:justify-between p-3">

          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link href="/" target="_blank" className="flex items-center">
              <Image src="/images/kawiWhite.png" className="mr-4 h-10" alt="FlowBite Logo" width={50} height={50} />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Kawi</span>
            </Link>

            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-12">
              {social.map((item) => (
                <Link key={item.key} href={item.href} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <Image className="w-5 h-5" width={25} height={25} alt={item.name} src={item.src}>
                  </Image>
                </Link>
              ))}
            </div>
            <div className="sm:flex sm:items-center sm:justify-between sm:mt-2">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© Kawi™ 2023
              </span>

            </div>

          </div>

          {/* Footer elements */}
          <div className="gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Recursos</h3>
              <ul>
                {recursos.map((item) => (
                  <li key={item.key} className="mb-4">
                    <Link href={item.href} target="_blank"
                      className="text-gray-600 hover:underline dark:text-gray-400 ">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
/* eslint-disable */