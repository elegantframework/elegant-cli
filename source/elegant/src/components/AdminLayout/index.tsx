import { ApolloError } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCMSSession } from '@/utils/Auth/hooks';
import Sidebar from '../Sidebar/Admin/Sidebar';
import Config from '@/utils/Config/Config';
import AdminHeader from '../Headers/AdminHeader/AdminHeader';

export type AdminLayoutProps = {
  error?: string | ApolloError
  children: React.ReactNode
  settings?: React.ReactNode
  title?: string
}

export default function AdminLayout({
  children,
  error,
  settings,
  title
}: AdminLayoutProps) {
  const { session, status } = useCMSSession()
  const { push, asPath } = useRouter()
  const [openSidebar, setOpenSidebar] = useState(false)
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }

  if (status === 'unauthenticated') {
    if (typeof window !== 'undefined') {
      push(`/admin/?callbackUrl=${asPath}`)
    }
    return null
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${Config('admin.cms_name')}` : Config('admin.cms_name')}</title>
      </Head>
      {status === 'loading' ? null : (
        <div className="flex h-screen flex-col bg-white text-black">
          <AdminHeader
            {...session?.user}
            status={status}
            toggleSidebar={toggleSidebar}
          />
          <div className="flex overflow-hidden grow flex-col-reverse justify-between md:flex-row">
            <Sidebar isOpen={openSidebar} />
            <main className="w-auto flex-auto p-5 md:p-10 bg-transparent z-50 max-h-[calc(100vh-53px)] overflow-y-scroll scrollbar-hide">
              {error && (
                <div className="mb-6 border border-red-500 p-2">
                  Something went wrong{' '}
                  <span role="img" aria-label="sad face">
                    😓
                  </span>
                </div>
              )}
              {children}
            </main>
            {settings && settings}
          </div>
        </div>
      )}
    </>
  )
}
