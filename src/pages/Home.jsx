import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020208',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Courier New', monospace",
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,255,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,128,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(0,255,128,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%', maxWidth: '520px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)'
      }}>

        {/* Top tag */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem'
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff80', boxShadow: '0 0 8px #00ff80', animation: 'pulse 2s infinite' }} />
          <span style={{ color: '#00ff80', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>QSkill Internship · Slab 1</span>
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '900',
          color: '#fff',
          margin: '0 0 0.25rem',
          letterSpacing: '-2px',
          lineHeight: 1
        }}>
          SAURABH<br />
          <span style={{ color: '#00ff80' }}>SHARMA</span>
        </h1>

        <p style={{ color: '#ffffff40', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', margin: '1rem 0 2rem' }}>
          AI Systems Engineer · Python · Full-Stack · Nagpur, India
        </p>

        {/* Links row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {[
            { label: '↗ Portfolio', href: 'https://saurabhsharma1122.github.io/' },
            { label: '⌥ GitHub', href: 'https://github.com/saurabhsharma1122' },
            { label: '✉ Email', href: 'mailto:saurabhsharma.in.developer@gmail.com' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" style={{
              padding: '8px 16px',
              border: '1px solid #ffffff15',
              borderRadius: '6px',
              color: '#ffffff60',
              fontSize: '11px',
              letterSpacing: '1px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              background: '#ffffff05'
            }}
              onMouseEnter={e => { e.target.style.borderColor = '#00ff80'; e.target.style.color = '#00ff80' }}
              onMouseLeave={e => { e.target.style.borderColor = '#ffffff15'; e.target.style.color = '#ffffff60' }}
            >{label}</a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, #00ff8030, transparent)', marginBottom: '2.5rem' }} />

        {/* Projects label */}
        <p style={{ color: '#ffffff30', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          — Projects
        </p>

        {/* Project buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/generator" style={{
            flex: 1, padding: '1.2rem',
            background: '#00ff80',
            color: '#020208',
            fontWeight: '900',
            fontSize: '13px',
            letterSpacing: '1px',
            textDecoration: 'none',
            borderRadius: '10px',
            textAlign: 'center',
            transition: 'all 0.2s',
            textTransform: 'uppercase'
          }}
            onMouseEnter={e => { e.target.style.background = '#00cc66'; e.target.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.target.style.background = '#00ff80'; e.target.style.transform = 'translateY(0)' }}
          >
            String Generator ↗
          </Link>
          <Link to="/translator" style={{
            flex: 1, padding: '1.2rem',
            background: 'transparent',
            color: '#fff',
            fontWeight: '900',
            fontSize: '13px',
            letterSpacing: '1px',
            textDecoration: 'none',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid #ffffff20',
            transition: 'all 0.2s',
            textTransform: 'uppercase'
          }}
            onMouseEnter={e => { e.target.style.borderColor = '#ffffff60'; e.target.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.target.style.borderColor = '#ffffff20'; e.target.style.transform = 'translateY(0)' }}
          >
            Translator ↗
          </Link>
        </div>

      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}
