import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = () => {
  const history = useHistory();

  //   Data
  const [LoanID, setLoanID] = useState("");
  const [ReceiptNO, setReceiptNO] = useState("");

  const [Bill_Date, setBill_Date] = useState("");
  const [Receipt_Date, setReceipt_Date] = useState("");

  const [LoanNo, setLoanNo] = useState("");
  const [Intrest, setIntrest] = useState("");
  const [Monthly_Pay, setMonthly_Pay] = useState("");
  const [LoanAmount, setLoanAmount] = useState("");

  // Due
  const [DueMonthList, setDueMonthList] = useState("");
  const [DueMonths, setDueMonths] = useState("");
  const [DueDays, setDueDays] = useState("");
  const [DueAmount, setDueAmount] = useState("");

  // Penality
  const [Penality, setPenality] = useState("");
  const [PenalityAmount, setPenalityAmount] = useState("");
  const [PenalityMonths, setPenalityMonths] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [SubTotalAmount, setSubTotalAmount] = useState("");

  const [LoanData_Array, setLoanData_Array] = useState({});

  const [Penality_Months, setPenality_Months] = useState("");

  useEffect(() => {
    let PenalityTotlal_Amount = 0;
    let Due_Months_input = document.querySelector(".Due_Months_input");
    let Penality_By_Days = 0;
    let New_Penality_By_Days = 0;
    let Paid_By_Days = 0;
    let PenalityTotlal_Months = 0;

    const TotalAmountCal = () => {
      let Due_Total = document.querySelector(".Due_total_amount");
      let Penality_Total = document.querySelector(".penality_total_amount");

      let Total_Amount_Input = document.querySelector(".Main_Total_Amount");
      let Sub_Total_Amount = document.querySelector(".sub_Total_Amount");

      let Cutting_Intrest = document.querySelector(".cutting_intrest_amount");

      let Due_Total_value =
        Due_Total.value != "" ? parseInt(Due_Total.value) : 0;
      let Penality_Total_value =
        Penality_Total.value != "" ? parseInt(Penality_Total.value) : 0;

      let Main_Total_Amount = parseInt(Cutting_Intrest.value) - Due_Total_value;
      Total_Amount_Input.value = Main_Total_Amount + Penality_Total_value;

      Sub_Total_Amount.value =
        parseInt(Cutting_Intrest.value) - Due_Total_value;
    };

    let Penality_Total = document.querySelector(".penality_total_amount");

    let checkbox_input = document.querySelector(".checkbox_input");
    let penalityContainer = document.querySelector(".penalityContainer");
    let loanNO_searchBtn = document.querySelector(".loanNO_searchBtn");
    let loanNO_Input = document.querySelector(".loanNO_Input");
    let Penality_Graph_Container = document.querySelector(
      ".penality-graph-container"
    );
    let Cutting_intrest = document.querySelector(".cutting_intrest");

    let Penality_Total_Months = document.querySelector(
      ".penality_total_months"
    );

    checkbox_input.addEventListener("input", (e) => {
      // penalityContainer.style.display=""
      if (checkbox_input.checked) {
        penalityContainer.style.display = "block";
        Penality_Total.value = PenalityTotlal_Amount;
        Penality_Total_Months.value = PenalityTotlal_Months;
      } else {
        penalityContainer.style.display = "none";
        Penality_Total.value = "0";
      }

      TotalAmountCal();
    });

    loanNO_searchBtn.addEventListener("click", (e) => {
      console.log(Cutting_intrest.value.length);

      if (Cutting_intrest.value.length <= 0) {
        window.alert("Please Fill  Cutting Intrest !");
      } else {
        Penality_Graph_Container.innerHTML = ` `;
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

                // Penality Function

                let Loan_amount = document.querySelector(
                  ".principle_loan_amount"
                );
                let Cutting_Intrest = document.querySelector(
                  ".cutting_intrest_amount"
                );

                let Cutting_Amount_Monthly =
                  (parseInt(loanData.LoanAmount) *
                    parseInt(Cutting_intrest.value)) /
                  100;

                let Cutting_INTREST_Value =
                  parseInt(loanData.LoanAmount) +
                  Cutting_Amount_Monthly * parseInt(loanData.Installment_Count);

                Cutting_Intrest.value = Cutting_INTREST_Value;
                Loan_amount.value = loanData.LoanAmount;

                penalityCheck(loanData);
              } else {
                window.alert("Please Fill Loan NO Correctly !");
              }
            });
          });
      }
    });

    const penalityCheck = async (loanDATA) => {
      let MonthPaying_New_Array = [];

      var Month_Diff = Date.now() - new Date(loanDATA.LoanDate);

      var seconds = Math.floor(Month_Diff / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24),
        months = Math.floor(days / 30);

      let No_of_Months = months;
      let Installment_Count = parseInt(loanDATA.Installment_Count);
      if (No_of_Months > Installment_Count - 1) {
        No_of_Months = Installment_Count;
      }

      for (let ii = 0; ii < No_of_Months; ii++) {
        MonthPaying_New_Array.push(loanDATA.Month_PayingArray[ii]);
      }

      let Due_Array = loanDATA.Month_PayingArray;
      let Monthly_Pay = loanDATA.MonthlyAmount;

      let Due_Amount = document.querySelector(".Due_total_amount");
      let Due_Per_Month = Monthly_Pay / 30;

      let Penality_MonthList = [];
      let Penality_Month_Date = [];
      let Due_Month_Date = [];
      let Penality_MonthList_String = " ";

      let Paid_MonthList = [];
      let Paid_Month_Date = [];
      let Paid_MonthList_String = " ";

      Due_Array.forEach((loan, index) => {
        if (loan.paid == false) {
          Penality_MonthList.push(loan.Month);
          Due_Month_Date.push(loan.Date);
        }
        if (loan.penality == false) {
          Penality_Month_Date.push(loan.Date);
        }
      });

      Due_Array.forEach((loan, index) => {
        if (loan.paid == true) {
          Paid_MonthList.push(loan.Month);
          Paid_Month_Date.push(loan.Date);
        }
      });

      Penality_MonthList.forEach((elm, ind) => {
        if (Penality_MonthList_String == " ") {
          Penality_MonthList_String = elm;
        } else {
          Penality_MonthList_String = Penality_MonthList_String + "," + elm;
        }
      });

      Paid_MonthList.forEach((elm, ind) => {
        if (Paid_MonthList_String == " ") {
          Paid_MonthList_String = elm;
        } else {
          Paid_MonthList_String = Paid_MonthList_String + "," + elm;
        }
      });

      Penality_Month_Date.forEach((date, ind) => {
        let loan_Start_Date = date.split("-");

        let year = loan_Start_Date[1],
          month = loan_Start_Date[0];

        let No_Days = new Date(year, month, 0).getDate();
        New_Penality_By_Days = New_Penality_By_Days + No_Days;
      });

      Paid_Month_Date.forEach((date, ind) => {
        let loan_Start_Date = date.split("-");

        let year = loan_Start_Date[1],
          month = loan_Start_Date[0];

        let No_Days = new Date(year, month, 0).getDate();
        Paid_By_Days = Paid_By_Days + No_Days;
      });

      setDueMonthList(Paid_MonthList_String);
      Due_Months_input.value = Paid_MonthList.length;

      Due_Months_input.addEventListener("input", (e) => {
        Penality_By_Days = 0;

        let Value = parseInt(Due_Months_input.value);

        if (Value >= Penality_MonthList.length) {
          Due_Months_input.value = Penality_MonthList.length;
        }
        for (let i = 0; i < parseInt(Due_Months_input.value); i++) {
          let date = Due_Array[i].Date;

          let loan_Start_Date = date.split("-");

          let year = loan_Start_Date[1],
            month = loan_Start_Date[0];

          let No_Days = new Date(year, month, 0).getDate();
          Penality_By_Days = Penality_By_Days + No_Days;
        }
      });
      // Penality Amount Section

      let DueAmount_penality = Monthly_Pay / 1000;
      let Penality_Amount = 0;
      let Penality_Graph_Container = document.querySelector(
        ".penality-graph-container"
      );
      let Penality_Days = 0;

      Due_Array.forEach((loan, index) => {
        if (loan.penality == false) {
          setPenality_Months(index + 1);
          let date = loan.Date;

          PenalityTotlal_Months = PenalityTotlal_Months + 1;
          let loan_Start_Date = date.split("-");

          let year = loan_Start_Date[1],
            month = loan_Start_Date[0];

          let No_Days = new Date(year, month, 0).getDate();

          if (Penality_Days == 0) {
            if (New_Penality_By_Days == No_Days) {
              Penality_Days = No_Days;
            } else {
              Penality_Days = New_Penality_By_Days - No_Days;
            }
          } else {
            Penality_Days = Penality_Days - No_Days;
          }

          let Penality_per_month = DueAmount_penality * Penality_Days;
          Penality_Amount = Penality_Amount + Penality_per_month;

          let Penality_Graph_Content_item = document.createElement("div");
          Penality_Graph_Content_item.classList.add(
            "penality_content_container"
          );

          Penality_Graph_Content_item.innerHTML = `
        <div class="row">
         
          <div class="col-8">
            <input style="width:30px !important;" checked type="checkbox"  class="penality_months_selected" />
            <input style="width:60px !important;" type="text" value="${DueAmount_penality}" class="penality_loan_Monthly_Amount" />
            <input type="hidden" value="${month}" class="penality_selected_Month" />
            <span>*</span>
            <input style="width:60px !important;" type="text" value="${Penality_Days}" class="penality_loan_Monthly_Days"  />
          </div>
          <div class="col-4">
          ₹ <input style="width:70px !important;" type="text" value="${Penality_per_month}" class="penality_loan_per_total"  />
          </div>
        </div>
      `;

          Penality_Graph_Container.appendChild(Penality_Graph_Content_item);
        }
      });

      PenalityTotlal_Amount = Penality_Amount;

      let penalityContainerItem = Penality_Graph_Container.querySelectorAll(
        ".penality_content_container"
      );
      let penality_total_amount = document.querySelector(
        ".penality_total_amount"
      );
      let penality_total_months = document.querySelector(
        ".penality_total_months"
      );

      penality_total_months.addEventListener("input", (e) => {
        Penality_Days = 0;
        Penality_Amount = 0;
        New_Penality_By_Days = 0;
        Penality_Graph_Container.innerHTML = ``;

        let Penality_Limit_Month = 0;

        let Penality_Months = parseInt(penality_total_months.value);

        if (Penality_Months > PenalityTotlal_Months) {
          Penality_Months = PenalityTotlal_Months;
          penality_total_months.value = PenalityTotlal_Months;
        }

        Due_Array.forEach((loan, ind) => {
          if (loan.penality == false) {
            let date = loan.Date;

            let new_loan_Start_Date = date.split("-");

            let new_year = new_loan_Start_Date[1],
              new_month = new_loan_Start_Date[0];

            let new_No_Days = new Date(new_year, new_month, 0).getDate();
            New_Penality_By_Days = New_Penality_By_Days + new_No_Days;
          }
        });

        Due_Array.forEach((loan, ind) => {
          //******* */
          if (Penality_Limit_Month < Penality_Months) {
            if (loan.penality == false) {
              let date = loan.Date;

              let loan_Start_Date = date.split("-");

              let year = loan_Start_Date[1],
                month = loan_Start_Date[0];

              let No_Days = new Date(year, month, 0).getDate();

              if (Penality_Days == 0) {
                if (New_Penality_By_Days == No_Days) {
                  Penality_Days = No_Days;
                } else {
                  Penality_Days = New_Penality_By_Days - No_Days;
                }
              } else {
                Penality_Days = Penality_Days - No_Days;
              }

              let Penality_per_month = DueAmount_penality * Penality_Days;
              Penality_Amount = Penality_Amount + Penality_per_month;

              let Penality_Graph_Content_item = document.createElement("div");
              Penality_Graph_Content_item.classList.add(
                "penality_content_container"
              );

              Penality_Graph_Content_item.innerHTML = `
              <div class="row">
              
                <div class="col-8">
                  <input style="width:60px !important;" type="text" value="${DueAmount_penality}" class="penality_loan_Monthly_Amount" />
                  <input type="hidden" value="${month}" class="penality_selected_Month" />
                  <span>*</span>
                  <input style="width:60px !important;" type="text" value="${Penality_Days}" class="penality_loan_Monthly_Days"  />
                </div>
                <div class="col-4">
                ₹ <input style="width:70px !important;" type="text" value="${Penality_per_month}" class="penality_loan_per_total"  />
                </div>
              </div>
            `;

              Penality_Graph_Container.appendChild(Penality_Graph_Content_item);

              Penality_Limit_Month = Penality_Limit_Month + 1;
            }
          }
        });

        Penality_Total.value = Penality_Amount;

        TotalAmountCal();
      });

      console.log(Due_Per_Month, Paid_By_Days);
      Due_Amount.value = Due_Per_Month * Paid_By_Days;

      TotalAmountCal();
    };
  }, []);

  const MonthlyDueArray = () => {
    let Penality_checkbox_input = document.querySelector(".checkbox_input");
    let Due_Months_input = document.querySelector(".Due_Months_input");
    let penality_Amount = document.querySelector(".penality_total_amount");

    let Penality_Months_input = document.querySelector(
      ".penality_total_months"
    );
    // let Due_total_amount = document.querySelector(".Due_total_amount");
    let Sub_Total_Amount = document.querySelector(".sub_Total_Amount");
    let Cutting_intrest = document.querySelector(".cutting_intrest");

    // LoanData_Array

    let Penality_Months_Count = parseInt(Penality_Months_input.value);

    let Loan_Array = LoanData_Array;
    let Monthly_Array = LoanData_Array.Month_PayingArray;

    let Loan_Months_Count = parseInt(Penality_Months);
    let Paid_Penality_Amount = parseInt(penality_Amount.value);

    let penality_Array = LoanData_Array.Penality_Array;

    let IntrestPerMonth = LoanData_Array.IntrestPerMonth;
    let _Intrest_Amount = Loan_Months_Count * parseInt(IntrestPerMonth);

    let _due_amount = parseInt(Sub_Total_Amount.value);

    let Cutting_Amount_Monthly =
      (_due_amount * parseInt(Cutting_intrest.value)) / 100;

    let _DUE_amount = _due_amount - Cutting_Amount_Monthly;

    let _Balance_principle =
      parseInt(LoanData_Array.Balance_Principle) - _DUE_amount;

    let _Balance_intrest = LoanData_Array.Balance_Intrest - _Intrest_Amount;

    let Due_Limit_Month = 0;
    Monthly_Array.forEach((loan, ind) => {
      if (Due_Limit_Month < Loan_Months_Count)
        if (loan.paid == false) {
          loan.paid = true;
          loan.Bill_Date = Bill_Date;
          loan.Receipt_Date = Receipt_Date;
          loan.Paid_Amount = _DUE_amount;
          loan.Intrest = Cutting_Amount_Monthly;
          loan.Penality_Months = Penality_Months_Count;
          loan.Penality_Amount = Paid_Penality_Amount;
          loan.Account_Closed_status = true;

          loan.Balance_Principle = _Balance_principle;
          loan.Balance_Intrest = _Balance_intrest;
          // if (
          //   LoanData_Array.Balance_Principle == 0 &&
          //   LoanData_Array.Balance_Intrest == 0
          // ) {
          //   loan.Account_Closed_status = true;
          // } else {
          //   loan.Account_Closed_status = false;
          // }
          Due_Limit_Month = Due_Limit_Month + 1;
        }
    });

    let Penality_Limit_Month = 0;
    Monthly_Array.forEach((loan, ind) => {
      if (Penality_Limit_Month < Penality_Months_Count)
        if (loan.penality == false) {
          loan.penality = true;

          Penality_Limit_Month = Penality_Limit_Month + 1;
        }
    });

    let Penality_Item = {
      Paid_Months: Loan_Months_Count,
      paid_Amount: Paid_Penality_Amount,
    };

    if (Penality_checkbox_input.checked) {
      penality_Array.push(Penality_Item);
    }

    Loan_Array.Month_PayingArray = Monthly_Array;
    Loan_Array.Penality_Array = penality_Array;
    Loan_Array.AccountStatus = true;
    Loan_Array.Balance_Principle = 0;
    Loan_Array.Balance_Intrest = 0;

    return Loan_Array;
  };

  const UploadLoan = () => {
    let LoanArray = MonthlyDueArray();

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
          <div className="main-title">Cutting Intrest</div>
        </div>
        <div className="main-content">
          <form name="add_name" id="add_name" action="#">
            <div class="row">
              <div class="col-12 col-md-12 col-sm-12">
                <div class="box invoice_primarydata_container ">
                  <div className="row">
                    <div className="col-4 ">
                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          placeholder="Receipt No"
                          value={ReceiptNO}
                          onChange={(e) => setReceiptNO(e.target.value)}
                        />
                      </div>
                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          placeholder="Bill Date"
                          onFocus={(e) => (e.currentTarget.type = "date")}
                          value={Bill_Date}
                          onChange={(e) => setBill_Date(e.target.value)}
                        />
                      </div>
                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          placeholder="Receipt Date"
                          onFocus={(e) => (e.currentTarget.type = "date")}
                          value={Receipt_Date}
                          onChange={(e) => setReceipt_Date(e.target.value)}
                        />
                      </div>

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
                        />
                        <div className="loanNO_searchBtn">Search</div>
                      </div>
                      <div
                        class="row SideBtnContainer"
                        style={{ marginTop: "10px" }}
                      >
                        <input
                          type="text"
                          placeholder="Priceiple "
                          className="principle_loan_amount"
                          onChange={(e) => setLoanAmount(e.target.value)}
                        />
                      </div>

                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          className="cutting_intrest"
                          placeholder="Cutting Intrest"
                          onChange={(e) => setIntrest(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-4 dueCurrentContainer">
                      <div class="row " style={{ marginTop: "10px" }}>
                        <div className="col-12">
                          <div className="row" style={{ marginTop: "10px" }}>
                            <input
                              placeholder="Paid Month List"
                              type="text"
                              value={DueMonthList}
                              onChange={(e) => setDueMonthList(e.target.value)}
                            />
                          </div>
                          <div className="row" style={{ marginTop: "10px" }}>
                            <input
                              placeholder="Paid Months"
                              type="text"
                              className="Due_Months_input"
                              onChange={(e) => setDueMonths(e.target.value)}
                            />
                          </div>

                          <div className="row" style={{ marginTop: "10px" }}>
                            <input
                              placeholder="Paid Amount"
                              className="Due_total_amount"
                              type="text"
                              onChange={(e) => setDueAmount(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          className="cutting_intrest_amount"
                          placeholder="Cutting Intrest Amount"
                        />
                      </div>
                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          className="sub_Total_Amount"
                          placeholder="Sub Total Amount"
                          onChange={(e) => setSubTotalAmount(e.target.value)}
                        />
                      </div>
                      <div class="row" style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          className="Main_Total_Amount"
                          placeholder="Total Amount"
                          onChange={(e) => setTotalAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-4 dueCurrentContainer">
                      <div class="row" style={{ marginTop: "10px" }}>
                        <label className="checkbox_label">Penality :</label>
                        <input
                          className="checkbox_input"
                          type="checkbox"
                          value={Penality}
                          onChange={(e) => setPenality(e.target.value)}
                        />
                      </div>
                      <div
                        class="row penalityContainer"
                        style={{ marginTop: "10px" }}
                      >
                        <div
                          className="col-12 penality-graph-container"
                          style={{ marginTop: "10px" }}
                        ></div>
                        <div className="col-12">
                          <div className="row" style={{ marginTop: "10px" }}>
                            <label>Penality Months: </label>
                            <input
                              placeholder="Penality Months"
                              className="penality_total_months"
                              type="text"
                              onChange={(e) =>
                                setPenalityMonths(e.target.value)
                              }
                            />
                          </div>
                          <div className="row" style={{ marginTop: "10px" }}>
                            <label>Penality Amount: </label>
                            <input
                              placeholder="Penality Amount"
                              className="penality_total_amount"
                              type="text"
                              onChange={(e) =>
                                setPenalityAmount(e.target.value)
                              }
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
