import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = () => {
  const history = useHistory();

  //   Data
  const [BookNo, setBookNo] = useState("");
  const [Name, setName] = useState("");
  const [BookDate, setBookDate] = useState("");
  const [BookData, setBookData] = useState({});

  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");

    document.querySelector("#mobile-toggle").onclick = () => {
      sidebar.classList.toggle("active");
    };

    document.querySelector("#sidebar-close").onclick = () => {
      sidebar.classList.toggle("active");
    };
  }, []);

  const { id } = useParams();

  useEffect(() => {
    fetch("/financeBookList")
      .then((res) => res.json())
      .then((result) => {
        result.book.forEach((book, index) => {
          if (book._id == id) {
            setBookData(book);
            setBookNo(book.BookObject.BookNo);
            setName(book.BookObject.Name);
            setBookDate(book.BookObject.BookDate);
          }
        });
      });
  }, []);

  const UploadData = async () => {
    let FinanceBook = BookData;
    FinanceBook.BookObject.BookNo = BookNo;
    FinanceBook.BookObject.Name = Name;
    FinanceBook.BookObject.BookDate = BookDate;

    fetch("/updateFinanceBook", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BookID: id,
        FinanceBook,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Upload Error !!!");
        } else {
          alert("Uploaded Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <SideNav />
      <div className="main">
        <div className="main-header">
          <div className="mobile-toggle" id="mobile-toggle">
            <i className="bx bx-menu-alt-right"></i>
          </div>
          <div className="main-title">Edit Finance Books</div>
        </div>
        <div className="main-content">
          <div className="row">
            <div className="col-4 col-md-6 col-sm-12">
              <Link style={{ display: "inline" }} to="/finance-Book">
                <div className="box box-hover">
                  <div className="counter">
                    <div className="counter-title">View</div>
                    <div className="counter-info">
                      <div className="counter-count">Books</div>
                      <i class="bx bx-list-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <form name="add_name" id="add_name" action="#">
            <div class="row">
              <div class="col-12 col-md-12 col-sm-12">
                <div class="box invoice_primarydata_container">
                  <div class="row">
                    <div class="col-12">
                      <div class="row">
                        <div
                          class="col-12"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              placeholder="Book No"
                              value={BookNo}
                              onChange={(e) => setBookNo(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="customer_name"
                              placeholder="Book Name"
                              value={Name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              placeholder="Date"
                              onFocus={(e) => (e.currentTarget.type = "date")}
                              value={BookDate}
                              onChange={(e) => setBookDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 actionBtn-container">
                <div
                  class="add-row-btn"
                  name="submit"
                  id="submit"
                  onClick={() => UploadData()}
                >
                  <span>Create Book</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
