import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = () => {
  const history = useHistory();

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

  let editbook = (bookID) => {
    history.push(`/editbook/${bookID}`);
  };
  let openBook = (bookID) => {
    history.push(`/openbook/${bookID}`);
  };

  let deleteLoan = (bookID) => {
    if (window.confirm("Are you sure you want to Delete?")) {
      fetch("/deleteBook", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookID,
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
          <div className="main-title">Finance Book</div>
        </div>
        <div className="main-content">
          <div className="row">
            <div className="col-4 col-md-6 col-sm-12">
              <Link style={{ display: "inline" }} to="/create-finance-Book">
                <div className="box box-hover">
                  <div className="counter">
                    <div className="counter-title">Create</div>
                    <div className="counter-info">
                      <div className="counter-count">Finance Book</div>
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
                <div className="box-header">Recent Books</div>
                <div className="box-body overflow-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>S:No</th>
                        <th>Date</th>
                        <th>Book Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BookData.map((book) => {
                        let book_results = book.BookObject;
                        console.log(book_results);
                        return (
                          <tr key={book._id}>
                            <td>{book_results.BookNo}</td>
                            <td>{book_results.BookDate}</td>
                            <td>{book_results.Name}</td>

                            <td>
                              <span
                                className="optionBtn optionBtn_edit"
                                onClick={() => editbook(book._id)}
                              >
                                Edit
                              </span>
                            </td>
                            <td>
                              <span
                                className="optionBtn optionBtn_delete"
                                onClick={() => deleteLoan(book._id)}
                              >
                                Delete
                              </span>
                            </td>
                            <td>
                              <span
                                className="optionBtn optionBtn_View"
                                onClick={() => openBook(book._id)}
                              >
                                Open
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
