import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = () => {
  const history = useHistory();

  let [LoanData, setLoanData] = useState([]);

  useEffect(() => {
    fetch("/loanslist")
      .then((res) => res.json())
      .then((result) => {
        setLoanData(result.loan);
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

  let editLoan = (loanID) => {
    history.push(`/editLoan/${loanID}`);
  };
  let viewLoan = (loanID) => {
    history.push(`/viewLoan/${loanID}`);
  };

  let deleteLoan = (loanID) => {
    if (window.confirm("Are you sure you want to Delete?")) {
      console.log(loanID);

      fetch("/deleteLoan", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loanID,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert("Something Went Wrong !!!");
          } else {
            alert(data);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <SideNav />
      <div className="main">
        <div className="main-header">
          <div className="mobile-toggle" id="mobile-toggle">
            <i className="bx bx-menu-alt-right"></i>
          </div>
          <div className="main-title">Loan</div>
        </div>
        <div className="main-content">
          <div className="row">
            <div className="col-4 col-md-6 col-sm-12">
              <Link style={{ display: "inline" }} to="/createLoan">
                <div className="box box-hover">
                  <div className="counter">
                    <div className="counter-title">Create</div>
                    <div className="counter-info">
                      <div className="counter-count">Loan</div>
                      <i className="bx bx-plus-circle"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="box">
                <div className="box-header">Recent projects</div>
                <div className="box-body overflow-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>L:No</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Intrest</th>
                        <th>Loan Amount</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LoanData.map((loan) => {
                        let loan_results = loan.LoanObject;
                        console.log(loan_results);
                        return (
                          <tr key={loan._id}>
                            <td>{loan_results.LoanNo}</td>
                            <td>{loan_results.LoanDate}</td>
                            <td>{loan_results.Name}</td>
                            <td>{loan_results.Intrest}</td>
                            <td>{loan_results.LoanAmount}</td>

                            <td>
                              <span
                                className="optionBtn optionBtn_edit"
                                onClick={() => editLoan(loan._id)}
                              >
                                Edit
                              </span>
                            </td>
                            <td>
                              <span
                                className="optionBtn optionBtn_delete"
                                onClick={() => deleteLoan(loan._id)}
                              >
                                Delete
                              </span>
                            </td>
                            <td>
                              <span
                                className="optionBtn optionBtn_View"
                                onClick={() => viewLoan(loan._id)}
                              >
                                Details
                              </span>
                            </td>
                          </tr>
                        );
                      })}
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
