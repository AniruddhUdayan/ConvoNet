import { styled } from "@mui/material";
import Link from "next/link";

export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: 1,
    whiteSpace: "nowrap",
    });


export const LinkComponent = styled(Link)`
text-decoration: none;
color:black;
padding:1rem;
&:hover{
    background-color: rgba(0,0,0,0.1);
}
`;