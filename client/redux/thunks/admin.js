// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const server = process.env.NEXT_PUBLIC_SERVER;

// const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
//   try {
//     const connfig = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       `${server}/admin/verify`,
//       { secretKey },
//       connfig
//     );

//     return data.message;
//   } catch (error) {
//     throw error.response.data.message;
//   }
// });

// export {adminLogin}