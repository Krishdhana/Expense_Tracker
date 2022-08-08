import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

const OverviewChart = () => {
  const [chartContainer, setChartContainer] = useState({
    height: 0,
    width: 0,
  });

  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#FF1E00",
    backgroundGradientFrom: "F7F7F7",
    backgroundGradientTo: "#F7F7F7",
    color: (opacity = 1) => `#2C3333`,
    style: {
      borderRadius: 16,
    },
  };

  const setHeightWidth = ({ nativeEvent }) => {
    setChartContainer({
      height: nativeEvent.layout.height,
      width: nativeEvent.layout.width,
    });
  };

  return (
    <View style={styles.chartContainer} onLayout={setHeightWidth}>
      <BarChart
        width={chartContainer.width}
        height={chartContainer.height}
        data={data}
        fromZero={true}
        withInnerLines={false}
        showValuesOnTopOfBars={true}
        withHorizontalLabels={false}
        chartConfig={chartConfig}
        style={styles.graphStyle}
      />
    </View>
  );
};

export default OverviewChart;

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 10,
    flex: 1,
  },
  graphStyle: {
    flex: 1,
  },
});
