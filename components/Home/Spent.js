import { Box } from "native-base";
import { StyleSheet, Text, View } from "react-native";

const Spent = (props) => {
  return (
    <Box shadow={2} style={styles.container}>
      <Text styles={[styles.spentInfo, styles.spent]}>This month spent</Text>
      <Text style={styles.spent}> ₹ {props.spent} </Text>
    </Box>
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
