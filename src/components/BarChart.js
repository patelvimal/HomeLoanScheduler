import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
} from 'victory-native';

const BarChart = props => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      padding={{top: 10, left: 40, right: 10, bottom: 50}}>
      <VictoryGroup offset={10} colorScale={['#08a308', '#ad0f98']}>
        <VictoryBar x="year" y="principal" barWidth={10} data={props.data} />
        <VictoryBar x="year" y="interest" barWidth={10} data={props.data} />
      </VictoryGroup>
      <VictoryLegend
        x={70}
        y={10}
        orientation="horizontal"
        gutter={0}
        //style={{border: {stroke: 'black'}}}
        //style={{border: {stroke: 'black'}}}
        data={[
          {
            name: 'Principal',
            symbol: {fill: '#08a308'},
            labels: {fontSize: 15},
          },
          {name: 'Interest', symbol: {fill: '#ad0f98'}, labels: {fontSize: 15}},
        ]}
      />
      <VictoryAxis
        label="Year"
        fixLabelOverlap
        style={{axisLabel: {padding: 35, fontSize: 15}}}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={x => `${x / 100000}L`}
        style={{
          axisLabel: {padding: 33, fontSize: 15},
        }}
      />
    </VictoryChart>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
export default BarChart;
