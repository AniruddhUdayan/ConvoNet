"use client";
import { useFetchData } from "6pp";
import AvatarCard from "@/components/shared/AvatarCard";
import Table from "@/components/shared/Table";
import { useErrors } from "@/hooks/hook";
import { transformImage } from "@/lib/features";
import { Avatar, Stack } from "@mui/material";
import React, { useState , useEffect } from "react";

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
  field: "groupChat",
  headerName: "Group",
  headerClassName: "table-header",
  width: 100,
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

const server = process.env.NEXT_PUBLIC_SERVER;

const page = () => {
  const [rows, setRows] = useState([]);

  const { loading, data, error } = useFetchData(
    `${server}/admin/chats`,
    "GET",
    "dashboard-chats"
  );

  console.log(data);

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  useEffect(() => {
    if (data) {
      setRows(
        data?.chats?.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar.map((i) => transformImage(i, 50)),
          members: i.members.map((i) => transformImage(i.avatar, 50)),
          creator: {
            name: i.creator.name,
            avatar: transformImage(i.creator.avatar, 50),
          },
        }))
      );
    }
  }, [data]);

  return (
    <>
      <Table heading={"Chats"} columns={columns} rows={rows} />
    </>
  );
};

export default page;
