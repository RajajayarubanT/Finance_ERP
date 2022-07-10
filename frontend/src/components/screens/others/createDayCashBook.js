import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = (props) => {
  const history = useHistory();
  const [CashBookDate, setCashBookDate] = useState("");
  let [BookData, setBookData] = useState([]);
  let [CashBook_Fields_data, setCashBook_Fields_data] = useState([]);

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

  const Total_Accounts = () => {
    let Debit_Total = 0,
      Credit_Total = 0,
      Profit_Loss = 0;

    let debit_total_input = document.querySelector(".debit_total_input");

    let credit_total_input = document.querySelector(".credit_total_input");
    let profit_loss_input = document.querySelector(".profit_loss_input");

    let dynamic_cashbook_container = document.querySelector(
      ".dynamic_cashbook_container"
    );
    let Cashbook_Field_Container = dynamic_cashbook_container.querySelectorAll(
      ".Cashbook_Field_Container"
    );

    for (const container of Cashbook_Field_Container) {
      let Debit_Value = 0,
        Credit_Value = 0;

      let debit_input = container.querySelector(".debit_input");
      let credit_input = container.querySelector(".credit_input");

      Debit_Value =
        debit_input.value.length > 0
          ? parseInt(debit_input.value)
          : Debit_Value;

      Credit_Value =
        credit_input.value.length > 0
          ? parseInt(credit_input.value)
          : Credit_Value;

      Debit_Total = Debit_Total + Debit_Value;
      Credit_Total = Credit_Total + Credit_Value;
      Profit_Loss = Debit_Total - Credit_Total;
    }

    debit_total_input.innerHTML = Debit_Total;
    credit_total_input.innerHTML = Credit_Total;
    profit_loss_input.innerHTML = Profit_Loss;
  };

  useEffect(() => {
    fetch("/financeBookList")
      .then((res) => res.json())
      .then((result) => {
        result.book.forEach((book, index) => {
          if (book._id == id) {
            let CashBook_Fields = book.BookObject.CashBook.CashBookFields_Array;
            let dynamic_cashbook_container = document.querySelector(
              ".dynamic_cashbook_container"
            );
            setBookData(book);
            setCashBook_Fields_data(CashBook_Fields);

            for (const fields in CashBook_Fields) {
              let Debit_Credit_Object = {
                date: "",
                debit: "",
                credit: "",
              };

              CashBook_Fields[fields].push(Debit_Credit_Object);

              let Cashbook_Field_Container = document.createElement("tr");
              Cashbook_Field_Container.classList.add(
                "Cashbook_Field_Container"
              );

              Cashbook_Field_Container.innerHTML = `
                <td class="upperCaseText">${fields}</td>
                <td>
                  <input
                    required
                    type="text"
                    class="table_input_field ${fields}-debit debit_input"
                  />
                </td>
                <td>
                  <input
                    required
                    type="text"
                    class="table_input_field ${fields}-credit credit_input"
                  />
                </td>
              `;

              dynamic_cashbook_container.appendChild(Cashbook_Field_Container);

              let Debit_Field = dynamic_cashbook_container.querySelector(
                `.${fields}-debit`
              );
              let Credit_Field = dynamic_cashbook_container.querySelector(
                `.${fields}-credit`
              );

              let Date_Input = document.querySelector(".book_created_date");

              Debit_Field.addEventListener("change", (e) => {
                let last_Item = CashBook_Fields[fields].length - 1;
                CashBook_Fields[fields][last_Item].debit = Debit_Field.value;
                setCashBook_Fields_data(CashBook_Fields);
                Total_Accounts();
              });

              Credit_Field.addEventListener("change", (e) => {
                let last_Item = CashBook_Fields[fields].length - 1;
                CashBook_Fields[fields][last_Item].credit = Credit_Field.value;
                setCashBook_Fields_data(CashBook_Fields);
                Total_Accounts();
              });

              Date_Input.addEventListener("change", (e) => {
                let last_Item = CashBook_Fields[fields].length - 1;
                CashBook_Fields[fields][last_Item].date = Date_Input.value;
                setCashBook_Fields_data(CashBook_Fields);
              });
            }
          }
        });
      });
  }, []);

  const UploadData = () => {
    console.log(CashBook_Fields_data);

    let Finance_Book_Data = BookData;
    Finance_Book_Data.BookObject.CashBook.CashBookFields_Array =
      CashBook_Fields_data;

    console.log(Finance_Book_Data);

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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let addNewField = (bookID) => {
    history.push(`/addNew-CashBook-Field/${bookID}`);
  };
  let ViewCashBookFields = (bookID) => {
    history.push(`/cashbook/${bookID}`);
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
              <a style={{ display: "inline" }} href="/finance-Book">
                <div className="box box-hover">
                  <div className="counter">
                    <div className="counter-title">View</div>
                    <div className="counter-info">
                      <div className="counter-count">Finance Book</div>
                      <i className="bx bx-plus-circle"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-4 col-md-6 col-sm-12">
              <div
                className="box box-hover"
                onClick={() => ViewCashBookFields(id)}
              >
                <div className="counter">
                  <div className="counter-title">View</div>
                  <div className="counter-info">
                    <div className="counter-count">Day CashBook</div>
                    <i className="bx bx-plus-circle"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 col-md-6 col-sm-12">
              <div className="box box-hover" onClick={() => addNewField(id)}>
                <div className="counter">
                  <div className="counter-title">Add</div>
                  <div className="counter-info">
                    <div className="counter-count">New Fiels</div>
                    <i className="bx bx-plus-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form name="add_name" id="add_name" action="#">
            <div class="row">
              <div class="col-12 col-md-12 col-sm-12">
                <div class="box invoice_primarydata_container">
                  <div class="row">
                    <div className="col-12"></div>
                  </div>
                  <div class="row" style={{ margin: "10px" }}>
                    <div
                      className="col-12"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Date"
                        className="book_created_date"
                        onFocus={(e) => (e.currentTarget.type = "date")}
                        onChange={(e) => setCashBookDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 create-purchase-container">
                <table>
                  <thead>
                    <tr class="table-headers">
                      <th>Fiel Name</th>
                      <th>Debit Amount</th>
                      <th>Credit Amount</th>
                    </tr>
                  </thead>
                  <tbody
                    id="dynamic_field"
                    class="purchaseTabelContainer dynamic_cashbook_container"
                  >
                    {/* {CashBook_Fields.map((fields, index) => {
                      return (
                        <tr class="purchase_tabel_items" key={fields}>
                          <td className="upperCaseText">{fields}</td>
                          <td>
                            <input
                              required
                              type="text"
                              class="table_input_field"
                              name={fields}
                              onChange={(event) =>
                                addItemKnittingArray(index, event)
                              }
                            />
                          </td>
                          <td>
                            <input
                              required
                              type="text"
                              class="table_input_field"
                              name="product_name[]"
                            />
                          </td>
                        </tr>
                      );
                    })} */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-4 ">
                <label>Debit Total: </label>₹
                <span className="debit_total_input"></span>
              </div>
              <div className="col-4 ">
                <label>Credit Total: </label>₹
                <span className="credit_total_input"></span>
              </div>
              <div className="col-4 ">
                <label>Profit - Loss: </label>₹
                <span className="profit_loss_input"></span>
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
                  <span>Update Book</span>
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
