import { useState, useEffect } from "react";
import api from "../../api";

function MasterDataAccordion() {
  const [isOpen, setIsOpen] = useState(true);
  const [countData, setCountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountData = async () => {
      try {
        const response = await api.get('/get/count/fasum'); // Ganti dengan endpoint yang sesuai
        setCountData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountData();
  }, []);


  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  if (loading) return <div className="ml-4"><i className="fa fa-spinner fa-spin"></i>  Loading...</div>;
  if (error) return <div className="ml-4">Error: {error}</div>;

  return (
    <div className="accordion col-12 mb-1">
      <div
        className="accordion-header border border-dark text-white px-2 py-1  cursor-pointer"
        onClick={toggleAccordion}
        style={{ userSelect: "none" }}
      >
        <h6 className="mb-0" style={{ fontSize: "10pt" }}><i className="fa-regular fa-bell"></i> Master Data</h6>
      </div>

      {isOpen && (
        <div className="accordion-body py-1 px-2 border border-top-0 border-dark rounded-bottom" >
          <ul className="list-unstyled text-white" style={{ fontSize: "9pt" }}>
            {Object.entries(countData).map(([jenis, count], index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span>{jenis}</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MasterDataAccordion;
