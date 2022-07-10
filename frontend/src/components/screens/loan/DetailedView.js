import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = (props) => {
  const history = useHistory();

  const [LoanNo, setLoanNo] = useState("");
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");

  const [LoanAmount, setLoanAmount] = useState("");
  const [Total, setTotal] = useState("");
  const [MonthlyAmount, setMonthlyAmount] = useState("");
  const [Installment_Count, setInstallment_Count] = useState("");
  const [LoanDate, setLoanDate] = useState("");
  const [Phone, setPhone] = useState("");

  const [GuarantorName, setGuarantorName] = useState("");
  const [GuarantorAddress, setGuarantorAddress] = useState("");
  const [GuarantorPhone, setGuarantorPhone] = useState("");

  const [Vehicle, setVehicle] = useState("");
  const [Model, setModel] = useState("");
  const [VehicleNo, setVehicleNo] = useState("");
  const [Broker, setBroker] = useState("");
  const [SET, setSET] = useState("");
  const [RC_Amount, setRC_Amount] = useState("");
  const [TA_Amount, setTA_Amount] = useState("");

  const [AreaCode, setAreaCode] = useState("");
  const [Intrest, setIntrest] = useState("");

  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");

    document.querySelector("#mobile-toggle").onclick = () => {
      sidebar.classList.toggle("active");
    };

    document.querySelector("#sidebar-close").onclick = () => {
      sidebar.classList.toggle("active");
    };

    let TotalAmount = document.querySelector(".total_loan_amount");
    let Final_Total_amount = document.querySelector(".final_total_amount");
    let TotalAmountPerMnth = document.querySelector(".total_amount_per_mnth");
    let Intrest = document.querySelector(".intrest_pre");
    let InstallmentCounts = document.querySelector(".installment_Counts");

    let createLoanFunction = () => {
      if (
        TotalAmount.value != "" &&
        Intrest.value != "" &&
        InstallmentCounts.value != ""
      ) {
        let TotalAmountValue = parseFloat(TotalAmount.value),
          IntrestValue = parseFloat(Intrest.value),
          InstallmentCountsValue = parseFloat(InstallmentCounts.value);

        let intrest_amount_per_mnth = (IntrestValue * TotalAmountValue) / 100;

        let total_amount =
          TotalAmountValue + intrest_amount_per_mnth * InstallmentCountsValue;
        Final_Total_amount.value = total_amount;

        setTotal(total_amount);

        let total_amount_per_mnth = total_amount / InstallmentCountsValue;
        TotalAmountPerMnth.value = total_amount_per_mnth;

        setMonthlyAmount(total_amount_per_mnth);
      }
    };

    TotalAmount.addEventListener("change", (e) => {
      createLoanFunction();
    });
    Intrest.addEventListener("change", (e) => {
      createLoanFunction();
    });
    InstallmentCounts.addEventListener("change", (e) => {
      createLoanFunction();
    });
  }, []);

  const { id } = useParams();

  const Due_Tabel = (loanDATA) => {
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
    let Due_tabel_container = document.querySelector(".due_tabel_container");
    let AccountClosed_Conatiner_main = document.querySelector(
      ".AccountClosed_Conatiner"
    );
    if (loanDATA.AccountStatus == true) {
      No_of_Months = Installment_Count;
    }
    console.log(No_of_Months);
    for (let ii = 0; ii < No_of_Months; ii++) {
      MonthPaying_New_Array.push(loanDATA.Month_PayingArray[ii]);
      let MonthPaying_Data = loanDATA.Month_PayingArray[ii];

      let Due_Tabel_Container = document.createElement("tr");
      Due_Tabel_Container.classList.add("Dynamic_monthly_data_container");

      let Totaly_Paid_Amount =
        MonthPaying_Data.Paid_Amount + MonthPaying_Data.Intrest;

      Due_Tabel_Container.innerHTML = `
        <td>${ii + 1}</td>
        <td>${MonthPaying_Data.Bill_Date}</td>
        <td>${MonthPaying_Data.Receipt_Date}</td>
        <td>${MonthPaying_Data.Balance_Principle}</td>
        <td>${MonthPaying_Data.Balance_Intrest}</td>
        <td>${MonthPaying_Data.paid ? "PAID" : "UN_PAID"}</td>
        <td>${MonthPaying_Data.penality ? "PAID" : "UN_PAID"}</td>
        <td>${MonthPaying_Data.Paid_Amount}</td>
        <td>${MonthPaying_Data.Intrest}</td>
        <td>${Totaly_Paid_Amount}</td>
        <td style="width:150px !important">
          <span class="optionBtn optionBtn_View get_monthly_bill_Btn">
            Get Bill
          </span>
        </td>
      `;

      Due_tabel_container.appendChild(Due_Tabel_Container);

      if (MonthPaying_Data.Account_Closed_status === true) {
        break;
      }
    }

    let Dynamic_Monthly_Data_Container = Due_tabel_container.querySelectorAll(
      ".Dynamic_monthly_data_container"
    );

    let INDEX = 0;
    for (const Monthly_Data of Dynamic_Monthly_Data_Container) {
      let i = INDEX;
      let Get_Bill_Btn = Monthly_Data.querySelector(".get_monthly_bill_Btn");

      Get_Bill_Btn.addEventListener("click", (e) => {
        history.push(`/getLoanBill/${id}/${i}`);
      });

      INDEX = INDEX + 1;
    }

    let AccountClosed_Status = loanDATA.AccountStatus;

    let AccountClosed_Conatiner = document.createElement("div");
    AccountClosed_Conatiner.classList.add("account-content");

    AccountClosed_Conatiner.innerHTML = `Account Closed`;
    if (AccountClosed_Status == true) {
      AccountClosed_Conatiner_main.appendChild(AccountClosed_Conatiner);
    } else {
      AccountClosed_Conatiner_main.style.display = "none";
    }
  };

  const RC_Tabel = (loanDATA) => {
    let Rc_Tabel_Container = document.querySelector(".rc_tabel_container");

    let RC_Array = loanDATA.RC_Array;

    if (RC_Array.length) {
      for (let ii = 0; ii < RC_Array.length; ii++) {
        let RC_Data = loanDATA.RC_Array[ii];

        let RC_Tabel_Item_Container = document.createElement("tr");
        RC_Tabel_Item_Container.classList.add(
          "RC_Dynamic_monthly_data_container"
        );
        RC_Tabel_Item_Container.innerHTML = `
        <td>${ii + 1}</td>
        <td>${RC_Data.VoucherNo}</td>
        <td>${RC_Data.Date}</td>
        <td>${RC_Data.Balance}</td>
        <td>${RC_Data.Debit_Amount}</td>
        <td>${RC_Data.Credit_Amount}</td>
      `;

        Rc_Tabel_Container.appendChild(RC_Tabel_Item_Container);
      }
    }
  };

  const TA_Tabel = (loanDATA) => {
    let ta_tabel_container = document.querySelector(".ta_tabel_container");

    let TA_Array = loanDATA.TA_Array;

    if (TA_Array.length) {
      for (let ii = 0; ii < TA_Array.length; ii++) {
        let RC_Data = loanDATA.TA_Array[ii];

        let RC_Tabel_Item_Container = document.createElement("tr");
        RC_Tabel_Item_Container.classList.add(
          "RC_Dynamic_monthly_data_container"
        );
        RC_Tabel_Item_Container.innerHTML = `
        <td>${ii + 1}</td>
        <td>${RC_Data.VoucherNo}</td>
        <td>${RC_Data.Date}</td>
        <td>${RC_Data.Balance}</td>
        <td>${RC_Data.Debit_Amount}</td>
        <td>${RC_Data.Credit_Amount}</td>
      `;

        ta_tabel_container.appendChild(RC_Tabel_Item_Container);
      }
    }
  };

  useEffect(() => {
    fetch("/loanslist")
      .then((res) => res.json())
      .then((result) => {
        result.loan.forEach((loan, index) => {
          if (loan._id == id) {
            // setselectedLoanData(loan.LoanObject)
            Due_Tabel(loan.LoanObject);
            RC_Tabel(loan.LoanObject);
            TA_Tabel(loan.LoanObject);

            setLoanNo(loan.LoanObject.LoanNo);

            setName(loan.LoanObject.Name);
            setAddress(loan.LoanObject.Address);

            setLoanAmount(loan.LoanObject.LoanAmount);
            setTotal(loan.LoanObject.Total);
            setMonthlyAmount(loan.LoanObject.MonthlyAmount);
            setInstallment_Count(loan.LoanObject.Installment_Count);
            setLoanDate(loan.LoanObject.LoanDate);
            setPhone(loan.LoanObject.Phone);

            setGuarantorName(loan.LoanObject.GuarantorName);
            setGuarantorAddress(loan.LoanObject.GuarantorAddress);
            setGuarantorPhone(loan.LoanObject.GuarantorPhone);

            setVehicle(loan.LoanObject.Vehicle);
            setModel(loan.LoanObject.Model);
            setVehicleNo(loan.LoanObject.VehicleNo);
            setBroker(loan.LoanObject.Broker);
            setSET(loan.LoanObject.SET);
            setRC_Amount(loan.LoanObject.RC_Amount);
            setTA_Amount(loan.LoanObject.TA_Amount);

            setAreaCode(loan.LoanObject.AreaCode);
            setIntrest(loan.LoanObject.Intrest);
          }
        });
      });
  }, []);

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
          <form name="add_name" id="add_name" action="#">
            <div class="row">
              <div class="col-12 col-md-12 col-sm-12">
                <div class="box invoice_primarydata_container">
                  <div class="row">
                    <div class="col-6">
                      <div class="row">
                        <div class="col-6">
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="loan_no"
                              placeholder="Loan No"
                              value={LoanNo}
                              onChange={(e) => setLoanNo(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="customer_name"
                              placeholder="Name"
                              value={Name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="customer_address"
                              placeholder="Address"
                              value={Address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="loan_amount"
                              placeholder="Loan Amount"
                              class="total_loan_amount"
                              value={LoanAmount}
                              onChange={(e) => setLoanAmount(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="total_amount"
                              placeholder="Total"
                              class="final_total_amount"
                              value={Total}
                              onChange={(e) => setTotal(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="pre_month"
                              placeholder="Month%"
                              class="total_amount_per_mnth"
                              value={MonthlyAmount}
                              onChange={(e) => setMonthlyAmount(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="installment_no"
                              placeholder="Installment Count"
                              class="installment_Counts"
                              value={Installment_Count}
                              onChange={(e) =>
                                setInstallment_Count(e.target.value)
                              }
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="loan_created_date"
                              placeholder="Date"
                              class="loan_created_date"
                              onFocus={(e) => (e.currentTarget.type = "date")}
                              value={LoanDate}
                              onChange={(e) => setLoanDate(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="customer_phone"
                              placeholder="Phone"
                              value={Phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row">
                        <div class="col-6">
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="guarantor_name"
                              placeholder="Guarantor Name"
                              value={GuarantorName}
                              onChange={(e) => setGuarantorName(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="guarantor_address"
                              placeholder="Address"
                              value={GuarantorAddress}
                              onChange={(e) =>
                                setGuarantorAddress(e.target.value)
                              }
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="guarantor_phone"
                              placeholder="Phone"
                              value={GuarantorPhone}
                              onChange={(e) =>
                                setGuarantorPhone(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="vehicle"
                              placeholder="Vehicle"
                              value={Vehicle}
                              onChange={(e) => setVehicle(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="model"
                              placeholder="Model"
                              value={Model}
                              onChange={(e) => setModel(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="vehicle_no"
                              placeholder="Vehicle No"
                              value={VehicleNo}
                              onChange={(e) => setVehicleNo(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="broker"
                              placeholder="Broker"
                              value={Broker}
                              onChange={(e) => setBroker(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              name="S_E_T"
                              placeholder="S.E.T"
                              value={SET}
                              onChange={(e) => setSET(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              placeholder="RC Amount"
                              value={RC_Amount}
                              onChange={(e) => setRC_Amount(e.target.value)}
                            />
                          </div>
                          <div class="row" style={{ marginTop: "10px" }}>
                            <input
                              type="text"
                              placeholder="TA Amount"
                              value={TA_Amount}
                              onChange={(e) => setTA_Amount(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" style={{ margin: "10px" }}>
                    <div className="col-6">
                      <label htmlFor="areaCode">Select District: </label>
                      <select
                        style={{
                          width: "200px",
                          fontSize: "20px",
                          marginLeft: "10px",
                        }}
                        id="areaCode"
                        value={AreaCode}
                        onChange={(e) => setAreaCode(e.target.value)}
                      >
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        placeholder="Intrest"
                        style={{ width: "200px", fontSize: "20px" }}
                        class="intrest_pre"
                        value={Intrest}
                        onChange={(e) => setIntrest(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div className="col-12">
                <h2 className="Tabel_heading">Due Tabel</h2>
              </div>
              <div className="col-12">
                <div class="create-purchase-container">
                  <table>
                    <thead>
                      <tr class="table-headers">
                        <th>S:NO</th>
                        <th>Bill Date</th>
                        <th>Receipt Date</th>

                        <th>Balance Pricel</th>
                        <th>Balance Intrest</th>
                        <th>Status</th>
                        <th>Penality</th>
                        <th>Paid Principle</th>
                        <th>Paid Intrest</th>
                        <th>Totaly Paid</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <tbody
                      id="dynamic_field"
                      className="purchaseTabelContainer due_tabel_container"
                    ></tbody>
                  </table>
                  <div className="AccountClosed_Conatiner"></div>
                </div>
              </div>
            </div>

            <div class="row">
              <div className="col-12">
                <h2 className="Tabel_heading">RC Tabel</h2>
              </div>
              <div className="col-12">
                <div class="create-purchase-container">
                  <table>
                    <thead>
                      <tr class="table-headers">
                        <th>S:NO</th>
                        <th>Voucher No</th>
                        <th>Date</th>
                        <th>Balance</th>
                        <th>Debit</th>
                        <th>Credit</th>
                      </tr>
                    </thead>
                    <tbody
                      id="dynamic_field"
                      className="purchaseTabelContainer rc_tabel_container"
                    ></tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="row">
              <div className="col-12">
                <h2 className="Tabel_heading">TA Tabel</h2>
              </div>
              <div className="col-12">
                <div class="create-purchase-container">
                  <table>
                    <thead>
                      <tr class="table-headers">
                        <th>S:NO</th>
                        <th>Voucher No</th>
                        <th>Date</th>
                        <th>Balance</th>
                        <th>Debit</th>
                        <th>Credit</th>
                      </tr>
                    </thead>
                    <tbody
                      id="dynamic_field"
                      className="purchaseTabelContainer ta_tabel_container"
                    ></tbody>
                  </table>
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
