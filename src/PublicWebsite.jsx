import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Search, Menu, X, RotateCcw, Sparkles, Layers3, Code2, Palette, MonitorSmartphone, MessageCircle, ChevronDown } from 'lucide-react'
import Scene3D from './components/Scene3D'
import ScrollJourney from './components/ScrollJourney'
import StyleLibrary from './StyleLibrary'

const projects = [
  { id: 1, name: 'Aether / Digital Worlds', category: '3D & Immersive', tags: ['3D','WebGL','Storytelling'], tech: ['Three.js','React','WebGL'], shape: 'orb', tone: 'violet', description: 'An immersive digital universe built around depth, light and movement.' },
  { id: 2, name: 'Forma / Creative Studio', category: 'Portfolio', tags: ['Minimal','Typography','Motion'], tech: ['React','Framer Motion','CSS'], shape: 'type', tone: 'cream', description: 'A bold editorial portfolio with expressive type and clean composition.' },
  { id: 3, name: 'NOVA / Future Commerce', category: 'E-commerce', tags: ['3D','Interaction','Animation'], tech: ['Three.js','Shopify','GSAP'], shape: 'product', tone: 'orange', description: 'A product-first storefront with tactile product moments and motion.' },
  { id: 4, name: 'Atelier / Architecture', category: 'Architecture', tags: ['Minimal','Scrolling','Storytelling'], tech: ['GSAP','Webflow','CSS'], shape: 'architecture', tone: 'sand', description: 'An architectural journal with calm transitions and generous space.' },
  { id: 5, name: 'Serein / Wellness', category: 'Healthcare', tags: ['Clean','Typography','Responsive'], tech: ['React','Framer Motion','CSS'], shape: 'wellness', tone: 'sage', description: 'A calm and accessible digital presence for a modern wellness brand.' },
  { id: 6, name: 'MONO / Fashion House', category: 'Fashion', tags: ['Editorial','Animation','Minimal'], tech: ['GSAP','Webflow','Lottie'], shape: 'fashion', tone: 'mono', description: 'An editorial fashion experience with cinematic imagery and type.' },
  { id: 7, name: 'Orbit / Technology', category: 'Technology', tags: ['3D','WebGL','Experimental'], tech: ['Three.js','WebGL','React'], shape: 'orbit', tone: 'blue', description: 'A technology concept with orbital geometry and interactive layers.' },
  { id: 8, name: 'Casa / Hospitality', category: 'Hospitality', tags: ['Storytelling','Scrolling','Photography'], tech: ['GSAP','React','CSS'], shape: 'casa', tone: 'terracotta', description: 'A warm hospitality concept shaped by place, texture and story.' },
  { id: 9, name: 'Pixel / Creative Agency', category: 'Agency', tags: ['Motion','Interaction','Colorful'], tech: ['Framer Motion','React','Vite'], shape: 'pixel', tone: 'pink', description: 'A vibrant agency concept with playful interactions and modular layouts.' },
  { id: 10, name: 'ECHO / Music Culture', category: 'Entertainment', tags: ['Animation','Experimental','Scrolling'], tech: ['GSAP','WebGL','Three.js'], shape: 'echo', tone: 'purple', description: 'A sound-inspired visual system with responsive motion and depth.' },
  { id: 11, name: 'North / Real Estate', category: 'Real Estate', tags: ['Clean','Photography','Responsive'], tech: ['React','CSS','Webflow'], shape: 'north', tone: 'forest', description: 'A refined property experience focused on clarity and discovery.' },
  { id: 12, name: 'Learn / Education', category: 'Education', tags: ['Typography','Interaction','Responsive'], tech: ['React','Vite','Framer Motion'], shape: 'learn', tone: 'yellow', description: 'A flexible learning platform concept with clear information design.' }
]
const categories = ['All','3D & Immersive','Agency','E-commerce','Architecture','Portfolio','Fashion','Healthcare','Hospitality','Technology','Entertainment','Real Estate','Education']
const tags = ['All','3D','Animation','Scrolling','WebGL','Minimal','Typography','Storytelling','Interaction','Motion','Experimental','Responsive','Photography','Editorial','Clean','Colorful']
const technologies = ['All','Three.js','GSAP','React','WebGL','Framer Motion','Webflow','Shopify','Vite','CSS','Lottie']

function sendWhatsApp(message) {
  let number = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
  if (!number) number = (window.prompt('Enter your UN Digital Hub WhatsApp number with country code, digits only. Example: 919876543210') || '').replace(/\D/g, '')
  if (number.length < 10) return
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}

