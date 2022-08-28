import { StyleSheet, Text } from "react-native";
import { MD3Colors } from "react-native-paper";

const WelcomeTitle = (props) => {
  return (
    <Text style={styles.titleContainer}>
      Welcome,
      <Text style={styles.name}> {props.name}</Text>
    </Text>
  );
};

export default WelcomeTitle;

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 20,
    letterSpacing: 2.5,
    fontWeight: "bold",
    marginBottom: 15,
  },
  name: {
    color: MD3Colors.primary50,
  },
});
