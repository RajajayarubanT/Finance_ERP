import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = () => {
  const history = useHistory();
  const { id } = useParams();

  let [BookData, setBookData] = useState([]);

  useEffect(() => {
    fetch("/financeBookList")
      .then((res) => res.json())
      .then((result) => {
        setBookData(result.book);
      });
  }, []);

  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");

    document.querySelector("#mobile-toggle").onclick = () => {
      sidebar.classList.toggle("active");
    };

    document.querySelector("#sidebar-close").onclick = () => {
      sidebar.classList.toggle("active");
    };

    document.querySelectorAll(".sidebar-submenu").forEach((e) => {
      e.querySelector(".sidebar-menu-dropdown").onclick = (event) => {
        event.preventDefault();
        e.querySelector(
          ".sidebar-menu-dropdown .dropdown-icon"
        ).classList.toggle("active");

        let dropdown_content = e.querySelector(
          ".sidebar-menu-dropdown-content"
        );
        let dropdown_content_lis = dropdown_content.querySelectorAll("li");

        let active_height =
          dropdown_content_lis[0].clientHeight * dropdown_content_lis.length;

        dropdown_content.classList.toggle("active");

        dropdown_content.style.height = dropdown_content.classList.contains(
          "active"
        )
          ? active_height + "px"
          : "0";
      };
    });
  }, []);

  let CashBook = () => {
    history.push(`/cashbook/${id}`);
  };
  let Statement = () => {
    history.push(`/statement`);
  };
  let balanceSheet = () => {
    history.push(`/balance-sheet/${id}`);
  };
  let Profit_loss = () => {
    history.push(`/profit_loss/${id}`);
  };
  let Trial_Balance = () => {
    history.push(`/trial-balance/${id}`);
  };

  return (
    <div>
      <SideNav />
      <div className="main">
        <div className="main-header">
          <div className="mobile-toggle" id="mobile-toggle">
            <i className="bx bx-menu-alt-right"></i>
          </div>
          <div className="main-title">Book Overview</div>
        </div>
        <div className="main-content">
          <div className="row">
            <div className="col-4 col-md-6 col-sm-12">
              <div className="box box-hover" onClick={() => CashBook()}>
                <div className="counter">
                  <div className="counter-title">Finance</div>
                  <div className="counter-info">
                    <div className="counter-count">Cash Book</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4 col-md-6 col-sm-12">
              <div className="box box-hover" onClick={() => Trial_Balance()}>
                <div className="counter">
                  <div className="counter-title">Finance</div>
                  <div className="counter-info">
                    <div className="counter-count">Trial Balance</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 col-md-6 col-sm-12">
              <div className="box box-hover" onClick={() => balanceSheet()}>
                <div className="counter">
                  <div className="counter-title">Finance</div>
                  <div className="counter-info">
                    <div className="counter-count">Balance Sheet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 col-md-6 col-sm-12">
              <div className="box box-hover" onClick={() => Statement()}>
                <div className="counter">
                  <div className="counter-title">Finance</div>
                  <div className="counter-info">
                    <div className="counter-count">Statement</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6 col-sm-12">
              <div className="box box-hover" onClick={() => Profit_loss()}>
                <div className="counter">
                  <div className="counter-title">Finance</div>
                  <div className="counter-info">
                    <div className="counter-count">Profit & Loss</div>
                  </div>
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
