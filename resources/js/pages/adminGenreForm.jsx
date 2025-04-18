import React, { useEffect, useState } from 'react';
import Api, { initCsrf } from '../apilogin';
import DynamicForm from '../components/dynamicForm';
import { useNavigate, useParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const AdminGenreForm = ({ title, subTitle, type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const storePost = async () => {
    try {
      
      // Tampilkan loading
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we submit your data.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await initCsrf(); // ambil token dulu
      await Api.post('api/genre/store', formData);
      Swal.close();
      navigate('/admin/genre');
      withReactContent(Swal).fire({
        title: 'Data Tersimpan!',
        text: 'Data telah berhasil disimpan!',
        icon: 'success',
        timer: 2000,
      });
    } catch (error) {
      const errorMessages = Object.values(error.response.data).flat().join('\n');
      withReactContent(Swal).fire({
        title: 'Error!',
        text: errorMessages,
        icon: 'error',
      });
      setError(error.response.data);
    }
  };

  const updatePost = async () => {
    try {

      // Tampilkan loading
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we submit your data.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await initCsrf(); // ambil token dulu
      await Api.patch(`api/genres/update/${formData.id}`, formData);
      Swal.close();
      navigate('/admin/genre');
      withReactContent(Swal).fire({
        title: 'Data Tersimpan!',
        text: 'Data telah berhasil diupdate!',
        icon: 'success',
        timer: 2000,
      });
    } catch (error) {
      const errorMessages = Object.values(error.response.data).flat().join('\n');
      withReactContent(Swal).fire({
        title: 'Error!',
        text: errorMessages,
        icon: 'error',
      });
      setError(error.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'new') {
      storePost();
    } else {
      updatePost();
    }
  };

  const handleBack = () => {
    navigate('../admin/genre');
  };

  return (
    <div className="my-3 my-md-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">{subTitle}</h3>
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="card-body row">
                  <DynamicForm
                    formPage="genres"
                    valID={id}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
                <div className="card-footer">
                  <button type="button" className="btn btn-danger" onClick={handleBack}>
                    Kembali
                  </button>
                  <button type="submit" className="btn btn-primary mx-2">
                    Simpan
                  </button>
                  <div className="float-right">Komikmu - {title}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGenreForm;
