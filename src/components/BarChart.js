import React from 'react';
import {Text} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryGroup
} from 'victory-native';

const BarChart = props => {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryGroup offset={17} colorScale={["#08a308", "#ad0f98"]}>
        <VictoryBar
          x="year"
          y="principal"
          barWidth={10}
          data={props.data}
        />
        <VictoryBar
          x="year"
          y="interest"
          barWidth={10}
          data={props.data}
        />
      </VictoryGroup>

      <VictoryAxis
        label="Year"
        fixLabelOverlap
        style={{axisLabel: {padding: 35,fontSize:15 }}}
      />
      <VictoryAxis
        dependentAxis
        label="Principal/Interest"
        tickFormat={x => `${x / 100000}L`}
        style={{
          axisLabel: {padding: 33,fontSize:15 },
        }}
      />
    </VictoryChart>
  );
};

export default BarChart;
