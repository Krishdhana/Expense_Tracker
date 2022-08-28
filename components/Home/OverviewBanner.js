import { StyleSheet, Text, View } from "react-native";
import { Surface, MD3Colors } from "react-native-paper";

const OverviewBanner = ({ expenseDetails }) => {
  const bannersDetails = [
    {
      name: "Saving",
      amount: expenseDetails.saving,
    },
    {
      name: "Spent",
      amount: expenseDetails.spent,
    },
  ];

  return (
    <View style={styles.container}>
      {bannersDetails.map((banner) => {
        return (
          <Surface
            key={banner.name}
            elevation={3}
            style={[
              styles.box,
              {
                backgroundColor:
                  banner.name === "Saving"
                    ? MD3Colors.primary80
                    : MD3Colors.secondary90,
              },
            ]}
          >
            <Text style={styles.smallTxt}>{banner.name} </Text>
            <Text style={styles.text}>₹ {banner.amount}</Text>
          </Surface>
        );
      })}
    </View>
  );
};

export default OverviewBanner;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  smallTxt: {
    marginLeft: 5,
    fontSize: 12,
  },
  box: {
    width: "45%",
    height: "100%",
    padding: 10,
    borderRadius: 10,
  },
});
