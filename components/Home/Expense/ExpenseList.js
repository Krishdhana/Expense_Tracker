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
          <Pressable onPress={() => props.onClickExpenseItem(data)} mb={3}>
            <Flex
              width={"full"}
              bg={"primary.100"}
              px={5}
              py={2}
              rounded={"2xl"}
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
              shadow={5}
            >
              <View>
                <Text
                  isTruncated
                  width={"48"}
                  fontWeight={"bold"}
                  fontSize={16}
                >
                  {data.item.name}
                </Text>
                <Text fontSize={12} color={"gray.800"}>
                  {moment(data.item.date).format("DD MMM")}
                </Text>
              </View>
              <Text fontWeight={"bold"} fontSize={16}>
                ₹ {data.item.amount}
              </Text>
            </Flex>
          </Pressable>
        );
      }}
    />
  );
};

export default ExpenseList;
