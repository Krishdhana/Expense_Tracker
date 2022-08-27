import { Actionsheet, Box, Center, Icon, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const ExpenseItemActionSheet = (props) => {
  const actionSheetClose = (option) => {
    if (option) props.getSelectedAction(option);
    props.closeActionSheet(false);
  };

  const actionSheetOptions = [
    {
      title: "View",
      icon: <FontAwesome5 name="eye" size={20} color="black" />,
      onPress: () => actionSheetClose(1),
    },
    {
      title: "Edit",
      icon: <FontAwesome name="edit" size={20} color="black" />,
      onPress: () => actionSheetClose(2),
    },
    {
      title: "Delete",
      icon: <AntDesign name="delete" size={20} color="black" />,
      onPress: () => actionSheetClose(3),
    },
  ];

  return (
    <Actionsheet
      isOpen={props.open}
      size="full"
      onClose={() => {
        actionSheetClose(0);
      }}
    >
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Center
            fontSize="16"
            color="gray.500"
            _dark={{
              color: "gray.300",
            }}
          >
            {props.selectedExpense?.item?.name || "Default"}
          </Center>
        </Box>
        {actionSheetOptions.map((opt, idx) => (
          <Actionsheet.Item
            key={idx}
            onPress={opt.onPress}
            startIcon={opt.icon}
          >
            {opt.title}
          </Actionsheet.Item>
        ))}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default ExpenseItemActionSheet;
