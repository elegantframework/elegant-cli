export default function Home(): JSX.Element {
  //
  // Temporarily redirect to the docs until we find a workaround for Docusaurus' '/' slug handling.
  //
  if (typeof window !== "undefined") {
    window.location.href = '/docs';
    return null;
  }
}
