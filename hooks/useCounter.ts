import { cofhejs, Encryptable, FheTypes } from "cofhejs/web";
import { ethers } from "ethers";
import { useState } from "react";

const CONTRACT_ABI = [
  "function count() view returns (uint256)",
  "function increment() public",
  "function decrement() public", 
  "function reset(tuple(bytes data, bytes signature) value) public",
  "function decryptCounter() public",
  "function getDecryptedValue() view returns (uint256)"
];

export function useCounter(contractAddress: string) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize cofhejs
  const initialize = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const result = await cofhejs.initializeWithEthers({
      ethersProvider: provider,
      ethersSigner: signer,
      environment: "TESTNET"
    });
    
    if (result.success) setIsInitialized(true);
    return result;
  };

  // Increment counter
  const increment = async () => {
    setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
    
    const tx = await contract.increment();
    await tx.wait();
    setLoading(false);
  };

  // Decrement counter
  const decrement = async () => {
    setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
    
    const tx = await contract.decrement();
    await tx.wait();
    setLoading(false);
  };

  // Reset with encrypted value
  const reset = async (value: bigint) => {
    setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);

    // Encrypt the value
    const encryptResult = await cofhejs.encrypt(
      [Encryptable.uint32(value)],
      (state) => console.log(`Encrypting: ${state}`)
    );

    if (!encryptResult.success) {
      console.error("Encryption failed:", encryptResult.error);
      setLoading(false);
      return;
    }

    const tx = await contract.reset(encryptResult.data[0]);
    await tx.wait();
    setLoading(false);
  };

  // Decrypt and get value
  const getDecryptedValue = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);

    // Request on-chain decryption
    const tx = await contract.decryptCounter();
    await tx.wait();

    // Wait and fetch decrypted value
    const value = await contract.getDecryptedValue();
    return value;
  };

  return { initialize, increment, decrement, reset, getDecryptedValue, isInitialized, loading };
}

