
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const location = useLocation();
  const path = location.pathname;
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <h1>404</h1>
      <p>Oops! We couldn't find the page you were looking for.</p>
      <p><code>{path}</code></p>
      <a href="/" style={{ marginTop: '20px' }}>Return to Home</a>
    </div>
  );
};

export default NotFound;
