import { StyleSheet, Pressable, FlatList, Text, View } from "react-native";
import moment from "moment";

const ExpenseList = (props) => {
  return (
    <FlatList
      data={props.expenseList}
      renderItem={(data) => {
        return (
          <View key={data.index} style={{ marginVertical: 5 }}>
            <Pressable
              onPress={() => {
                props.onClickExpense(data);
              }}
              android_ripple={{ color: "grey" }}
            >
              <View style={styles.expenseItem}>
                <View>
                  <Text style={styles.expenseName}>{data.item.name}</Text>
                  <Text style={{ marginVertical: 3 }}>
                    {moment(data.item.date).format("DD MMM")}
                  </Text>
                </View>
                <Text style={{ fontSize: 18 }}>₹ {data.item.amount}</Text>
              </View>
            </Pressable>
          </View>
        );
      }}
    />
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontWeight: "bold",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
  },
  expenseName: {
    fontSize: 16,
  },
  expenseList: {
    marginVertical: 10,
    flex: 1,
  },
});
