import React, { useEffect, useState } from 'react';
import axios from 'axios';

const COIN_PACKS = [10, 20, 50];

const iconStyle = {
  fontSize: '1.1em',
  marginRight: '0.5em',
  verticalAlign: 'middle',
};

export default function Wallet() {
  const [coins, setCoins] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWallet = () => {
    axios.get('http://localhost:4000/api/wallet').then(res => {
      setCoins(res.data.coins);
      setTransactions(res.data.transactions);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchWallet();
    window.addEventListener('walletUpdate', fetchWallet);
    return () => window.removeEventListener('walletUpdate', fetchWallet);
  }, []);

  const handleRecharge = async (amount) => {
    await axios.post('http://localhost:4000/api/wallet/recharge', { amount });
    fetchWallet();
    window.dispatchEvent(new Event('walletUpdate'));
  };

  if (loading) return <div>Loading wallet...</div>;

  return (
    <div className="wallet">
      <div className="wallet-header">
        <span>Wallet: <b>{coins} coins</b></span>
        <div className="recharge">
          {COIN_PACKS.map(pack => (
            <button key={pack} onClick={() => handleRecharge(pack)}>
              +{pack}
            </button>
          ))}
        </div>
      </div>
      <div className="transactions">
        <h4>Transaction History</h4>
        <ul>
          {transactions.slice(0, 5).map(tx => (
            <li key={tx.id} className={`tx-item ${tx.type}`}>
              <span className="tx-icon" aria-label={tx.type === 'credit' ? 'Credit' : 'Debit'}>
                {tx.type === 'credit' ? '✔️' : '🔻'}
              </span>
              <span className="tx-desc">{tx.desc}</span>
              <span className="tx-amount">{tx.type === 'credit' ? '+' : '-'}{tx.amount}</span>
              <span className="tx-date">{new Date(tx.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 