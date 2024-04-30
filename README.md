# ConvoNet

ConvoNet is a comprehensive chat platform designed for seamless communication and effective group management. It provides a robust set of features that cater to individual users and groups, ensuring a smooth and interactive messaging experience. The application is built using NextJs for client and NodeJs for server to provide high performance and reliability.

## Features

### User Account Management
- **User Registration/Login:** Users can register and log in using a username to access the application.
- **Friend System:** Users can search for other users and send friend requests.
- **Notifications:** Users receive real-time notifications about friend requests and other important activities.

### Messaging
- **Chat List:** Users can view a list of all active chats with friends and groups.
- **Direct Messaging:** Support for sending and receiving messages and attachments in private chats.
- **Group Chat:** Users can create group chats with 3 to 100 members, facilitating community discussions and collaborations.
- **Group Management:**
  - **Rename Group:** Group admins have the ability to change the group name.
  - **Manage Members:** Admins can add or remove members from the group.
  - **Delete Group:** Admins have the authority to delete the group entirely.
  - **Admin Transition:** If the group admin leaves, a new admin is automatically assigned.
  - **Leave Group:** Members can choose to leave the group at any time.

### Advanced Features
- **User Interaction:** Users have the ability to delete individual chats or unfriend users, maintaining control over their interaction space.
- **Admin Dashboard:** An exclusive dashboard accessible only with a secret key, allowing admins to view all users, messages, and chat statistics to manage the platform effectively.

## Installation

Follow these steps to set up and run the ChatApp on your local machine:

1. **Clone the Project**
   - Clone this repository to your local machine using:
     ```
     git clone https://github.com/yourusername/yourprojectname.git
     ```

2. **Install Dependencies**
   - Navigate to the client directory:
     ```
     cd yourprojectname/client
     npm install
     ```
   - Navigate to the server directory:
     ```
     cd yourprojectname/server
     npm install
     ```

3. **Running the Application**
   - To run the client application, use the following command from the client directory:
     ```
     npm run dev
     ```
   - To run the server, switch to the server directory and type:
     ```
     npm start
     ```

These steps will get your application running on your local development environment. Adjust paths as necessary based on your project's specific directory structure.
## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
