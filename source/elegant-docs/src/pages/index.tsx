import Layout from "@theme/Layout";
import React from "react";

export default function Home(): JSX.Element {
  //
  // Temporarily redirect to the docs until we find a workaround for Docusaurus' '/' slug handling.
  //
  if (typeof window !== "undefined") {
    window.location.href = '/docs';
    return null;
  }
  else{
    return(<Layout>{null}</Layout>);
  }
}
