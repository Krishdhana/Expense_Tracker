import { Center, Text } from "native-base";

const Spent = (props) => {
  return (
    <Center bg={"primary.200"} borderRadius={20} mt={6} py={15} shadow={"7"}>
      <Text fontSize={15}>This month spend</Text>
      <Text fontSize={30}> ₹ {props.spent} </Text>
    </Center>
  );
};

export default Spent;
