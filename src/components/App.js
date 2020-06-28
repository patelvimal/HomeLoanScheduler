import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Alert,
  Dimensions
} from 'react-native';

import { calcHomeLoan, calculateEMI, getSummary, getTotal } from '../shared/calculate-service';
import { convertToLongNumber, getCompletionDate } from '../shared/utilities';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AppBar from './Header';
import LoanForm from './LoanForm';
import LoanResult from './LoanResult';
import Sidebar from './Sidebar';

const App = () => {
  const [loanInfo, setLoanInfo] = useState(null);
  const [calculatedLoanInfo, setLoanCalculation] = useState(null);
  const [loanComparisonInfo, setLoanComparison] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const resultView = useRef(null);
  
  const onFormSubmit = loanDetails => {
    calculateHomeLoan(loanDetails);
  };

  useEffect(() => {
    if (calculatedLoanInfo && resultView)  {
      resultView.current.scrollTo({y:650, animated: true})
    }
  }, [calculatedLoanInfo]);

  const calculateHomeLoan = loanDetails => {
    var loanInfo = convertToLongNumber(loanDetails);
    if (loanDetails.calculateEMI) {
      loanInfo.emi = calculateEMI(
        loanInfo.loanAmount,
        loanInfo.interestRate,
        loanInfo.loanTenure * 12,
      );
    }
    setLoanInfo(loanInfo);
    const {loanAmount, emi, interestRate, prePayment} = loanInfo;
    const loanDetail = calcHomeLoan(loanAmount, emi, interestRate, prePayment);
    const loanSummary = getSummary(loanDetail, 'year');

    var loanSummaryWithoutPrepayment = null;
    var totalWithoutPrepayment = null;
    if (prePayment > 0) {
      const loanDetailWithoutPrepayment = calcHomeLoan(
        loanAmount,
        emi,
        interestRate,
        0,
      );
      loanSummaryWithoutPrepayment = getSummary(
        loanDetailWithoutPrepayment,
        'year',
      );
      totalWithoutPrepayment = getTotal(loanSummaryWithoutPrepayment);
      totalWithoutPrepayment.completionDate = getCompletionDate(
        loanDetailWithoutPrepayment,
      );
    }

    var total = getTotal([...loanSummary], loanInfo.loanAmount);
    if (total) {
      total.completionDate = getCompletionDate(loanDetail);
      total.emi = loanInfo.emi.roundOf(0);
    }

    setLoanCalculation({
      total: total,
      loanSummary: loanSummary,
      totalWithoutPrepayment: totalWithoutPrepayment,
    });
  };

  const loanComparison = () => {
    var comparisons = [10, 30, 50];
    var loanComparison = [];
    const {loanAmount, emi, interestRate} = loanInfo;
    comparisons.map(compare => {
      const prePayment = (compare / 100) * emi;
      const loanDetail = calcHomeLoan(
        loanAmount,
        emi,
        interestRate,
        prePayment,
      );
      var total = getTotal([...loanDetail], loanAmount);
      loanComparison.push({
        completionDate: getCompletionDate(loanDetail),
        totalInterest: total.interest,
        totalAmount: total.total,
        prePayment: prePayment.roundOf(0),
      });
    });
    setLoanComparison(loanComparison);
  };

  const toggleSidebar =() => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const createTwoButtonAlert = () =>
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );
  return (
    <>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={toggleSidebar}>
          <View>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            ref={resultView}
            contentInsetAdjustmentBehavior="automatic">
            <AppBar onHamburgerClick={toggleSidebar} />
            <LoanForm onFormSubmit={onFormSubmit} />
            {calculatedLoanInfo ? (
              <LoanResult
                loanInfo={calculatedLoanInfo}
                comparison={loanComparisonInfo}
                onCompareClick={loanComparison}
              />
            ) : null}
            <Sidebar isOpen={isSidebarOpen}/>
          </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  }
});

export default App;
