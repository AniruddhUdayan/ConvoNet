import { transformImage } from "@/lib/features";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  admin,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={transformImage(avatar)} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrdinalGroup: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
        </Typography>
        {admin == name ? (
          <Typography
            variant="body2" // Changed from body1 to body2 to make text smaller
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrdinalGroup: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              fontStyle: "italic", // Added to make text italic
              color: "lightgray", // Changed to make text color lighter
            }}
          >
            admin
          </Typography>
        ) : null}

        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? <Remove /> : <Add />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
