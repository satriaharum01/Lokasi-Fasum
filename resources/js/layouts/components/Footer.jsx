// src/layouts/components/Footer.js
import React from 'react';
import ScrollToTopButton from '../../components/ScrollToTopButton';


function Footer() {
  return (
    <footer className="footer">
      <ScrollToTopButton />
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="footer__logo">
              <a href="./index.html"><img src="img/logo.png" alt="" /></a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="footer__nav">
              <ul>
                <li className="active"><a href="./index.html">Homepage</a></li>
                <li><a href="./categories.html">Categories</a></li>
                <li><a href="./blog.html">Our Blog</a></li>
                <li><a href="#">Contacts</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <p>Copyright ©<script>document.write(new Date().getFullYear());</script>2024 All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
