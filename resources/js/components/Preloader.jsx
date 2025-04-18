// src/components/Preloader.js
import React, { useEffect } from 'react';


const Preloader = () => {
  
  useEffect(() => {
    const loader = document.querySelector('.loader');
    const preloader = document.getElementById('preloder');

    if (loader && preloader) {
      $("#preloder").delay(200).fadeOut("slow");
    }
  }, []);

  return (
    <div id="preloder">
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
