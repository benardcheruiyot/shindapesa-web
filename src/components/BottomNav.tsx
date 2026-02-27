"use client";
import React from "react";
import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px 15px;
  z-index: 4000;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
`;

const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
  padding: 8px 16px;
  border-radius: 16px;
  background: ${props => props.$active ? 'rgba(245, 158, 11, 0.1)' : 'transparent'};
  color: ${props => props.$active ? '#f59e0b' : 'rgba(255, 255, 255, 0.6)'};

  span:first-child {
    font-size: 1.5rem;
    filter: ${props => props.$active ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))' : 'none'};
  }

  span:last-child {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  &:hover {
    color: #f59e0b;
    transform: translateY(-3px);
  }
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
