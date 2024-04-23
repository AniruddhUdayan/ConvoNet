import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React , {useState} from "react";
import UserItem from "../shared/UserItem";
import { useAsyncMutation, useErrors } from "@/hooks/hook";
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "@/redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "@/redux/reducers/misc";

const AddMemberDialog = ({  chatId }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch=useDispatch();

  const {isAddMember} = useSelector((state) => state.misc);

  const {isLoading , data , isError , error} = useAvailableFriendsQuery(chatId);
console.log(data);
  const [addMember,  isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMember("Adding Members...",{members:selectedMembers, chatId})
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };


  useErrors([{isError,error}]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {data?.friends?.length > 0 ? (
            data?.friends?.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              ></UserItem>
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends </Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          {" "}
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
