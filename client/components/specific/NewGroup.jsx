import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { sampleUsers } from "@/constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useAvailableFriendsQuery, useNewGroupMutation } from "@/redux/api/api";
import { useAsyncMutation, useErrors } from "@/hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewGroup } from "@/redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const {isNewGroup} = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup , isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const errors = [
    {
      isError: isError,
      error: error,
    },
  ];
  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const submitHandler = () => {
    if(!groupName.value) return toast.error("Group name is required");
    if(selectedMembers.length < 2) return toast.error("Add atleast 3 member");
    newGroup("Creating New Group...",{name:groupName.value, members:selectedMembers})
    dispatch(setIsNewGroup(false));
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  const groupName = useInputValidation("");

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack direction={"column"} justifyContent={"space-between"}>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error" size="large" onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler} disabled={isLoadingNewGroup}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
