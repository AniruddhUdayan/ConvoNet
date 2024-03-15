import { sampleNotifications } from '@/constants/sampleData'
import { Dialog, Stack , DialogTitle, Typography , ListItem , Avatar, Button } from '@mui/material'
import React, { memo } from 'react'

const Notifications = () => {
  const friendRequestHandler = ({_id , accept}) => {
    console.log(id);
  }
  return (
   <Dialog open>
    <Stack p={{xs:"1rem",sm:"2rem"}} maxWidth={"25rem"}>
      <DialogTitle>Notifications</DialogTitle>
      {sampleNotifications.length > 0 ? (
        sampleNotifications.map((notification) => (
          <NotificationItem
            sender={notification.sender}
            _id={notification._id}
            handler={friendRequestHandler}
            key={notification._id}
          />
        ))
      
      ) : <Typography textAlign={"center"}>No notifications</Typography>}
    </Stack>
   </Dialog>
  )
}

const NotificationItem = memo(({sender , _id , handler}) => {

  const {name , avatar} = sender;

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
      {`${name} sent you a friend request`}
      </Typography>
      <Stack direction={{
        xs:"column",
        sm:"row"
      }} 
      >
        <Button onClick={()=> handler({_id , accept:true})}>Accept</Button>
        <Button color='error' onClick={()=> handler({_id , accept:false})}>Reject</Button>
      </Stack>
    </Stack>
  </ListItem>
  )
})

export default Notifications
