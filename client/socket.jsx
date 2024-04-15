import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";

const server = process.env.NEXT_PUBLIC_SERVER;

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };