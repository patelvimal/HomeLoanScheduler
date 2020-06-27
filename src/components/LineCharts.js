import React from 'react';
import {Text} from 'react-native';
import {VictoryChart, VictoryLine, VictoryTheme,VictoryAxis} from 'victory-native';
const Chart = props => {
  return (
    //<Text>{JSON.stringify(props.data)}</Text>
    // <PureChart data={props.data} type='line' />
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: {stroke: '#309bff',
                strokeWidth: 4, strokeLinecap: "round" ,
            }
        }}
        x="year"
        y='principal'
        data={props.data}
      />
      <VictoryLine
        style={{
            data: {stroke: '#498910',
            strokeWidth: 4, strokeLinecap: "round" ,
          },
          parent: {border: '50px solid #ccc'},
        }}
        x="year"
        y='interest'
        data={props.data}
      />
    <VictoryAxis
            label="Year"
            fixLabelOverlap
            style={{axisLabel: { padding: 30 }}}
    />
    <VictoryAxis dependentAxis
    label="Principal/Interest"
        tickFormat={(x) => (`${x / 100000}L`)}
      style={{
        axisLabel: { padding: 40 }
      }}
    />
    </VictoryChart>
  );
};

export default Chart;
