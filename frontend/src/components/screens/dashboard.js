import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import SideNav from "./sideNav";
const Dashboard = () => {
  const history = useHistory();

  useEffect(()=>{
    let sidebar = document.querySelector('.sidebar')

    document.querySelector('#mobile-toggle').onclick = () => {
        sidebar.classList.toggle('active')
    }
    
    document.querySelector('#sidebar-close').onclick = () => {
        sidebar.classList.toggle('active')
    }
  },[])


  return (
    <div>
      
        <SideNav />
        <div className="main">
            <div className="main-header">
                <div className="mobile-toggle" id="mobile-toggle">
                    <i className='bx bx-menu-alt-right'></i>
                </div>
                <div className="main-title">
                    dashboard
                </div>
            </div>
            <div className="main-content">
                <div className="row">
                    <div className="col-4 col-md-6 col-sm-12">
                        <div className="box box-hover">
                            <div className="counter">
                                <div className="counter-title">
                                    total projects
                                </div>
                                <div className="counter-info">
                                    <div className="counter-count">
                                        6578
                                    </div>
                                    <i className='bx bx-building-house' ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 col-md-6 col-sm-12">
                        <div className="box box-hover">
                            <div className="counter">
                                <div className="counter-title">
                                    total vendors
                                </div>
                                <div className="counter-info">
                                    <div className="counter-count">
                                        30.5%
                                    </div>
                                    <i className='bx bx-shopping-bag'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 col-md-6 col-sm-12">
                        <div className="box box-hover">
                            <div className="counter">
                                <div className="counter-title">
                                    total employees
                                </div>
                                <div className="counter-info">
                                    <div className="counter-count">
                                        $9,780
                                    </div>
                                    <i className='bx bx-group'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    
                    
                    <div className="col-12">
                        <div className="box">
                            <div className="box-header">
                                Recent projects
                            </div>
                            <div className="box-body overflow-scroll">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Customer</th>
                                            <th>Date</th>
                                            <th>Order status</th>
                                            <th>Payment status</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#2345</td>
                                            <td>
                                                <div className="order-owner">
                                                    <span>tuat tran anh</span>
                                                </div>
                                            </td>
                                            <td>2021-05-09</td>
                                            <td>
                                                <span className="order-status order-ready">
                                                    Ready
                                                </span>
                                            </td>
                                            <td>
                                                <div className="payment-status payment-pending">
                                                    <div className="dot"></div>
                                                    <span>Pending</span>
                                                </div>
                                            </td>
                                            <td>$123.45</td>
                                        </tr>
                                        <tr>
                                            <td>#2345</td>
                                            <td>
                                                <div className="order-owner">
                                                    <span>John doe</span>
                                                </div>
                                            </td>
                                            <td>2021-05-09</td>
                                            <td>
                                                <span className="order-status order-shipped">
                                                    Shipped
                                                </span>
                                            </td>
                                            <td>
                                                <div className="payment-status payment-paid">
                                                    <div className="dot"></div>
                                                    <span>Paid</span>
                                                </div>
                                            </td>
                                            <td>$123.45</td>
                                        </tr>
                                        <tr>
                                            <td>#2345</td>
                                            <td>
                                                <div className="order-owner">
                                                    <span>evelyn</span>
                                                </div>
                                            </td>
                                            <td>2021-05-09</td>
                                            <td>
                                                <span className="order-status order-shipped">
                                                    Shipped
                                                </span>
                                            </td>
                                            <td>
                                                <div className="payment-status payment-paid">
                                                    <div className="dot"></div>
                                                    <span>Paid</span>
                                                </div>
                                            </td>
                                            <td>$123.45</td>
                                        </tr>
                                        <tr>
                                            <td>#2345</td>
                                            <td>
                                                <div className="order-owner">
                                                    <span>John doe</span>
                                                </div>
                                            </td>
                                            <td>2021-05-09</td>
                                            <td>
                                                <span className="order-status order-shipped">
                                                    Shipped
                                                </span>
                                            </td>
                                            <td>
                                                <div className="payment-status payment-paid">
                                                    <div className="dot"></div>
                                                    <span>Paid</span>
                                                </div>
                                            </td>
                                            <td>$123.45</td>
                                        </tr>
                                        <tr>
                                            <td>#2345</td>
                                            <td>
                                                <div className="order-owner">
                                                    <span>evelyn</span>
                                                </div>
                                            </td>
                                            <td>2021-05-09</td>
                                            <td>
                                                <span className="order-status order-shipped">
                                                    Shipped
                                                </span>
                                            </td>
                                            <td>
                                                <div className="payment-status payment-paid">
                                                    <div className="dot"></div>
                                                    <span>Paid</span>
                                                </div>
                                            </td>
                                            <td>$123.45</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
