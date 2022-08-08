import { StyleSheet, View, Text, Button } from "react-native";

const ExpenseList = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.expenseListTitle}>Expense List</Text>
      </View>
      <View style={styles.expenseList}>
        <View style={styles.expenseItem}>
          <Text>Dress</Text>
          <Text>1000</Text>
          <Text> {new Date().toISOString()} </Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  expenseListTitle: {
    marginVertical: 10,
    fontSize: 18,
  },

  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "violet",
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },

  titleContainer: {
    justifyContent: "space-between",
  },
  expenseList: {
    borderWidth: 1,
    flex: 1,
  },
});
