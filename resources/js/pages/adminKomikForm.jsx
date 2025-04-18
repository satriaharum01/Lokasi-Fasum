import React, { useEffect, useState } from 'react';
import Api from '../api';
import DynamicForm from '../components/dynamicForm';
import { useNavigate } from 'react-router-dom';

const AdminKomikForm = ({ title, subTitle, type, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataEdit = async () => {
    try {
      const response = await Api.get(`/comics/find/${id}`); // Ganti dengan endpoint yang sesuai

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {

  };
  const handleBack = () => {
    navigate('../admin/komik');
  };
  const formType = () => {
    if (type == 'new') {

    } else {
      fetchDataEdit();
    }
  }
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
                  <DynamicForm formPage="comics" />
                </div>
                <div className="card-footer">
                  <button type="button" className="btn btn-danger btn-back" onClick={handleBack}>Kembali</button>
                  <button type="submit" className="btn btn-primary btn-simpan mx-2">Simpan</button>
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

export default AdminKomikForm;
