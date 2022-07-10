import React, { useEffect, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

// CSS
import "./components/css/app.css";
import "./components/css/grid.css";
import "./components/css/style.css";
import "./components/css/bill.css";
import "./components/css/statement.css";
// import "./components/css/login.css";

// Screens
import Dashboard from "./components/screens/dashboard";
import Loan from "./components/screens/loan/loan";
import CreateLoan from "./components/screens/loan/createLoan";
import EditLoan from "./components/screens/loan/editLoan";
import DetailedView from "./components/screens/loan/DetailedView";

import DueCurrent from "./components/screens/loanOptions/dueCurrent";
import CuttingIntrest from "./components/screens/loanOptions/cuttingIntrest";
import AccountClose from "./components/screens/loanOptions/accountClose";
import LoanBalance from "./components/screens/loanOptions/loanBalance";

import SelfEntry from "./components/screens/entry/selfEntry";
import ManulaEntry from "./components/screens/entry/manulaEntry";
import AutoEntry from "./components/screens/entry/autoEntry";

import RC_Entry from "./components/screens/entry/RC_Entry";
import TA_Entry from "./components/screens/entry/TA_Entry";

// Finance Book
import FinanceBook from "./components/screens/others/FinanceBook";
import CreateFinanceBook from "./components/screens/others/createFinanceBook";
import EditFinanceBook from "./components/screens/others/editFinanceBook";
import OpenFinanceBook from "./components/screens/others/openFinanceBook";

import CashBook from "./components/screens/others/cashBook";
import AddNew_CashBook_Field from "./components/screens/others/addNew_CashBook_Field";
import CreateDayCashBook from "./components/screens/others/createDayCashBook";
import BalanceSheet from "./components/screens/others/balanceSheet";
import Profit_Loss from "./components/screens/others/profit_loss";
import Statement from "./components/screens/others/Statements";
import _Statement_Filtered_Data from "./components/screens/others/_Statement_Filtered_Data";
import Trial_Balance from "./components/screens/others/trialBalance";

// Bills
import Monthly_Loan_Bill from "./components/screens/loan/monthlyBill";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Loan />
      </Route>

      <Route exact path="/createLoan">
        <CreateLoan />
      </Route>

      <Route exact path="/editLoan/:id">
        <EditLoan />
      </Route>
      <Route exact path="/viewLoan/:id">
        <DetailedView />
      </Route>

      <Route exact path="/due-current">
        <DueCurrent />
      </Route>
      <Route exact path="/cutting-intrest">
        <CuttingIntrest />
      </Route>
      <Route exact path="/account-close">
        <AccountClose />
      </Route>
      <Route exact path="/loan-balance">
        <LoanBalance />
      </Route>

      <Route exact path="/self-receipt">
        <SelfEntry />
      </Route>
      <Route exact path="/manul-receipt">
        <ManulaEntry />
      </Route>
      <Route exact path="/auto-receipt">
        <AutoEntry />
      </Route>

      <Route exact path="/RC-entry">
        <RC_Entry />
      </Route>
      <Route exact path="/TA-entry">
        <TA_Entry />
      </Route>

      <Route exact path="/create-finance-Book">
        <CreateFinanceBook />
      </Route>
      <Route exact path="/finance-Book">
        <FinanceBook />
      </Route>
      <Route exact path="/editbook/:id">
        <EditFinanceBook />
      </Route>
      <Route exact path="/openbook/:id">
        <OpenFinanceBook />
      </Route>
      <Route exact path="/cashbook/:id">
        <CashBook />
      </Route>
      <Route exact path="/addNew-CashBook-Field/:id">
        <AddNew_CashBook_Field />
      </Route>
      <Route exact path="/upload-day-cashbook/:id">
        <CreateDayCashBook />
      </Route>

      <Route exact path="/balance-sheet/:id">
        <BalanceSheet />
      </Route>
      <Route exact path="/trial-balance/:id">
        <Trial_Balance />
      </Route>
      <Route exact path="/profit_loss/:id">
        <Profit_Loss />
      </Route>

      <Route exact path="/getLoanBill/:loanID/:MonthIndex">
        <Monthly_Loan_Bill />
      </Route>
      <Route exact path="/statement">
        <Statement />
      </Route>

      <Route exact path="/filtered-statement">
        <_Statement_Filtered_Data />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