export default function PublicWebsite({ onOpenStudio }) {
  const [category, setCategory] = useState('All')
  const [tag, setTag] = useState('All')
  const [technology, setTechnology] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState('Featured')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const filtered = useMemo(() => projects.filter(p =>
    (category === 'All' || p.category === category) && (tag === 'All' || p.tags.includes(tag)) &&
    (technology === 'All' || p.tech.includes(technology)) &&
    (!searchTerm || `${p.name} ${p.category} ${p.tags.join(' ')} ${p.tech.join(' ')} ${p.description}`.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a,b) => sort === 'A–Z' ? a.name.localeCompare(b.name) : a.id-b.id), [category, tag, technology, searchTerm, sort])
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false) }
  const contact = () => sendWhatsApp('Hello UN Digital Hub,\n\nI would like to discuss a website or digital project.\nPlease share your services and next steps.\n\nI found you through the UN Digital Hub website.')
  const clearFilters = () => { setCategory('All'); setTag('All'); setTechnology('All'); setSearchTerm('') }

  return <div className="public-site">
    <div className="site-reading-progress" />
    <header className="site-header">
      <a className="site-brand" href="#top" onClick={e=>{e.preventDefault();scrollTo('top')}}><span className="site-brand-mark"><i/><i/><i/></span><span><b>UN DIGITAL HUB</b><small>DESIGN / DIGITAL / EXPERIENCE</small></span></a>
      <button className="site-menu-toggle" onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle navigation">{menuOpen?<X/>:<Menu/>}</button>
      <nav className={`site-nav ${menuOpen?'open':''}`}><button onClick={()=>scrollTo('discover')}>Discover</button><button onClick={()=>scrollTo('categories')}>Categories</button><button onClick={()=>scrollTo('technology')}>Technology</button><button onClick={()=>scrollTo('style-library')}>Styles</button><button onClick={()=>scrollTo('experience')}>Experience</button><button onClick={onOpenStudio}>Design Studio <ArrowUpRight size={14}/></button></nav>
      <button className="site-contact" onClick={contact}>Start a project <ArrowUpRight size={15}/></button>
    </header>

    <main id="top">
      <section className="site-hero">
        <div className="site-hero-grid"/>
        <div className="site-hero-copy"><span className="site-kicker"><i/> INDEPENDENT DIGITAL DESIGN & DEVELOPMENT</span><h1>Make the web<br/><em>feel different.</em></h1><p>We shape distinctive digital experiences through thoughtful design, immersive 3D, expressive motion and purposeful technology.</p><div className="site-hero-actions"><button className="site-btn site-btn-primary" onClick={()=>scrollTo('discover')}>Explore the collection <ArrowRight size={16}/></button><button className="site-btn site-btn-ghost" onClick={onOpenStudio}>Open design studio <ArrowUpRight size={16}/></button></div><div className="site-hero-meta"><span><b>12</b> CONCEPT DIRECTIONS</span><span><b>15</b> STUDIO MODULES</span><span><b>3D</b> SCROLL EXPERIENCE</span></div></div>
        <div className="site-hero-visual"><div className="site-hero-glow"/><Scene3D/><span className="hero-float-label label-top">FIG. 001 / FORM STUDY</span><span className="hero-float-label label-bottom">INTERACTIVE / 3D / MOTION</span><div className="hero-orbit-ring"/></div>
        <div className="site-hero-bottom"><span>SCROLL TO EXPLORE</span><span>COIMBATORE · INDIA / WORKING WORLDWIDE</span><span>01 — 04</span></div>
      </section>

      <section className="site-intro section-pad"><div className="intro-index">01 / WHAT WE DO</div><div><span className="site-kicker">DESIGN WITH A POINT OF VIEW</span><h2>Digital experiences<br/>with <em>real character.</em></h2></div><p>From brand-led websites to interactive product experiences, we bring design, development and technology into one considered process.</p></section>

      <section className="site-collection section-pad" id="discover">
        <div className="site-section-heading"><div><span className="site-kicker">THE DIGITAL INDEX / CONCEPT COLLECTION</span><h2>Explore the <em>collection.</em></h2><p>Browse design directions by category, creative tags and technology stack.</p></div><span className="site-index-count">{String(filtered.length).padStart(2,'0')} / {String(projects.length).padStart(2,'0')} CONCEPTS</span></div>
        <div className="site-filter-panel" id="categories">
          <div className="filter-row-head"><span>01 / CATEGORY</span><button onClick={clearFilters}>Clear all filters <RotateCcw size={13}/></button></div><div className="site-chip-row">{categories.map(c=><button key={c} className={category===c?'selected':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
          <div className="filter-row-head"><span>02 / TAGS</span><small>Choose a creative direction</small></div><div className="site-chip-row tag-chips">{tags.map(t=><button key={t} className={tag===t?'selected':''} onClick={()=>setTag(t)}>{t==='All'?'All tags':`#${t}`}</button>)}</div>
          <div className="filter-row-head" id="technology"><span>03 / TECHNOLOGY</span><small>Filter by build stack</small></div><div className="site-chip-row tech-chips">{technologies.map(t=><button key={t} className={technology===t?'selected':''} onClick={()=>setTechnology(t)}>{t==='All'?'All technologies':t}</button>)}</div>
        </div>
        <div className="site-results-toolbar"><label className="site-search"><Search size={16}/><input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search concepts, tags or technology"/></label><label className="site-sort">SORT <select value={sort} onChange={e=>setSort(e.target.value)}><option>Featured</option><option>A–Z</option></select></label></div>
        <div className="site-project-grid">{filtered.map((p,i)=><motion.article layout key={p.id} className={`site-project-card tone-${p.tone}`} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.45,delay:Math.min(i*.035,.2)}}>
          <button className={`project-art art-${p.shape}`} onClick={()=>setActiveCard(activeCard===p.id?null:p.id)} aria-label={`Preview ${p.name}`}><span className="art-grain"/><span className="art-orbit"/><span className="art-shape-main"/><span className="art-shape-secondary"/><span className="art-caption">{p.category.toUpperCase()} / CONCEPT {String(p.id).padStart(2,'0')}</span><span className="art-view">{activeCard===p.id?'CLOSE':'VIEW CONCEPT'} <ArrowUpRight size={13}/></span></button>
          <div className="project-card-info"><div className="project-title-line"><div><span className="project-category">{p.category}</span><h3>{p.name}</h3></div><span className="project-year">2026</span></div><p>{p.description}</p><div className="project-tags">{p.tags.map(t=><button key={t} onClick={()=>setTag(t)}>#{t}</button>)}</div><div className="project-tech">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
          <AnimatePresence>{activeCard===p.id&&<motion.div className="project-expanded" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><b>Concept direction</b><p>Original UN Digital Hub visual exploration, created to demonstrate a possible design and technology direction. This is a concept, not a live client project.</p><button onClick={onOpenStudio}>Create a direction like this <ArrowUpRight size={13}/></button></motion.div>}</AnimatePresence></div>
        </motion.article>)}</div>
        {filtered.length===0&&<div className="site-empty"><Search size={25}/><b>No concepts match those filters.</b><button onClick={clearFilters}>Reset collection</button></div>}
      </section>

      <StyleLibrary />

      <section className="site-services section-pad"><div className="intro-index">02 / CAPABILITIES</div><div><span className="site-kicker">FROM FIRST IDEA TO LAUNCH</span><h2>Everything your<br/>digital presence <em>needs.</em></h2></div><div className="site-service-grid">{[['01','Website design','Brand-led websites with a clear visual system.'],['02','Web development','Responsive, accessible and maintainable builds.'],['03','3D & motion','Interactive scenes and scroll-led storytelling.'],['04','E-commerce','Product experiences built to make buying simple.'],['05','Brand identity','Colour, typography and visual direction.'],['06','Digital products','Interfaces for tools, platforms and services.']].map(([n,t,d])=><article key={n}><span>{n} / CAPABILITY</span><h3>{t}</h3><p>{d}</p><ArrowUpRight size={17}/></article>)}</div></section>

      <section className="site-journey-wrap section-pad" id="experience"><div className="site-section-heading"><div><span className="site-kicker">SCROLL-DRIVEN / 3D EXPERIENCE</span><h2>Enter a different<br/><em>dimension.</em></h2><p>A connected experience combining a travelling 3D object, interactive orbiting elements and a portal transition.</p></div></div><ScrollJourney/></section>

      <section className="site-process section-pad"><div className="intro-index">03 / THE PROCESS</div><div><span className="site-kicker">CLEAR THINKING. CRAFTED EXECUTION.</span><h2>A simple path<br/>to <em>something great.</em></h2></div><div className="process-list">{[['01','Discover','We understand your business, audience and goals.'],['02','Direct','We define the design language, structure and technology.'],['03','Create','We design, develop and refine the experience.'],['04','Launch','We test across devices and prepare your website for launch.']].map(([n,t,d])=><article key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div><ArrowUpRight size={18}/></article>)}</div></section>

      <section className="site-cta section-pad"><div className="cta-3d"><div className="cta-orb"/><div className="cta-ring"/></div><span className="site-kicker">HAVE A PROJECT IN MIND?</span><h2>Let's make something<br/><em>worth exploring.</em></h2><p>Tell us what you are building. We'll help shape the right digital direction.</p><div className="site-hero-actions"><button className="site-btn site-btn-primary" onClick={contact}>Start a conversation <MessageCircle size={16}/></button><button className="site-btn site-btn-ghost" onClick={onOpenStudio}>Explore the design studio <ArrowRight size={16}/></button></div></section>
    </main>
    <footer className="site-footer"><a className="site-brand" href="#top" onClick={e=>{e.preventDefault();scrollTo('top')}}><span className="site-brand-mark"><i/><i/><i/></span><span><b>UN DIGITAL HUB</b><small>YOUR DIGITAL GROWTH PARTNER</small></span></a><p>Designing digital experiences with purpose, clarity and character.</p><div><button onClick={()=>scrollTo('discover')}>Explore</button><button onClick={onOpenStudio}>Design Studio</button><button onClick={contact}>WhatsApp enquiry</button></div><small>© {new Date().getFullYear()} UN Digital Hub. All rights reserved.</small></footer>
  </div>
}
