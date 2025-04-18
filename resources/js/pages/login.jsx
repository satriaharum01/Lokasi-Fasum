import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import LoginBreadcom from './section/LoginBreadcom';
import api from '../apilogin';

const Login = ({ setIsLoggedIn }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const formhandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Mendapatkan CSRF token terlebih dahulu
      await api.get('/sanctum/csrf-cookie');

      // Mengirim permintaan login
      const response = await api.post('/api/login', formData);
      setAlertMessage(response.data.message);
      setAlertType(response.data.type);
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      setAlertMessage(error.response.data.message);
      setAlertType(error.response.data.type);
    }
  };

  return (
    <>
      <LoginBreadcom />
      <section className="login spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="login__form">
                {alertMessage && (
                  <div className={`alert ${alertType}`}>
                    {alertMessage}
                  </div>
                )
                }
                <h3>Login</h3>
                <Form className="login-form" method="POST" onSubmit={handleLogin}>
                  <div className="input__item">
                    <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={formhandleChange} />
                    <span className="icon_mail"></span>
                  </div>
                  <div className="input__item">
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={formhandleChange} required />
                    <span className="icon_lock"></span>
                  </div>
                  <Button type="submit" className="site-btn">Login Now</Button>
                </Form>
                <a href="#" className="forget_pass">Forgot Your Password?</a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login__register">
                <h3>Dont’t Have An Account?</h3>
                <a href="#" className="primary-btn">Register Now</a>
              </div>
            </div>
          </div>
          <div className="login__social">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="login__social__links">
                  <span>or</span>
                  <ul>
                    <li><a href="#" className="facebook"><i className="fa fa-facebook"></i> Sign in With
                      Facebook</a></li>
                    <li><a href="#" className="google"><i className="fa fa-google"></i> Sign in With Google</a></li>
                    <li><a href="#" className="twitter"><i className="fa fa-twitter"></i> Sign in With Twitter</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;