"use client";
import React from "react";
import styled from "styled-components";

const PayoutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
`;

const PayoutItem = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 18px 24px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(245, 158, 11, 0.2);
    transform: translateX(5px);
  }

  .user {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .name-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .name {
    font-weight: 800;
    font-size: 0.95rem;
    color: #fff;
  }

  .verified-tag {
    font-size: 0.55rem;
    background: rgba(76, 209, 55, 0.1);
    color: #4cd137;
    padding: 1px 6px;
    border-radius: 4px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .phone {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 600;
  }

  .amount {
    text-align: right;
  }

  .value {
    display: block;
    color: #4cd137;
    font-weight: 950;
    font-size: 1.1rem;
    letter-spacing: -0.5px;
  }

  .time {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.3);
    font-weight: 800;
    text-transform: uppercase;
  }
`;

const TransactionID = styled.div`
  font-size: 0.55rem;
  color: rgba(255, 255, 255, 0.3);
  font-family: 'JetBrains Mono', monospace;
  margin-top: 4px;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

interface Payout {
  id: number;
  phone: string;
  amount: number;
  time: string;
  txId: string;
}

interface PayoutFeedProps {
  payouts: Payout[];
}

const PayoutFeed = ({ payouts }: PayoutFeedProps) => {
  return (
    <PayoutList>
      {payouts.map((payout) => (
        <PayoutItem key={payout.id}>
          <div className="user">
            <div className="name-row">
              <span className="name">User ***{payout.phone.slice(-3)}</span>
              <span className="verified-tag">Verified</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="phone">Secured Transaction</span>
              <TransactionID>{payout.txId}</TransactionID>
            </div>
          </div>
          <div className="amount">
            <span className="value">KES {payout.amount.toLocaleString()}</span>
            <span className="time">{payout.time}</span>
          </div>
        </PayoutItem>
      ))}
    </PayoutList>
  );
};

export default PayoutFeed;
