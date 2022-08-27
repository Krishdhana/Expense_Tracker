import { Flex, Text } from "native-base";

const NoExpenseMsg = () => {
  return (
    <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
      <Text fontSize={20} fontWeight={"bold"} letterSpacing={1}>
        No Expenses :)
      </Text>
    </Flex>
  );
};

export default NoExpenseMsg;
