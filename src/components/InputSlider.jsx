import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import RupeeIcon from '../components/RupeeIcon';

const useStyles = makeStyles({
	root:{
		marginBottom: 15
	},
	hide:{
		display: 'none'
	},
	visibility: {
		visibility:'hidden'
	},
	sliderRoot: {
		color: '#209ddb',
		height: '8px',
		padding: '10px 0',
		//  marginBottom: 30
	},

	thumb: {
		height: '24px',
		width: '24px',
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		marginTop: '-8px',
		marginLeft: '-12px'
	},
	active: {},
	valueLabel: {
	  left: 'calc(-50% + 4px)',
	},
	track: {
	  height: 8,
	  borderRadius: 4,
	},
	rail: {
	  height: 8,
	  borderRadius: 4,
	},
	label: {
		padding: '6px 0',
		marginTop: 4,
		fontSize:'1.10rem'
	},
	inputContainer:{
		// width:200,
		padding: '3px 0'
	},
	rupeeIcon: {
		width: 17,
		height: 17,
		margin: '13px 4px',
		float: 'left',
		color: '#4e4e50'
	},
	input: {
		padding: '8px',
		borderRadius: 4,
		fontSize: '18px',
		border: 'solid 1px rgb(223, 224, 228)',
		width: 80,
		background: '#a6daf23d'
	},
	markLabel: {
		top: 30
	}
});


export default function InputSlider(props) {
	const { min, max, step, defaultValue, marks, suffix, name } = props;
	const [value, setValue] = React.useState(defaultValue || 0);
	const integerRegex = /^((?:|1|[1-9]\d?|100)?)$/;
	const decimalRegex = /^((?:|1|[1-9]\d?|100)(?:\.\d{0,2})?)$/;
	const regex = props.type == "Decimal" ? decimalRegex: integerRegex;

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
		invokeCallback(newValue);
	};

	const handleInputChange = (event) => {
		const {value} = event.target;
		if (value === '' || regex.test(value) && (value >= min && value <= max)) {
			const newValue = value === '' ? '' : value.indexOf('.') == (value.length -1) ? value :Number(value);
			setValue(newValue);
			invokeCallback(newValue);
		 }
	};

	const invokeCallback = (newValue) => {
		if(props.onChange &&  typeof props.onChange === 'function') {
			props.onChange(name,newValue);
		}
	}

	const classes = useStyles();
	return (
		
		<div className={`${classes.root} ${props.hide ? classes.hide : ""}`}>
			<Grid container justify="space-between">
				<Typography align="left" className={classes.label}>{props.label}</Typography>
				<div className={classes.inputContainer}>
				<RupeeIcon className={`${classes.rupeeIcon} ${props.hideIcon ? classes.visibility : ""}`}></RupeeIcon>
					<input 
						type="number" 
						className={classes.input} 
						value={value} onChange={handleInputChange}
						disabled = {props.disabled}
					></input>
				</div>
			</Grid>
			<Grid container alignItems="center">
				<Slider
					value={typeof value === 'number' ? value : 0}
					disabled = {props.disabled}
					onChange={handleSliderChange}
					aria-labelledby="input-slider"
					classes={{
						root: classes.sliderRoot,
						rail: classes.rail,
						track: classes.track,
						thumb: classes.thumb,
						active: classes.active,
						valueLabel: classes.valueLabel,
						markLabel: classes.markLabel
					}}
					min={min}
					max={max}
					step={step}
					marks={marks}
					name={name}
					valueLabelDisplay='auto'
				/>
			</Grid>
		</div>
	);
}