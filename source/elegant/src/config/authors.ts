// authors.ts

interface Author {
    name: string;
    twitter: string;
  }
  
  // Optional interface for authors
  interface AuthorsConfig {
    [key: string]: Author;
  }
  
  // Example configuration
  const authors: AuthorsConfig = {

    brandon: {
      name: 'Brandon',
      twitter: 'thebrandonowens',
    },

  };
  
  export default authors;
  