import Link from 'next/link';
import Logo from '@/components/core/Logos/Logo'

const footerNav = [
  {
    Community: [
      { title: 'GitHub', href: process.env.NEXT_PUBLIC_APP_REPOSITORY, external: true },
      { title: 'Indie Hackers', href: 'https://www.indiehackers.com/product/elegant-framework', external: true },
      { title: 'Twitter', href: 'https://twitter.com/thebrandonowens', external: true },
      { title: 'Reddit', href: 'https://www.reddit.com/r/elegantframework/', external: true },
    ],
    Features: [
      { title: 'Theme Customization', href: '/docs/theme/' },
      { title: 'Easy Configuration', href: '/docs/configuration/' },
      { title: 'Affordable Hosting', href: '/docs/deployment/' },
      { title: 'Safe & Fast', href: '/blog/2023-04-20-the-future-is-markdown'}
    ],
    Services: [
      { title: 'Google Analytics', href: '/docs/google-analytics/' },
      { title: 'ConvertKit', href: '/docs/convertkit/' },
      { title: 'Vercel', href: '/docs/deployment/' },
    ],
    Resources: [
      { title: 'Website Design Services', href: '/experts' },
    ]
  },
]

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
                        <Link href={item.href} passHref>
                          <a className="hover:text-slate-900 dark:hover:text-slate-300" 
                             target={item.external === true ? "_blank" : ""} 
                             rel={item.external === true ? "noopener noreferrer" : ""}
                          >
                            {item.title}
                          </a>
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
  )
}
