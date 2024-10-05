import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';


// This function creates a layout for a React component, including a header, main content, and footer
const Layout = ({ children, title, description, keywords, author }) => {
  // Return a div containing the layout
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '77vh' }}>
        <Toaster />

        {children}
      </main>
      <Footer />
    </div>
  );
};

// Set default props for the Layout component
Layout.defaultProps = {
  title: 'E-commerce App - Shop with us',
  description: 'MERN Stack Project',
  keywords: 'mern, express, react, node, mongoDB',
  author: 'Shivani'
};

export default Layout;