import { useInputValidation } from "6pp";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "@/constants/sampleData";
import {useSelector , useDispatch} from "react-redux";
import { setIsSearch } from "@/redux/reducers/misc";

const users = [1,2,3,4,5]

const Search = () => {
  const [users,setUsers] = useState(sampleUsers);
  const search = useInputValidation("");

  const dispatch = useDispatch();

const {isSearch} = useSelector(state => state.misc)

  let isLoadingSendFriendRequest = false;
  const addFriendHandler = (id) => {
    console.log(id);
  }

  const searchCloseHandler = () => dispatch(setIsSearch(false))

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {
            users.map((user)=>(
              <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest}/>
            ))
          }
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
