import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// Images
import Logo from "../images/VM.jpg";
import USerImage from "../images/finance_user.png";

const SideNav = () => {
  const history = useHistory();

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

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src={Logo} alt="Comapny logo" />
          <div className="sidebar-close" id="sidebar-close">
            <i className="bx bx-left-arrow-alt"></i>
          </div>
        </div>
        <div className="sidebar-user">
          <div className="sidebar-user-info">
            <img src={USerImage} alt="User picture" className="profile-image" />
            <div className="sidebar-user-name">Vinayaga Motors</div>
          </div>
          {/* <button className="btn btn-outline">
                <a href=""><i className='bx bx-log-out bx-flip-horizontal'></i></a>
                </button> */}
        </div>
        <ul className="sidebar-menu">
          {/* <li>
            <a href="/">
              <i className="bx bx-home"></i>
              <span>dashboard</span>
            </a>
          </li> */}

          <li>
            <a href="/">
              <i class="bx bx-book-content"></i>
              <span>Loan</span>
            </a>
          </li>

          <li className="sidebar-submenu">
            <a className="sidebar-menu-dropdown">
              <i class="bx bx-calendar-event"></i>
              <span className="active">Entries</span>
              <div className="dropdown-icon"></div>
            </a>
            <ul className="sidebar-menu sidebar-menu-dropdown-content">
              <li>
                <a href="/due-current">
                  <span>Due Current</span>
                </a>
              </li>
              <li>
                <a href="/cutting-intrest">
                  <span>Cutting Intrest</span>
                </a>
              </li>
              <li>
                <a href="/loan-balance">
                  <span>Loan Balance</span>
                </a>
              </li>
              <li>
                <a href="/account-close">
                  <span>A/C Close</span>
                </a>
              </li>
            </ul>
          </li>

          <li className="sidebar-submenu">
            <a className="sidebar-menu-dropdown">
              <i class="bx bxs-receipt"></i>
              <span className="active">Receipts</span>
              <div className="dropdown-icon"></div>
            </a>
            <ul className="sidebar-menu sidebar-menu-dropdown-content">
              <li>
                <a href="/self-receipt">
                  <span>Self</span>
                </a>
              </li>
              <li>
                <a href="/manul-receipt">
                  <span>Manual</span>
                </a>
              </li>
              <li>
                <a href="/auto-receipt">
                  <span>Automatic</span>
                </a>
              </li>

              <li>
                <a href="/RC-entry">
                  <span>RC Entry</span>
                </a>
              </li>
              <li>
                <a href="/TA-entry">
                  <span>TA Entry</span>
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a href="/finance-Book">
              <i class="bx bx-book-bookmark"></i>
              <span>Finance Book</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
