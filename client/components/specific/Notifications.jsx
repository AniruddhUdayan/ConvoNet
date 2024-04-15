import { sampleNotifications } from "@/constants/sampleData";
import { useErrors } from "@/hooks/hook";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "@/redux/api/api";
import { setIsNotification } from "@/redux/reducers/misc";
import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  ListItem,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Notifications = () => {

  const dispatch = useDispatch();

  const {isNotification} = useSelector((state) => state.misc);

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if(res.data?.success){
        toast.success(res.data.message);
      }else{
        toast.error(res?.data?.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error?.data?.error || 'Something went wrong');
    }
  };

  useErrors([{ error }]);

  const closeHandler = () => {
    dispatch(setIsNotification(false));
  }


  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {" "}
            {data?.requests?.length > 0 ? (
              data?.requests?.map((notification) => (
                <NotificationItem
                  sender={notification.sender}
                  _id={notification._id}
                  handler={friendRequestHandler}
                  key={notification._id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} 
          friend request`}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
