import React, { useState, useEffect } from 'react';
import { claimReward, getLatestETHPrice, getStoredUSDValue } from '../utils/contractInteraction';
import { Button } from './ui/button';

export default function ContractInteraction() {
  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const [usdValue, setUsdValue] = useState<string | null>(null);
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const ethPriceValue = await getLatestETHPrice();
    setEthPrice(ethPriceValue);

    const usdStoredValue = await getStoredUSDValue();
    setUsdValue(usdStoredValue);
  };

  const handleClaimReward = async () => {
    setClaimStatus('Claiming...');
    const success = await claimReward();
    setClaimStatus(success ? 'Reward claimed successfully!' : 'Failed to claim reward.');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Contract Interaction</h2>
      <div className="mb-4">
        <p>Latest ETH Price: {ethPrice ? `$${ethPrice}` : 'Loading...'}</p>
        <p>Stored USD Value: {usdValue ? `$${usdValue}` : 'Loading...'}</p>
      </div>
      <Button onClick={handleClaimReward}>Claim Reward</Button>
      {claimStatus && <p className="mt-2">{claimStatus}</p>}
      <Button onClick={fetchPrices} className="mt-2">Refresh Prices</Button>
    </div>
  );
}