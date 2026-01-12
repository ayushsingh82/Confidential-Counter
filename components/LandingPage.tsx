'use client';

import React, { useState, useEffect } from 'react';
import { ConnectButton, useAccount } from '@rainbow-me/rainbowkit';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import { useCounter } from '../hooks/useCounter';

// Contract address - update this with your deployed contract address
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

export default function LandingPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { isConnected } = useAccount();
  const [resetValue, setResetValue] = useState('');
  const [decryptedValue, setDecryptedValue] = useState<number | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [encryptionProgress, setEncryptionProgress] = useState<string>('');
  const [initError, setInitError] = useState<string | null>(null);

  const {
    initialize,
    increment,
    decrement,
    reset,
    getDecryptedValue,
    isInitialized,
    loading: counterLoading,
  } = useCounter(CONTRACT_ADDRESS);

  // Auto-initialize when wallet is connected
  useEffect(() => {
    if (isConnected && !isInitialized && window.ethereum) {
      initialize().catch((err: any) => {
        console.error('Initialization error:', err);
        setInitError(err?.message || 'Failed to initialize');
      });
    }
  }, [isConnected, isInitialized, initialize]);

  // Read encrypted counter value (simulated)
  const readCounterEncryptedValue = async () => {
    if (!initialized) {
      setError('Please connect wallet first');
      return;
    }
    try {
      setLoading('Reading counter...');
      setError(null);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDecryptedValue(prev => prev !== null ? prev : 0);
    } catch (err: any) {
      console.error('Error reading encrypted counter:', err);
      setError(err?.message || 'Failed to read counter');
    } finally {
      setLoading(null);
    }
  };

  // Increment the counter
  const incrementCounter = async () => {
    if (!initialized) {
      setError('Please connect wallet first');
      return;
    }
    try {
      setLoading('Incrementing counter...');
      setError(null);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDecryptedValue(prev => (prev !== null ? prev + 1 : 1));
    } catch (err: any) {
      console.error('Error incrementing counter:', err);
      setError(err?.message || 'Failed to increment counter');
    } finally {
      setLoading(null);
    }
  };

  // Decrement the counter
  const decrementCounter = async () => {
    if (!initialized) {
      setError('Please connect wallet first');
      return;
    }
    try {
      setLoading('Decrementing counter...');
      setError(null);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDecryptedValue(prev => (prev !== null ? prev - 1 : -1));
    } catch (err: any) {
      console.error('Error decrementing counter:', err);
      setError(err?.message || 'Failed to decrement counter');
    } finally {
      setLoading(null);
    }
  };

  // Decrypt counter on-chain
  const decryptCounter = async () => {
    if (!initialized) {
      setError('Please connect wallet first');
      return;
    }
    try {
      setLoading('Decrypting counter...');
      setError(null);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDecryptedValue(prev => prev !== null ? prev : 0);
    } catch (err: any) {
      console.error('Error decrypting counter:', err);
      setError(err?.message || 'Failed to decrypt counter');
    } finally {
      setLoading(null);
    }
  };

  // Reset counter with encrypted value
  const handleResetCounter = async () => {
    if (!resetValue || isNaN(Number(resetValue))) {
      setError('Please enter a valid number');
      return;
    }
    if (!initialized) {
      setError('Please connect wallet first');
      return;
    }
    try {
      setLoading('Resetting counter...');
      setError(null);
      setEncryptionProgress('Encrypting...');
      // Simulate encryption
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDecryptedValue(Number(resetValue));
      setResetValue('');
      setEncryptionProgress('');
    } catch (err: any) {
      console.error('Error:', err);
      setError(err?.message || 'Failed to reset counter');
      setLoading(null);
      setEncryptionProgress('');
    }
  };

  // Handle button clicks
  const handleAction = async (action: string) => {
    switch (action) {
      case 'Increment':
        await incrementCounter();
        break;
      case 'Decrement':
        await decrementCounter();
        break;
      case 'Decrypt':
        await decryptCounter();
        break;
      default:
        break;
    }
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center p-8 relative overflow-hidden ${
        isLight ? 'bg-white text-[#011623]' : 'bg-[#0A0A0A] text-gray-100'
      }`}
    >
      <ThemeToggle />

      {/* Left / Right gradients for dark theme */}
      {!isLight && (
        <>
          <div className="absolute left-0 top-0 w-[77px] md:w-[307px] h-full bg-gradient-to-r from-[#CC4420]/50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-[77px] md:w-[307px] h-full bg-gradient-to-l from-[#CC4420]/50 to-transparent pointer-events-none"></div>
        </>
      )}

      <div className="max-w-4xl mx-auto text-center z-10 relative w-full">
        <h1
          className={`text-5xl md:text-7xl font-semibold font-serif mb-6 leading-tight ${
            isLight ? 'text-[#011623]' : 'text-white'
          }`}
        >
          Encrypted Counter{' '}
          <span
            className={`px-2 ${
              isLight
                ? 'bg-[#03D9DC] text-[#011623]'
                : 'bg-[#CC4420] text-white'
            }`}
          >
            {' '}
            powered by Fhenix{' '}
          </span>
        </h1>
        <p
          className={`text-lg md:text-xl max-w-3xl mx-auto mb-10 ${
            isLight ? 'text-zinc-600' : 'text-zinc-400'
          }`}
        >
          Privacy-preserving counter with increment, decrement, reset, and
          decrypt functionalities
        </p>
        <div
          className={`max-w-2xl mx-auto border rounded-sm p-8 relative ${
            isLight
              ? 'border-[#03D9DC] bg-white'
              : 'border-zinc-700 bg-zinc-900/50'
          }`}
        >
          {/* Card corner decorations */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
            corner => (
              <div
                key={corner}
                className={`absolute ${
                  corner.includes('top') ? 'top-0' : 'bottom-0'
                } ${
                  corner.includes('left') ? 'left-0' : 'right-0'
                } w-2 h-2 border ${
                  corner.includes('left') ? 'border-l-[3px]' : 'border-r-[3px]'
                } ${
                  corner.includes('top') ? 'border-t-[2px]' : 'border-b-[2px]'
                } z-10 ${
                  isLight ? 'border-[#03D9DC]' : 'border-[#CC4420]'
                }`}
              ></div>
            )
          )}

          <div className="space-y-6 relative">
            {/* Wallet Connect */}
            <div className="space-y-2 text-left">
              <label
                className={`text-sm font-semibold ${
                  isLight ? 'text-[#011623]' : 'text-white'
                }`}
              >
                Wallet
              </label>
              <ConnectButton />
              {initError && (
                <p
                  className={`text-sm mt-2 ${
                    isLight ? 'text-red-600' : 'text-red-400'
                  }`}
                >
                  {initError}
                </p>
              )}
              {!initialized && !initError && (
                <p
                  className={`text-sm mt-2 ${
                    isLight ? 'text-zinc-500' : 'text-zinc-400'
                  }`}
                >
                  Connect wallet to interact with the counter
                </p>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div
                className={`p-3 rounded-sm border ${
                  isLight
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-red-900/20 border-red-800 text-red-400'
                }`}
              >
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Loading/Progress Display */}
            {(loading || encryptionProgress) && (
              <div
                className={`p-3 rounded-sm border ${
                  isLight
                    ? 'bg-blue-50 border-blue-200 text-blue-800'
                    : 'bg-blue-900/20 border-blue-800 text-blue-400'
                }`}
              >
                <p className="text-sm">{loading || encryptionProgress}</p>
              </div>
            )}

            {/* Counter Display */}
            <div className="space-y-2">
              <label
                className={`block text-left text-sm font-semibold ${
                  isLight ? 'text-[#011623]' : 'text-white'
                }`}
              >
                Decrypted Counter Value
              </label>
              <div
                className={`w-full px-4 py-6 border rounded-sm font-mono text-3xl ${
                  isLight
                    ? 'border-[#03D9DC] bg-white text-[#011623]'
                    : 'border-zinc-700 bg-zinc-800 text-white'
                }`}
              >
                {decryptedValue !== null ? decryptedValue : '—'}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {['Increment', 'Decrement', 'Decrypt'].map(action => (
                <button
                  key={action}
                  onClick={() => handleAction(action)}
                  disabled={!initialized || !!loading}
                  className={`relative w-full h-12 border rounded-sm font-semibold text-lg flex items-center justify-center transition-all ${
                    !initialized || loading
                      ? 'opacity-50 cursor-not-allowed'
                      : isLight
                        ? 'border-[#03D9DC] text-[#011623] hover:bg-[#03D9DC]/10 active:bg-[#03D9DC]/20'
                        : 'border-zinc-700 text-white hover:bg-[#CC4420]/10 active:bg-[#CC4420]/20'
                  }`}
                >
                  {/* Button corner decorations */}
                  {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
                    corner => (
                      <div
                        key={corner}
                        className={`absolute ${
                          corner.includes('top') ? 'top-0' : 'bottom-0'
                        } ${
                          corner.includes('left') ? 'left-0' : 'right-0'
                        } w-2 h-2 border ${
                          corner.includes('left')
                            ? 'border-l-[3px]'
                            : 'border-r-[3px]'
                        } ${
                          corner.includes('top')
                            ? 'border-t-[2px]'
                            : 'border-b-[2px]'
                        } z-10 ${
                          isLight ? 'border-[#03D9DC]' : 'border-[#CC4420]'
                        }`}
                      ></div>
                    )
                  )}
                  {loading === `${action.toLowerCase()}ing counter...`
                    ? '...'
                    : action}
                </button>
              ))}
            </div>

            {/* Read Encrypted Value Button */}
            <button
              onClick={readCounterEncryptedValue}
              disabled={!initialized || !!loading}
              className={`relative w-full h-12 border rounded-sm font-semibold text-lg flex items-center justify-center transition-all ${
                !initialized || loading
                  ? 'opacity-50 cursor-not-allowed'
                  : isLight
                    ? 'border-[#03D9DC] text-[#011623] hover:bg-[#03D9DC]/10 active:bg-[#03D9DC]/20'
                    : 'border-zinc-700 text-white hover:bg-[#CC4420]/10 active:bg-[#CC4420]/20'
              }`}
            >
              {/* Button corner decorations */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
                corner => (
                  <div
                    key={corner}
                    className={`absolute ${
                      corner.includes('top') ? 'top-0' : 'bottom-0'
                    } ${
                      corner.includes('left') ? 'left-0' : 'right-0'
                    } w-2 h-2 border ${
                      corner.includes('left') ? 'border-l-[3px]' : 'border-r-[3px]'
                    } ${
                      corner.includes('top') ? 'border-t-[2px]' : 'border-b-[2px]'
                    } z-10 ${
                      isLight ? 'border-[#03D9DC]' : 'border-[#CC4420]'
                    }`}
                  ></div>
                )
              )}
              {loading === 'Reading counter...' ? 'Reading...' : 'Read Encrypted Value'}
            </button>

            {/* Reset Counter */}
            <div className="space-y-2">
              <label
                className={`block text-left text-sm font-semibold ${
                  isLight ? 'text-[#011623]' : 'text-white'
                }`}
              >
                Reset Counter
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={resetValue}
                  onChange={e => setResetValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleResetCounter()}
                  placeholder="New value"
                  disabled={!initialized || !!loading}
                  className={`flex-1 px-4 py-3 border rounded-sm font-mono text-sm ${
                    !initialized || loading
                      ? 'opacity-50 cursor-not-allowed'
                      : isLight
                        ? 'border-[#03D9DC] bg-white text-[#011623] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#03D9DC]'
                        : 'border-zinc-700 bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#CC4420]'
                  }`}
                />
                <button
                  onClick={handleResetCounter}
                  disabled={!initialized || !!loading || !resetValue}
                  className={`relative w-32 h-12 border rounded-sm font-semibold text-lg flex items-center justify-center transition-all ${
                    !initialized || loading || !resetValue
                      ? 'opacity-50 cursor-not-allowed'
                      : isLight
                        ? 'border-[#03D9DC] text-[#011623] hover:bg-[#03D9DC]/10 active:bg-[#03D9DC]/20'
                        : 'border-zinc-700 text-white hover:bg-[#CC4420]/10 active:bg-[#CC4420]/20'
                  }`}
                >
                  {/* Button corner decorations */}
                  {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
                    corner => (
                      <div
                        key={corner}
                        className={`absolute ${
                          corner.includes('top') ? 'top-0' : 'bottom-0'
                        } ${
                          corner.includes('left') ? 'left-0' : 'right-0'
                        } w-2 h-2 border ${
                          corner.includes('left')
                            ? 'border-l-[3px]'
                            : 'border-r-[3px]'
                        } ${
                          corner.includes('top')
                            ? 'border-t-[2px]'
                            : 'border-b-[2px]'
                        } z-10 ${
                          isLight ? 'border-[#03D9DC]' : 'border-[#CC4420]'
                        }`}
                      ></div>
                    )
                  )}
                  {loading === 'Resetting counter...' ? '...' : 'Reset'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark theme background glows */}
      {!isLight && (
        <>
          <div className="absolute w-96 h-96 bg-[#CC4420]/30 rounded-full blur-3xl opacity-60 bottom-10 left-10 animate-pulse pointer-events-none"></div>
          <div className="absolute w-96 h-96 bg-[#CC4420]/25 rounded-full blur-3xl opacity-50 top-10 right-10 animate-pulse pointer-events-none"></div>
        </>
      )}
    </section>
  );
}

