import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import FinanceLogo from "../../images/vm_logo.jpg";

const Dashboard = () => {
  const history = useHistory();
  const location = useLocation();

  const Statement_Data = location.state.data;

  const start_Date = location.state.start_Date;
  const end_Date = location.state.end_Date;

  const [CashBookDate, setCashBookDate] = useState("");
  let [BookData, setBookData] = useState([]);
  let [CashBook_Fields_data, setCashBook_Fields_data] = useState([]);

  useEffect(() => {
    const Dynamic_Statements = () => {
      let Dynamic_statement_data = document.querySelector(
        ".dynamic_statement_data"
      );

      console.log(Statement_Data);

      let _Book_Data = Statement_Data[0];

      _Book_Data.forEach((book, ind) => {
        let Total_Debit = 0,
          Total_Credit = 0;

        let _Dynamic_Field_Array = [];

        let CashBook_Fields = book.BookObject.CashBook.CashBookFields_Array;
        let CashBook_Date = book.BookObject.BookDate;

        let Array_Length = CashBook_Fields.swamigal.length;
        for (let ind = 0; ind < Array_Length; ind++) {
          for (const fields in CashBook_Fields) {
            let Cash_Fields = CashBook_Fields[fields][ind];
            if (Cash_Fields) {
              let Cash_Fields_Input_Debit =
                Cash_Fields.debit.length > 0 ? parseInt(Cash_Fields.debit) : 0;

              Total_Debit = Total_Debit + Cash_Fields_Input_Debit;

              let Cash_Fields_Input_Credit =
                Cash_Fields.credit.length > 0
                  ? parseInt(Cash_Fields.credit)
                  : 0;
              Total_Credit = Total_Credit + Cash_Fields_Input_Credit;

              let _Dynamic_Field_Exist = false;

              if (_Dynamic_Field_Array.length) {
                _Dynamic_Field_Array.forEach((_data, ind) => {
                  if (_data.Field_Name == fields) {
                    _Dynamic_Field_Exist = true;

                    _data.field_Debit =
                      _data.field_Debit + Cash_Fields_Input_Debit;

                    _data.field_Credit =
                      _data.field_Credit + Cash_Fields_Input_Credit;
                  }
                });
              }
              if (!_Dynamic_Field_Exist) {
                let _Dynamic_Field = {
                  Field_Name: fields,
                  field_Debit: Cash_Fields_Input_Debit,
                  field_Credit: Cash_Fields_Input_Credit,
                };
                _Dynamic_Field_Array.push(_Dynamic_Field);
              }
            }
          }
        }

        let _Dynamic_Item_container = document.createElement("div");

        _Dynamic_Field_Array.forEach((_DATA, indexx) => {
          let _Dynamic_Item = document.createElement("tr");
          _Dynamic_Item.innerHTML = `
            <td >${indexx + 1}</td>
            <td class="upperCaseText">${_DATA.Field_Name}</td>
            <td>${_DATA.field_Debit}</td>
            <td>${_DATA.field_Credit}</td>
    `;

          _Dynamic_Item_container.appendChild(_Dynamic_Item);
        });

        let _Dynamic_container = document.createElement("div");
        _Dynamic_container.innerHTML = `
        <div style="margin-top:30px">Date: <span> ${CashBook_Date}</span></div>
        <table style="margin-top:10px" >
          <thead>
            <tr class="table-headers">
              <th>S:No</th>
              <th>Field Name</th>
              <th>Debit Amount</th>
              <th>Credit Amount</th>
            </tr>
          </thead>
          <tbody >${_Dynamic_Item_container.innerHTML}</tbody>
        </table>

    `;

        Dynamic_statement_data.appendChild(_Dynamic_container);
      });
    };

    Dynamic_Statements();
  }, []);

  const PrintElem = (elem) => {
    window.print();
  };
  return (
    <div>
      <div className="statement_data_container_main">
        <div className="statement_data_content">
          <div className="statement_data_content_header">
            <div className="statement_bill_logo">
              <img src={FinanceLogo} alt="" />
            </div>
            <div className="statement_bill_Name">
              <h3>VINAYAKA MOTORS</h3>
              <span>D.20/W.26,pillayar kovil streeet,Nandhagopal kovil,</span>
              <span>South Gate,Cumbum-625516,Theni district.</span>
            </div>
          </div>
          <hr style={{ width: "80%", marginTop: "10px" }} />
          <hr style={{ width: "80%" }} />
          <div className="Filter_info_container">
            <h4>Statement From & To Dates</h4>
            <div className="Filter_info_dates">
              <span>
                <strong>Start Date:</strong> {start_Date}
              </span>
              <span>
                <strong>End Date:</strong> {end_Date}
              </span>
            </div>
          </div>
          <div className="dynamic_statement_data"></div>
        </div>
        <div className="statement_print_Btn">
          <div className="Bill_printBtn_Container">
            <button onClick={() => PrintElem("print_loan_bill")}>PRINT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
