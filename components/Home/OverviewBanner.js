import { Box, Flex, Text, View } from "native-base";

import { Entypo } from "@expo/vector-icons";

const OverviewBanner = ({ expenseDetails }) => {
  return (
    <Flex
      justifyContent={"space-around"}
      alignItems={"center"}
      mt={4}
      flexDirection={"row"}
    >
      <View
        bg={"violet.300"}
        borderRadius={20}
        shadow={"7"}
        height={"20"}
        width={"2/5"}
      >
        <Box>
          <Text marginLeft={5} fontSize={"12"} marginTop={2.5}>
            Saving
          </Text>
          <Text fontWeight={"bold"} fontSize={22} textAlign="center">
            <Entypo name="plus" size={22} color="black" />₹{" "}
            {expenseDetails.saving}
          </Text>
        </Box>
      </View>
      <View
        bg={"violet.500"}
        borderRadius={20}
        shadow={"7"}
        height={20}
        width={"2/5"}
      >
        <Box>
          <Text marginLeft={5} fontSize={"12"} marginTop={2.5}>
            Spent
          </Text>
          <Text fontWeight={"bold"} fontSize={22} textAlign="center">
            <Entypo name="minus" size={22} color="black" />₹{" "}
            {expenseDetails.spent}
          </Text>
        </Box>
      </View>
    </Flex>
  );
};

export default OverviewBanner;
