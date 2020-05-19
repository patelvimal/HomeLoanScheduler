
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
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}