import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = (props) => {
  const history = useHistory();
  const [CashBookDate, setCashBookDate] = useState("");
  let [BookData, setBookData] = useState([]);
  let [CashBook_Fields_data, setCashBook_Fields_data] = useState([]);
  let [New_Field, setNew_Field] = useState("");

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
            let CashBook_Fields = book.BookObject.CashBook.CashBookFields_Array;

            setBookData(book);
            setCashBook_Fields_data(CashBook_Fields);

            let dynamic_cashbook_container = document.querySelector(
              ".dynamic_cashbook_container"
            );

            for (const field in CashBook_Fields) {
              let Cashbook_Field_Container = document.createElement("tr");
              Cashbook_Field_Container.classList.add(`${field}-container`);

              Cashbook_Field_Container.innerHTML = `
                <td>
                  <input
                    required
                    type="text"
                    class="table_input_field ${field}"
                    value="${field}"
                  />
                </td>
                
                `;

              // <td>
              //   <span class="optionBtn optionBtn_delete ${field}-delete">
              //     Delete
              //   </span>
              // </td>;

              dynamic_cashbook_container.appendChild(Cashbook_Field_Container);

              // let Delete_Field = dynamic_cashbook_container.querySelector(
              //   `.${field}-delete`
              // );
              // let Field_container = dynamic_cashbook_container.querySelector(
              //   `.${field}-container`
              // );

              // Delete_Field.addEventListener("click", (e) => {
              //   dynamic_cashbook_container.removeChild(Field_container);
              //   delete CashBook_Fields[field];

              //   console.log(CashBook_Fields);
              // });
            }
          }
        });
      });
  }, []);

  const UploadData = () => {
    if (New_Field.length > 0) {
      let CashBook_Fields = CashBook_Fields_data;

      let New_Fiel_Name = "NEW_" + New_Field;

      CashBook_Fields[New_Fiel_Name] = [];

      let Finance_Book_Data = BookData;
      Finance_Book_Data.BookObject.CashBook.CashBookFields_Array =
        CashBook_Fields;

      fetch("/updateFinanceBook", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BookID: id,
          FinanceBook: Finance_Book_Data,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert("Upload Error !!!");
          } else {
            alert("Uploaded Successfully");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("Please Fill the Fiels !");
      window.location.reload();
    }
  };

  let ViewBook = (bookID) => {
    history.push("/finance-Book");
  };
  return (
    <div>
      <SideNav />

      <div className="main">
        <div className="main-header">
          <div className="mobile-toggle" id="mobile-toggle">
            <i className="bx bx-menu-alt-right"></i>
          </div>
          <div className="main-title">View Loan</div>
        </div>
        <div className="main-content">
          <div className="row">
            <div className="col-4 col-md-6 col-sm-12">
              <div className="box box-hover" onClick={() => ViewBook(id)}>
                <div className="counter">
                  <div className="counter-title">View</div>
                  <div className="counter-info">
                    <div className="counter-count">Finance Books</div>
                    <i class="bx bx-list-check"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="row invoice_primarydata_container"
            style={{ margin: "10px" }}
          >
            <div
              className="col-12"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input
                type="text"
                placeholder="Field Name"
                className="new_field_Name"
                onChange={(e) => setNew_Field(e.target.value)}
              />
              <span
                class="optionBtn optionBtn_View addNew_FieldBtn"
                style={{ marginLeft: "20px" }}
                onClick={() => UploadData()}
              >
                Add New Field
              </span>
            </div>
          </div>
          <form name="add_name" id="add_name" action="#">
            <div class="row">
              <div
                class="col-12"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <table
                  style={{
                    width: "50%",
                    minWidth: "10%",
                    overflowX: "auto",
                  }}
                >
                  <thead>
                    <tr class="table-headers">
                      <th>Fiel Name</th>
                    </tr>
                  </thead>
                  <tbody
                    id="dynamic_field"
                    class="purchaseTabelContainer dynamic_cashbook_container"
                  >
                    <tr>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
