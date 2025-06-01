// src/pages/AdminDashboard.js
import React, { useState, useEffect } from "react";
import Preloader from "../components/InnerPreloader";
import api from "../apilogin";

const AdminDashboard = () => {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mendapatkan user aktif dari sesi
        const fetchData = async () => {
            try {
                const response = await api.get("/api/get/dashboard-content");
                setDataList(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="my-3 my-md-5">
                <div className="container">
                    <div className="page-header">
                        <h1 className="page-title">Dashboard</h1>
                    </div>
                    <div className="row row-cards">
                        <div className="col-6 col-sm-4 col-lg-2">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                                    <div
                                        className="text-right text-green"
                                        style={{ visibility: "hidden" }}
                                    >
                                        
                                        <i className="fe fe-chevron-up"></i>
                                    </div>
                                    <div className="h1 m-0">{loading ? <Preloader /> : (dataList.jenis)}</div>
                                    <div className="text-muted mb-4">
                                        Jenis Fasum
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-4 col-lg-2">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                                    <div
                                        className="text-right text-red"
                                        style={{ visibility: "hidden" }}
                                    >
                                        6%
                                        <i className="fe fe-chevron-up"></i>
                                    </div>
                                    <div className="h1 m-0">{loading ? <Preloader /> : (dataList.fasum)}</div>
                                    <div className="text-muted mb-4">Fasum</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-4 col-lg-2">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                                    <div
                                        className="text-right text-green"
                                        style={{ visibility: "hidden" }}
                                    >
                                        6%
                                        <i className="fe fe-chevron-up"></i>
                                    </div>
                                    <div className="h1 m-0">{loading ? <Preloader /> : (dataList.taman)}</div>
                                    <div className="text-muted mb-4">Taman</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-4 col-lg-2">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                                    <div
                                        className="text-right text-green"
                                        style={{ visibility: "hidden" }}
                                    >
                                        6%
                                        <i className="fe fe-chevron-up"></i>
                                    </div>
                                    <div className="h1 m-0">{loading ? <Preloader /> : (dataList.lapangan)}</div>
                                    <div className="text-muted mb-4">
                                        Lapangan
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-4 col-lg-2">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                                    <div
                                        className="text-right text-red"
                                        style={{ visibility: "hidden" }}
                                    >
                                        6%
                                        <i className="fe fe-chevron-up"></i>
                                    </div>
                                    <div className="h1 m-0">{loading ? <Preloader /> : (dataList.rumah_sakit)}</div>
                                    <div className="text-muted mb-4">
                                        Rumah Sakit
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-4 col-lg-2">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                                    <div
                                        className="text-right text-red"
                                        style={{ visibility: "hidden" }}
                                    >
                                        -1%
                                        <i className="fe fe-chevron-down"></i>
                                    </div>
                                    <div className="h1 m-0">{loading ? <Preloader /> : (dataList.spbu)}</div>
                                    <div className="text-muted mb-4">SPBU</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
