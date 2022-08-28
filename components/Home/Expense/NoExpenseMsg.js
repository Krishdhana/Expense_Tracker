import { Text, View, StyleSheet } from "react-native";

const NoExpenseMsg = () => {
  return (
    <View style={styles.container}>
      <Text fontSize={20} fontWeight={"bold"} letterSpacing={1}>
        No Expenses :)
      </Text>
    </View>
  );
};

export default NoExpenseMsg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
