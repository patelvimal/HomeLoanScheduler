import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button, Divider, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputSliderExtended from '../components/InputSliderExtended';
import RupeeIcon from '../components/RupeeIcon';

const LoanForm = (props) => {
	const selectedLoanType = props.loanType;
	const LOAN_AMOUNT_DEFAULT_VALUE = 5000000;
	const MONTHLY_EMI_DEFAULT_VALUE = 50000;
	const INTEREST_RATE_DEFAULT_VALUE = 8;
	const LOAN_TENURE_DEFAULT_VALUE = 10;
	const MONTHLY_PREPAYMENT_DEFAULT_VALUE = 0;

	const INITIAL_STATE = {
		loanAmount: LOAN_AMOUNT_DEFAULT_VALUE,
		emi: MONTHLY_EMI_DEFAULT_VALUE,
		interestRate: INTEREST_RATE_DEFAULT_VALUE,
		prePayment: MONTHLY_PREPAYMENT_DEFAULT_VALUE,
		loanTenure: LOAN_TENURE_DEFAULT_VALUE,
		calculateEMI: selectedLoanType == 0 ? true : false,
	};

	const INITIAL_FORM_STATE = {
		isFormValid: true,
		message: null
	};
	const ANIMATION_DURATION = 500;
	const [loanInfo, setLoanInfo] = useState(INITIAL_STATE);
	const [formState, setFormState] = useState(INITIAL_FORM_STATE);

	const loanAmountConfig = { min: 1000000, max: 10000000, step: 100000 };
	const loanTenureConfig = { min: 3, max: 30, step: 1 };
	const interestRateConfig = { min: 3.00, max: 20.00, step: .5 };
	const emiConfig = { min: 10000, max: 100000, step: 1000 };
	const prePaymentConfig = { min: 0, max: 100000, step: 1000 };

	const loanAmountMarker = generateMarker('L', 10, 100, 10);;
	const emiAmountMarker = generateMarker('K', 10, 100, 10);
	const intRateMarker = generateMarker('%', interestRateConfig.min, interestRateConfig.max, 2);
	const loanTenureMarker = generateMarker('Y', loanTenureConfig.min, loanTenureConfig.max, 3);
	const prePaymentMarker = generateMarker('K', 0, 100, 10);

	const onChange = (name, newValue) => {
		setLoanInfo(prevState => ({
			...prevState,
			[name]: newValue,
		}));
	};

	const onSubmit = event => {
		var monthlyInterest = (loanInfo.loanAmount * ((loanInfo.interestRate / 100) / 12)).roundOf(0);
		console.log(monthlyInterest);
		if (selectedLoanType == 1 && loanInfo.emi <= monthlyInterest) {
			setFormState({
				isFormValid: false,
				message: `For the entered Loan Amount and Interest Rate,EMI should be more than ${monthlyInterest.addThousandSeperator()}`
			});
			return;
		} 

		if (props.onFormSubmit && typeof props.onFormSubmit === 'function') {
			props.onFormSubmit(loanInfo);
		}
	};

	useEffect(() => {
		const formState = getFormState();
		setFormState(formState);
	}, [loanInfo])

	const getFormState = () => {
		var formValid = true;
		var fieldName = '';
		if (selectedLoanType == 0) {
			if (loanInfo.loanAmount == 0) {
				fieldName = "Loan Amount";
				formValid = false;
			} else if (loanInfo.loanTenure == 0) {
				fieldName = "Loan Tenure";
				formValid = false;
			} else if (loanInfo.interestRate == 0) {
				fieldName = "Interest Rate";
				formValid = false;
			}
		} else {
			if (loanInfo.loanAmount == 0) {
				fieldName = "Loan Amount";
				formValid = false;
			} else if (loanInfo.emi == 0) {
				fieldName = "EMI";
				formValid = false;
			} else if (loanInfo.interestRate == 0) {
				fieldName = "Interest Rate";
				formValid = false;
			}
		}
		return {
			isFormValid: formValid,
			message: `${fieldName} cannot be 0`
		}
	}

	return (
		<View style={styles.root}>
			{
				!formState.isFormValid && <Header
					placement="left"
					centerComponent={<ErrorMessage message={formState.message}/>}
					leftComponent={<Icon name="warning" size={22} color="#fff" />}
					containerStyle={{
						backgroundColor: 'red',
						height: 50,
						paddingTop: 0,
						borderRadius: 5
					}}
				/>
			}
			<Animatable.View animation="slideInLeft" useNativeDriver={true} duration={ANIMATION_DURATION}>
				<InputSliderExtended
					label={selectedLoanType == 0 ? "Loan Amount" : "Outstanding Loan(In lakhs)"}
					min={loanAmountConfig.min}
					max={loanAmountConfig.max}
					step={loanAmountConfig.step}
					value={LOAN_AMOUNT_DEFAULT_VALUE}
					onChange={onChange}
					name="loanAmount"
					removeValidation={true}
					markers={loanAmountMarker}
					icon={<RupeeIcon />}
				/>
			</Animatable.View>
			{
				selectedLoanType === 0 ?
					<Animatable.View animation="slideInRight" useNativeDriver={true} duration={ANIMATION_DURATION}>
						<InputSliderExtended
							label="Loan Tenure"
							min={loanTenureConfig.min}
							max={loanTenureConfig.max}
							step={loanTenureConfig.step}
							value={LOAN_TENURE_DEFAULT_VALUE}
							onChange={onChange}
							maxLength={3}
							name="loanTenure"
							icon={<Text style={styles.yearIcon}>Years</Text>}
							markers={loanTenureMarker}
						/>
					</Animatable.View> :
					<Animatable.View animation="slideInRight" useNativeDriver={true} duration={ANIMATION_DURATION}>
						<InputSliderExtended
							label="EMI Amount"
							min={emiConfig.min}
							max={emiConfig.max}
							step={emiConfig.step}
							value={MONTHLY_EMI_DEFAULT_VALUE}
							onChange={onChange}
							name="emi"
							icon={<RupeeIcon />}
							markers={emiAmountMarker}
						/>
					</Animatable.View>
			}
			<Animatable.View animation="slideInLeft" useNativeDriver={true} duration={ANIMATION_DURATION}>
				<InputSliderExtended
					label="Interest Rate"
					min={interestRateConfig.min}
					max={interestRateConfig.max}
					step={interestRateConfig.step}
					value={INTEREST_RATE_DEFAULT_VALUE}
					onChange={onChange}
					name="interestRate"
					maxLength={5}
					type="Decimal"
					icon={<Text style={styles.interestIcon}>%</Text>}
					markers={intRateMarker}
				/>
			</Animatable.View>
			<Animatable.View animation="slideInRight" useNativeDriver={true} duration={ANIMATION_DURATION}>
				<InputSliderExtended
					label="Additional Payment (monthly)"
					min={prePaymentConfig.min}
					max={prePaymentConfig.max}
					step={prePaymentConfig.step}
					value={MONTHLY_PREPAYMENT_DEFAULT_VALUE}
					onChange={onChange}
					name="prePayment"
					icon={<RupeeIcon />}
					markers={prePaymentMarker}
				/>
			</Animatable.View>
			<Animatable.View animation="slideInUp" useNativeDriver={true} duration={ANIMATION_DURATION}>
				<Text style={styles.message}>Along with EMI how much additional amount (per month) you can pay towards Loan Repayment</Text>
				<Button
					disabled={!formState.isFormValid}
					icon={<View style={styles.icon}><Icon name="calculator" size={18} color='#fff' /></View>}
					title="Submit"
					buttonStyle={styles.button}
					titleStyle={styles.buttonTitle}
					onPress={onSubmit}
				/></Animatable.View>
		</View>
	);
};

