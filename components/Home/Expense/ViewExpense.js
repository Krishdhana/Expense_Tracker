import moment from "moment";
import { Box, Button, HStack, Text } from "native-base";
import { AlertDialog } from "native-base";

const ViewExpense = ({ open, close, selectedExpense }) => {
  return (
    <AlertDialog isOpen={open} onClose={() => close(false)}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header> Expense Details </AlertDialog.Header>
        <AlertDialog.Body>
          <Box>
            <HStack my={1}>
              <Text fontWeight={"bold"}> Expense Name : </Text>
              <Text> {selectedExpense.item?.name} </Text>
            </HStack>
            <HStack my={1}>
              <Text fontWeight={"bold"}> Amount : </Text>
              <Text> ₹ {selectedExpense.item?.amount} </Text>
            </HStack>
            <HStack my={1}>
              <Text fontWeight={"bold"}> Expense Name : </Text>
              <Text>
                {moment(selectedExpense.item?.date).format("DD MMM YYYY")}
              </Text>
            </HStack>
          </Box>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button onPress={() => close(false)} variant="ghost">
              Close
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ViewExpense;
