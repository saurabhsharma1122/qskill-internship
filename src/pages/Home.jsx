import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.href =
      'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Playfair+Display:ital,wght@1,700;1,900&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    setTimeout(() => setMounted(true), 60)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Playfair+Display:ital,wght@1,700;1,900&display=swap');

        * { box-sizing: border-box; }

        @keyframes grain {
          0%,100% { transform: translate(0,0) }
          20% { transform: translate(-2%,-3%) }
          40% { transform: translate(3%, 2%) }
          60% { transform: translate(-1%, 4%) }
          80% { transform: translate(2%,-2%) }
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }

        @keyframes fadeLeft {
          from { opacity:0; transform:translateX(-32px); }
          to   { opacity:1; transform:translateX(0); }
        }

        @keyframes blinkDot {
          0%,100% { opacity:1 } 50% { opacity:0.15 }
        }

        .ss-link {
          display:flex; align-items:center; gap:14px;
          padding:13px 18px;
          border:1px solid #1C0F3320;
          color:#1C0F33;
          font-family:'DM Mono',monospace;
          font-size:11px; letter-spacing:2.5px; text-transform:uppercase;
          text-decoration:none;
          transition: background .14s, color .14s, border-color .14s, transform .14s;
        }
        .ss-link:hover {
          background:#1C0F33; color:#F0EBE0;
          border-color:#1C0F33;
          transform:translateX(4px);
        }

        .btn-primary {
          display:block; padding:22px 20px;
          background:#1C0F33; color:#F0EBE0;
          text-decoration:none;
          font-family:'Bebas Neue',sans-serif;
          font-size:24px; letter-spacing:2px;
          transition:background .15s, transform .15s;
          position:relative;
        }
        .btn-primary:hover { background:#D93B24; transform:translateY(-3px) rotate(-0.4deg); }

        .btn-secondary {
          display:block; padding:22px 20px;
          background:transparent; color:#1C0F33;
          text-decoration:none;
          font-family:'Bebas Neue',sans-serif;
          font-size:24px; letter-spacing:2px;
          border:1.5px solid #1C0F3328;
          transition:background .15s, color .15s, transform .15s;
        }
        .btn-secondary:hover { background:#1C0F33; color:#F0EBE0; transform:translateY(-3px) rotate(0.4deg); }

        .rotated-label {
          writing-mode:vertical-rl;
          text-orientation:mixed;
          transform:rotate(180deg);
          font-family:'DM Mono',monospace;
          font-size:9px; letter-spacing:4px;
          text-transform:uppercase;
          color:#1C0F3330;
          user-select:none;
        }
      `}</style>

      {/* Page shell */}
      <div style={{
        minHeight:'100vh',
        background:'#F0EBE0',
        fontFamily:"'DM Mono',monospace",
        position:'relative',
        overflow:'hidden',
      }}>

        {/* ── Grain texture overlay ── */}
        <div style={{
          position:'fixed', inset:'-50%',
          width:'200%', height:'200%',
          opacity:0.045,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation:'grain 0.4s steps(1) infinite',
          pointerEvents:'none', zIndex:999,
        }} />

        {/* ── Left spine rule ── */}
        <div style={{
          position:'absolute', top:0, left:0,
          width:'3px', height:'100%',
          background:'#1C0F33',
          pointerEvents:'none', zIndex:10,
        }} />

        {/* ── Big coral circle (background) ── */}
        <div style={{
          position:'absolute',
          top:'-180px', right:'-180px',
          width:'520px', height:'520px',
          borderRadius:'50%',
          background:'#D93B24',
          opacity:0.08,
          pointerEvents:'none',
        }} />

        {/* ── Rotated side label ── */}
        <div style={{
          position:'absolute', left:'18px', top:'50%',
          transform:'translateY(-50%)',
          zIndex:20,
          opacity: mounted ? 1 : 0,
          transition:'opacity 0.8s ease',
        }}>
          <span className="rotated-label">Saurabh Sharma · Portfolio · 2025</span>
        </div>

        {/* ── Main content ── */}
        <div style={{
          maxWidth:'880px',
          margin:'0 auto',
          padding:'56px 52px 56px 68px',
          position:'relative', zIndex:10,
        }}>

          {/* ── Top meta bar ── */}
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            marginBottom:'72px',
            opacity: mounted ? 1 : 0,
            transition:'opacity 0.5s ease',
          }}>
            <span style={{ fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#1C0F3350' }}>
              QSkill Internship · Slab 01
            </span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{
                width:'7px', height:'7px', borderRadius:'50%',
                background:'#D93B24',
                animation:'blinkDot 2.2s ease-in-out infinite',
              }} />
              <span style={{ fontSize:'10px', letterSpacing:'3px', color:'#D93B24', textTransform:'uppercase' }}>
                Available
              </span>
            </div>
          </div>

          {/* ── Name block ── */}
          <div style={{
            marginBottom:'52px',
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeLeft 0.75s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          }}>

            <div style={{
              fontFamily:"'Playfair Display', serif",
              fontStyle:'italic',
              fontSize:'15px',
              color:'#D93B24',
              marginBottom:'6px',
              letterSpacing:'0.5px',
            }}>
              — the portfolio of
            </div>

            <h1 style={{
              fontFamily:"'Bebas Neue', sans-serif",
              fontSize:'clamp(80px, 13vw, 148px)',
              lineHeight:0.88,
              color:'#1C0F33',
              margin:0,
              letterSpacing:'-1px',
            }}>
              SAURABH
              <br />
              <span style={{ color:'#D93B24', position:'relative' }}>
                SHARMA
                {/* Wavy ink underline */}
                <svg
                  style={{ position:'absolute', bottom:'-10px', left:0, width:'100%', overflow:'visible' }}
                  height="8" viewBox="0 0 500 8" preserveAspectRatio="none"
                >
                  <path
                    d="M0 4 Q62 0 125 4 Q187 8 250 4 Q312 0 375 4 Q437 8 500 4"
                    stroke="#1C0F3325" strokeWidth="2" fill="none"
                  />
                </svg>
              </span>
            </h1>
          </div>

          {/* ── Role pill ── */}
          <p style={{
            fontFamily:"'DM Mono',monospace",
            fontSize:'11px', letterSpacing:'3px',
            textTransform:'uppercase',
            color:'#1C0F3355',
            margin:'0 0 56px',
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.6s 0.2s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          }}>
            AI Systems Engineer · Python · Full-Stack · Nagpur, India
          </p>

          {/* ── Two-column body ── */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'1fr 1fr',
            gap:'52px',
            alignItems:'start',
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.6s 0.35s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          }}>

            {/* Left — Links */}
            <div>
              <div style={{ fontSize:'9px', letterSpacing:'4px', textTransform:'uppercase', color:'#1C0F3335', marginBottom:'18px' }}>
                — Connect
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {[
                  { label:'Portfolio', href:'https://saurabhsharma1122.github.io/', sym:'↗' },
                  { label:'GitHub',    href:'https://github.com/saurabhsharma1122',  sym:'⌥' },
                  { label:'Email',     href:'mailto:saurabhsharma.in.developer@gmail.com', sym:'✉' },
                ].map(({ label, href, sym }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="ss-link">
                    <span style={{
                      fontFamily:"'Playfair Display',serif",
                      fontStyle:'italic',
                      fontSize:'16px',
                      color:'#D93B24',
                      lineHeight:1,
                      transition:'color .14s',
                    }}>{sym}</span>
                    {label}
                  </a>
                ))}
              </div>

              {/* Quote block */}
              <div style={{
                marginTop:'36px',
                padding:'20px',
                borderLeft:'3px solid #D93B24',
                background:'#D93B2406',
              }}>
                <p style={{
                  fontFamily:"'Playfair Display',serif",
                  fontStyle:'italic',
                  fontSize:'13px',
                  color:'#1C0F3370',
                  margin:0,
                  lineHeight:1.7,
                }}>
                  "Building things at the intersection of AI and human experience."
                </p>
              </div>
            </div>

            {/* Right — Projects */}
            <div>
              <div style={{ fontSize:'9px', letterSpacing:'4px', textTransform:'uppercase', color:'#1C0F3335', marginBottom:'18px' }}>
                — Projects
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                <Link to="/generator" className="btn-primary">
                  <span style={{
                    display:'block',
                    fontSize:'9px',
                    fontFamily:"'DM Mono',monospace",
                    letterSpacing:'3px',
                    opacity:0.45,
                    marginBottom:'5px',
                  }}>01 ·</span>
                  STRING GENERATOR ↗
                </Link>

                <Link to="/translator" className="btn-secondary">
                  <span style={{
                    display:'block',
                    fontSize:'9px',
                    fontFamily:"'DM Mono',monospace",
                    letterSpacing:'3px',
                    opacity:0.4,
                    marginBottom:'5px',
                  }}>02 ·</span>
                  TRANSLATOR ↗
                </Link>
              </div>

              {/* Decorative issue tag */}
              <div style={{
                marginTop:'28px',
                display:'inline-flex',
                alignItems:'center',
                gap:'10px',
                padding:'8px 14px',
                border:'1px solid #1C0F3318',
                background:'transparent',
              }}>
                <div style={{ width:'20px', height:'20px', background:'#D93B24', borderRadius:'50%', opacity:0.7 }} />
                <div style={{ width:'20px', height:'20px', background:'#1C0F33', borderRadius:'50%', opacity:0.4, marginLeft:'-14px' }} />
                <span style={{ fontSize:'9px', letterSpacing:'3px', color:'#1C0F3345', textTransform:'uppercase', marginLeft:'4px' }}>
                  Riso · Two-Color
                </span>
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div style={{
            marginTop:'80px',
            paddingTop:'22px',
            borderTop:'1px solid #1C0F3312',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            opacity: mounted ? 0.45 : 0,
            animation: mounted ? 'fadeUp 0.6s 0.5s ease both' : 'none',
          }}>
            <span style={{ fontSize:'10px', letterSpacing:'2px', color:'#1C0F3370' }}>
              © 2025 SAURABH SHARMA
            </span>
            <span style={{
              fontFamily:"'Playfair Display',serif",
              fontStyle:'italic',
              fontSize:'11px',
              color:'#1C0F3350',
            }}>
              Nagpur, India
            </span>
          </div>

        </div>
      </div>
    </>
  )
              }
