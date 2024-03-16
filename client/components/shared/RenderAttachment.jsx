import { transformImage } from "@/lib/features";
import { FileOpen } from "@mui/icons-material";
import React from "react";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
    return  <video src={url} controls preload="none" width={"200px"} />;
    
    case "image":
    return <img
        src={transformImage(url, 200)}
        alt="attachment"
        width={"200px"}
        height={"150px"}
        style={{
          objectFit: "contain",
        }}
      />;
     
    case "audio":
     return <audio src={url} preload="none" controls />;
     
    default:
      <FileOpen />;
  }
};

export default RenderAttachment;
