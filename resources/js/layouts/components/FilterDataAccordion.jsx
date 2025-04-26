import { useState, useEffect } from "react";
import api from "../../api";

function CheckboxList({ jenisData }) {
  const [checkedItems, setCheckedItems] = useState(
    jenisData.map((data) => ({
      ...data,
      checked: true, // semua default ke checked
    }))
  );

  const handleCheckboxChange = (index) => {
    const updatedItems = [...checkedItems];
    updatedItems[index].checked = !updatedItems[index].checked;
    setCheckedItems(updatedItems);
  };

  return (
    <ul className="list-unstyled">
      {checkedItems.map((item, index) => (
        <li key={index}>
          <label className="text-white">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            {" "}
            {item.jenis}
          </label>
        </li>
      ))}
    </ul>
  );
}

function FilterDataAccordion() {
  const [isOpen, setIsOpen] = useState(true);
  const [jenisData, setJenisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJenisData = async () => {
      try {
        const response = await api.get('/get/jenis'); // Ganti dengan endpoint yang sesuai
        setJenisData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJenisData();
  }, []);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="accordion col-12">
        <div
          className="accordion-header border border-dark text-white px-2 py-1  cursor-pointer"
          onClick={toggleAccordion}
          style={{ userSelect: "none" }}
        >
          <h6 className="mb-0" style={{ fontSize: "10pt" }}><i className="fa fa-filter"></i> Filter</h6>
        </div>

        {isOpen && (
          <div className="accordion-body py-1 px-2 border border-top-0 border-dark rounded-bottom" >
            <ul className="list-unstyled text-white" style={{ fontSize: "9pt" }}>
              <CheckboxList jenisData={jenisData} />
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default FilterDataAccordion;
