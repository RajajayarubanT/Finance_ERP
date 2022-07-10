import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = () => {
  const history = useHistory();

  //   Data
  const [LoanID, setLoanID] = useState("");
  const [VoucherNO, setVoucherNO] = useState("");

  const [Bill_Date, setBill_Date] = useState("");

  const [LoanNo, setLoanNo] = useState("");
  const [CustomerName, setCustomerName] = useState("");

  const [Debit_Amount, setDebit_Amount] = useState("");
  const [Credit_Amount, setCredit_Amount] = useState("");

  const [Balance_TA_Amount, setBalance_TA_Amount] = useState("");

  const [LoanData_Array, setLoanData_Array] = useState({});

  useEffect(() => {
    // let Penality_Total =document.querySelector('.penality_total_amount');

    // let checkbox_input = document.querySelector(".checkbox_input");
    // let penalityContainer = document.querySelector(".penalityContainer");
    let loanNO_searchBtn = document.querySelector(".loanNO_searchBtn");
    let loanNO_Input = document.querySelector(".loanNO_Input");
    // let Penality_Graph_Container = document.querySelector(".penality-graph-container");

    // checkbox_input.addEventListener("input", (e) => {

    //   // penalityContainer.style.display=""
    //   if (checkbox_input.checked) {
    //     penalityContainer.style.display = "block";
    //     Penality_Total.value=PenalityTotlal_Amount
    //   } else {
    //     penalityContainer.style.display = "none";
    //     Penality_Total.value="0";
    //   }

    // });

    loanNO_searchBtn.addEventListener("click", (e) => {
      // Penality_Graph_Container.innerHTML = ` `;
      fetch("/loanslist")
        .then((res) => res.json())
        .then((result) => {
          let LoanArray = result.loan;

          console.log(result);

          LoanArray.forEach((loan, index) => {
            console.log(loan);
            if (loan.LoanObject.LoanNo == loanNO_Input.value) {
              let loanData = loan.LoanObject;
              setLoanData_Array(loan.LoanObject);
              setLoanID(loan._id);

              setCustomerName(loanData.Name);

              let Total_TA_Amount = loanData.TA_Amount;
              let balance_TA_Amount = Total_TA_Amount;

              let TA_Array = loanData.TA_Array;
              if (TA_Array.length) {
                balance_TA_Amount = TA_Array[TA_Array.length - 1].Balance;
              }
              setBalance_TA_Amount(balance_TA_Amount);
            }
          });
        });
    });
  }, []);

  const UploadLoan = () => {
    let LoanArray = LoanData_Array;
    let Total_TA_Amount = LoanData_Array.TA_Amount;
    let Balance_TA_Amount = parseInt(Total_TA_Amount);

    let TA_Array = LoanArray.TA_Array;

    if (TA_Array.length) {
      Balance_TA_Amount = TA_Array[TA_Array.length - 1].Balance;
    }

    let _Credit_Amount = Credit_Amount.length > 0 ? parseInt(Credit_Amount) : 0;
    let _Debit_Amount = Debit_Amount.length > 0 ? parseInt(Debit_Amount) : 0;

    let Current_RC_Balance = Balance_TA_Amount - _Credit_Amount;

    if (Debit_Amount.length) {
      LoanArray.RC_Amount = Balance_TA_Amount + _Debit_Amount;

      Current_RC_Balance = Current_RC_Balance + _Debit_Amount;
    }

    let TA_Item = {
      VoucherNo: VoucherNO,
      Date: Bill_Date,
      Debit_Amount: _Debit_Amount,
      Credit_Amount: _Credit_Amount,
      Balance: Current_RC_Balance,
    };

    TA_Array.push(TA_Item);

    console.log(LoanArray);

    fetch("/pay-self-receipt", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LoanID,
        LoanArray,
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
          <div className="main-title">Self Receipt</div>
        </div>
        <div className="main-content">
          <form name="add_name" id="add_name" action="#">
            <div class="row">
              <div class="col-12 col-md-12 col-sm-12">
                <div class="box invoice_primarydata_container ">
                  <div className="row ">
                    <div className="col-12 selfEntry_Container">
                      <div
                        class="row SideBtnContainer"
                        style={{ marginTop: "10px" }}
                      >
                        <input
                          type="text"
                          placeholder="Loan No"
                          className="loanNO_Input"
                          value={LoanNo}
                          onChange={(e) => setLoanNo(e.target.value)}
                          style={{ width: "120px" }}
                        />
                        <div className="loanNO_searchBtn">Search</div>
                      </div>
                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          placeholder="Customer Name"
                          value={CustomerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                      </div>
                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          placeholder="Voucher No"
                          value={VoucherNO}
                          onChange={(e) => setVoucherNO(e.target.value)}
                        />
                      </div>
                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          placeholder="Date"
                          onFocus={(e) => (e.currentTarget.type = "date")}
                          value={Bill_Date}
                          onChange={(e) => setBill_Date(e.target.value)}
                        />
                      </div>
                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          placeholder="Balance Amount"
                          value={Balance_TA_Amount}
                          onChange={(e) => setBalance_TA_Amount(e.target.value)}
                        />
                      </div>
                      <div class="row " style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          placeholder="Debit Amount "
                          onChange={(e) => setDebit_Amount(e.target.value)}
                        />
                      </div>
                      <div class="row " style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          placeholder="Credit Amount "
                          onChange={(e) => setCredit_Amount(e.target.value)}
                        />
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
                  onClick={() => UploadLoan()}
                >
                  <span>Pay Loan</span>
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
