'use client'
import Table from '@/components/shared/Table'
import { useErrors } from '@/hooks/hook'
import { Avatar } from '@mui/material'
import React,{useState} from 'react'
import { useFetchData } from '6pp'
import { useEffect } from 'react'
import { transformImage } from '@/lib/features'

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
  width:200,
},
{
  field:"username",
  headerName:"Username",
  headerClassName:"table-header",
  width:200,
},
{
  field:"friends",
  headerName:"Friends",
  headerClassName:"table-header",
  width:150,
},
{
  field:"groups",
  headerName:"Groups",
  headerClassName:"table-header",
  width:200,
}
]

const server = process.env.NEXT_PUBLIC_SERVER;

const page = () => {

  const [rows, setRows] = useState([])

  const { loading, data, error } = useFetchData(
    `${server}/admin/users`,
    "GET",
    "dashboard-users"
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
        data.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
        }))
      );
    }
  }, [data]);

  return (
   <>
    <Table heading={"All Users"} columns={columns} rows={rows}/>
   </>
  )
}

export default page
