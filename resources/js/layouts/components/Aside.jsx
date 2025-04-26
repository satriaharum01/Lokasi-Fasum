import { Link, useLocation } from "react-router-dom";
import MasterDataAccordion from "./MasterDataAccordion";
import { Button } from "react-bootstrap";
import FilterDataAccordion from "./FilterDataAccordion";

function Aside() {
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
                        <button type="button" className="col-12 btn btn-dark"><i className="fa fa-search"></i> Buat Destinasi</button>
                    </li>
                    <li className="nav-item px-0">
                        <MasterDataAccordion />
                    </li>
                    <li className="nav-item px-0">
                        <FilterDataAccordion />
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Aside;
