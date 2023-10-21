import MetaTitle from '@/utils/Meta/MetaTitle';

const css = `
  body {
    display: flex;
  }
  #__next {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`
Error.layoutProps = {
  meta: {
    title: "Page not found - " + MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", process.env.NEXT_PUBLIC_APP_TAGLINE || "")
  },
};


/**
 * Thee 404 error page
 * @returns An html 404 page telling the user that the page they requested was not found.
 */
export default function Error() {
  return (
    <>
     <div className="flex flex-auto items-center justify-center text-center px-4 flex-col sm:flex-row">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight sm:pr-6 sm:mr-6 sm:border-r sm:border-slate-900/10 sm:dark:border-slate-300/10 dark:text-slate-200">
          404
        </h1>
        <h2 className="mt-2 text-lg text-slate-700 dark:text-slate-400 sm:mt-0">
          This page could not be found.
        </h2>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </div> 
    </>
  )
};