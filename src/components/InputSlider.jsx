import TextField from '@material-ui/core/TextField';
// import React from 'react';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Slider from '@material-ui/core/Slider';

// const PrettoSlider = withStyles({
//     root: {
//         color: '#52af77',
//         height: 8,
//     },
//     thumb: {
//         height: 24,
//         width: 24,
//         backgroundColor: '#fff',
//         border: '2px solid currentColor',
//         marginTop: -8,
//         marginLeft: -12,
//         '&:focus, &:hover, &$active': {
//             boxShadow: 'inherit',
//         },
//     },
//     active: {},
//     valueLabel: {
//         left: 'calc(-50% + 4px)',
//     },
//     track: {
//         height: 8,
//         borderRadius: 4,
//     },
//     rail: {
//         height: 8,
//         borderRadius: 4,
//     },
// })(Slider);

// const SliderInput = ()=> {

//     return(
//         <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
//     )
// }

// export default SliderInput;

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


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

	return (
		<div className="inputSlider">
			<Grid container justify="space-between">
				<Typography align="left" className="leftLabel">{props.label}</Typography>
				<Typography align="right" className="rightLabel">{value}{suffix}</Typography>
			</Grid>
			<Grid container alignItems="center">
				<Grid className="slider">
					<Slider
						value={typeof value === 'number' ? value : 0}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
						min={min}
						max={max}
						step={step}
						marks={marks}
						name={name}
						// valueLabelDisplay='auto'
						// getAriaValueText={selecedValueText}
					// valueLabelFormat={valueLabelFormat}
					/>
				</Grid>

				<Grid className="input">
					{/* <TextField
              // disabled
              // required
              size="small"
              fullWidth
              value={value}
              id="loanAmount"
              onChange={handleInputChange}
              onBlur={handleBlur}
              name="loanAmount"
               variant='filled'
              // inputProps={{
              //   step: 10,y
              //   min: 0,
              //   max: 100,
              //   'aria-labelledby': 'input-slider',
              // }}
          />  */}
				</Grid>
			</Grid>
		</div>
	);
}