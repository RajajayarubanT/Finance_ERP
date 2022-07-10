import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = (props) => {
  const history = useHistory();
  const [CashBookDate, setCashBookDate] = useState("");
  let [BookData, setBookData] = useState([]);
  let [FilteredDAta, setFilteredDAta] = useState([]);

  let [StartDate, setStartDate] = useState("");
  let [EndDate, setEndDate] = useState("");

  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");

    document.querySelector("#mobile-toggle").onclick = () => {
      sidebar.classList.toggle("active");
    };

    document.querySelector("#sidebar-close").onclick = () => {
      sidebar.classList.toggle("active");
    };
  }, []);

  const Make_Monthly_Data = (BK) => {
    let CashBook_Fields = BK.BookObject.CashBook.CashBookFields_Array;

    let _Main_Container_Body = document.querySelector(
      ".dynamic_statement_container"
    );

    let Monthly_Items = document.createElement("tr");

    let _Month_Date = 0,
      _Month_Debit = 0,
      _Month_Credit = 0,
      _Month_Balance = 0;

    let Array_Length = CashBook_Fields.swamigal.length;
    for (let ind = 0; ind < Array_Length; ind++) {
      for (const fields in CashBook_Fields) {
        let Cash_Fields = CashBook_Fields[fields][ind];
        if (Cash_Fields) {
          let Cash_Fields_Input_Debit =
            Cash_Fields.debit.length > 0 ? parseInt(Cash_Fields.debit) : 0;
          _Month_Debit = _Month_Debit + Cash_Fields_Input_Debit;

          let Cash_Fields_Input_Credit =
            Cash_Fields.credit.length > 0 ? parseInt(Cash_Fields.credit) : 0;
          _Month_Credit = _Month_Credit + Cash_Fields_Input_Credit;
        }
      }
    }
    _Month_Balance = _Month_Debit - _Month_Credit;

    Monthly_Items.innerHTML = `
        <td >${_Month_Date}</td>
        <td >${_Month_Debit}</td>
        <td >${_Month_Credit}</td>
        <td >${_Month_Balance}</td>   
      `;

    _Main_Container_Body.appendChild(Monthly_Items);
  };

  useEffect(async () => {
    let _Book_DATA = [];
    await fetch("/financeBookList")
      .then((res) => res.json())
      .then((result) => {
        _Book_DATA = result;
      });

    // Filter

    let _Filter_Btn = document.querySelector("._Filter_Btn");

    let Filter_Start_Date = document.querySelector(".Filter_Start_Date");
    let Filter_End_Date = document.querySelector(".Filter_End_Date");

    _Filter_Btn.addEventListener("click", (e) => {
      let FilteredData_Array = [];
      let _Main_Container_Body = document.querySelector(
        ".dynamic_statement_container"
      );

      _Main_Container_Body.innerHTML = ` `;
      let Start_Date = new Date(Filter_Start_Date.value).getTime();
      let End_Date = new Date(Filter_End_Date.value).getTime();

      let _Book = _Book_DATA.book;

      _Book.forEach((BK, ind) => {
        let Book_Date = BK.BookObject.BookDate;

        if (Book_Date) {
          let Book_Month = new Date(Book_Date.slice(0, 7)).getTime();

          if (Book_Month >= Start_Date && Book_Month <= End_Date) {
            console.log(BK, Book_Date, Book_Month);
            Make_Monthly_Data(BK);
            FilteredData_Array.push(BK);
          }
        }
      });

      setFilteredDAta([...FilteredDAta, FilteredData_Array]);
    });
  }, []);

  const Print_Data = () => {
    history.push(`/filtered-statement/`, {
      data: FilteredDAta,
      start_Date: StartDate,
      end_Date: EndDate,
    });
  };

  return (
    <div className="cashBook_main_container">
      <SideNav />

      <div className="main">
        {/* Popup Container */}
        <div className="row main_cashbook_PopUp_container">
          <div className="cashbook_PopUp_container">
            <div className="col-12">
              <div className="cancel_popup_container">
                <span class="cancel_popup_Btn optionBtn optionBtn_delete">
                  X
                </span>
              </div>
              <div className="date_popup_container">
                <span>Start Month:</span>
                <span class="Start_date_popup_Field"></span>
              </div>
              <div className="date_popup_container">
                <span>End Month:</span>
                <span class="End_date_popup_Field"></span>
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
        {/* *Propup End */}

        <div className="main-header">
          <div className="mobile-toggle" id="mobile-toggle">
            <i className="bx bx-menu-alt-right"></i>
          </div>
          <div className="main-title">Statements </div>
        </div>
        <div className="main-content">
          <div class="row">
            <div class="col-12 col-md-12 col-sm-12">
              <div class="box invoice_primarydata_container">
                <div class="row">
                  <div className="col-12">
                    <div className="Statement_Filter_Container">
                      <h3>Statement Filters</h3>
                      <div className="row Statement_Filter_Content">
                        {/* Filter Options */}
                        <div className="col-5 Statement_Filter_Items">
                          <div className="filter_options_Item">
                            <label>Start Month : </label>

                            <input
                              type="month"
                              onChange={(e) => setStartDate(e.target.value)}
                              className="Filter_Start_Date"
                            />
                          </div>
                        </div>
                        {/* ********** */}
                        {/* Filter Results */}

                        <hr />
                        <hr />

                        <div className="col-5 Statement_Filter_Items ">
                          <div className="filter_options_Item">
                            <label>End Month : </label>

                            <input
                              type="month"
                              onChange={(e) => setEndDate(e.target.value)}
                              className="Filter_End_Date"
                            />
                          </div>
                        </div>
                        {/* ********** */}
                      </div>

                      <div className="Bill_printBtn_Container">
                        <button className="_Filter_Btn">FILTER</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form name="add_name" id="add_name" action="#">
            <div class="row">
              <div class="col-12 create-purchase-container statement_filter_result_Container">
                <table>
                  <thead>
                    <tr class="table-headers">
                      <th>Date</th>
                      <th>Debit Amount</th>
                      <th>Credit Amount</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody class="purchaseTabelContainer dynamic_statement_container"></tbody>
                </table>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-12 col-sm-12">
                <div class="box invoice_primarydata_container">
                  <div class="row">
                    <div className="col-12">
                      {/* <table>
                        <thead>
                          <tr class="table-headers">
                            <th>Total Debit Amount</th>
                            <td className="Main_Total_Debit_Value">0</td>
                          </tr>
                          <tr class="table-headers">
                            <th>Total Credit Amount</th>
                            <td className="Main_Total_Credit_Value">0</td>
                          </tr>
                          <tr class="table-headers">
                            <th>Total Balance Amount</th>
                            <td className="Main_Total_Balance_Value">0</td>
                          </tr>
                        </thead>
                      </table> */}
                      <div className="Bill_printBtn_Container">
                        <button onClick={() => Print_Data()}>PRINT</button>
                      </div>
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
