import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ExpenseList from "../components/Home/Expense/ExpenseList";
import Wrapper from "../components/shared/Wrapper";

const ExpenseScreen = () => {
  return (
    <Wrapper>
      <View>
        <Text style={styles.title}>Expenses</Text>
        <ExpenseList onClickExpenseItem={(exp) => {}} />
      </View>
    </Wrapper>
  );
};

export default ExpenseScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
});
