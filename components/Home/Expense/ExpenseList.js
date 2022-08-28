import { useContext } from "react";
import moment from "moment";
import { UserDataContext } from "../../../store/redux/userdata-context";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { List, MD3Colors } from "react-native-paper";

const ExpenseList = ({ onClickExpenseItem }) => {
  const userDataCtx = useContext(UserDataContext);

  return (
    <FlatList
      style={{ marginTop: 10 }}
      showsVerticalScrollIndicator={false}
      data={userDataCtx.expenseList}
      renderItem={(data) => {
        return (
          <View style={{ marginBottom: 6 }}>
            <Text style={{ marginBottom: 8, marginLeft: 15, fontSize: 16 }}>
              {data.index == 0 ? "This month" : data.item.month}
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data.item.expList}
              style={{ marginTop: 6 }}
              renderItem={(exp) => {
                return (
                  <View style={{ paddingHorizontal: 8 }}>
                    <List.Item
                      style={[
                        styles.listItem,
                        {
                          backgroundColor: exp.item.income
                            ? MD3Colors.primary80
                            : MD3Colors.secondary90,
                        },
                      ]}
                      title={exp.item.name}
                      description={moment(exp.item.date).format("DD MMM")}
                      left={(props) => (
                        <List.Icon
                          style={{ opacity: 0.7 }}
                          icon={exp.item.income ? "plus-thick" : "minus-thick"}
                        />
                      )}
                      right={(props) => (
                        <Text
                          style={styles.amountText}
                          fontWeight={"bold"}
                          fontSize={16}
                        >
                          ₹ {exp.item.amount}
                        </Text>
                      )}
                      onPress={() => onClickExpenseItem(data.index, exp.index)}
                    />
                  </View>
                );
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 10,
    marginBottom: 13,
    padding: 3,
    elevation: 4,
  },
  amountText: {
    marginTop: 18,
    paddingRight: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
});
