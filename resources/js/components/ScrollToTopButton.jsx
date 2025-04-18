// src/components/ScrollToTopButton.js
import React from 'react';
import $ from 'jquery';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  };

  return (
    <div className="page-up">
      <a href="#" onClick={scrollToTop} id="scrollToTopButton">
        <span className="arrow_carrot-up"></span>
      </a>
    </div>
  );
};

export default ScrollToTopButton;
