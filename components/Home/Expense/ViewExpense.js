import moment from "moment";
import { View, Text, StyleSheet } from "react-native";
import { Dialog, Button, Portal } from "react-native-paper";

const ViewExpense = ({ open, close, selectedExpense }) => {
  return (
    <Portal>
      <Dialog visible={open} onDismiss={() => close(false)}>
        <Dialog.Title>Expense Details</Dialog.Title>
        <Dialog.Content style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Name :</Text>
            <Text>{selectedExpense.item?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Amount :</Text>
            <Text>₹ {selectedExpense.item?.amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Date :</Text>
            <Text>
              {" "}
              {moment(selectedExpense.item?.date).format("DD MMM YYYY")}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => close(false)}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ViewExpense;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "18%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
  },
});
