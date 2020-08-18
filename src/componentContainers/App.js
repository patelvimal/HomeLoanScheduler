import React, { useState, useEffect, useRef } from 'react';
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
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import {
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AppBar from './Header';
import LoanForm from './LoanForm';
import LoanResult from './LoanResult';
import Sidebar from '../components/Sidebar';
import { Button, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
    const [loanInfo, setLoanInfo] = useState(null);
    const [calculatedLoanInfo, setLoanCalculation] = useState(null);
    const [loanComparisonInfo, setLoanComparison] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedLoanType, setLoanType] = useState(0);
    const [showAds, setAdStatus] = useState(false);
    const resultView = useRef(null);
    
    const getAdStatus = () => {
        auth()
            .signInAnonymously()
            .then((user) => {
                // console.log(JSON.stringify(user));
                database()
                    .ref('/showAds')
                    .once('value')
                    .then((snapshot) => {
                        var result= snapshot.val();
                        if (result) {
                            //console.log('result:' + result);
                            setAdStatus(snapshot.val());
                        }
                    });
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable anonymous in your firebase console.');
                }
                console.error(error);
            });

    }

    const onFormSubmit = loanDetails => {
        calculateHomeLoan(loanDetails);
    };

    useEffect(() => {
        if (calculatedLoanInfo && resultView) {
            resultView.current.scrollTo({ y: 610, animated: true })
        }
    }, [calculatedLoanInfo]);

    const calculateHomeLoan = loanDetails => {
        //var loanInfo = selectedLoanType == 0 ? convertToLongNumber(loanDetails) : loanDetails;
        var loanInfo = loanDetails;

        if (loanDetails.calculateEMI) {
            loanInfo.emi = calculateEMI(
                loanInfo.loanAmount,
                loanInfo.interestRate,
                loanInfo.loanTenure * 12,
            );
        }
        setLoanInfo(loanInfo);

        const { loanAmount, emi, interestRate, prePayment } = loanInfo;
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
            total.loanType = selectedLoanType;
        }

        setLoanCalculation({
            total: total,
            loanSummary: loanSummary,
            totalWithoutPrepayment: totalWithoutPrepayment,
        });
    };

    const loanComparison = () => {
        var comparisons = [50, 30, 10];
        var loanComparison = [];
        const { loanAmount, emi, interestRate } = loanInfo;
        comparisons.map(compare => {
            const prePayment = (compare / 100) * emi;
            const loanDetail = calcHomeLoan(
                loanAmount,
                emi,
                interestRate,
                prePayment,
            );
            var total = getTotal([...loanDetail], loanAmount);
            var completionDate = getCompletionDate(loanDetail);
            loanComparison.push({
                completionYear: completionDate.split(',')[1],
                completionMonth: completionDate.split(',')[0],
                totalInterest: total.interest,
                totalAmount: total.total,
                prePayment: prePayment.roundOf(0),
            });
        });
        setLoanComparison(loanComparison);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const updateLoanType = selectedIndex => {
        setLoanType(selectedIndex);
        setLoanCalculation(null);
    }

    getAdStatus();
    return (
        <>
            <SafeAreaView style={styles.root}>
                <ScrollView
                    ref={resultView}
                    contentInsetAdjustmentBehavior="automatic">
                    <AppBar onHamburgerClick={toggleSidebar} />
                    <ButtonGroup
                        onPress={updateLoanType}
                        selectedIndex={selectedLoanType}
                        buttons={["New Loan", "Existing Loan"]}
                        selectedButtonStyle={styles.selectedGroupButton}
                        containerStyle={styles.buttonGroupContainer}
                        textStyle={styles.buttonGroupTextStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                    />
                    <LoanForm key={selectedLoanType} onFormSubmit={onFormSubmit} loanType={selectedLoanType} />
                    {calculatedLoanInfo ? (
                        <LoanResult
                            loanInfo={calculatedLoanInfo}
                            comparison={loanComparisonInfo}
                            showAds={showAds}
                            onCompareClick={loanComparison}
                        />
                    ) : null}
                </ScrollView>
                <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f9fcef'
    },
    buttonGroupContainer: {
        height: 50,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 0,
        backgroundColor: '#f9fcef'
    },
    buttonGroupTextStyle: {
        fontSize: 18,
    },
    selectedGroupButton: {
        backgroundColor: '#f9fcef',
    },
    selectedTextStyle: {
        color: 'darkmagenta',
        fontWeight: 'bold',
        fontSize: 20,
        textDecorationLine: 'underline',
    }
});
export default App;
