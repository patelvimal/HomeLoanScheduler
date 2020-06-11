import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const useChartStyles = makeStyles({
    chart: {
        height: 300,
        marginBottom: 25,

        '& > text' :{
			fontSize: 14
        }
    },
});

const BarChartInfo = (props) => {
    const classes = useChartStyles();
    return (
        <div className={classes.chart}>
            <ResponsiveContainer>
                <BarChart
                    width={500}
                    data={props.loanInfo}
                    margin={{
                        top: 15, right: 0, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="2 3" />
                    <XAxis dataKey="year" />
                    <YAxis hide={true} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="principal" fill="#82ca9d" name="Principal" legendType="square" />
                    <Bar dataKey="interest" fill="#8884d8" name="Interest" legendType="circle" />
                </BarChart>
            </ResponsiveContainer>
        </div >
    )
}

const AreaChartInfo = (props) => {
    const classes = useChartStyles();
    return (
        <div className={classes.chart}>
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    data={props.loanInfo}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis dataKey="interest" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" legendType="square" dataKey="principal" stroke="#8884d8" name="Principal" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" legendType="circle" dataKey="interest" stroke="#82ca9d" name="Interest" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export { BarChartInfo, AreaChartInfo };