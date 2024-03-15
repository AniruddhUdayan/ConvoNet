import React , {useState} from "react";
import {
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Button
} from "@mui/material";
import { sampleUsers } from "@/constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {

  const [members , setMembers] = useState(sampleUsers)
  const [selectedMembers , setSelectedMembers] = useState([])

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => 
    prev.includes(id) ? prev.filter((m) => m !== id) : [...prev , id]
    )
  };
  console.log(selectedMembers);

  const submitHandler = () => {
    console.log("Group Created");
  }

  const closeHandler = () => {}

  const groupName = useInputValidation("")

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography variant="body1">Members</Typography>
        <Stack direction={"column"} justifyContent={"space-between"}>
          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
