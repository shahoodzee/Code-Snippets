import UserMessage from "../../models/userMessage.js";


export const IsOldUser = async (email) => {
    const oldUser = await UserMessage.findOne({ email });
    return oldUser == null;
};

export const getUserByEmail = async (email) => {
    try {
        const user = await UserMessage.findOne({ email });
        return user;
    } catch (error) {
        throw new Error('Error finding user by email');
    }
};

export const getUserByPhone = async (phone) => {
    try {
        const user = await UserMessage.findOne({ phone });
        return user;
    } catch (error) {
        throw new Error('Error finding user by phone');
    }
};