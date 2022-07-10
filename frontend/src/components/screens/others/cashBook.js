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
    let Main_Total_Debit = 0,
      Main_Total_Credit = 0,
      Main_Total_Balance = 0;

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

            let Array_Length = CashBook_Fields.swamigal.length;
            for (let ind = 0; ind < Array_Length; ind++) {
              let Date = CashBook_Fields.swamigal[ind].date,
                Total_Debit = 0,
                Total_Credit = 0,
                Total_Balance = 0;

              for (const fields in CashBook_Fields) {
                let Cash_Fields = CashBook_Fields[fields][ind];
                if (Cash_Fields) {
                  console.log();
                  let Cash_Fields_Input_Debit =
                    Cash_Fields.debit.length > 0
                      ? parseInt(Cash_Fields.debit)
                      : 0;
                  Total_Debit = Total_Debit + Cash_Fields_Input_Debit;

                  let Cash_Fields_Input_Credit =
                    Cash_Fields.credit.length > 0
                      ? parseInt(Cash_Fields.credit)
                      : 0;
                  Total_Credit = Total_Credit + Cash_Fields_Input_Credit;
                }
              }

              Total_Balance = Total_Debit - Total_Credit;

              let Cashbook_Field_Container = document.createElement("tr");
              Cashbook_Field_Container.classList.add(
                "Cashbook_Field_Container"
              );

              Cashbook_Field_Container.innerHTML = `
                <td>${Date}</td>
                <td>₹ ${Total_Debit}</td>
                <td>₹ ${Total_Credit}</td>
                <td>₹ ${Total_Balance}</td>
              
                <td>
                 <span class="optionBtn optionBtn_edit cashBook_ViewMore">View</span>
                </td>
              `;

              dynamic_cashbook_container.appendChild(Cashbook_Field_Container);

              Main_Total_Debit = Main_Total_Debit + Total_Debit;
              Main_Total_Credit = Main_Total_Credit + Total_Credit;
            }
            Main_Total_Balance = Main_Total_Debit - Main_Total_Credit;

            let Main_Total_Debit_Value = document.querySelector(
              ".Main_Total_Debit_Value"
            );
            let Main_Total_Credit_Value = document.querySelector(
              ".Main_Total_Credit_Value"
            );
            let Main_Total_Balance_Value = document.querySelector(
              ".Main_Total_Balance_Value"
            );

            Main_Total_Debit_Value.innerHTML = `₹ ${Main_Total_Debit}`;
            Main_Total_Credit_Value.innerHTML = `₹ ${Main_Total_Credit}`;
            Main_Total_Balance_Value.innerHTML = `₹ ${Main_Total_Balance}`;

            let Cashbook_Field_Container =
              dynamic_cashbook_container.querySelectorAll(
                ".Cashbook_Field_Container"
              );

            let INDEXX = 0;
            for (const container of Cashbook_Field_Container) {
              let i = INDEXX;

              let Day_Total_Debit = 0,
                Day_Total_Credit = 0,
                Day_Total_Balance = 0;

              let ViewMoreBtn = container.querySelector(".cashBook_ViewMore");

              let Day_Debit_Value = document.querySelector(".Day_Debit_Value");
              let Day_Credit_Value =
                document.querySelector(".Day_Credit_Value");

              let Day_Balance_Value =
                document.querySelector(".Day_Balance_Value");

              ViewMoreBtn.addEventListener("click", (e) => {
                let main_cashbook_PopUp_container = document.querySelector(
                  ".main_cashbook_PopUp_container"
                );
                let View_Morebody_container = document.querySelector(
                  ".View_Morebody_container"
                );

                let date_popup_Field =
                  document.querySelector(".date_popup_Field");

                main_cashbook_PopUp_container.style.display = "flex";

                let Selected_Book_Date = CashBook_Fields.swamigal[i].date;

                for (const fields in CashBook_Fields) {
                  let Selected_Data = CashBook_Fields[fields][i];

                  if (Selected_Data) {
                    let Selected_Cashbook_Field_Container =
                      document.createElement("tr");
                    Selected_Cashbook_Field_Container.classList.add(
                      "Cashbook_Field_Container"
                    );

                    let Selected_Debit = Selected_Data.debit;
                    let Selected_Credit = Selected_Data.credit;

                    Selected_Cashbook_Field_Container.innerHTML = `
                    <td class="upperCaseText">${fields}</td>
                    <td >${Selected_Debit}</td>
                    <td >${Selected_Credit}</td>
                
                  `;

                    View_Morebody_container.appendChild(
                      Selected_Cashbook_Field_Container
                    );

                    Selected_Debit =
                      Selected_Debit.length > 0 ? Selected_Debit : 0;
                    Selected_Credit =
                      Selected_Credit.length > 0 ? Selected_Credit : 0;

                    Day_Total_Debit =
                      Day_Total_Debit + parseInt(Selected_Debit);
                    Day_Total_Credit =
                      Day_Total_Credit + parseInt(Selected_Credit);
                  }
                }
                Day_Total_Balance = Day_Total_Debit - Day_Total_Credit;

                date_popup_Field.innerHTML = `${Selected_Book_Date}`;

                Day_Debit_Value.innerHTML = `${Day_Total_Debit}`;
                Day_Credit_Value.innerHTML = `${Day_Total_Credit}`;
                Day_Balance_Value.innerHTML = `${Day_Total_Balance}`;
              });

              INDEXX++;
            }

            let main_cashbook_PopUp_container = document.querySelector(
              ".main_cashbook_PopUp_container"
            );
            let View_Morebody_container = document.querySelector(
              ".View_Morebody_container"
            );
            let cancel_popup_Btn = document.querySelector(".cancel_popup_Btn");

            cancel_popup_Btn.addEventListener("click", (e) => {
              main_cashbook_PopUp_container.style.display = "none";
              View_Morebody_container.innerHTML = ``;
            });
          }
        });
      });
  }, []);

  let addNewField = (bookID) => {
    history.push(`/addNew-CashBook-Field/${bookID}`);
  };
  let uploadCashBookFields = (bookID) => {
    history.push(`/upload-day-cashbook/${bookID}`);
  };
  return (
    <div className="cashBook_main_container">
      <SideNav />

      <div className="main">
        <div className="row main_cashbook_PopUp_container">
          <div className="cashbook_PopUp_container">
            <div className="col-12">
              <div className="cancel_popup_container">
                <span class="cancel_popup_Btn optionBtn optionBtn_delete">
                  X
                </span>
              </div>
              <div className="date_popup_container">
                <span>DATE:</span>
                <span class="date_popup_Field"></span>
              </div>
              <table>
                <thead>
                  <tr class="table-headers">
                    <th>Field Name</th>
                    <th>Debit Amount</th>
                    <th>Credit Amount</th>
                  </tr>
                </thead>
                <tbody className="View_Morebody_container"></tbody>
              </table>

              <div class="row" style={{ marginTop: "50px" }}>
                <div className="col-12">
                  <table>
                    <thead>
                      <tr class="table-headers">
                        <th>Total Debit Amount</th>
                        <td className="Day_Debit_Value"></td>
                      </tr>
                      <tr class="table-headers">
                        <th>Total Credit Amount</th>
                        <td className="Day_Credit_Value"></td>
                      </tr>
                      <tr class="table-headers">
                        <th>Total Balance Amount</th>
                        <td className="Day_Balance_Value"></td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                onClick={() => uploadCashBookFields(id)}
              >
                <div className="counter">
                  <div className="counter-title">Upload</div>
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
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 create-purchase-container">
                <table>
                  <thead>
                    <tr class="table-headers">
                      <th>Date</th>
                      <th>Debit Amount</th>
                      <th>Credit Amount</th>
                      <th>Balance</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody
                    id="dynamic_field"
                    class="purchaseTabelContainer dynamic_cashbook_container"
                  ></tbody>
                </table>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-12 col-sm-12">
                <div class="box invoice_primarydata_container">
                  <div class="row">
                    <div className="col-12">
                      <table>
                        <thead>
                          <tr class="table-headers">
                            <th>Total Debit Amount</th>
                            <td className="Main_Total_Debit_Value"></td>
                          </tr>
                          <tr class="table-headers">
                            <th>Total Credit Amount</th>
                            <td className="Main_Total_Credit_Value"></td>
                          </tr>
                          <tr class="table-headers">
                            <th>Total Balance Amount</th>
                            <td className="Main_Total_Balance_Value"></td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
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
