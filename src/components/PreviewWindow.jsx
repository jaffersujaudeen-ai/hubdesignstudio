import { ArrowUpRight, Menu } from 'lucide-react'

export default function PreviewWindow({ palette, mode = 'light' }) {
  const { primary, secondary, accent } = palette.colors
  const dark = mode === 'dark'
  const bg = dark ? '#14141B' : '#F7F6F3'
  const text = dark ? '#F7F6F3' : '#202027'
  const card = dark ? '#20202A' : '#FFFFFF'
  return (
    <div className="preview-browser" style={{ background: bg, color: text }}>
      <div className="browser-bar">
        <div className="browser-dots"><i/><i/><i/></div>
        <span>yourbrand.com</span>
        <span className="browser-menu"><Menu size={15}/></span>
      </div>
      <div className="preview-site">
        <nav className="preview-nav">
          <strong style={{ color: text }}>NOVA<span style={{ color: primary }}>.</span></strong>
          <div><span>Work</span><span>About</span><span>Services</span></div>
          <button style={{ background: primary, color: '#fff' }}>Let's talk <ArrowUpRight size={13}/></button>
        </nav>
        <section className="preview-hero">
          <div className="preview-copy">
            <span className="preview-kicker" style={{ color: primary }}>INDEPENDENT CREATIVE STUDIO</span>
            <h2>Make your next<br/><em style={{ color: primary }}>move matter.</em></h2>
            <p>Thoughtful digital experiences built around your ambition.</p>
            <button style={{ background: accent, color: '#17151C' }}>Explore our work <ArrowUpRight size={13}/></button>
          </div>
          <div className="preview-art" style={{ background: secondary }}>
            <div className="preview-orb" style={{ background: primary }}/>
            <div className="preview-orb small" style={{ background: accent }}/>
            <span>01 / 03</span>
          </div>
        </section>
        <div className="preview-bottom">
          <span>DESIGN THAT MOVES YOU</span>
          <span style={{ color: primary }}>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </div>
  )
}
