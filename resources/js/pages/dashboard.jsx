import React from 'react';

const Dashboard = () => {
  return (
    <main className="app-content">
      <div className="app-title">
        <div>
          <h1><i className="bi bi-speedometer"></i> Dashboard</h1>
          <p>A free and open source Bootstrap 5 admin template</p>
        </div>
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item"><i className="bi bi-house-door fs-6"></i></li>
          <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <div className="widget-small primary coloured-icon"><i className="icon bi bi-people fs-1"></i>
            <div className="info">
              <h4>Users</h4>
              <p><b>5</b></p>
            </div>
          </div>
        </div>
        {/* Other widget components */}
      </div>
      {/* Sales and Support charts */}
    </main>
  );
};

export default Dashboard;