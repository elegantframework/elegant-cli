import { SidebarLayout } from '@/layouts/SidebarLayout';
import { Title } from '@/components/Meta';
import { documentationNav } from '@/navs/documentation';
import Seo from "@/components/core/Seo/Seo";

export function DocumentationLayout(props) {
  return (
    <>
      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

DocumentationLayout.nav = documentationNav
