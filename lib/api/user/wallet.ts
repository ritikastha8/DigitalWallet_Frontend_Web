import axios from "../axios"; // your axios instance
import { API } from "../endpoints";

// Load money from bank to wallet
export const loadMoney = async (payload: {
  mobileNumber: string;
  amount: number;
  remarks?: string;
}) => {
  try {
    const response = await axios.post(API.USER.WALLET.LOAD, payload);
    return response.data; // { success, message, data }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to load money"
    );
  }
};

// Send money from wallet to another user
export const sendMoney = async (payload: {
  toMobileNumber: string;
  amount: number;
  remarks?: string;
}) => {
  try {
    const response = await axios.post(API.USER.WALLET.TRANSFER, payload);
    return response.data; // { success, message, data: { balance, transactions } }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to send money"
    );
  }
};

// Wallet topup (deduct from wallet only)
export const topup = async (payload: {
  toMobileNumber: string;
  amount: number;
  remarks?: string;
}) => {
  try {
    const response = await axios.post(API.USER.WALLET.TOPUP, payload);
    return response.data; // { success, message, data: { amount, balance } }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Wallet topup failed"
    );
  }
};



// Link bank account
export const linkBank = async (data: {
  bankName: string;
  accountNumber: string;
}) => {
  try {
    const response = await axios.post(API.USER.WALLET.LINK_BANK, data);
    return response.data; // { success, message, bank }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to link bank"
    );
  }
};

// Login to bank account
export const loginBank = async (payload: {
  mobileNumber: string;
  password: string;
}) => {
  try {
    const response = await axios.post(API.USER.WALLET.LOGIN_BANK, payload);
    return response.data; // { success, message, bank }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to login bank"
    );
  }
};

// Get wallet info 
export const getWalletInfo = async () => {
  try {
    const response = await axios.get(API.USER.WALLET.INFO);
    return response.data; // { success, data: { balance, linkedBanks, transactions } }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch wallet info"
    );
  }
};

export const getTransactions = async () => {
  try {
    const response = await axios.get(API.USER.WALLET.TRANSACTION);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to fetch transactions");
  }
};
