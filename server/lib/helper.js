export const getOtherMembers = (members, userId) => 
    members.find(member => member._id.toString() !== userId.toString());
