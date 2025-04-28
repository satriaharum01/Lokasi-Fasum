// src/components/Preloader.js
import React, { useEffect } from 'react';


const Preloader = () => {

  useEffect(() => {
    const loader = document.querySelector('.loader');
    const preloader = document.getElementById('preloder');

    if (loader && preloader) {
      $("#preloder").delay(1000).fadeOut("slow");
    }
  }, []);

  return (
    <>
      <div className="my-3 my-md-5">
        <div className="container">
          <div id="innerPreloader" className='d-flex justify-content-center'>
            <div className="loader"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