const ErrorMessage = (props) => {
	return <Text style={errorStyles.root} numberOfLines={2}>{props.message}</Text>;
};

const errorStyles = StyleSheet.create({
	root:{ fontSize: 15, color: '#fff',borderWidth:0 },
});

const styles = StyleSheet.create({
	root: {
		marginLeft: 10,
		marginRight: 10,
		borderWidth: 1,
		marginTop: 10,
		borderColor: '#c6c2c2',
		borderRadius: 4,
		backgroundColor: '#fff',
		elevation: 5,
		padding: 10,
		marginBottom: 20
	},
	button: {
		margin: 30,
		padding: 10,
		backgroundColor: 'darkslateblue'
	},
	buttonGroupContainer: {
		height: 50,
		marginBottom: 10,
		borderRadius: 8
	},
	buttonGroupTextStyle: {
		fontSize: 18,
	},
	selectedGroupButton: {
		backgroundColor: 'green',
	},
	buttonTitle: {
		fontSize: 20,
	},
	icon: {
		paddingRight: 10
	},
	iconSymbol: {
		fontSize: 22,
		marginTop: 6,
		color: 'grey'
	},
	yearIcon: {
		fontSize: 14,
		marginTop: 11,
		color: 'grey'
	},
	interestIcon: {
		fontSize: 16,
		marginTop: 10,
		color: 'grey'
	},
	message: {
		borderRadius: 10,
		padding: 10,
		fontSize: 15,
		textAlign: 'center',
	},
});

const generateMarker = (suffix, minValue, maxValue, stepSize) => {
	var list = [];
	maxValue = maxValue || 100;
	stepSize = stepSize || 10;
	minValue = minValue || 0;
	for (var i = minValue; i <= maxValue; i += stepSize) {
		list.push({
			value: i,
			label: i !== 0 ? `${i}${suffix}` : 0,
		});
	}
	return list;
};

export default LoanForm;
