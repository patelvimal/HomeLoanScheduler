import React from "react";
import LoanForm from './components/LoanForm';
import LoanReport from './components/LoanReport';

const routes = {
  "/": () => <LoanForm />,
  "/result": () => <LoanReport />,
};

export default routes;
