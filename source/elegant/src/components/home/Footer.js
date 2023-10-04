import Link from 'next/link';
import Logo from '@/components/Logos/Logo/Logo';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import Config from '@/utils/Config/Config';

const footerNav = [
  {
    Community: [
      { title: 'GitHub', href: Config('app.repository'), external: true },
      { title: 'Indie Hackers', href: 'https://www.indiehackers.com/product/elegant-framework', external: true },
      { title: 'Twitter', href: 'https://twitter.com/thebrandonowens', external: true },
      { title: 'Reddit', href: 'https://www.reddit.com/r/elegantframework/', external: true },
      { title: 'Discord', href: 'https://discord.gg/PwY38x4uvV', external: true }
    ],
    Features: [
      { title: 'Theme Customization', href: '/docs/theme/' },
      { title: 'Easy Configuration', href: '/docs/configuration/' },
      { title: 'Safe & Fast', href: '/blog/2023-04-20-the-future-is-markdown'}
    ],
    Services: [
      { title: 'Google Analytics', href: '/docs/google-analytics/' },
      { title: 'Vercel', href: '/docs/deployment/' },
    ],
    Resources: [
      { title: 'Website Design Services', href: '/experts' },
    ]
  },
];

export function Footer() {
  return (
    <footer className="pb-16 text-sm leading-6">
      <div className="max-w-7xl mx-auto divide-y divide-slate-200 px-4 sm:px-6 md:px-8 dark:divide-slate-700">
        <div className="flex">
          {footerNav.map((sections) => (
            <div
              key={Object.keys(sections).join(',')}
              className="flex-none w-1/2 space-y-10 sm:space-y-8 lg:flex lg:space-y-0"
            >
              {Object.entries(sections).map(([title, items]) => (
                <div key={title} className="lg:flex-none lg:w-1/2">
                  <h2 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
                  <ul className="mt-3 space-y-2">
                    {items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="hover:text-slate-900 dark:hover:text-slate-300 flex items-center"
                          target={item.external === true ? "_blank" : ""}
                          rel={item.external === true ? "noopener noreferrer" : ""}
                        >
                         <>
                          <span className="mr-1">
                            {item.title}
                          </span>
                          {item.external === true && 
                            <ArrowTopRightOnSquareIcon 
                              className="w-4 h-4"
                            />
                          }
                         </>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-16 pt-10">
          <Logo className="w-auto h-8" />
        </div>
      </div>
    </footer>
  );
}
