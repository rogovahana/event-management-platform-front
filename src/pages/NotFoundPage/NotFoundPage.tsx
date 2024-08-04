import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css'; 

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="box">
      <h1 className="title">404</h1>
      <h2 className="subtitle">Page Not Found</h2>
      <p className="message">The page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')} className="button">Go Back to Homepage</button>
    </div>
  );
};

export default NotFoundPage;