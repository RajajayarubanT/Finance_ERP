import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = () => {
  const history = useHistory();

  //   Data
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
    let LoanStartDate = document.querySelector(".loan_created_date");

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

  const MonthlyDueArray = () => {
    let TotalAmountPerMnth = document.querySelector(".total_amount_per_mnth");
    let InstallmentCounts = document.querySelector(".installment_Counts");
    let LoanStartDate = document.querySelector(".loan_created_date");

    LoanStartDate = LoanStartDate.value;

    let LoanMonth = String(LoanStartDate).slice(5, 7);
    let Loan_Year = String(LoanStartDate).slice(0, 4);

    let Loan_Months_Count = parseInt(InstallmentCounts.value);

    let Loan_Due_Array = [];

    let Month_Start = parseInt(LoanMonth);
    let Year = parseInt(Loan_Year);

    for (let i = 0; i < Loan_Months_Count; i++) {
      Month_Start = Month_Start + 1;
      let Month = Month_Start;

      if (Month >= 13) {
        Month_Start = 1;
        Year = Year + 1;
      }
      Month = Month_Start;

      let Date = String(Month) + "-" + String(Year);

      let IntrestPerMonth = (Intrest * LoanAmount) / 100;
      let Total_Intrest = IntrestPerMonth * parseInt(Installment_Count);
      let Total_Principle = parseInt(LoanAmount);

      let Loan_perMonth = {
        Month: i + 1,
        Date: Date,
        Amount: TotalAmountPerMnth.value,
        Paid_Amount: 0,
        Intrest: 0,
        Penality_Months: 0,
        Penality_Amount: 0,
        paid: false,
        penality: false,
        Bill_Date: "",
        Receipt_Date: "",
        Account_Closed_status: false,
        Balance_Principle: Total_Principle,
        Balance_Intrest: Total_Intrest,
      };

      Loan_Due_Array.push(Loan_perMonth);
    }

    return Loan_Due_Array;
  };

  const UploadLoan = async () => {
    let Month_PayingArray = MonthlyDueArray();

    let IntrestPerMonth = (Intrest * LoanAmount) / 100;
    let Total_Intrest = IntrestPerMonth * parseInt(Installment_Count);
    let Total_Principle = LoanAmount;

    fetch("/createloan", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LoanNo,
        Name,
        Address,
        LoanAmount,
        Total,
        IntrestPerMonth,
        Total_Principle,
        Total_Intrest,
        MonthlyAmount,
        Installment_Count,
        LoanDate,
        Phone,
        GuarantorName,
        GuarantorAddress,
        GuarantorPhone,
        Vehicle,
        Model,
        VehicleNo,
        Broker,
        SET,
        RC_Amount,
        TA_Amount,
        AreaCode,
        Intrest,
        Month_PayingArray,
        AccountStatus: false,
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
          <div className="main-title">Create Loan</div>
        </div>
        <div className="main-content">
          <div className="row">
            <div className="col-4 col-md-6 col-sm-12">
              <Link style={{ display: "inline" }} to="/">
                <div className="box box-hover">
                  <div className="counter">
                    <div className="counter-title">View</div>
                    <div className="counter-info">
                      <div className="counter-count">Loan</div>
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
            <div className="row">
              <div className="col-12 actionBtn-container">
                <div
                  class="add-row-btn"
                  name="submit"
                  id="submit"
                  onClick={() => UploadLoan()}
                >
                  <span>Create Loan</span>
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
