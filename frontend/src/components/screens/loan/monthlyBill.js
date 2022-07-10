import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FinanceLogo from "../../images/vm_logo.jpg";

const App = () => {
  const { loanID, MonthIndex } = useParams();
  const [LoanNo, setLoanNo] = useState("");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [AreaCode, setAreaCode] = useState("");
  const [BillDate, setBillDate] = useState("");
  const [Paid_Principle, setPaid_Principle] = useState("");
  const [Paid_Intrest, setPaid_Intrest] = useState("");
  const [Total_Amount, setTotal_Amount] = useState("");

  console.log(loanID, MonthIndex);

  const Get_Selected_Data = (loanData) => {
    let Selected_Month = loanData.Month_PayingArray[MonthIndex];
    console.log(loanData, Selected_Month);

    setLoanNo(loanData.LoanNo);
    setName(loanData.Name);
    setPhone(loanData.Phone);
    setAreaCode(loanData.AreaCode);

    setBillDate(Selected_Month.Bill_Date);
    setPaid_Principle(Selected_Month.Paid_Amount);
    setPaid_Intrest(Selected_Month.Intrest);
    let total_Amount =
      parseInt(Selected_Month.Paid_Amount) + parseInt(Selected_Month.Intrest);
    setTotal_Amount(total_Amount);
  };
  useEffect(() => {
    fetch("/loanslist")
      .then((res) => res.json())
      .then((result) => {
        result.loan.forEach((loan, index) => {
          if (loan._id == loanID) {
            // setselectedLoanData(loan.LoanObject)
            Get_Selected_Data(loan.LoanObject);
          }
        });
      });
  }, []);

  const PrintElem = (elem) => {
    window.print();
  };
  return (
    <div className="Bill_Page_Container">
      <div class="Loan_bill_Container" id="print_loan_bill">
        <div class="bill-continer-main">
          <div class="Bill_container">
            <div className="bill_top_header">
              <div className="bill_finance_logo">
                <img src={FinanceLogo} alt="" />
              </div>
              <div className="bill_finance_Name">
                <h3>VINAYAKA MOTORS</h3>
                <span>
                  D.20/W.26,pillayar kovil streeet,Nandhagopal kovil, south
                  gate,
                  <br /> Cumbum-625516,Theni district.
                </span>
              </div>
            </div>
            <hr style={{ marginTop: "10px" }} />
            <hr style={{ marginTop: "1px" }} />
            <div className="bill_content">
              <div className="bill_content_left">
                <div className="bill_content_item">
                  <h5>Loan No:</h5>
                  <span>{LoanNo || "-"}</span>
                </div>
                <div className="bill_content_item">
                  <h5>Name :</h5>
                  <span>{Name || "-"}</span>
                </div>
                <div className="bill_content_item">
                  <h5>Phone Number :</h5>
                  <span>{Phone || "-"}</span>
                </div>
                <div className="bill_content_item">
                  <h5>Area Code :</h5>
                  <span>{AreaCode || "-"}</span>
                </div>
              </div>

              <div className="bill_content_right">
                <div className="bill_content_item">
                  <h5>Bill Date:</h5>
                  <span>{BillDate || "-"}</span>
                </div>
                <div className="bill_content_item">
                  <h5>Paid Principle:</h5>
                  <span>₹ {Paid_Principle}</span>
                </div>
                <div className="bill_content_item">
                  <h5>Paid Intrest:</h5>
                  <span>₹ {Paid_Intrest}</span>
                </div>
                <div className="bill_content_item">
                  <h5>Total Amount :</h5>
                  <span>₹ {Total_Amount}</span>
                </div>
                <div className="bill_content_sign">
                  <h5>Sign or Other</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Bill_printBtn_Container">
        <button onClick={() => PrintElem("print_loan_bill")}>PRINT</button>
      </div>
    </div>
  );
};

export default App;
