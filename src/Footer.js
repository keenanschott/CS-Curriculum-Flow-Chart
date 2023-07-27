import React from 'react';
import githubIcon from './github.png';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#6c757d', height: '40px', padding: '5px', textAlign: 'center', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <a
        href="https://github.com/keenanschott"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#000', textDecoration: 'none' }}
      >
        <img src={githubIcon} alt="GitHub Icon" style={{ height: '30px' }} />
      </a>
    </footer>
  );
};

export default Footer;
