import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../apilogin';
import getRedirectPath from '../utils/redirectByLevel';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [session, setSession] = useState({});

  const formhandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mendapatkan CSRF token terlebih dahulu
      await api.get('/sanctum/csrf-cookie');

      // Mengirim permintaan login
      const response = await api.post('/api/login', formData);
      setAlertMessage(response.data.message);
      setAlertType(response.data.type);
      const user = response.data.user;
      console.log(response);
      setIsLoggedIn(true);
      const redirect = getRedirectPath(user.level);
      setTimeout(() => {
        window.location.href = redirect;
      }, 2000);
    } catch (error) {
      setAlertMessage(error.response.message);
      setAlertType(error.response.type);
    }
  };

  return (
    <>
      <div className="text-center mb-4">
        <a href="/" className="navbar-brand navbar-brand-autodark">
          <img src="/assets/login/img/nav-logo.png" height="100" alt="Logo" />
        </a>

        <form
          className="border-1 border-warning card card-md text-white"
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{ zIndex: 1000, background: 'rgba(0, 0, 0, 0.3)' }}
        >
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Masuk menggunakan Akunmu</h2>

            {session.email && (
              <div className="invalid-feedback d-block" role="alert">
                <strong>{session.email}</strong>
              </div>
            )}
            {session.password && (
              <div className="invalid-feedback d-block" role="alert">
                <strong>{session.password}</strong>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`text-black form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={formhandleChange}
                placeholder="Masukan email"
                autoComplete="off"
              />
              {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
            </div>

            <div className="mb-2">
              <label className="form-label">Password</label>
              <div className="input-group input-group-flat">
                <input
                  type="password"
                  name="password"
                  className={`text-black form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={formData.password}
                  onChange={formhandleChange}
                  placeholder="Password"
                  autoComplete="off"
                />
              </div>
              {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
            </div>

            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;