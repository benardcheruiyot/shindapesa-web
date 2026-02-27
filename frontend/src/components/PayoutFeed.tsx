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
  background: rgba(13, 21, 38, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 16px 20px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: rgba(13, 21, 38, 0.6);
    border-color: rgba(59, 130, 246, 0.2);
    transform: translateX(4px);
  }

  .user {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .name-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .name {
    font-weight: 700;
    font-size: 0.9rem;
    color: #f8fafc;
  }

  .verified-tag {
    font-size: 0.55rem;
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
    padding: 1px 6px;
    border-radius: 4px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .phone {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;
  }

  .amount {
    text-align: right;
  }

  .value {
    display: block;
    color: #22c55e;
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
  }

  .time {
    font-size: 0.65rem;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const TransactionID = styled.div`
  font-size: 0.55rem;
  color: #475569;
  font-family: inherit;
  margin-top: 2px;
  letter-spacing: 0.02em;
  font-weight: 500;
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
