import { StyleSheet, Text } from "react-native";

const WelcomeTitle = () => {
  return <Text style={styles.welcomeFont}>Welcome, Krish</Text>;
};

export default WelcomeTitle;

const styles = StyleSheet.create({
  welcomeFont: {
    fontSize: 20,
    letterSpacing: 1.5,
    fontWeight: "500",
  },
});
