import UserMessage from "../../models/userMessage.js";
import express from 'express';
import mongoose from 'mongoose';

export const IsOldUser = async (email) => {
    try {
        const user = await UserMessage.findOne({ email });
        if(user == null)
            return false;
        else
            return true;
    } catch (error) {
        throw new Error('Error finding user by email');
    }
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

export const getUserById = async (id) => {
    try {
        const user = await UserMessage.findOne({ id });
        return user;
    } catch (error) {
        throw new Error('Error Fetching all Users');
    }
};

export const getAllUsers = async () => {
    try {
        const Users = await UserMessage.find();
        return Users;
    } catch (error) {
        throw new Error('Error Fetching all Users');
    }
}