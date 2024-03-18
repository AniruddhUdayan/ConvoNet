"use client";
import AvatarCard from "@/components/shared/AvatarCard";
import Table from "@/components/shared/Table";
import { Avatar, Stack } from "@mui/material";
import React, { useState } from "react";

const columns = [{
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200,
},
{
  field:"avatar",
  headerName:"Avatar",
  headerClassName:"table-header",
  width:150,
  renderCell:(params) => (
    <Avatar alt={params.row.name} src={params.row.avatar}/>
  )
},
{
  field:"name",
  headerName:"Name",
  headerClassName:"table-header",
  width:300,
},
{
  field:"totalMembers",
  headerName:"Total Members",
  headerClassName:"table-header",
  width:120,
},
{
  field:"members",
  headerName:"Members",
  headerClassName:"table-header",
  width:400,
  renderCell:(params) => (
    <AvatarCard max={100} avatar={params.row.members} />
  )
},
{
  field:"totalMessages",
  headerName:"Total Messages",
  headerClassName:"table-header",
  width:120,
},
{
  field:"creator",
  headerName:"Created By",
  headerClassName:"table-header",
  width:250,
  renderCell:(params) => (
    <Stack direction="row" alignItems="center" spacing={"1rem"}>
      <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
      <span>{params.row.creator.name}</span>
    </Stack>
  )
}
]

const page = () => {
  const [rows, setRows] = useState([]);

  return (
    <>
      <Table heading={"Chats"} columns={columns} rows={rows} />
    </>
  );
};

export default page;
