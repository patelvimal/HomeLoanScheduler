// import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import React from 'react';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Slider from '@material-ui/core/Slider';


// const InputSlider = ()=> {

//     return(
//         <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
//     )
// }

// export default InputSlider;

import TextField from '@material-ui/core/TextField';
import RupeeIcon from '../components/RupeeIcon';

const useStyles = makeStyles({
	root:{
		marginBottom: 5
	},
	hide:{
		display: 'none'
	},
	sliderRoot: {
		color: '#209ddb',
		height: '8px',
		padding: '10px 0'
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
		padding: '9px 0',
		marginTop:4
	},
	inputContainer:{
		// width:200,
		padding: '4px 0'
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
		width: 100,
		background: '#a6daf23d'
	}
});

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export default function InputSlider(props) {
	const { min, max, step, defaultValue, marks,suffix,name } = props;
	const [value, setValue] = React.useState(defaultValue || 0);

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
		if(props.onChange &&  typeof props.onChange === 'function') {
			props.onChange(name,newValue);
		}
	};

	const handleInputChange = (event) => {
		setValue(event.target.value === '' ? '' : Number(event.target.value));
	};

	const handleBlur = () => {
		if (value < 0) {
			setValue(0);
		} else if (value > max) {
			setValue(max);
		}
	};

	const valueLabelFormat = (value) => {
		console.log(value);
		return `${value}L`;
	}

	const selecedValueText = (value) => {
		console.log(value);
		return value;
	}
	const classes = useStyles();
	return (
		
		<div className={`${classes.root} ${props.hide ? classes.hide : ""}`}>
			<Grid container justify="space-between">
				<Typography align="left" className={classes.label}>{props.label}</Typography>
				<div className={classes.inputContainer}>
					{/* <img src="/rupee.svg" alt="rupee" className={classes.rupeeIcon}></img> */}
					<RupeeIcon className={classes.rupeeIcon}></RupeeIcon>
					<input 
						type="text" 
						className={classes.input} 
						value={value} onChange={handleInputChange}
						disabled = {props.disabled}
					></input>
					{/* <TextField
                            required
                            //={formSubmitted && !loanInfo.loanAmount}
							id="loanAmount"
							size="small"
                            // label="Outstanding Loan Amount"
							name="loanAmount"
							variant="filled"
                           // onChange={onChange}
                            //variant={inputFieldStyle}
							//helperText={(formSubmitted && !loanInfo.loanAmount) ? "Amount is Required!" : null}
				/> */}
				</div>
				
				{/* <Typography align="right" className="rightLabel">{value}{suffix}</Typography> */}
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
							valueLabel: classes.valueLabel
						}}
						min={min}
						max={max}
						step={step}
						marks={marks}
						name={name}
						valueLabelDisplay='auto'
						// getAriaValueText={selecedValueText}
					// valueLabelFormat={valueLabelFormat}
					/>
				<Grid className="input">
				{/* <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} /> */}
				</Grid>
			</Grid>
		</div>
	);
}