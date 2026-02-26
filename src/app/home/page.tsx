"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserInfoCard from "../../components/UserInfoCard";
import AccountBalanceCard from "../../components/AccountBalanceCard";
import { payoutsData } from "../../utils/payoutsData";

export default function Home() {
  const router = useRouter();
  const [payoutIdx, setPayoutIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSpinModal, setShowSpinModal] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  
  // Set consistent initial state for server and client to avoid hydration mismatch
  const [collectedAmount, setCollectedAmount] = useState<number>(1000); // Default 1000 Registration Bonus
  const [currentUser, setCurrentUser] = useState({ 
    name: "User", 
    phone: "07***...", 
    clicks: 0, 
    referral: 0 
  });

  const [showActivationModal, setShowActivationModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [welcomeSpinsLeft, setWelcomeSpinsLeft] = useState(0);
  const [welcomeSpinsFinished, setWelcomeSpinsFinished] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isLastWelcome, setIsLastWelcome] = useState(false);

  useEffect(() => {
    // Perform all localStorage reads only on CLIENT-SIDE initial mount
    const savedName = localStorage.getItem("userName");
    
    // Safety check: redirect to login if no user is found
    if (!savedName) {
      router.push("/login");
      return;
    }

    const savedBalance = localStorage.getItem("collectedAmount");
    if (savedBalance) setCollectedAmount(parseInt(savedBalance));

    // Disable welcome offer for everyone
    setWelcomeSpinsFinished(true);
    setShowWelcomeModal(false);
    localStorage.setItem("welcomeSpinsFinished", "true");

    const activated = localStorage.getItem("isActivated") === "true";
    if (activated) setIsActivated(true);

    const savedPhone = localStorage.getItem("userPhone");
    const savedClicks = localStorage.getItem("userClicks");
    
    if (savedName) {
      setCurrentUser({ 
        name: savedName, 
        phone: savedPhone || "07***...", 
        clicks: savedClicks ? parseInt(savedClicks) : 0,
        referral: (savedClicks ? parseInt(savedClicks) : 0) * 100
      });
    }
  }, []);

  useEffect(() => {
    // Only perform sync-back if we are mounted and have actual data to sync
    // This hook runs on changes to balance/status during the session
    const syncToStorage = () => {
      localStorage.setItem("collectedAmount", collectedAmount.toString());
      localStorage.setItem("welcomeSpinsFinished", welcomeSpinsFinished.toString());
      localStorage.setItem("isActivated", isActivated.toString());
      
      const savedName = localStorage.getItem("userName");
      if (savedName) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map((u: any) => 
          u.username === savedName ? { 
            ...u, 
            balance: collectedAmount,
            welcomeSpinsFinished: welcomeSpinsFinished,
            isActivated: isActivated
          } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
    };

    // Skip sync on initial render of default values (empty savedName)
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      syncToStorage();
    }
  }, [collectedAmount, welcomeSpinsFinished, isActivated]);

  const wheelSegments = [
    { label: "KES 1000", color: "#ffe066", textColor: "#001f3f" },
    { label: "KES 0", color: "#001f3f", textColor: "#fff" },
    { label: "KES 600", color: "#1851a3", textColor: "#fff" },
    { label: "KES 0", color: "#001f3f", textColor: "#fff" },
    { label: "KES 500", color: "#ffe066", textColor: "#001f3f" },
    { label: "KES 0", color: "#001f3f", textColor: "#fff" },
    { label: "KES 800", color: "#1851a3", textColor: "#fff" },
    { label: "KES 0", color: "#001f3f", textColor: "#fff" },
  ];

  const welcomeSegments = [
    { label: "KES 15,000", color: "#ffe066", textColor: "#001f3f" },
    { label: "KES 0", color: "#001f3f", textColor: "#fff" },
    { label: "KES 20,000", color: "#1851a3", textColor: "#fff" },
    { label: "KES 0", color: "#001f3f", textColor: "#fff" },
    { label: "KES 12,000", color: "#ffe066", textColor: "#001f3f" },
    { label: "KES 0", color: "#001f3f", textColor: "#fff" },
    { label: "KES 18,000", color: "#1851a3", textColor: "#fff" },
    { label: "KES 0", color: "#001f3f", textColor: "#fff" },
  ];

  const isWelcomeSpin = welcomeSpinsLeft > 0;
  const currentSegments = isWelcomeSpin ? welcomeSegments : wheelSegments;

  const getActivationFee = (amount: number) => {
    if (amount <= 1000) return 100;
    if (amount <= 5000) return 200;
    if (amount <= 10000) return 300;
    if (amount <= 20000) return 500;
    return 700;
  };

  const activationFee = getActivationFee(Number(withdrawAmount) || collectedAmount);

  useEffect(() => {
    const interval = setInterval(() => {
      setPayoutIdx((idx) => (idx + 1) % payoutsData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSpin = () => {
    if (spinning) return;
    
    if (welcomeSpinsFinished) {
      setShowSpinModal(false);
      setShowActivationModal(true);
      return;
    }

    // Each spin costs 100 bob as requested
    if (collectedAmount < 100) {
      alert("Insufficient balance! Each spin costs KES 100.");
      return;
    }

    setSpinning(true);
    setCollectedAmount(prev => prev - 100);

    setTimeout(() => {
      let idx;
      if (isWelcomeSpin) {
        // Controlled sequence for the 5 welcome spins (Exactly 2 Wins)
        if (welcomeSpinsLeft === 5) idx = 1; // KES 0
        else if (welcomeSpinsLeft === 4) idx = 2; // KES 20,000 (Win)
        else if (welcomeSpinsLeft === 3) idx = 5; // KES 0
        else if (welcomeSpinsLeft === 2) idx = 0; // KES 15,000 (Win)
        else idx = 7; // KES 0
      } else {
        idx = Math.floor(Math.random() * currentSegments.length);
      }
      
      setSpinResult(currentSegments[idx].label);
      setSpinning(false);
      setShowResultModal(true);
      if (isWelcomeSpin) {
        if (welcomeSpinsLeft === 1) {
          setIsLastWelcome(true);
          localStorage.setItem("welcomeSpinsLeft", "0");
        } else {
          localStorage.setItem("welcomeSpinsLeft", (welcomeSpinsLeft - 1).toString());
        }
        setWelcomeSpinsLeft(prev => prev - 1);
      }
    }, 2500);
  };

  const handleCollect = () => {
    if (spinResult && spinResult.includes("KES")) {
      // Remove "KES ", commas, and any non-numeric characters before parsing
      const val = parseInt(spinResult.replace("KES ", "").replace(/,/g, ""));
      if (!isNaN(val)) setCollectedAmount((prev) => prev + val);
    }
    
    // If this was the last welcome spin, redirect to home
    if (isLastWelcome) {
      localStorage.setItem("welcomeSpinsFinished", "true");
      localStorage.removeItem("welcomeSpinsLeft");
      setWelcomeSpinsFinished(true);
      setShowResultModal(false);
      setShowSpinModal(false);
      window.location.href = "/home"; // Redirect to home direct
      return;
    }

    setShowResultModal(false);
  };

  const maskPhone = (p: string) => {
    if (!p) return "";
    if (p.includes("*")) return p; // Already masked
    if (p.length < 7) return p;
    return p.substring(0, 4) + "***" + p.substring(p.length - 3);
  };

  return (
    <main style={{background:"linear-gradient(135deg, #001f3f 0%, #003366 100%)", minHeight:"100vh", color: "#fff", paddingBottom: 60}}>
      {menuOpen && (
        <div style={{position:"fixed", top:0, left:0, width:"100vw", height:"100vh", background:"rgba(0,0,0,0.6)", zIndex:3000, backdropFilter: "blur(10px)"}} onClick={()=>setMenuOpen(false)}>
          <aside style={{width:320, maxWidth:"85vw", height:"100vh", background:"#001f3f", boxShadow:"10px 0 30px rgba(0,0,0,0.5)", position:"absolute", top:0, left:0, display:"flex", flexDirection:"column", zIndex:3100, borderRight: "1px solid rgba(255,255,255,0.1)"}} onClick={e=>e.stopPropagation()}>
            <button style={{position:"absolute", top:18, right:18, background:"rgba(255,255,255,0.1)", border:"none", borderRadius:"50%", width:36, height:36, fontSize:"1.5rem", cursor:"pointer", color:"#fff"}} onClick={()=>setMenuOpen(false)}>×</button>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", padding:"60px 0 30px 0"}}>
              <div style={{background:"linear-gradient(45deg, #ffe066, #fff)", color:"#001f3f", width:80, height:80, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:"2.5rem", marginBottom:12}}>
                {currentUser.name.charAt(0)}
              </div>
              <div style={{fontWeight:800, fontSize:"1.35rem"}}>{currentUser.name}</div>
              <div style={{fontSize:"1rem", color:"rgba(255,255,255,0.5)", marginBottom:10}}>{maskPhone(currentUser.phone)}</div>
              {isActivated && <div style={{background: "rgba(74, 222, 128, 0.2)", color: "#4ade80", padding: "4px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 800, border: "1px solid rgba(74, 222, 128, 0.3)"}}>VERIFIED ACCOUNT</div>}
            </div>
            <nav style={{flex:1}}>
              <ul style={{listStyle:"none", padding:"0 15px"}}>
                <li style={{padding:"16px 20px", fontWeight:700, cursor:"pointer", borderRadius: "12px", background: "rgba(255,255,255,0.05)"}} onClick={()=>{setMenuOpen(false); router.push("/home")}}>🏠 Home</li>
                <li style={{padding:"16px 20px", fontWeight:700, cursor:"pointer", borderRadius: "12px"}} onClick={()=>{setMenuOpen(false); router.push("/wallet")}}>💳 Wallet</li>
                <li style={{padding:"16px 20px", fontWeight:700, cursor:"pointer", borderRadius: "12px"}} onClick={()=>{setMenuOpen(false); router.push("/referral")}}>👥 Referral</li>
                <li style={{padding:"16px 20px", fontWeight:700, color:"#ff4d4d", cursor:"pointer", marginTop: 40}} onClick={()=>{
                  setMenuOpen(false); 
                  localStorage.removeItem("userName");
                  localStorage.removeItem("userPhone");
                  router.push("/logout");
                }}>🚪 Logout</li>
              </ul>
            </nav>
          </aside>
        </div>
      )}

      <div style={{background:"rgba(255, 224, 102, 0.95)", color:"#001f3f", textAlign:"center", padding:"12px 20px", fontWeight:800, fontSize:"0.9rem", zIndex:1000}}>
        ⚠️ System maintenance from 1am to 3pm.
      </div>

      <div style={{background: "rgba(74, 222, 128, 0.15)", borderBottom: "1px solid rgba(74, 222, 128, 0.3)", padding: "10px 0", backdropFilter: "blur(5px)"}}>
        <div style={{maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12}}>
          <span style={{background: "#4ade80", color: "#001f3f", fontSize: "0.65rem", fontWeight: 900, padding: "2px 6px", borderRadius: 4, textTransform: "uppercase"}}>LIVE PAYOUT</span>
          <div style={{fontSize: "0.85rem", fontWeight: 600, color: "#4ade80", display: "flex", alignItems: "center", gap: 8, transition: "all 0.5s ease"}}>
            <span>{payoutsData[payoutIdx].name} ({payoutsData[payoutIdx].phone})</span>
            <span style={{color: "#fff", fontWeight: 900}}>withdrew {payoutsData[payoutIdx].amount}</span>
            <span style={{fontSize: "0.75rem", opacity: 0.6, fontWeight: 400}}>{payoutsData[payoutIdx].time}</span>
          </div>
        </div>
      </div>
      
      <div style={{maxWidth: 1200, margin: "0 auto", padding: "0 20px"}}>
        <header style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"25px 0"}}>
          <button style={{background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius: "12px", width: 48, height: 48, fontSize:"1.6rem", cursor:"pointer", color:"#fff", display: "flex", alignItems: "center", justifyContent: "center"}} onClick={()=>setMenuOpen(true)}>☰</button>
          <span style={{fontWeight:900, fontSize:"2.2rem", letterSpacing:"-1px", background: "linear-gradient(to right, #fff, #ffe066)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>ShindaPesa</span>
          <div style={{width: 48}} />
        </header>

        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32, alignItems: "start"}}>
           <div style={{display: "flex", flexDirection: "column", gap: 24}}>
              <UserInfoCard name={currentUser.name} phone={maskPhone(currentUser.phone)} status={isActivated ? "Activated" : "Pending"} />
              <AccountBalanceCard 
                balance={collectedAmount} 
                clicks={currentUser.clicks} 
                referral={currentUser.clicks * 100} 
                onWithdraw={() => {
                  if (collectedAmount < 100) {
                    alert("Minimum withdrawal is KES 100. Keep spinning to win more!");
                  } else if (isActivated) {
                    alert("Your withdrawal request of KES " + collectedAmount.toLocaleString() + " has been received! It will be processed to your M-PESA number " + currentUser.phone + " shortly.");
                    setCollectedAmount(0); // Reset balance after withdrawal
                  } else {
                    setWithdrawAmount(""); // Reset for manual entry
                    setShowActivationModal(true);
                  }
                }} 
              />
           </div>

           <div style={{display: "flex", flexDirection: "column", gap: 24}}>
              <section style={{background:"rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius:32, padding:"40px 24px", textAlign:"center", backdropFilter: "blur(10px)"}}>
                <div style={{fontSize:"4rem", marginBottom:10}}>🎡</div>
                <div style={{fontWeight:900, fontSize:"1.8rem", marginBottom:12}}>Lucky Spin Wheel</div>
                <div style={{fontSize:"1.05rem", color:"rgba(255,255,255,0.6)", marginBottom:32, lineHeight: 1.6}}>Win up to <b>KES 1,000</b> instantly! Every spin counts towards your goal.</div>
                <button 
                  style={{width: "100%", background:"linear-gradient(135deg, #ffe066, #ffc107)", color:"#001f3f", border:"none", borderRadius:20, padding:"20px", fontWeight:900, fontSize:"1.2rem", cursor:"pointer"}} 
                  onClick={()=>{
                    if (welcomeSpinsFinished) {
                      setShowActivationModal(true);
                    } else {
                      setShowSpinModal(true);
                    }
                  }}
                >
                  {welcomeSpinsFinished ? "ACCOUNT ACTIVATION" : "START SPINNING"}
                </button>
              </section>

              <div style={{background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: 24, padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16}}>
                 <div style={{textAlign: "center"}}>
                    <div style={{fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: 4}}>Daily Goal</div>
                    <div style={{fontSize: "1.2rem", fontWeight: 800, color: "#4ade80"}}>75%</div>
                 </div>
                 <div style={{textAlign: "center"}}>
                    <div style={{fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: 4}}>User Rank</div>
                    <div style={{fontSize: "1.2rem", fontWeight: 800, color: "#ffe066"}}>Gold</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {showWelcomeModal && (
        <div style={{position:"fixed", top:0, left:0, width:"100vw", height:"100vh", background:"rgba(0,0,0,0.85)", zIndex:5000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter: "blur(15px)"}}>
          <div style={{background:"rgba(0, 31, 63, 0.95)", borderRadius:32, padding:"48px 32px", width:"90vw", maxWidth:450, textAlign:"center", border: "2px solid #ffe066", boxShadow: "0 0 50px rgba(255, 224, 102, 0.2)"}}>
            <div style={{fontSize: "5rem", marginBottom: 24}}>🎁</div>
            <div style={{fontWeight:900, fontSize:"2.2rem", marginBottom:16, color: "#fff"}}>New Member Offer!</div>
            <div style={{fontSize:"1.1rem", marginBottom:40, color:"rgba(255,255,255,0.7)", lineHeight:1.6}}>
              Enjoy <b>5 PROMOTIONAL SPINS</b> at only <b>KES 100 each</b>. Win up to <b>KES 20,000</b> on every spin!
            </div>
            <button 
              style={{background:"#ffe066", color:"#001f3f", fontWeight:900, fontSize:"1.3rem", border:"none", borderRadius:20, padding:"20px", width:"100%", cursor:"pointer", transition: "transform 0.3s"}}
              onClick={() => {
                setShowWelcomeModal(false);
                setWelcomeSpinsLeft(5);
                localStorage.setItem("welcomeSpinsLeft", "5");
                setShowSpinModal(true);
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              START WINNING
            </button>
          </div>
        </div>
      )}

      {showSpinModal && (
        <div style={{position:"fixed", top:0, left:0, width:"100vw", height:"100vh", background:"rgba(0,0,0,0.8)", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter: "blur(10px)"}}>
          <div style={{background:"rgba(0, 31, 63, 0.95)", borderRadius:32, padding:"40px 20px", width:"95vw", maxWidth:400, display:"flex", flexDirection:"column", alignItems:"center", border: "1px solid rgba(255,255,255,0.1)"}}>
            <button style={{position:"absolute", top:20, right:20, background:"none", border:"none", fontSize:"2rem", cursor:"pointer", color:"#fff"}} onClick={()=>setShowSpinModal(false)}>×</button>
            <div style={{fontWeight: 800, fontSize: "1.5rem", marginBottom: 30}}>
              {isWelcomeSpin ? `Super Spin (${welcomeSpinsLeft} Left)` : "Lucky Spin"}
            </div>
            <div style={{position:"relative", width:280, height:280, margin:"0 auto 30px auto", transition:"transform 2.5s cubic-bezier(.17,.67,.12,.99)", transform:spinning?`rotate(${Math.floor(Math.random()*360)+1800}deg)`:"rotate(0deg)"}}>
               <svg width="280" height="280" viewBox="0 0 260 260">
                {currentSegments.map((seg, i) => {
                  const r = 120;
                  const x1 = 130 + r * Math.cos((Math.PI * 2 * i) / currentSegments.length - Math.PI/2);
                  const y1 = 130 + r * Math.sin((Math.PI * 2 * i) / currentSegments.length - Math.PI/2);
                  const x2 = 130 + r * Math.cos((Math.PI * 2 * (i+1)) / currentSegments.length - Math.PI/2);
                  const y2 = 130 + r * Math.sin((Math.PI * 2 * (i+1)) / currentSegments.length - Math.PI/2);
                  return <path key={i} d={`M130,130 L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`} fill={seg.color} stroke="#001f3f" strokeWidth={2} />;
                })}
                <circle cx="130" cy="130" r="30" fill="#001f3f" stroke="#fff" strokeWidth={2} />
               </svg>
               <div style={{position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", borderLeft:"15px solid transparent", borderRight:"15px solid transparent", borderTop:"25px solid #ffe066"}} />
            </div>
            <button style={{background:"#ffe066", color:"#001f3f", fontWeight:900, fontSize:"1.2rem", border:"none", borderRadius:20, padding:"18px 0", width:"100%", cursor:"pointer"}} onClick={handleSpin} disabled={spinning}>
              {spinning ? "SPINNING..." : (isWelcomeSpin ? "SPIN (KES 100)" : "SPIN NOW")}
            </button>
          </div>
        </div>
      )}

      {showResultModal && (
        <div style={{position:"fixed", top:0, left:0, width:"100vw", height:"100vh", background:"rgba(0,0,0,0.8)", zIndex:3000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter: "blur(10px)"}}>
          <div style={{background:"rgba(0, 31, 63, 0.95)", borderRadius:32, padding:"40px", width:"90vw", maxWidth:400, textAlign:"center", border: "1px solid rgba(255,255,255,0.1)"}}>
            <div style={{fontSize: "4rem", marginBottom: 20}}>{spinResult === "KES 0" ? "💔" : "🎉"}</div>
            <div style={{fontWeight:900, fontSize:"2rem", marginBottom:10}}>{spinResult === "KES 0" ? "Better Luck Next Time" : "Winner!"}</div>
            <div style={{fontSize:"1.5rem", marginBottom:32, color:"#ffe066", fontWeight:800}}>
              {spinResult === "KES 0" ? "You didn't win this time." : `You won ${spinResult}!`}
            </div>
            <button style={{background:"#ffe066", color:"#001f3f", fontWeight:900, fontSize:"1.2rem", border:"none", borderRadius:20, padding:"18px 0", width:"100%", cursor:"pointer"}} onClick={handleCollect}>
              {spinResult === "KES 0" ? "TRY AGAIN" : "COLLECT NOW"}
            </button>
          </div>
        </div>
      )}

      {showActivationModal && (
        <div style={{position:"fixed", top:0, left:0, width:"100vw", height:"100vh", background:"rgba(0,0,0,0.8)", zIndex:4000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter: "blur(10px)"}}>
          <div style={{background:"rgba(0, 31, 63, 0.95)", borderRadius:32, padding:"40px", width:"90vw", maxWidth:420, textAlign:"center", border: "1px solid rgba(255,255,255,0.1)"}}>
            <div style={{fontSize: "3.5rem", marginBottom: 20, color: "#ffe066"}}>🔒</div>
            <div style={{fontWeight:900, fontSize:"1.6rem", marginBottom:12}}>Withdrawal Selection</div>
            
            <div style={{marginBottom: 24, textAlign: "left"}}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8}}>
                <label style={{fontSize: "0.85rem", color: "rgba(255,255,255,0.5)"}}>Enter amount to withdraw (KES):</label>
                <button 
                  onClick={() => setWithdrawAmount(collectedAmount.toString())}
                  style={{background: "rgba(255, 224, 102, 0.1)", border: "none", color: "#ffe066", fontSize: "0.7rem", fontWeight: 800, padding: "4px 8px", borderRadius: 4, cursor: "pointer"}}
                >
                  USE MAX
                </button>
              </div>
              <input 
                type="number" 
                value={withdrawAmount}
                placeholder="0.00"
                onChange={(e) => setWithdrawAmount(e.target.value)}
                style={{
                  width: "100%", 
                  background: "rgba(255,255,255,0.05)", 
                  border: "1px solid rgba(255,255,255,0.1)", 
                  borderRadius: 12, 
                  padding: "14px", 
                  color: "#fff", 
                  fontSize: "1.2rem", 
                  fontWeight: 800,
                  outline: "none"
                }}
              />
              <div style={{fontSize: "0.75rem", color: Number(withdrawAmount) > collectedAmount ? "#ff4d4d" : "rgba(255,255,255,0.4)", marginTop: 6, fontWeight: Number(withdrawAmount) > collectedAmount ? 700 : 400}}>
                {Number(withdrawAmount) > collectedAmount ? "⚠️ Amount exceeds balance!" : `Max available: KES ${collectedAmount.toLocaleString()}`}
              </div>
            </div>

            <div style={{background: "rgba(255, 224, 102, 0.1)", border: "1px solid rgba(255, 224, 102, 0.2)", borderRadius: 12, padding: "10px", marginBottom: 20, fontSize: "0.8rem", color: "#ffe066", textAlign: "left"}}>
              💡 <b>Tip:</b> Lower withdrawal amounts have smaller activation fees!
            </div>

            <div style={{background: "rgba(255, 255, 255, 0.05)", borderRadius: 16, padding: "15px", marginBottom: 25, textAlign: "left"}}>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 10}}>
                <span style={{fontSize: "0.85rem", color: "rgba(255,255,255,0.5)"}}>Activation Fee:</span>
                <span style={{fontSize: "1rem", fontWeight: 800, color: "#ffe066"}}>KES {activationFee}</span>
              </div>
              <div style={{fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: 8}}>* Minimum withdrawal limit: KES 100</div>
            </div>

            <div style={{display:"flex", flexDirection: "column", gap:12}}>
               <button 
                disabled={Number(withdrawAmount) < 100 || Number(withdrawAmount) > collectedAmount}
                style={{
                  background: (Number(withdrawAmount) < 100 || Number(withdrawAmount) > collectedAmount) ? "rgba(255,255,255,0.1)" : "#ffe066", 
                  color: (Number(withdrawAmount) < 100 || Number(withdrawAmount) > collectedAmount) ? "rgba(255,255,255,0.3)" : "#001f3f", 
                  fontWeight: 900, fontSize:"1.1rem", border:"none", borderRadius:16, padding:"16px 0", cursor: (Number(withdrawAmount) < 100 || Number(withdrawAmount) > collectedAmount) ? "not-allowed" : "pointer"
                }} 
                onClick={()=>{
                  localStorage.setItem("pendingActivationFee", activationFee.toString());
                  localStorage.setItem("pendingWithdrawAmount", withdrawAmount);
                  setShowActivationModal(false); 
                  router.push("/activate-account");
                }}
              >
                {Number(withdrawAmount) > collectedAmount 
                  ? "INSUFFICIENT BALANCE" 
                  : Number(withdrawAmount) < 100 
                    ? (withdrawAmount === "" ? "ENTER AMOUNT" : "MIN KES 100")
                    : "CONTINUE TO PAY"}
              </button>
               <button style={{background:"rgba(255,255,255,0.05)", color:"#fff", fontWeight:700, fontSize:"1.1rem", border:"none", borderRadius:16, padding:"16px 0", cursor:"pointer"}} onClick={()=>setShowActivationModal(false)}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      <footer style={{marginTop:60, textAlign:"center", color:"rgba(255,255,255,0.2)", fontSize:"0.9rem", fontWeight:600}}>
        &copy; {new Date().getFullYear()} ShindaPesa Kenya. All rights reserved.
      </footer>
    </main>
  );
}
