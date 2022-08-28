import { useContext } from "react";
import moment from "moment";
import { UserDataContext } from "../../../store/redux/userdata-context";
import { FlatList, Flex, Pressable, Text, View } from "native-base";

const ExpenseList = (props) => {
  const userDataCtx = useContext(UserDataContext);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={userDataCtx.expenseList}
      renderItem={(data) => {
        return (
          <View mb={4}>
            <Text mb={3}>
              {data.index == 0 ? "This month" : data.item.month}
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data.item.expList}
              renderItem={(exp) => {
                return (
                  <Pressable
                    onPress={() =>
                      props.onClickExpenseItem(data.index, exp.index)
                    }
                    p={2}
                  >
                    <Flex
                      bg={"primary.100"}
                      px={5}
                      py={2}
                      borderRadius={16}
                      direction="row"
                      shadow={6}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <View>
                        <Text
                          isTruncated
                          width={"48"}
                          fontWeight={"bold"}
                          fontSize={16}
                        >
                          {exp.item.name}
                        </Text>
                        <Text fontSize={12} color={"gray.800"}>
                          {moment(exp.item.date).format("DD MMM")}
                        </Text>
                      </View>
                      <Text fontWeight={"bold"} fontSize={16}>
                        ₹ {exp.item.amount}
                      </Text>
                    </Flex>
                  </Pressable>
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
