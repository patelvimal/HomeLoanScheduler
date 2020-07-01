import React from 'react';
import {Text} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
} from 'victory-native';
const Chart = props => {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: {stroke: '#08a308', strokeWidth: 4, strokeLinecap: 'round'},
        }}
        x="year"
        y="principal"
        data={props.data}
      />
       <VictoryScatter
        data={props.data}
        x="year"
        y="principal"
        size={5}
        style={{data: {fill: '#08a308'}}}
      />
      <VictoryLine
        style={{
          data: {stroke: '#ad0f98', strokeWidth: 4, strokeLinecap: 'round'},
          parent: {border: '50px solid #ccc'},
        }}
        x="year"
        y="interest"
        data={props.data}
      />
      <VictoryScatter
        data={props.data}
        x="year"
        size={5}
        style={{data: {fill: '#ad0f98'}}}
        y="interest"
      />
      <VictoryAxis
        label="Year"
        fixLabelOverlap
        style={{axisLabel: {padding: 35, fontSize: 15}}}
      />
      <VictoryAxis
        dependentAxis
        label="Principal/Interest"
        tickFormat={x => `${x / 100000}L`}
        style={{
          axisLabel: {padding: 33, fontSize: 15},
        }}
      />
    </VictoryChart>
  );
};

export default Chart;
