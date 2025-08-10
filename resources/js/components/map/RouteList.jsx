import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export function RouteList({ route, loadingRoute }) {
    const [isOpen, setIsOpen] = useState(true);
    const [data, setData] = useState([]);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        console.log(data.length);
        if (loadingRoute) {
            setData([]);
        }
        setData(route);
    }, [loadingRoute]);

    return (
        <>
            <div className="accordion col-12">
                <div
                    className="accordion-header border border-dark text-white px-2 py-1 cursor-pointer"
                    onClick={toggleAccordion}
                    style={{ userSelect: "none" }}
                >
                    <h6 className="mb-0" style={{ fontSize: "10pt" }}>
                        <i className="fa fa-rotate fa-spin"></i> Route List
                    </h6>
                </div>

                {isOpen && (
                    <div className="accordion-body py-1 px-2 border border-top-0 border-dark rounded-bottom">
                        <div
                            className={`fade route-list ${!loadingRoute ? "show" : " "}`}
                        >
                            {data.length < 1 ? (
                                <div>
                                    <i className="fa fa-spinner fa-spin"></i>{" "}
                                    Loading Route...{" "}
                                </div>
                            ) : (
                                data.map((item, index) => (
                                    <div key={index} className="route-item">
                                        <div className="route-title">
                                            {index} ➔ {item.nama}
                                        </div>
                                        {index !== route.length - 1 && (
                                            <div className="route-dots">
                                                <div className="dot-1" />
                                                <div className="dot-2" />
                                                <div className="dot-3" />
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export const RouteListModal = ({
    show,
    onClose,
    directionPanelRef,
    loadingRoute,
}) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            backdrop="static"
            animation={true}
            style={{ zIndex: 9999 }}
        >
            <Modal.Header>
                <Modal.Title>Route List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Steps */}
                {!loadingRoute ? (
                    <div ref={directionPanelRef} />
                ) : (
                    <div>
                        <i className="fa fa-spinner fa-spin"></i> Loading
                        Route...
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Tutup
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
