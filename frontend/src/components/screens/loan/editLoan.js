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

  const [Month_PayingArray, setMonth_PayingArray] = useState([]);
  const [Penality_Array, setPenality_Array] = useState([]);
  const [Receipt_Array, setReceipt_Array] = useState([]);

  const [RC_Array, setRC_Array] = useState([]);
  const [TA_Array, setTA_Array] = useState([]);

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

  useEffect(() => {
    fetch("/loanslist")
      .then((res) => res.json())
      .then((result) => {
        result.loan.forEach((loan, index) => {
          if (loan._id == id) {
            // setselectedLoanData(loan.LoanObject)

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

            setPenality_Array(loan.LoanObject.Penality_Array);
            setReceipt_Array(loan.LoanObject.ReceiptArray);
            setMonth_PayingArray(loan.LoanObject.Month_PayingArray);

            setRC_Array(loan.LoanObject.RC_Array);
            setTA_Array(loan.LoanObject.TA_Array);
          }
        });
      });
  }, []);

  const editLoanData = () => {
    fetch("/updateloan", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        LoanNo,
        Name,
        Address,
        LoanAmount,
        Total,
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
        Penality_Array,
        Receipt_Array,
        RC_Array,
        TA_Array,
        AccountStatus: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Update Error !!!");
        } else {
          alert("Update Successfully");
          window.location.reload();
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
            <div className="row">
              <div className="col-12 actionBtn-container">
                <div
                  class="add-row-btn"
                  name="submit"
                  id="submit"
                  onClick={() => editLoanData()}
                >
                  <span>Update Loan</span>
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
