import { ethers } from 'ethers';
import Zero2HeroABI from './Zero2Hero.json'; // Make sure to have your ABI file

declare global {
  interface Window {
    ethereum: any;
  }
}

const contractAddress = '0x380AfAA5051cA3bbdE9c46Ff71A3204662346057';

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
export const claimReward = async (amount: string) => {
  try {
    const contract = getContractInstance();
    
    // Check if the user is eligible for the reward
    const signer = await contract.signer.getAddress();
    const isEligible = await contract.isEligibleForReward(signer);
    if (!isEligible) {
      throw new Error("User is not eligible for reward");
    }

    // Check user's balance
    const balance = await contract.balanceOf(signer);
    const amountBN = ethers.utils.parseUnits(amount, 18);
    if (balance.lt(amountBN)) {
      throw new Error(`Insufficient balance. Required: ${ethers.utils.formatUnits(amountBN, 18)} RWT, Available: ${ethers.utils.formatUnits(balance, 18)} RWT`);
    }

    // Estimate gas before sending the transaction
    const gasEstimate = await contract.estimateGas.claimReward(amountBN);
    
    // Add 20% buffer to gas estimate
    const gasLimit = gasEstimate.mul(120).div(100);

    const tx = await contract.claimReward(amountBN, { gasLimit });
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error claiming reward:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to claim reward: ${error.message}`);
    } else {
      throw new Error('Failed to claim reward: Unknown error');
    }
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

// Function to check if user is eligible for reward
export const isEligibleForReward = async (address: string) => {
  try {
    const contract = getContractInstance();
    return await contract.isEligibleForReward(address);
  } catch (error) {
    console.error('Error checking reward eligibility:', error);
    return false;
  }
};

// Function to update prices
export const updatePrices = async () => {
  try {
    const contract = getContractInstance();
    const tx = await contract.updatePrices();
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error updating prices:', error);
    return false;
  }
};

// Function to get unlock time
export const getUnlockTime = async () => {
  try {
    const contract = getContractInstance();
    const unlockTime = await contract.getUnlockTime();
    return unlockTime.toNumber();
  } catch (error) {
    console.error('Error getting unlock time:', error);
    return null;
  }
};

// Function to get owner
export const getOwner = async () => {
  try {
    const contract = getContractInstance();
    return await contract.getOwner();
  } catch (error) {
    console.error('Error getting owner:', error);
    return null;
  }
};

// Function to get upkeep contract
export const getUpkeepContract = async () => {
  try {
    const contract = getContractInstance();
    return await contract.getUpkeepContract();
  } catch (error) {
    console.error('Error getting upkeep contract:', error);
    return null;
  }
};

// Function to run lottery
export const runLottery = async () => {
  try {
    const contract = getContractInstance();
    const tx = await contract.runLottery();
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error running lottery:', error);
    return false;
  }
};

// Function to get last lottery winner
export const getLastWinner = async () => {
  try {
    const contract = getContractInstance();
    return await contract.lastWinner();
  } catch (error) {
    console.error('Error getting last winner:', error);
    return null;
  }
};

// Function to calculate dynamic reward
export const calculateDynamicReward = async (baseAmount: ethers.BigNumber) => {
  try {
    const contract = getContractInstance();
    const reward = await contract.calculateDynamicReward(baseAmount);
    return ethers.utils.formatUnits(reward, 18); // Assuming 18 decimals, adjust if different
  } catch (error) {
    console.error('Error calculating dynamic reward:', error);
    return null;
  }
};

// Function to check upkeep
export const checkUpkeep = async () => {
  try {
    const contract = getContractInstance();
    const [upkeepNeeded, performData] = await contract.checkUpkeep('0x');
    return { upkeepNeeded, performData };
  } catch (error) {
    console.error('Error checking upkeep:', error);
    return null;
  }
};

// Function to connect wallet
export const connectWallet = async (): Promise<string> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return address;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw new Error('Failed to connect wallet');
    }
  } else {
    throw new Error('Please install MetaMask!');
  }
};

// Function to get token balance
export const getTokenBalance = async (address: string): Promise<string> => {
  try {
    const contract = getContractInstance();
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatUnits(balance, 18); // Assuming 18 decimals, adjust if different
  } catch (error) {
    console.error('Error getting token balance:', error);
    throw new Error('Failed to get token balance');
  }
};

// Function to mint RWT tokens (actually claiming reward)
export const mintRWT = async (address: string, amount: string) => {
  try {
    const contract = getContractInstance();
    const amountBN = ethers.utils.parseUnits(amount, 18);
    const tx = await contract.claimReward(amountBN);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error claiming RWT:', error);
    throw new Error('Failed to claim RWT tokens');
  }
};

// Add more functions as needed for other contract interactions