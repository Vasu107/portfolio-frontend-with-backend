import './Footer.css'

export default function Footer() {
  return (
    <footer id="footer" className="footer-section">
      <div className="footer-inner">
        <p className="footer-copy">© {new Date().getFullYear()} Vasudev Yadav — Gorakhpur</p>

        <div className="footer-links">
          <a className="footer-link" href="#contact">Contact</a>
          <a className="footer-link" href="#projects">Projects</a>
          <a className="footer-link" href="#about">About</a>
        </div>

        <div className="footer-social">
          <a className="social-link" href="https://www.facebook.com/VasudevYadav" target="_blank" rel="noreferrer">Facebook</a>
          <a className="social-link" href="https://www.linkedin.com/in/vasudev-yadav-7790a7328" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="social-link" href="https://www.instagram.com/vasudev4502" target="_blank" rel="noreferrer">Instagram</a>
          <a className="social-link" href="https://github.com/Vasu107" target="_blank" rel="noreferrer">GitHub</a>
          <a
            className="social-link"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=vasudevyadav3107@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
      </div>
    </div>
    </footer >
  )
}
