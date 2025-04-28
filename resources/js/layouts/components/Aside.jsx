import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MasterDataAccordion from './MasterDataAccordion';

const ButtonCariDestinasi = ({ setHandle }) => {
    return (
        <>
            <button type="button" className="col-12 btn btn-dark" onClick={() => setHandle(true)}><i className="fa fa-search"></i> Buat Destinasi</button>
        </>
    );
}

const ButtonCloseCariDestinasi = ({ setHandle }) => {
    return (
        <>
            <button type="button" className="col-12 btn btn-danger" onClick={() => setHandle(false)}><i className="fa fa-times"></i> Close</button>
        </>
    );
}

const ButtonCariRute = ({ setHandle }) => {
    return (
        <>
            <button type="button" className="col-12 btn btn-dark" onClick={() => setHandle()}><i className="fa fa-search"></i> Buat Rute</button>
        </>
    );
}

const ButtonCloseCariRute = () => {
    return (
        <>
            <button type="button" className="col-12 btn btn-danger text-white" disabled='yes' ><i className="fa fa-times"></i> Titik Mulai Belum di Set</button>
        </>
    );
}

export function Lside({ children, handleButton, handleButtonRute, setHandleButton }) {
    return (
        <>
            <aside className={`slide-in ${handleButton ? 'active' : ''} bg-gradient-dark border-0 border-radius-xl fixed-end mb-4 mr-2 mt-7 navbar navbar-expand-lg navbar-vertical sidenav`} id="sidenav-second">
                <div className="">
                    <i className="fa fa-clipboard-list p-3 text-white position-absolute end-0 top-0" aria-hidden="true" id="iconSidenav"></i>
                    <a className="navbar-brand m-0" rel="noopener noreferrer">
                        <span className="ms-1 font-weight-bold text-white">List Data Fasilitas Umum</span>
                    </a>
                </div>
                <hr className="horizontal light mt-0 mb-2" />

                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {handleButtonRute ? <ButtonCariRute setHandle={setHandleButton} /> : <ButtonCloseCariRute />}
                        </li>
                    </ul>
                </div>
                <div className="w-auto align-items-baseline" id="sidenav-collapse-second">

                    <ul className="navbar-nav">
                        {React.Children.map(children, (child, index) => (
                            <li key={index} className="nav-item px-0 ">
                                {child}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    )
}

function Aside({ children, handleButton, setHandleButton }) {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl mt-7 mb-4 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
            <div className="">
                <i className="fa fa-location-dot p-3 text-white position-absolute end-0 top-0" aria-hidden="true" id="iconSidenav"></i>
                <a className="navbar-brand m-0" rel="noopener noreferrer">
                    <span className="ms-1 font-weight-bold text-white">Trace Route</span>
                </a>
            </div>
            <hr className="horizontal light mt-0 mb-2" />
            <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {!handleButton ? <ButtonCariDestinasi setHandle={setHandleButton} /> : <ButtonCloseCariDestinasi setHandle={setHandleButton} />}
                    </li>
                    <li className="nav-item px-0">
                        <MasterDataAccordion />
                    </li>
                    {React.Children.map(children, (child, index) => (
                        <li key={index} className="nav-item px-0 my-2">
                            {child}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Aside;
