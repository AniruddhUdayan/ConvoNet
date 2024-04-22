"use client";
import ConfirmDeleteDialog from "@/components/dialogs/ConfirmDeleteDialog";
import AddMemberDialog from "@/components/dialogs/AddMemberDialog";
import AvatarCard from "@/components/shared/AvatarCard";
import { LinkComponent } from "@/components/styles/StyledComponents";
import { bgGradient, mattBlack, orange } from "@/constants/color";
import { sampleChats, sampleUsers } from "@/constants/sampleData";
import {
  Add,
  Delete,
  Done,
  Edit,
  KeyboardBackspace,
  Menu,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Tooltip,
  Stack,
  Typography,
  TextField,
  Button,
  Backdrop,
} from "@mui/material";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { memo } from "react";
import UserItem from "@/components/shared/UserItem";
import {
  useChatDetailsQuery,
  useMyGroupsQuery,
  useRenameGroupMutation,
} from "@/redux/api/api";
import { useAsyncMutation, useErrors } from "@/hooks/hook";
import { Loaders } from "@/components/layout/Loaders";
import { useParams, useSearchParams } from "next/navigation";

const isAddMember = false;

const page = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [members, setMembers] = useState({});

  const chatId = useSearchParams().get("group");
  

  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery(
    {
      chatId,
      populate: true,
    },
    { skip: !chatId }
  );
  const [renameGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileclose = () => {
    setIsMobileMenuOpen(false);
  };
  const updateGroupName = () => {
    setIsEdit(false);
    renameGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };
  const openAddMemberHandler = () => {};
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  const deleteHandler = () => {
    closeConfirmDeleteHandler();
  };
  const removeMemberHandler = (id) => {};
  useEffect(() => {
    if (groupDetails?.data) {
      setGroupName(groupDetails?.data?.chat?.name);
      setGroupNameUpdatedValue(groupDetails?.data?.chat?.name);
      setMembers(groupDetails?.data?.chat?.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails?.data]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        {" "}
        <IconButton onClick={handleMobile}>
          <Menu />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <div>
          <Link href="/">
            {" "}
            <IconButton
              sx={{
                position: "absolute",
                top: "2rem",
                left: "2rem",
                bgcolor: mattBlack,
                color: "white",
                ":&hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                  color: "black",
                },
              }}
            >
              <KeyboardBackspace />
            </IconButton>
          </Link>
        </div>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant={"h4"}>{groupName}</Typography>
          <IconButton
            onClick={() => setIsEdit(true)}
            disabled={isLoadingGroupName}
          >
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<Delete />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<Add />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <Loaders />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {members.map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  isAdded
                  styling={{
                    boxShadow: `0 0  0.5rem rgba(0,0,0,0.2)`,
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileclose}
      >
        {" "}
        <GroupsList
          w={"50vw"}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  console.log(myGroups, "myGroups"),
  (
    <Stack
      width={w}
      sx={{
        backgroundImage: bgGradient,
        height: "100vh",
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => {
          return (
            <GroupListItem key={group._id} group={group} chatId={chatId} />
          );
        })
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      )}
    </Stack>
  )
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  console.log(group, "group");

  return (
    <LinkComponent
      href={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </LinkComponent>
  );
});

export default page;
