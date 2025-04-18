// src/pages/AdminDashboard.js
import React from 'react';

const AdminDashboard = () => {
  return (
    <>
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">
              Dashboard
            </h1>
          </div>
          <div className="row row-cards">
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="card">
                <div className="card-body p-3 text-center">
                  <div className="text-right text-green">
                    6%
                    <i className="fe fe-chevron-up"></i>
                  </div>
                  <div className="h1 m-0">43</div>
                  <div className="text-muted mb-4">New Tickets</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="card">
                <div className="card-body p-3 text-center">
                  <div className="text-right text-red">
                    -3%
                    <i className="fe fe-chevron-down"></i>
                  </div>
                  <div className="h1 m-0">17</div>
                  <div className="text-muted mb-4">Closed Today</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="card">
                <div className="card-body p-3 text-center">
                  <div className="text-right text-green">
                    9%
                    <i className="fe fe-chevron-up"></i>
                  </div>
                  <div className="h1 m-0">7</div>
                  <div className="text-muted mb-4">New Replies</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="card">
                <div className="card-body p-3 text-center">
                  <div className="text-right text-green">
                    3%
                    <i className="fe fe-chevron-up"></i>
                  </div>
                  <div className="h1 m-0">27.3K</div>
                  <div className="text-muted mb-4">Followers</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="card">
                <div className="card-body p-3 text-center">
                  <div className="text-right text-red">
                    -2%
                    <i className="fe fe-chevron-down"></i>
                  </div>
                  <div className="h1 m-0">$95</div>
                  <div className="text-muted mb-4">Daily Earnings</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="card">
                <div className="card-body p-3 text-center">
                  <div className="text-right text-red">
                    -1%
                    <i className="fe fe-chevron-down"></i>
                  </div>
                  <div className="h1 m-0">621</div>
                  <div className="text-muted mb-4">Products</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card p-3">
                <div className="d-flex align-items-center">
                  <span className="stamp stamp-md bg-blue mr-3">
                    <i className="fe fe-dollar-sign"></i>
                  </span>
                  <div>
                    <h4 className="m-0"><a href="#">132 <small>Sales</small></a></h4>
                    <small className="text-muted">12 waiting payments</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card p-3">
                <div className="d-flex align-items-center">
                  <span className="stamp stamp-md bg-green mr-3">
                    <i className="fe fe-shopping-cart"></i>
                  </span>
                  <div>
                    <h4 className="m-0"><a href="#">78 <small>Orders</small></a></h4>
                    <small className="text-muted">32 shipped</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card p-3">
                <div className="d-flex align-items-center">
                  <span className="stamp stamp-md bg-red mr-3">
                    <i className="fe fe-users"></i>
                  </span>
                  <div>
                    <h4 className="m-0"><a href="#">1,352 <small>Members</small></a></h4>
                    <small className="text-muted">163 registered today</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card p-3">
                <div className="d-flex align-items-center">
                  <span className="stamp stamp-md bg-yellow mr-3">
                    <i className="fe fe-message-square"></i>
                  </span>
                  <div>
                    <h4 className="m-0"><a href="#">132 <small>Comments</small></a></h4>
                    <small className="text-muted">16 waiting</small>
                  </div>
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
