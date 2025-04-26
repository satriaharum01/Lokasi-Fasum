import React, { useEffect, useState } from 'react';
import Api, { initCsrf } from '../apilogin';
import DynamicForm from '../components/DynamicForm';
import { useNavigate, useParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const adminFasumForm = ({ title, subTitle, type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [fieldOptions, setFieldOptions] = useState({
    jenis_id: []
  });

  useEffect(() => {
    const fetchJenisData = async () => {
      try {
        const response = await Api.get('/get/jenis');
        const jenisIds = response.data.map(({ id, jenis }) => ({
          id:id,
          data:jenis
        }));
        
        setFieldOptions((prev) => ({
          ...prev,
          jenis_id: jenisIds,
        }));
      } catch (err) {
        setError(err.message);
      } finally {

      }
    };

    fetchJenisData();
  }, []);

  useEffect(() => {
    console.log('Field Options Updated:', fieldOptions);
  }, [fieldOptions]);

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
      await Api.post('api/fasum/store', formData);
      Swal.close();
      navigate('/admin/fasilitas');
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

      // Ambil CSRF token dulu
      await initCsrf();

      // Buat FormData baru
      const data = new FormData();
      data.append('jenis_id', formData.jenis_id);
      data.append('nama', formData.nama);
      data.append('alamat', formData.alamat);
      data.append('lat', formData.lat);
      data.append('long', formData.long);
      data.append('deskripsi', formData.deskripsi);

      if (formData.cover_image instanceof File) {
        data.append('cover_image', formData.cover_image);
      }

      await Api.post(`api/fasum/update/${formData.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.close();
      //navigate('/admin/fasilitas');
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
    navigate('../admin/fasilitas');
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
                    formPage="fasum"
                    valID={id}
                    formData={formData}
                    setFormData={setFormData}
                    fieldOptions={fieldOptions}
                  />
                </div>
                <div className="card-footer">
                  <button type="button" className="btn btn-danger" onClick={handleBack}>
                    Kembali
                  </button>
                  <button type="submit" className="btn btn-primary mx-2">
                    Simpan
                  </button>
                  <div className="float-right">{import.meta.env.VITE_APP_NAME} - {title}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminFasumForm;
