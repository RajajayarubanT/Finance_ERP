import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import SideNav from "../sideNav";
const Dashboard = (props) => {
  const history = useHistory();
  const [CashBookDate, setCashBookDate] = useState("");
  let [BookData, setBookData] = useState([]);
  let [CashBook_Fields_data, setCashBook_Fields_data] = useState([]);

  useEffect(() => {}, []);

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

  const Intrest_Tabel = async (book) => {
    //  Intrest Recived
    let Intrest_recived_debit = document.querySelector(
      ".Intrest_recived_debit"
    );
    let Intrest_recived_credit = document.querySelector(
      ".Intrest_recived_credit"
    );
    let Intrest_recived_balance = document.querySelector(
      ".Intrest_recived_balance"
    );

    let _Loans_Data = [];

    await fetch("/loanslist")
      .then((res) => res.json())
      .then((result) => {
        _Loans_Data = result.loan;
      });

    let _Month_INTREST = 0;

    _Loans_Data.forEach((lon, index) => {
      let Month_PayingArray = lon.LoanObject.Month_PayingArray;

      Month_PayingArray.forEach((month, ind) => {
        let Loan_Month_Date = month.Date;
        let Book_DATE = book.BookObject.BookDate;

        let Book_Date_Year = Book_DATE.slice(0, 4);
        let Book_Date_Month = String(parseInt(Book_DATE.slice(5, 7)));

        let _BOOK_DATE = Book_Date_Month + "-" + Book_Date_Year;

        if (Loan_Month_Date == _BOOK_DATE) {
          _Month_INTREST = _Month_INTREST + parseInt(month.Intrest);
        }
      });
    });

    Intrest_recived_debit.innerHTML = _Month_INTREST;
    Intrest_recived_credit.innerHTML = 0;
    Intrest_recived_balance.innerHTML = _Month_INTREST;

    //   ***********
  };

  const Monthly_Loan_Tabel = () => {
    //  Intrest Recived
    let Monthly_loan_debit = document.querySelector(".Monthly_loan_debit");
    let Monthly_loan_credit = document.querySelector(".Monthly_loan_credit");
    let Monthly_loan_balance = document.querySelector(".Monthly_loan_balance");
    Monthly_loan_debit.innerHTML = 0;
    Monthly_loan_credit.innerHTML = 0;
    Monthly_loan_balance.innerHTML = 0;

    //   ***********
  };

  const Cash_Hand_Tabel = () => {
    //  Intrest Recived
    let Cash_in_hand_debit = document.querySelector(".Cash_in_hand_debit");
    let Cash_in_hand_credit = document.querySelector(".Cash_in_hand_credit");
    let Cash_in_hand_balance = document.querySelector(".Cash_in_hand_balance");
    Cash_in_hand_debit.innerHTML = 0;
    Cash_in_hand_credit.innerHTML = 0;
    Cash_in_hand_balance.innerHTML = 0;

    //   ***********
  };

  const BalanceSheetTabel = (CashBook_Fields, book) => {
    let Total_Debit_Value = 0;
    let Total_Credit_Value = 0;

    let _Total_New_Field_Credit = 0,
      _Total_New_Field_Debit = 0;

    let dynamic_cashbook_container = document.querySelector(
      ".dynamic_cashbook_container"
    );
    for (const Field in CashBook_Fields) {
      let New_Fields = Field.slice(0, 3);

      if (New_Fields == "NEW") {
        let _new_field = CashBook_Fields[Field];

        let _Field_debit_Value = 0,
          _Field_credit_Value = 0;

        _new_field.forEach((_field, index) => {
          console.log(_field);

          let _field_Debit = _field.debit.length > 0 ? _field.debit : 0;
          let _field_Credit = _field.credit.length > 0 ? _field.credit : 0;
          _Field_debit_Value = _Field_debit_Value + parseInt(_field_Debit);
          _Field_credit_Value = _Field_credit_Value + parseInt(_field_Credit);
        });

        let _Field_balance_Value = _Field_debit_Value - _Field_credit_Value;

        let _new_field_container = document.createElement("tr");

        _new_field_container.innerHTML = `

        <td>${Field}</td>
        <td class="${Field}_debit">${_Field_debit_Value}</td>
        <td class="${Field}_credit">${_Field_credit_Value}</td>
        <td class="${Field}_balance">${_Field_balance_Value}</td>
        
        `;

        _Total_New_Field_Credit = _Total_New_Field_Credit + _Field_debit_Value;
        _Total_New_Field_Debit = _Total_New_Field_Debit + _Field_credit_Value;

        dynamic_cashbook_container.appendChild(_new_field_container);
      }
    }

    //   Swamigal
    let Swamigal_debit = document.querySelector(".Swamigal_debit");
    let Swamigal_credit = document.querySelector(".Swamigal_credit");
    let Swamigal_balance = document.querySelector(".Swamigal_balance");

    let Swamigal_DATA = CashBook_Fields.swamigal;

    let Swamigal_debit_Value = 0,
      Swamigal_credit_Value = 0;

    Swamigal_DATA.forEach((data, ind) => {
      let Data_Debit = data.debit.length > 0 ? data.debit : 0;
      let Data_Credit = data.credit.length > 0 ? data.credit : 0;
      Swamigal_debit_Value = Swamigal_debit_Value + parseInt(Data_Debit);
      Swamigal_credit_Value = Swamigal_credit_Value + parseInt(Data_Credit);
    });

    Swamigal_debit.innerHTML = Swamigal_debit_Value;
    Swamigal_credit.innerHTML = Swamigal_credit_Value;
    Swamigal_balance.innerHTML = Swamigal_debit_Value - Swamigal_credit_Value;
    //   ***********

    //   Party Advance

    let party_advance_debit = document.querySelector(".party_advance_debit");
    let party_advance_credit = document.querySelector(".party_advance_credit");
    let party_advance_balance = document.querySelector(
      ".party_advance_balance"
    );

    let Party_advance_DATA = CashBook_Fields.party_advance;

    let PartyAdvance_debit_Value = 0,
      PartyAdvance_credit_Value = 0;

    Party_advance_DATA.forEach((data, ind) => {
      let Data_Debit = data.debit.length > 0 ? data.debit : 0;
      let Data_Credit = data.credit.length > 0 ? data.credit : 0;

      PartyAdvance_debit_Value =
        PartyAdvance_debit_Value + parseInt(Data_Debit);

      PartyAdvance_credit_Value =
        PartyAdvance_credit_Value + parseInt(Data_Credit);
    });

    party_advance_debit.innerHTML = PartyAdvance_debit_Value;
    party_advance_credit.innerHTML = PartyAdvance_credit_Value;
    party_advance_balance.innerHTML =
      PartyAdvance_debit_Value - PartyAdvance_credit_Value;
    //   ********

    //   Partners Capital

    let partners_capital_debit = document.querySelector(
      ".partners_capital_debit"
    );
    let partners_capital_credit = document.querySelector(
      ".partners_capital_credit"
    );
    let partners_capital_balance = document.querySelector(
      ".partners_capital_balance"
    );

    let Partners_capital_DATA = CashBook_Fields.partners_captials;

    let Partners_capital_debit_Value = 0,
      Partners_capital_credit_Value = 0;

    Partners_capital_DATA.forEach((data, ind) => {
      let Data_Debit = data.debit.length > 0 ? data.debit : 0;
      let Data_Credit = data.credit.length > 0 ? data.credit : 0;

      Partners_capital_debit_Value =
        Partners_capital_debit_Value + parseInt(Data_Debit);
      Partners_capital_credit_Value =
        Partners_capital_credit_Value + parseInt(Data_Credit);
    });

    partners_capital_debit.innerHTML = Partners_capital_debit_Value;

    partners_capital_credit.innerHTML = Partners_capital_credit_Value;

    partners_capital_balance.innerHTML =
      Partners_capital_debit_Value - Partners_capital_credit_Value;

    //   RC Book Advance
    let RC_book_advance_debit = document.querySelector(
      ".RC_book_advance_debit"
    );
    let RC_book_advance_credit = document.querySelector(
      ".RC_book_advance_credit"
    );
    let RC_book_advance_balance = document.querySelector(
      ".RC_book_advance_balance"
    );

    let RC_book_DATA = CashBook_Fields.rc_book_advance;

    let RC_book_debit_Value = 0,
      RC_book_credit_Value = 0;

    RC_book_DATA.forEach((data, ind) => {
      let Data_Debit = data.debit.length > 0 ? data.debit : 0;
      let Data_Credit = data.credit.length > 0 ? data.credit : 0;
      RC_book_debit_Value = RC_book_debit_Value + parseInt(Data_Debit);
      RC_book_credit_Value = RC_book_credit_Value + parseInt(Data_Credit);
    });

    RC_book_advance_debit.innerHTML = RC_book_debit_Value;
    RC_book_advance_credit.innerHTML = RC_book_credit_Value;
    RC_book_advance_balance.innerHTML =
      RC_book_debit_Value - RC_book_credit_Value;
    //   ***********

    //  Deposit
    let Deposit_debit = document.querySelector(".Deposit_debit");
    let Deposit_credit = document.querySelector(".Deposit_credit");
    let Deposit_balance = document.querySelector(".Deposit_balance");

    let Deposit_DATA = CashBook_Fields.deposit;

    let Deposit_debit_Value = 0,
      Deposit_credit_Value = 0;

    Deposit_DATA.forEach((data, ind) => {
      let Data_Debit = data.debit.length > 0 ? data.debit : 0;
      let Data_Credit = data.credit.length > 0 ? data.credit : 0;
      Deposit_debit_Value = Deposit_debit_Value + parseInt(Data_Debit);
      Deposit_credit_Value = Deposit_credit_Value + parseInt(Data_Credit);
    });

    Deposit_debit.innerHTML = Deposit_debit_Value;
    Deposit_credit.innerHTML = Deposit_credit_Value;

    Deposit_balance.innerHTML = Deposit_debit_Value - Deposit_credit_Value;
    //   ***********
    //   Cash_Hand_Tabel
    Cash_Hand_Tabel(book);

    Total_Debit_Value =
      Swamigal_debit_Value +
      PartyAdvance_debit_Value +
      Partners_capital_debit_Value +
      RC_book_debit_Value +
      Deposit_debit_Value +
      _Total_New_Field_Credit;

    Total_Credit_Value =
      Swamigal_credit_Value +
      PartyAdvance_credit_Value +
      Partners_capital_credit_Value +
      RC_book_credit_Value +
      Deposit_credit_Value +
      _Total_New_Field_Debit;

    return { Total_Debit_Value, Total_Credit_Value };
  };

  const Total_BalanceSheet = async (CashBook_Fields, book) => {
    let { Total_Debit_Value, Total_Credit_Value } = BalanceSheetTabel(
      CashBook_Fields,
      book
    );

    //   Intrest Recived
    async function Intrestt() {
      let Intrest_recived_debit = document.querySelector(
        ".Intrest_recived_debit"
      );
      let Intrest_recived_credit = document.querySelector(
        ".Intrest_recived_credit"
      );
      let Intrest_recived_balance = document.querySelector(
        ".Intrest_recived_balance"
      );

      let Monthly_loan_debit = document.querySelector(".Monthly_loan_debit");
      let Monthly_loan_credit = document.querySelector(".Monthly_loan_credit");
      let Monthly_loan_balance = document.querySelector(
        ".Monthly_loan_balance"
      );

      let _Loans_Data = [];

      await fetch("/loanslist")
        .then((res) => res.json())
        .then((result) => {
          _Loans_Data = result.loan;
        });

      let _Month_INTREST = 0;

      _Loans_Data.forEach((lon, index) => {
        let Month_PayingArray = lon.LoanObject.Month_PayingArray;

        Month_PayingArray.forEach((month, ind) => {
          let Loan_Month_Date = month.Date;
          let Book_DATE = book.BookObject.BookDate;

          let Book_Date_Year = Book_DATE.slice(0, 4);
          let Book_Date_Month = String(parseInt(Book_DATE.slice(5, 7)));

          let _BOOK_DATE = Book_Date_Month + "-" + Book_Date_Year;

          if (Loan_Month_Date == _BOOK_DATE) {
            _Month_INTREST = _Month_INTREST + parseInt(month.Intrest);
          }
        });
      });

      Intrest_recived_debit.innerHTML = _Month_INTREST;
      Intrest_recived_credit.innerHTML = 0;
      Intrest_recived_balance.innerHTML = _Month_INTREST;
      let Intrest_DEBIT = _Month_INTREST;

      let _Month_LOAN = 0;

      _Loans_Data.forEach((lon, index) => {
        let Month_PayingArray = lon.LoanObject.Month_PayingArray;

        Month_PayingArray.forEach((month, ind) => {
          let Loan_Month_Date = month.Date;
          let Book_DATE = book.BookObject.BookDate;

          let Book_Date_Year = Book_DATE.slice(0, 4);
          let Book_Date_Month = String(parseInt(Book_DATE.slice(5, 7)));

          let _BOOK_DATE = Book_Date_Month + "-" + Book_Date_Year;

          if (Loan_Month_Date == _BOOK_DATE) {
            _Month_LOAN = _Month_LOAN + parseInt(month.Paid_Amount);
          }
        });
      });

      Monthly_loan_debit.innerHTML = _Month_LOAN;
      Monthly_loan_credit.innerHTML = 0;
      Monthly_loan_balance.innerHTML = _Month_LOAN;

      let Loan_DEBIT = _Month_LOAN;

      return { Loan_DEBIT, Intrest_DEBIT };
    }

    let { Intrest_DEBIT, Loan_DEBIT } = await Intrestt();

    let Main_Total_Debit_Value = document.querySelector(
      ".Main_Total_Debit_Value"
    );
    let Main_Total_Credit_Value = document.querySelector(
      ".Main_Total_Credit_Value"
    );
    let Main_Total_Balance_Value = document.querySelector(
      ".Main_Total_Balance_Value"
    );

    Total_Debit_Value = Total_Debit_Value + Intrest_DEBIT + Loan_DEBIT;

    let Main_Total_Balance = Total_Debit_Value - Total_Credit_Value;

    Main_Total_Debit_Value.innerHTML = `₹ ${Total_Debit_Value}`;
    Main_Total_Credit_Value.innerHTML = `₹ ${Total_Credit_Value}`;
    Main_Total_Balance_Value.innerHTML = `₹ ${Main_Total_Balance}`;
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

            // BalanceSheetTabel(CashBook_Fields);

            let dynamic_cashbook_container = document.querySelector(
              ".dynamic_cashbook_container"
            );
            setBookData(book);
            setCashBook_Fields_data(CashBook_Fields);

            Total_BalanceSheet(CashBook_Fields, book);

            let Array_Length = CashBook_Fields.swamigal.length;
            for (let ind = 0; ind < Array_Length; ind++) {
              let Date = CashBook_Fields.swamigal[ind].date,
                Total_Debit = 0,
                Total_Credit = 0,
                Total_Balance = 0;

              for (const fields in CashBook_Fields) {
                let Cash_Fields = CashBook_Fields[fields][ind];

                if (Cash_Fields) {
                  let Cash_Fields_Input_Debit =
                    Cash_Fields.debit.length > 0
                      ? parseInt(Cash_Fields.debit)
                      : 0;
                  Total_Debit = Total_Debit + Cash_Fields_Input_Debit;

                  console.log(fields, Total_Debit, Cash_Fields_Input_Debit);

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

              console.log(Total_Debit, Total_Credit);

              Main_Total_Debit = Main_Total_Debit + Total_Debit;
              Main_Total_Credit = Main_Total_Credit + Total_Credit;
            }
            console.log(Main_Total_Debit, Main_Total_Credit);
            Main_Total_Balance = Main_Total_Debit - Main_Total_Credit;

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

                  Day_Total_Debit = Day_Total_Debit + parseInt(Selected_Debit);
                  Day_Total_Credit =
                    Day_Total_Credit + parseInt(Selected_Credit);
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
          <div className="main-title">Trial Balance</div>
        </div>
        <div className="main-content">
          <form name="add_name" id="add_name" action="#">
            <div class="row">
              <div class="col-12 col-md-12 col-sm-12">
                <div class="box invoice_primarydata_container">
                  <div class="row">
                    <div class="col-12 create-purchase-container">
                      <table>
                        <thead>
                          <tr class="table-headers">
                            <th>Field Name</th>
                            <th>Debit Amount</th>
                            <th>Credit Amount</th>
                            <th>Balance</th>
                          </tr>
                        </thead>
                        <tbody
                          id="dynamic_field"
                          class="purchaseTabelContainer dynamic_cashbook_container"
                        >
                          <tr>
                            <td>Swamigal</td>
                            <td className="Swamigal_debit"></td>
                            <td className="Swamigal_credit"></td>
                            <td className="Swamigal_balance"></td>
                          </tr>
                          <tr>
                            <td>Party Advance</td>
                            <td className="party_advance_debit"></td>
                            <td className="party_advance_credit"></td>
                            <td className="party_advance_balance"></td>
                          </tr>
                          <tr>
                            <td>Partners Capital</td>
                            <td className="partners_capital_debit"></td>
                            <td className="partners_capital_credit"></td>
                            <td className="partners_capital_balance"></td>
                          </tr>
                          <tr>
                            <td>RC Book Advance</td>
                            <td className="RC_book_advance_debit"></td>
                            <td className="RC_book_advance_credit"></td>
                            <td className="RC_book_advance_balance"></td>
                          </tr>
                          <tr>
                            <td>Deposit</td>
                            <td className="Deposit_debit"></td>
                            <td className="Deposit_credit"></td>
                            <td className="Deposit_balance"></td>
                          </tr>
                          <tr>
                            <td>Intrest Recived</td>
                            <td className="Intrest_recived_debit"></td>
                            <td className="Intrest_recived_credit"></td>
                            <td className="Intrest_recived_balance"></td>
                          </tr>
                          <tr>
                            <td>Monthly Loan</td>
                            <td className="Monthly_loan_debit"></td>
                            <td className="Monthly_loan_credit"></td>
                            <td className="Monthly_loan_balance"></td>
                          </tr>
                          <tr>
                            <td>Cash in Hand</td>
                            <td className="Cash_in_hand_debit"></td>
                            <td className="Cash_in_hand_credit"></td>
                            <td className="Cash_in_hand_balance"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
