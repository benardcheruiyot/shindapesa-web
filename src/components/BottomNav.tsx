"use client";
import React from "react";
import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(13, 21, 38, 0.85);
  backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 8px 10px;
  z-index: 4000;
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.5);
`;

const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px 12px;
  border-radius: 12px;
  color: ${props => props.$active ? '#3b82f6' : 'rgba(255, 255, 255, 0.45)'};
  flex: 1;
  max-width: 80px;

  span:first-child {
    font-size: 1.35rem;
    transition: transform 0.2s ease;
    filter: ${props => props.$active ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))' : 'grayscale(1) opacity(0.5)'};
  }

  span:last-child {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  &:hover {
    color: #3b82f6;
    span:first-child {
      transform: translateY(-4px);
      filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.4)) grayscale(0) opacity(1);
    }
  }

  ${props => props.$active && `
    span:first-child {
      transform: translateY(-2px);
      filter: grayscale(0) opacity(1) drop-shadow(0 0 12px rgba(59, 130, 246, 0.5));
    }
  `}
`;

interface BottomNavProps {
  onLogout: () => void;
}

const BottomNav = ({ onLogout }: BottomNavProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <NavContainer>
      <NavItem $active={isActive("/home")} onClick={() => router.push("/home")}>
        <span>🏠</span>
        <span>HOME</span>
      </NavItem>
      <NavItem $active={isActive("/spin")} onClick={() => router.push("/spin")}>
        <span>🎡</span>
        <span>SPIN</span>
      </NavItem>
      <NavItem $active={isActive("/wallet")} onClick={() => router.push("/wallet")}>
        <span>💰</span>
        <span>WALLET</span>
      </NavItem>
      <NavItem $active={isActive("/referral")} onClick={() => router.push("/referral")}>
        <span>👥</span>
        <span>INVITE</span>
      </NavItem>
      <NavItem onClick={onLogout} style={{ color: "#ff4d4d" }}>
        <span>🚪</span>
        <span>LOGOUT</span>
      </NavItem>
    </NavContainer>
  );
};

export default BottomNav;
