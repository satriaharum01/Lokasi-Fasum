import { useState, useEffect, useRef } from "react";

// Komponen CheckboxList yang mengelola checkbox dan mengirimkan perubahan ke parent
function CheckboxList({ checkedItems, onCheckboxChange, handleShow, setHandleShow, loadingEst, setLoadingEst }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setHandleShow(true);
    }, 1000); // Waktu loading bisa disesuaikan
    return () => clearTimeout(timer);
  }, [handleShow]);

  const handleCheckboxChange = (index) => {
    const updatedItems = [...checkedItems];
    updatedItems[index].checked = !updatedItems[index].checked;
    onCheckboxChange(updatedItems); // Kirim perubahan langsung ke parent
  };

  return (
    <ul className="list-unstyled">
      {checkedItems.map((item, index) => (
        <li key={index}>
          <div className={`slide-in fade card ${!handleShow ? '' : 'active show'} card-body my-2 bg-gray-dark-light`}>
            <div className="row text-white">
              <label className="align-self-center col-lg-1 col-1" style={{ cursor: "pointer" }}>
                <input style={{ transform: "scale(1.5)" }}
                  type="checkbox" className="cursor-pointer"
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(index)} // Memanggil fungsi ketika checkbox diubah
                />
              </label>
              <div className="col-lg-11 col-11 row">
                <div className="col-lg-8 col-8 fw-bolder" style={{ fontSize: "11pt" }}>
                  {item.tempat}
                </div>
                <div className="col-lg-4 col-4 bg-blue-darker rounded align-self-center text-center" style={{ fontSize: "10pt" }}>
                  {item.jenis}
                </div>
                <div className="col-lg-12 col-12 fw-lighter" style={{ fontSize: "9pt" }}>{item.alamat}</div>
                <div className="col-lg-5 col-5"><i className="fa fa-location-arrow text-primary"></i><span className="mx-2" style={{ fontSize: "10pt" }}>{loadingEst ? <i className="fa fa-cog fa-spin"></i> : (item.jarak == 0 ? `${item.jarak} Km` : item.jarak )}</span></div>
                <div className="col-lg-5 col-5"><i className="fa fa-clock text-primary"></i> <span className="mx-2" style={{ fontSize: "10pt" }}>{loadingEst ? <i className="fa fa-cog fa-spin"></i> : (item.waktu == 0 ? `${item.waktu} Menit` : item.waktu )}</span></div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Komponen ListDataAccordion yang berfungsi sebagai wrapper untuk Accordion
function ListDataAccordion({ data, onCheckboxChange, loadingEst, setLoadingEst }) {
  const [isOpen, setIsOpen] = useState(true);
  const [handleShow, setHandleShow] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const prevLength = usePrevious(data.length);

  useEffect(() => {
    if (prevLength !== undefined && prevLength !== data.length) {
      
      setHandleShow(false);
    }
  }, [data.length, prevLength]);


  return (
    <div className="accordion col-12 ">
      <div
        className="accordion-header border border-dark text-white px-2 py-1 cursor-pointer"
        onClick={toggleAccordion}
        style={{ userSelect: "none" }}
      >
        <h6 className="mb-0" style={{ fontSize: "10pt" }}><i className="fa fa-table"></i> Listed Data</h6>
      </div>

      {isOpen && (
        <div className="accordion-body py-1 px-2 border border-top-0 border-dark rounded-bottom" style={{ cursor: "default" }}>
          <CheckboxList checkedItems={data} onCheckboxChange={onCheckboxChange} handleShow={handleShow} setHandleShow={setHandleShow} loadingEst={loadingEst} setLoadingEst={setLoadingEst}/>
        </div>
      )}
    </div>
  );
}

export default ListDataAccordion;
