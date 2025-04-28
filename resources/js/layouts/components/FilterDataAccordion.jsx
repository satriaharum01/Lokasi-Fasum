import { useState, useEffect } from "react";

// Komponen CheckboxList yang mengelola checkbox dan mengirimkan perubahan ke parent
function CheckboxList({ checkedItems, onCheckboxChange }) {

  const handleCheckboxChange = (index) => {
    const updatedItems = [...checkedItems];
    updatedItems[index].checked = !updatedItems[index].checked;
    onCheckboxChange(updatedItems); // Kirim perubahan langsung ke parent
  };

  return (
    <ul className="list-unstyled">
      {checkedItems.map((item, index) => (
        <li key={index}>
          <label className="text-white">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(index)} // Memanggil fungsi ketika checkbox diubah
            />
            {" "}
            {item.jenis}
          </label>
        </li>
      ))}
    </ul>
  );
}

// Komponen FilterDataAccordion yang berfungsi sebagai wrapper untuk Accordion
function FilterDataAccordion({ jenisData, onCheckboxChange }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion col-12">
      <div
        className="accordion-header border border-dark text-white px-2 py-1 cursor-pointer"
        onClick={toggleAccordion}
        style={{ userSelect: "none" }}
      >
        <h6 className="mb-0" style={{ fontSize: "10pt" }}><i className="fa fa-filter"></i> Filter</h6>
      </div>

      {isOpen && (
        <div className="accordion-body py-1 px-2 border border-top-0 border-dark rounded-bottom">
          <CheckboxList checkedItems={jenisData} onCheckboxChange={onCheckboxChange} />
        </div>
      )}
    </div>
  );
}

export default FilterDataAccordion;
