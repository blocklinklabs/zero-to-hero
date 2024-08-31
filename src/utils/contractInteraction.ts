import { ethers } from 'ethers';
import Zero2HeroABI from './Zero2Hero.json'; // Make sure to have your ABI file

declare global {
  interface Window {
    ethereum: any;
  }
}

const contractAddress = '0x46ca0e97De7866DC18Caa3E925C5D51D3586594E';

// Function to get the contract instance
const getContractInstance = () => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, Zero2HeroABI.abi, signer);
  }
  throw new Error('Please install MetaMask!');
};

// Function to claim reward
export const claimReward = async () => {
  try {
    const contract = getContractInstance();
    const tx = await contract.claimReward();
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error claiming reward:', error);
    return false;
  }
};

// Function to get latest ETH price
export const getLatestETHPrice = async () => {
  try {
    const contract = getContractInstance();
    const price = await contract.getLatestETHPrice();
    return ethers.utils.formatUnits(price, 8); // Assuming 8 decimals, adjust if different
  } catch (error) {
    console.error('Error getting ETH price:', error);
    return null;
  }
};

// Function to get stored USD value
export const getStoredUSDValue = async () => {
  try {
    const contract = getContractInstance();
    const value = await contract.storedUSDValue();
    return ethers.utils.formatUnits(value, 18); // Assuming 18 decimals, adjust if different
  } catch (error) {
    console.error('Error getting stored USD value:', error);
    return null;
  }
};

// Add more functions as needed for other contract interactions