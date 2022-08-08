import { StyleSheet, Text, View } from "react-native";

const Spent = () => {
  return (
    <View style={styles.container}>
      <Text styles={[styles.spentInfo, styles.spent]}>This month spent</Text>
      <Text style={styles.spent}> ₹ 50,000 </Text>
    </View>
  );
};

export default Spent;
const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
  },

  spentInfo: {
    fontSize: 15,
    marginBottom: 5,
  },

  spent: {
    fontSize: 30,
    letterSpacing: 1,
  },
});
