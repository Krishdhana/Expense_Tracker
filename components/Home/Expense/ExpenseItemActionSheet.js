import { Actionsheet, Box, Icon, Text } from "native-base";

const ExpenseItemActionSheet = (props) => {
  const actionSheetClose = (option) => {
    if (option) props.getSelectedAction(option);
    props.onCloseActionSheet(false);
  };

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
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: "gray.300",
            }}
          >
            {props.selectedExpense?.item?.name || "Default"}
          </Text>
        </Box>
        <Actionsheet.Item
          onPress={() => actionSheetClose(1)}
          startIcon={
            <Icon color="trueGray.400" mr="1" size="6" name="delete" />
          }
        >
          View
        </Actionsheet.Item>
        <Actionsheet.Item
          onPress={() => actionSheetClose(2)}
          startIcon={<Icon name="share" color="trueGray.400" mr="1" size="6" />}
        >
          Update
        </Actionsheet.Item>
        <Actionsheet.Item
          onPress={() => actionSheetClose(3)}
          startIcon={
            <Icon name="play-circle" color="trueGray.400" mr="1" size="6" />
          }
        >
          Delete
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default ExpenseItemActionSheet;
