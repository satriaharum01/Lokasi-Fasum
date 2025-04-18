import React, { useState, useEffect } from "react";
import $ from "jquery";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";
import Api from '../../api';
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";

DataTable.use(DT);

const Pasien = () => {

    const [patients, setPatients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [appName, setAppName] = useState('');
    const [errors, setErrors] = useState([]);

    //Form Data
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
        phone_number: '',
        gender: '',
        date_of_birth: ''
    });

    useEffect(() => {
        Api.get('/api/app-name')
            .then(response => {
                setAppName(response.data.app_name); // Set the app name from the API response
            })
            .catch(error => console.error('Error fetching app name:', error));
    }, []);

    const fetchPatients = () => {
        Api.get("/api/data/pasien")
            .then(response => {
                setPatients(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    };

    useEffect(() => {
        fetchPatients();
    }, []);
    //useNavigate
    const navigate = useNavigate();
    //method store post
    const storePost = async (e) => {
        //send data with API
        await Api.post('/api/data/pasien/store', formData)
            .then(() => {

                //redirect to posts index
                navigate('/admin/pasien');
                withReactContent(Swal).fire({
                    title: "Data Tersimpan!",
                    text: "Data telah berhasil disimpan!",
                    icon: "success",
                    timer: 2000
                });
                AddhandleClose();
                setFormData(null);
                setPatients([]);
                fetchPatients();

            }).catch(error => {

                const errorMessages = Object.values(error.response.data)
                    .flat()  // Flatten to handle arrays of messages
                    .join('<br>'); // Join with a line break for readability

                withReactContent(Swal).fire({
                    title: "Error!",
                    text: errorMessages,
                    icon: "error"
                })
                //set errors response to state "errors"
                setErrors(error.response.data);
            })
        console.log('Data yang dikirim:', formData);
    };

    const updatePost = async (e) => {
        e.preventDefault();
        //send data with API
        await Api.patch(`/api/data/pasien/update/${formData.id}`, formData)
            .then(() => {

                //redirect to posts index
                navigate('/admin/pasien');
                withReactContent(Swal).fire({
                    title: "Data Tersimpan!",
                    text: "Data telah berhasil diupdate!",
                    icon: "success",
                    timer: 2000
                });
                handleClose();
                setFormData({});
                setPatients([]);
                fetchPatients();

            }).catch(error => {
                const errorMessages = Object.values(error.response.data)
                    .flat()  // Flatten to handle arrays of messages
                    .join('<br>'); // Join with a line break for readability

                withReactContent(Swal).fire({
                    title: "Error!",
                    text: errorMessages,
                    icon: "error"
                })
                //set errors response to state "errors"
                setErrors(error.response.data);
            })
    }
    const deletePost = async (id) => {
        //delete with api
        await Api.delete(`/api/data/pasien/delete/${id}`)
            .then(() => {
                navigate('/admin/pasien');
                setPatients([]);
                fetchPatients();
            })
    }
    // Handle click untuk menampilkan modal Edit
    const handleEditClick = (patients) => {
        setSelectedPatient(patients);
        setFormData(patients);
        console.log(formData);
        setShowModal(true);
    };
    // Handle close untuk menyembunyikan modal Edit
    const handleClose = () => {
        setShowModal(false);
        setSelectedPatient(null); // Reset data pasien ketika modal ditutup
    };

    // Handle click untuk menampilkan modal Tambah
    const handleAddClick = () => {
        setShowAddModal(true);
        setFormData({});
    };
    // Handle close untuk menyembunyikan modal Tambah
    const AddhandleClose = () => {
        setShowAddModal(false);
    };

    const formhandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };



    // Define columns for DataTable
    const columns = [
        {
            name: "Name",
            data: "name",
            className: "text-center",
            sortable: true,
        },
        {
            name: "Gender",
            data: "gender",
            className: "text-center",
            sortable: true,
        },
        {
            name: "Birth Date",
            data: "date_of_birth",
            className: "text-center",
            sortable: true,
        },
        {
            name: "Address",
            data: "address",
            className: "text-justify",
            sortable: true,
        },
        {
            name: "Phone Number",
            data: "phone_number",
            className: "text-center",
            sortable: true,
        },
        {
            name: "id",
            data: "id",
            className: "text-center",
            sortable: true,
            render: function (data) {
                return '<button class="btn btn-success btn-edit" data-id="' + data + '" > <i class="bi bi-pencil-square"></i></button>\
                <button class="btn btn-danger btn-hapus" data-id="' + data + '" > <i class="bi bi-trash"></i></button>';
            },
        },
    ];

    useEffect(() => {
        // Attach event listener setiap kali tabel selesai dirender ulang
        $("body").on("click", ".btn-edit", function () {
            const id = $(this).data("id");
            const patient = patients.find((p) => p.id === id);
            handleEditClick(patient);
        });
        // Bersihkan event listener saat component unmount
        return () => {
            $("body").off("click", ".btn-edit");
        };
    }, [patients]);

    useEffect(() => {
        // Attach event listener setiap kali tabel selesai dirender ulang
        $("body").on("click", ".btn-hapus", function () {
            const id = $(this).data("id");
            withReactContent(Swal).fire({
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
                    withReactContent(Swal).fire({
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
    }, [patients]);

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1>
                        <i className="bi bi-person-badge"></i> Data Pasien
                    </h1>
                    <p>Berikut data pasien klinik {appName}</p>
                </div>
                <ul className="app-breadcrumb breadcrumb side">
                    <li className="breadcrumb-item">
                        <i className="bi bi-house-door fs-6"></i>
                    </li>
                    <li className="breadcrumb-item">Data</li>
                    <li className="breadcrumb-item active">
                        <a href="#">Data Pasien</a>
                    </li>
                </ul>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body mb-3 d-flex justify-content-end">
                            <Button onClick={handleAddClick} className="btn btn-primary btn-add pull-right">
                                <i className="bi bi-plus"></i> Tambah Data
                            </Button>
                        </div>
                        <div className="tile-body">
                            <div className="table-responsive">
                                <DataTable
                                    columns={columns}
                                    data={patients}
                                    pagination
                                    className="table table-hover table-bordered"
                                    id="myTable"
                                >
                                    <thead className="text-center">
                                        <tr>
                                            <th>Nama</th>
                                            <th>Gender</th>
                                            <th>Tanggal Lahir</th>
                                            <th>Alamat</th>
                                            <th>Nomor Telepon</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Pasien</Modal.Title>
                </Modal.Header>

                <Form onSubmit={updatePost}>
                    <Modal.Body>
                        <div className="form-group row mb-2">
                            <label className="col-sm-4">Name:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={formhandleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label className="col-sm-4">Address:</label>
                            <div className="col-sm-8">
                                <textarea
                                    name="address"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={formhandleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label className="col-sm-4">Phone Number:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="phone_number"
                                    className="form-control"
                                    value={formData.phone_number}
                                    onChange={formhandleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label className="col-sm-4">Gender:</label>
                            <div className="col-sm-8">
                                <select
                                    name="gender"
                                    className="form-control"
                                    value={formData.gender}
                                    onChange={formhandleChange}
                                    required
                                >
                                    <option value="" disabled selected>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label className="col-sm-4">Date of Birth:</label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    className="form-control"
                                    value={formData.date_of_birth}
                                    onChange={formhandleChange}
                                    required
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>

                </Form>
            </Modal>

            <Modal show={showAddModal} onHide={AddhandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">Tambah Pasien</Modal.Title>
                </Modal.Header>

                <Form onSubmit={storePost}>
                    <Modal.Body>
                        <div className="form-group row mb-2">
                            <label className="col-sm-4">Name:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={formhandleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label className="col-sm-4">Address:</label>
                            <div className="col-sm-8">
                                <textarea
                                    name="address"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={formhandleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label className="col-sm-4">Phone Number:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="phone_number"
                                    className="form-control"
                                    value={formData.phone_number}
                                    onChange={formhandleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label className="col-sm-4">Gender:</label>
                            <div className="col-sm-8">
                                <select
                                    name="gender"
                                    className="form-control"
                                    value={formData.gender}
                                    onChange={formhandleChange}
                                    required
                                >
                                    <option value="" disabled selected>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label className="col-sm-4">Date of Birth:</label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    className="form-control"
                                    value={formData.date_of_birth}
                                    onChange={formhandleChange}
                                    required
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={AddhandleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>

                </Form>
            </Modal>
        </main >
    );
};

export default Pasien;
