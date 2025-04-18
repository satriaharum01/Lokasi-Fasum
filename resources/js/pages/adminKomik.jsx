import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import Swal from 'sweetalert2';
import Api from '../api';
import StatusButton from '../components/StatusButton';

DataTable.use(DT);

const adminKomik = ({ subTitle, title }) => {
  const navigate = useNavigate();
  const [komikList, setkomik] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deletePost = async (id) => {
    //delete with api
    await Api.delete(`/comics/delete/${id}`)
      .then(() => {
        setDataList([]);
        fetchDataList();
      })
  }
  const handleAdd = () => {
    navigate('new');
  }
  const fetchDataList = async () => {
    try {
      const response = await Api.get('/comics'); // Ganti dengan endpoint yang sesuai
      setDataList(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Attach event listener setiap kali tabel selesai dirender ulang
    $("body").on("click", ".btn-eye", function () {
      const id = $(this).data("id");
      const komik = komikList.find((p) => p.id === id);
      handleEditClick(komik);
    });
    // Bersihkan event listener saat component unmount
    return () => {
      $("body").off("click", ".btn-edit");
    };
  }, [komikList]);

  useEffect(() => {
    // Attach event listener setiap kali tabel selesai dirender ulang
    $("body").on("click", ".btn-hapus", function () {
      const id = $(this).data("id");
      Swal.fire({
        title: 'Hapus Data ?',
        text: "Data yang dihapus tidak dapat dikembalikan !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: "Hapus Berhasil!",
            text: 'Data Berhasil dihapus !',
            icon: "success"
          });
          deletePost(id);
        }
      });
    });
    // Bersihkan event listener saat component unmount
    return () => {
      $("body").off("click", ".btn-hapus");
    };
  }, []);

  // Define columns for DataTable
  const columns = [
    {
      data: 'DT_RowIndex'
    },
    {
      data: 'title'
    },
    {
      data: 'slug'
    },
    {
      data: 'author'
    },
    {
      data: 'status',
      render: function (data, type, row, meta) {
        const id = `status-btn-${row.id}`;
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            const root = ReactDOM.createRoot(el);
            root.render(<StatusButton status={data} />);
          }
        }, 0);
        return `<div id="status-btn-${row.id}"></div>`;
      },
    },
    {
      data: 'id',
      render: function (data) {
        return '<button class="btn btn-success btn-edit" data-id="' + data + '" > <i class="fa fa-edit"></i></button>\
          <button class="btn btn-danger btn-hapus" data-id="' + data + '" > <i class="fa fa-trash"></i></button>';
      },
    },
  ];

  useEffect(() => {
    fetchDataList();
  }, []);

  return (
    <div className="my-3 my-md-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title">{subTitle}</h3>
                <div className="card-options align-items-center">
                  <button className="btn btn-primary" onClick={handleAdd}><i className='fa fa-plus'></i> New List</button>
                </div>
              </div>
              <div className="card-body" id="card-main">
                <div className="table-responsive">
                  <DataTable
                    columns={columns}
                    data={dataList}
                    pagination className="table table-hover" id="data-width" width="100%"
                  >
                    <thead>
                      <tr>
                        <th width="7%"></th>
                        <th className="text-primary text-center" width="20%">Komik</th>
                        <th className="text-primary text-center">Slug</th>
                        <th className="text-primary text-center">Author</th>
                        <th className="text-primary text-center">Status</th>
                        <th className="text-primary text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className='text-center'></tbody>
                  </DataTable>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <div>
                  Komikmu - {title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminKomik;
