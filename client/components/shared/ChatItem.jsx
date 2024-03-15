import React, { memo } from 'react'
import { Link, LinkComponent } from '../styles/StyledComponents'
import { Stack, Typography , Box } from '@mui/material'
import AvatarCard from './AvatarCard'

const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessage,
    newMessageAlert,
    index=0,
    handleDeleteChat
}) => {
  return (
    <LinkComponent
    sx={{
        padding:"0",
    }}
     href={`/chat/${_id}`} onContextMenu={(e)=> handleDeleteChat(e, _id , groupChat)}>
        <div style={{
            display:"flex",
            gap:"1rem",
            alignItems:"center",
            padding:"1rem",
            backgroundColor: sameSender ? "black" : "unset",
            color: sameSender ? "white" : "unset",
            position:"relative",
            }}>
            <AvatarCard avatar={avatar}/>
            <Stack>
                <Typography>{name}</Typography>
                {
                    newMessageAlert && (
                        <Typography>{newMessageAlert.count} New Message</Typography>
                    )
                }
            </Stack>
            {
                isOnline && <Box sx={{
                    width:"0.5rem",
                    height:"0.5rem",
                    borderRadius:"50%",
                    backgroundColor:"green",
                    position:"absolute",
                    top:"50%",
                    right:"1rem",
                    transform:"translateY(-50%)"
                
                }} />
            }
        </div>
    </LinkComponent>
  )
}

export default memo(ChatItem)
