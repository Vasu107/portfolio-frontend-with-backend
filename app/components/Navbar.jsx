'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'


const links = ['About', 'Skills', 'Projects', 'Education', 'Certifications', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return;

    const handleScroll = () => {
      setOpen(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (Math.abs(currentY - lastY) > 10) {
        setOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [open]);


  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>

      <a href="#" className="navbar-logo">
        VASUDEV<span> YADAV</span>
      </a>

      <ul className="navbar-links">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}>{l}</a>
          </li>
        ))}
      </ul>

      <button className="navbar-hamburger" onClick={() => setOpen(!open)}>
        {[0, 1, 2].map(i => <span key={i} />)}
      </button>

      {open && (
        <div className="navbar-mobile-backdrop" onClick={() => setOpen(false)}>
          <motion.div className="navbar-mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(event) => event.stopPropagation()}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>
                {l}
              </a>
            ))}
          </motion.div>
        </div>
      )}

    </nav>
  )
}
