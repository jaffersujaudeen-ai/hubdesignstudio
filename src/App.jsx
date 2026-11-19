import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Search, Menu, X, Palette, Layers3, Shapes,
  MonitorSmartphone, Sparkles, Heart, SlidersHorizontal, Check, Copy,
  Moon, Sun, WandSparkles, ChevronDown, Send, LayoutDashboard, Grid3X3,
  Type, Image, Brush, Frame, Component, PanelsTopLeft, Smartphone,
  Tablet, Monitor, Upload, Bookmark, Eye, Plus, Download, Settings2,
  CircleHelp, Building2, FileText, Globe2, Camera, RotateCcw
} from 'lucide-react'
import Scene3D from './components/Scene3D'
import ScrollJourney from './components/ScrollJourney'
import PublicWebsite from './PublicWebsite'
import PaletteCard from './components/PaletteCard'
import PreviewWindow from './components/PreviewWindow'
import { palettes, paletteFamilies } from './data/palettes'

const navGroups = [
  { title: 'STUDIO', items: [
    ['Overview', LayoutDashboard], ['Style Guide', SlidersHorizontal],
    ['Colour Studio', Palette], ['Themes', Moon], ['Typography', Type],
    ['Iconography', Shapes], ['Mood Boards', Image], ['Components', Component],
    ['Branding', Brush], ['Wireframes', Frame], ['UI Mockups', PanelsTopLeft],
    ['Device Preview', MonitorSmartphone]
  ]},
  { title: 'WORKSPACE', items: [
    ['My Designs', Bookmark], ['Submit Brief', Send]
  ]},
  { title: 'MANAGEMENT', items: [
    ['Admin Dashboard', Settings2]
  ]}
]

const iconSet = ['arrow-up-right','layers','sparkles','heart','globe','briefcase','shopping-bag','camera','monitor','smartphone','menu','search','user','mail','calendar','chart','star','check','plus','settings','home','image','play','map-pin']
const mockups = [
  ['Corporate / Aster Group','Corporate','A confident, structured business identity.','#172554','#D9E6F5','#E0A458'],
  ['Portfolio / Forma Studio','Portfolio','A clean canvas for creative work.','#29213D','#D8C9FF','#F0A36A'],
  ['Commerce / Atelier','E-commerce','A refined storefront with clear product focus.','#27382D','#E8E1D2','#D28D65'],
  ['Hospitality / Casa','Restaurant','Warm, welcoming and editorial.','#653B32','#F0D8C4','#D5A65F'],
  ['Digital / Orbit','Technology','A bold, modern digital presence.','#111827','#38BDF8','#A78BFA'],
  ['Wellness / Serein','Healthcare','Calm, reassuring and accessible.','#285B57','#D9EDE5','#E6B89C']
]
const themePresets = [
  {name:'Classic Light',mode:'light',description:'Clean white surfaces and crisp contrast.',bg:'#F5F6F8',surface:'#FFFFFF',text:'#20232B',muted:'#737987',accent:'#5B6CFF',radius:'14px',border:'#E5E7EB'},
  {name:'Midnight Dark',mode:'dark',description:'Deep charcoal with a vivid highlight.',bg:'#101116',surface:'#1B1D26',text:'#F5F6FA',muted:'#A5A9B5',accent:'#9270FB',radius:'14px',border:'#30323D'},
  {name:'Soft Minimal',mode:'light',description:'Quiet neutral tones and generous space.',bg:'#F2F0EB',surface:'#FFFEFB',text:'#292824',muted:'#827F77',accent:'#A58B68',radius:'18px',border:'#E5E0D7'},
  {name:'Luxury Noir',mode:'dark',description:'Black surfaces with warm metallic gold.',bg:'#11100F',surface:'#201D19',text:'#F7F0E4',muted:'#B7A994',accent:'#C7A66A',radius:'10px',border:'#40382C'},
  {name:'Corporate Blue',mode:'light',description:'Trustworthy blues for business websites.',bg:'#EEF3F9',surface:'#FFFFFF',text:'#172B4D',muted:'#61738B',accent:'#2463A6',radius:'10px',border:'#D8E2EF'},
  {name:'Pastel Bloom',mode:'light',description:'Soft pastel surfaces with friendly details.',bg:'#FFF5F8',surface:'#FFFFFF',text:'#493443',muted:'#947D8C',accent:'#D879A8',radius:'22px',border:'#F1DDE7'},
  {name:'Vibrant Gradient',mode:'dark',description:'Energetic dark canvas and bright accents.',bg:'#171326',surface:'#241D3B',text:'#FAF7FF',muted:'#B7A9D1',accent:'#F48936',radius:'18px',border:'#40345D'},
  {name:'Nature Calm',mode:'light',description:'Organic greens and warm natural backgrounds.',bg:'#F1F4EC',surface:'#FFFFFF',text:'#24372B',muted:'#718174',accent:'#4C8060',radius:'16px',border:'#DCE6D9'},
  {name:'Glass Studio',mode:'dark',description:'Layered translucent surfaces and cool glow.',bg:'#111A2A',surface:'#23334A',text:'#F2F7FF',muted:'#A6B8CF',accent:'#69C8E8',radius:'20px',border:'#49617B'},
  {name:'Editorial Warmth',mode:'light',description:'Magazine-inspired cream, ink and terracotta.',bg:'#F4EEE5',surface:'#FFFCF7',text:'#29231F',muted:'#81746B',accent:'#C56D4B',radius:'6px',border:'#E6D9CB'}
]
const typefaces = [
  ['Manrope','Modern, confident and geometric','Aa Bb Cc 123','Sans serif'],
  ['DM Sans','Friendly, clear and versatile','Aa Bb Cc 123','Sans serif'],
  ['Inter','Neutral, highly readable interface font','Aa Bb Cc 123','Sans serif'],
  ['Roboto','Familiar and practical for digital products','Aa Bb Cc 123','Sans serif'],
  ['Open Sans','Humanist and comfortable for long text','Aa Bb Cc 123','Sans serif'],
  ['Lato','Warm and professional','Aa Bb Cc 123','Sans serif'],
  ['Montserrat','Bold geometric brand typography','Aa Bb Cc 123','Sans serif'],
  ['Poppins','Rounded, modern and approachable','Aa Bb Cc 123','Sans serif'],
  ['Nunito Sans','Soft, friendly and accessible','Aa Bb Cc 123','Sans serif'],
  ['Work Sans','Clean and functional','Aa Bb Cc 123','Sans serif'],
  ['Plus Jakarta Sans','Contemporary product design style','Aa Bb Cc 123','Sans serif'],
  ['Outfit','Distinctive geometric display style','Aa Bb Cc 123','Sans serif'],
  ['Space Grotesk','Digital, technical and expressive','Aa Bb Cc 123','Display'],
  ['Sora','Strong modern headings','Aa Bb Cc 123','Display'],
  ['Playfair Display','Editorial, elegant and expressive','Aa Bb Cc 123','Serif'],
  ['Cormorant Garamond','Luxury, refined and classic','Aa Bb Cc 123','Serif'],
  ['Merriweather','Traditional and readable serif','Aa Bb Cc 123','Serif'],
  ['Lora','Contemporary editorial serif','Aa Bb Cc 123','Serif'],
  ['DM Serif Display','High-impact editorial headlines','Aa Bb Cc 123','Serif'],
  ['Libre Baskerville','Classic and thoughtful','Aa Bb Cc 123','Serif'],
  ['Bodoni Moda','Fashion and luxury identity','Aa Bb Cc 123','Serif'],
  ['Roboto Slab','Confident slab-serif character','Aa Bb Cc 123','Slab serif'],
  ['JetBrains Mono','Precise developer and technical style','Aa Bb Cc 123','Monospace'],
  ['IBM Plex Mono','Structured technical typography','Aa Bb Cc 123','Monospace']
]

const components = ['Navigation bars','Hero sections','Buttons','Cards','Forms & inputs','Testimonials','Pricing tables','Product cards','Image galleries','Footers','FAQ sections','Call-to-action blocks']
const moodboards = [
  ['Quiet Luxury','Warm neutrals, tactile materials and restrained typography.',['#E9E1D5','#B8A48B','#29251F','#D1B6A0']],
  ['Digital Energy','Electric colour, sharp contrast and experimental forms.',['#111827','#9270FB','#F48936','#C6F7F5']],
  ['Organic Living','Natural greens, soft textures and open compositions.',['#294B3B','#A8B99B','#E9E4D6','#C98E67']],
  ['Modern Editorial','Oversized typography, image-led layouts and strong grids.',['#E8E5E0','#202020','#B8A5D8','#D88A65']],
  ['Soft Pastel','Gentle tones, rounded shapes and friendly expression.',['#F5DDE8','#C7DDF4','#E9E2C8','#A9BDA8']],
  ['Urban Contrast','Concrete, charcoal, metallic detail and bold accents.',['#24242A','#77777F','#D4B37B','#E9E7E2']]
]
const wireframes = ['Business homepage','Portfolio homepage','E-commerce storefront','Restaurant landing page','About page','Services page','Contact page','Product detail page','Pricing page','Dashboard overview','Login / Register','Blog article']
const iconCategories = ['Interface','Commerce','Business','Social','Media','Navigation','Communication','Technology']

function SectionHeading({ eyebrow, title, description, action }) {
  return <div className="module-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>
}

function Tile({ title, subtitle, icon: Icon, onClick }) {
  return <motion.button className="module-tile" onClick={onClick} whileHover={{ y: -7, rotateX: 2, scale: 1.015 }} whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 280, damping: 20 }}><span className="tile-icon"><Icon size={19}/></span><strong>{title}</strong><small>{subtitle}</small><ArrowUpRight size={15} className="tile-arrow"/></motion.button>
}

function StudioApp({ onExit }) {
  const [page, setPage] = useState('Overview')
  const [search, setSearch] = useState('')
  const [family, setFamily] = useState('All palettes')
  const [selected, setSelected] = useState(palettes[0])
  const [favourites, setFavourites] = useState(() => { try { return JSON.parse(localStorage.getItem('udh-favourites') || '[]') } catch { return [] } })
  const [darkPreview, setDarkPreview] = useState(false)
  const [font, setFont] = useState('Manrope')
  const [selectedTheme, setSelectedTheme] = useState(themePresets[0])
  const [iconStyle, setIconStyle] = useState('Outline')
  const [device, setDevice] = useState('Desktop')
  const [query, setQuery] = useState('')
  const [brief, setBrief] = useState({ name:'', business:'', email:'', type:'Business website', notes:'' })
  const [requests, setRequests] = useState(() => { try { return JSON.parse(localStorage.getItem('udh-design-requests') || '[]') } catch { return [] } })
  const [savedDesigns, setSavedDesigns] = useState(() => { try { return JSON.parse(localStorage.getItem('udh-saved-designs') || '[]') } catch { return [] } })
  const [mobileNav, setMobileNav] = useState(false)
  const [toast, setToast] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const root = document.documentElement
      const max = root.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => { window.removeEventListener('scroll', updateProgress); window.removeEventListener('resize', updateProgress) }
  }, [page])

  const filteredPalettes = useMemo(() => palettes.filter(p => {
    const fam = family === 'All palettes' || (family === 'Favourites' ? favourites.includes(p.id) : p.family === family)
    const q = search.toLowerCase()
    return fam && (!q || `${p.name} ${p.family} ${p.code} ${Object.values(p.colors).join(' ')}`.toLowerCase().includes(q))
  }), [family, search, favourites])

  const notify = message => { setToast(message); window.setTimeout(() => setToast(''), 2200) }
  const toggleFavourite = id => {
    const next = favourites.includes(id) ? favourites.filter(x => x !== id) : [...favourites, id]
    setFavourites(next); localStorage.setItem('udh-favourites', JSON.stringify(next))
  }
  const saveDesign = () => {
    const item = { id: `UDH-${Date.now()}`, palette: selected, font, theme: selectedTheme.name, mode: darkPreview ? 'Dark' : 'Light', savedAt: new Date().toISOString() }
    const next = [item, ...savedDesigns]
    setSavedDesigns(next); localStorage.setItem('udh-saved-designs', JSON.stringify(next)); notify('Design saved to this browser')
  }
  const submitBrief = e => {
    e.preventDefault()
    const item = { id: `DS-${new Date().getFullYear()}-${String(requests.length+1).padStart(4,'0')}`, ...brief, palette:selected, font, theme:selectedTheme.name, createdAt:new Date().toISOString(), status:'Local demo submission' }
    const next = [item, ...requests]
    setRequests(next); localStorage.setItem('udh-design-requests', JSON.stringify(next))
    setBrief({ name:'', business:'', email:'', type:'Business website', notes:'' })
    setPage('My Designs'); notify(`Brief ${item.id} saved locally`)
  }
  const go = name => { setPage(name); setMobileNav(false); window.scrollTo({top:0,behavior:'smooth'}) }

  const renderOverview = () => <>
    <div className="studio-hero">
      <div className="studio-hero-copy"><span className="eyebrow">UN DIGITAL HUB / CREATIVE WORKSPACE</span><h1>Design beyond<br/><em>the ordinary.</em></h1><p>Explore visual directions, experiment with colour and shape a website design that feels unmistakably yours.</p><div className="hero-cta-row"><button className="studio-btn primary" onClick={() => go('Colour Studio')}>Explore colour studio <ArrowRight size={16}/></button><button className="studio-btn secondary" onClick={() => go('UI Mockups')}>Browse mockups <ArrowUpRight size={15}/></button></div><div className="hero-stat-row"><div><b>520+</b><span>COLOUR PALETTES</span></div><div><b>13</b><span>DESIGN COLLECTIONS</span></div><div><b>15</b><span>STUDIO MODULES</span></div></div></div>
      <div className="studio-hero-art"><div className="hero-art-glow"/><Scene3D/><div className="hero-art-tag tag-a">3D CREATIVE SPACE</div><div className="hero-art-tag tag-b">COLOUR · FORM · MOTION</div></div>
    </div>
    <div className="motion-showcase" aria-label="Design studio motion previews">
      <div className="motion-card motion-card-orbit"><span>01 / DIMENSION</span><div className="orbit-object"><i/><b/><em/></div><strong>Think in layers.</strong><small>Depth, light and form</small></div>
      <div className="motion-card motion-card-fluid"><span>02 / MOVEMENT</span><div className="fluid-object"><i/><b/><em/></div><strong>Move with purpose.</strong><small>Subtle, responsive motion</small></div>
      <div className="motion-card motion-card-glass"><span>03 / MATERIAL</span><div className="glass-object"><i/><b/></div><strong>Make it tangible.</strong><small>Glass, metal and soft light</small></div>
    </div>
    <ScrollJourney />
    <div className="module-section-head"><div><span className="eyebrow">YOUR CREATIVE TOOLKIT</span><h2>Explore the studio</h2></div><span className="muted">Choose a module to get started</span></div>
    <div className="module-tiles">
      <Tile title="Style Guide" subtitle="Variables, spacing and visual rules" icon={SlidersHorizontal} onClick={() => go('Style Guide')}/>
      <Tile title="Colour Studio" subtitle="520+ curated colour combinations" icon={Palette} onClick={() => go('Colour Studio')}/>
      <Tile title="Typography" subtitle="Fonts and type pairings" icon={Type} onClick={() => go('Typography')}/>
      <Tile title="Iconography" subtitle="Icon styles and visual language" icon={Shapes} onClick={() => go('Iconography')}/>
      <Tile title="Mood Boards" subtitle="Find your visual direction" icon={Image} onClick={() => go('Mood Boards')}/>
      <Tile title="Components" subtitle="Reusable interface elements" icon={Component} onClick={() => go('Components')}/>
      <Tile title="Branding" subtitle="Build a consistent identity" icon={Brush} onClick={() => go('Branding')}/>
      <Tile title="Wireframes" subtitle="Plan page structure" icon={Frame} onClick={() => go('Wireframes')}/>
      <Tile title="UI Mockups" subtitle="Browse complete website concepts" icon={PanelsTopLeft} onClick={() => go('UI Mockups')}/>
      <Tile title="Device Preview" subtitle="Desktop, tablet and mobile" icon={MonitorSmartphone} onClick={() => go('Device Preview')}/>
    </div>
    <div className="overview-bottom-grid"><div className="overview-callout"><span className="eyebrow">A BETTER WAY TO BEGIN</span><h2>Start with a direction.<br/><em>Finish with confidence.</em></h2><p>Save your favourite options and share your design preferences with the UN Digital Hub team.</p><button className="studio-btn primary" onClick={() => go('Submit Brief')}>Create a design brief <ArrowRight size={15}/></button></div><div className="overview-mini-preview"><span className="eyebrow">CURRENT SELECTION</span><h3>{selected.name}</h3><div className="mini-swatches">{Object.values(selected.colors).map((c,i)=><i key={i} style={{background:c}}/>)}</div><p>{selected.family} · {selected.code}</p><button className="text-action" onClick={() => go('Colour Studio')}>Change palette <ArrowUpRight size={14}/></button></div></div>
  </>

  const renderColours = () => <><SectionHeading eyebrow="02 / COLOUR SYSTEMS" title="Colour Studio" description="Explore 520 three-colour combinations. Choose a palette and preview how it works across a website interface." action={<span className="count-pill">520 PALETTES</span>}/><div className="colour-layout"><aside className="filter-panel"><b>COLLECTIONS</b><button className={family==='All palettes'?'chosen':''} onClick={()=>setFamily('All palettes')}>All palettes <span>520</span></button><button className={family==='Favourites'?'chosen':''} onClick={()=>setFamily('Favourites')}>Favourites <span>{favourites.length}</span></button>{paletteFamilies.map((f,i)=><button key={f} className={family===f?'chosen':''} onClick={()=>setFamily(f)}><i style={{background:['#b69c70','#4776bd','#b5a99b','#9a72db','#db6d9f','#649a70','#bd754e','#4da7bb','#d7a9d7','#ec5e54','#888','#ad667a','#48c2c5'][i]}}/>{f}<span>40</span></button>)}</aside><div className="colour-results"><div className="tool-row"><div><b>{family}</b><small>{filteredPalettes.length} combinations</small></div><label className="search-box"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search palettes..."/></label></div><div className="all-palette-grid">{filteredPalettes.map(p=><PaletteCard key={p.id} palette={p} active={selected.id===p.id} favourite={favourites.includes(p.id)} onSelect={setSelected} onFavourite={toggleFavourite}/>)}</div></div></div><div className="palette-preview-area"><div className="palette-preview-info"><span className="eyebrow">SELECTED / {selected.code}</span><h2>{selected.name}</h2><p>Primary, secondary and accent colours.</p>{Object.entries(selected.colors).map(([k,v])=><div className="token-row" key={k}><i style={{background:v}}/><span>{k}</span><b>{v}</b></div>)}<div className="action-row"><button className="studio-btn primary" onClick={saveDesign}>Save this design <Bookmark size={15}/></button><button className="studio-btn secondary" onClick={()=>go('Submit Brief')}>Use in my brief <ArrowRight size={15}/></button></div></div><div className="palette-preview-live"><div className="preview-tools"><b>LIVE WEBSITE PREVIEW</b><div><button className={darkPreview?'':'active'} onClick={()=>setDarkPreview(false)}><Sun size={13}/> Light</button><button className={darkPreview?'active':''} onClick={()=>setDarkPreview(true)}><Moon size={13}/> Dark</button></div></div><PreviewWindow palette={selected} mode={darkPreview?'dark':'light'}/></div></div></>

  const renderStyleGuide = () => <><SectionHeading eyebrow="01 / FOUNDATIONS" title="Style Guide & Variables" description="Set the visual rules that keep every page consistent. These are editable starter tokens for your design direction."/><div className="foundation-grid"><div className="foundation-card"><span className="eyebrow">COLOUR TOKENS</span><h3>Core palette</h3><div className="token-swatches">{Object.entries(selected.colors).map(([k,v])=><div key={k}><i style={{background:v}}/><b>{k}</b><small>{v}</small></div>)}</div></div><div className="foundation-card"><span className="eyebrow">TYPOGRAPHY</span><h3>Type scale</h3>{[['Display','48px'],['Heading 1','36px'],['Heading 2','28px'],['Heading 3','22px'],['Body','16px'],['Caption','12px']].map(x=><div className="scale-row" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</div><div className="foundation-card"><span className="eyebrow">SPACING</span><h3>Spacing scale</h3><div className="spacing-list">{[4,8,12,16,24,32,48,64,80].map(n=><div key={n}><span>{n}px</span><i style={{width:n*2.2}}/></div>)}</div></div><div className="foundation-card"><span className="eyebrow">SHAPE & DEPTH</span><h3>Radius and elevation</h3><div className="shape-samples"><i/><i/><i/></div><div className="scale-row"><span>Small radius</span><b>6px</b></div><div className="scale-row"><span>Card radius</span><b>14px</b></div><div className="scale-row"><span>Large radius</span><b>24px</b></div></div></div><div className="code-panel"><div><span className="eyebrow">CSS CUSTOM PROPERTIES</span><button className="text-action" onClick={()=>{navigator.clipboard?.writeText(`:root { --primary: ${selected.colors.primary}; --secondary: ${selected.colors.secondary}; --accent: ${selected.colors.accent}; --radius-card: 14px; --space-section: 80px; }`);notify('CSS variables copied')}}><Copy size={14}/> Copy variables</button></div><pre>{`:root {\n  --color-primary: ${selected.colors.primary};\n  --color-secondary: ${selected.colors.secondary};\n  --color-accent: ${selected.colors.accent};\n  --font-heading: '${font}';\n  --radius-card: 14px;\n  --spacing-section: 80px;\n}`}</pre></div></>

  const renderThemes = () => <><SectionHeading eyebrow="03 / APPEARANCE" title="Theme Studio" description="Choose from 10 ready-made visual themes. Every option has a live sample and a clear style preview." action={<span className="count-pill">10 THEMES</span>}/><div className="theme-gallery">{themePresets.map((t,i)=><button key={t.name} className={`theme-option ${selectedTheme.name===t.name?'active':''}`} onClick={()=>{setSelectedTheme(t);setDarkPreview(t.mode==='dark');notify(`${t.name} theme selected`)}}><div className="theme-art" style={{background:t.bg,color:t.text,borderColor:t.border,borderRadius:t.radius}}><div className="theme-art-top"><i style={{background:t.accent}}/><i/><i/></div><div className="theme-art-body"><span style={{background:t.accent}}/><b style={{color:t.text}}>Aa</b><i style={{background:t.surface,borderColor:t.border}}/><i style={{background:t.surface,borderColor:t.border}}/></div><small style={{color:t.muted}}>DESIGN PREVIEW</small></div><span className="theme-option-info"><b>{String(i+1).padStart(2,'0')} · {t.name}</b><small>{t.description}</small><em>{t.mode.toUpperCase()} THEME {selectedTheme.name===t.name?' · SELECTED':''}</em></span></button>)}</div><div className="theme-selected-panel" style={{background:selectedTheme.bg,color:selectedTheme.text,borderColor:selectedTheme.border}}><div><span className="eyebrow" style={{color:selectedTheme.muted}}>SELECTED THEME</span><h2>{selectedTheme.name}</h2><p style={{color:selectedTheme.muted}}>{selectedTheme.description}</p><div className="theme-token-row"><span>Background <b>{selectedTheme.bg}</b></span><span>Surface <b>{selectedTheme.surface}</b></span><span>Accent <b>{selectedTheme.accent}</b></span></div></div><div className="theme-selected-card" style={{background:selectedTheme.surface,borderColor:selectedTheme.border,borderRadius:selectedTheme.radius}}><b style={{color:selectedTheme.text}}>Build a better first impression.</b><p style={{color:selectedTheme.muted}}>A simple preview of your selected theme and colour direction.</p><button style={{background:selectedTheme.accent}}>Explore more</button></div></div></>

  const renderTypography = () => <><SectionHeading eyebrow="04 / TYPE SYSTEMS" title="Typography Library" description="Explore 24 font families. Select any font to see a larger live specimen and use it in your design brief." action={<span className="count-pill">24 FONT STYLES</span>}/><div className="type-layout"><div className="type-list">{typefaces.map(t=><button key={t[0]} className={font===t[0]?'active':''} onClick={()=>setFont(t[0])}><span><b style={{fontFamily:`'${t[0]}',sans-serif`}}>{t[0]}</b><small>{t[1]}</small></span><span className="type-category">{t[3]}</span></button>)}</div><div className="type-specimen"><span className="eyebrow">LIVE TYPE SPECIMEN / {font}</span><div className="specimen-display" style={{fontFamily:`'${font}',sans-serif`}}>Make your next move matter.</div><p style={{fontFamily:`'${font}',sans-serif`}}>A considered digital experience begins with a clear message and a distinctive visual voice. Choose a type system that makes your brand feel consistent, confident and easy to understand.</p><div className="specimen-scale" style={{fontFamily:`'${font}',sans-serif`}}><span>ABCDEFGHIJKLMNOPQRSTUVWXYZ</span><span>abcdefghijklmnopqrstuvwxyz</span><span>0123456789 !?&@</span></div><div className="scale-row"><span>Selected font</span><b>{font}</b></div><div className="font-size-samples"><span style={{fontFamily:`'${font}',sans-serif`,fontSize:34}}>Aa</span><span style={{fontFamily:`'${font}',sans-serif`,fontSize:24}}>Heading 2</span><span style={{fontFamily:`'${font}',sans-serif`,fontSize:16}}>Body text preview for readable website content.</span></div></div></div></>

  const renderIconography = () => <><SectionHeading eyebrow="05 / VISUAL LANGUAGE" title="Iconography Library" description="Choose an icon family and browse common interface symbols. Production assets can be replaced with your licensed or custom SVG library."/><div className="segmented">{['Outline','Filled','Rounded','Duotone'].map(s=><button className={iconStyle===s?'active':''} onClick={()=>setIconStyle(s)} key={s}>{s}</button>)}</div><div className="icon-category-grid">{iconCategories.map((c,i)=><button key={c} onClick={()=>setQuery(c)} className={query===c?'active':''}>{c}<span>{i*8+16} icons</span></button>)}</div><div className="icon-library-grid">{iconSet.filter(x=>!query||iconCategories.some(c=>c===query)).map((name,i)=>{const Icon=[ArrowUpRight,Layers3,Sparkles,Heart,Globe2,Building2,Shapes,Camera,Monitor,Smartphone,Menu,Search,Eye,Send,Frame,Grid3X3,Check,Plus,Settings2,LayoutDashboard][i%20];return <div key={name}><Icon size={22} strokeWidth={iconStyle==='Rounded'?2.6:1.6}/><span>{name.replaceAll('-',' ')}</span></div>})}</div><p className="subtle-note">Icon display is a sample library. Your production catalogue should include searchable SVG assets, licensing information and download controls.</p></>

  const renderMoodboards = () => <><SectionHeading eyebrow="06 / CREATIVE DIRECTION" title="Mood Board Gallery" description="Choose the feeling before choosing the details. Each board gives your project a visual direction."/><div className="moodboard-grid">{moodboards.map((m,i)=><article className="moodboard-card" key={m[0]}><div className={`moodboard-art mood-${i}`}>{m[2].map((c,j)=><i key={j} style={{background:c}}/>)}<span>{String(i+1).padStart(2,'0')}</span></div><div className="moodboard-info"><div><h3>{m[0]}</h3><p>{m[1]}</p></div><button onClick={()=>{setSelected(palettes[i*40]);notify(`${m[0]} direction selected as a starting point`)}}><ArrowUpRight size={17}/></button></div></article>)}</div></>

  const renderComponents = () => <><SectionHeading eyebrow="07 / UI ELEMENTS" title="Components Library" description="Browse reusable interface building blocks. Select a component category to inspect its design examples."/><div className="component-library-layout"><div className="component-categories">{components.map((c,i)=><button key={c} onClick={()=>setQuery(c)} className={query===c?'active':''}>{c}<ArrowUpRight size={14}/></button>)}</div><div className="component-showcase"><span className="eyebrow">COMPONENT PREVIEW / {query||'BUTTONS & CARDS'}</span><div className="component-preview-box"><div className="component-preview-nav"><b>Brand<span>.</span></b><div>Home　 About　 Services</div><button style={{background:selected.colors.primary}}>Contact</button></div><div className="component-preview-hero"><small>DESIGN SYSTEM / SAMPLE</small><h2>Good design<br/>starts with <em>clarity.</em></h2><p>Build consistent experiences with reusable components.</p><button style={{background:selected.colors.accent}}>Explore components <ArrowRight size={14}/></button></div><div className="sample-cards"><div><i style={{background:selected.colors.primary}}/><b>Primary card</b><small>Content and supporting details.</small></div><div><i style={{background:selected.colors.accent}}/><b>Accent card</b><small>Highlight a key feature.</small></div><div><i style={{background:selected.colors.secondary}}/><b>Secondary card</b><small>Supporting information.</small></div></div></div></div></div></>

  const renderBranding = () => <><SectionHeading eyebrow="08 / BRAND IDENTITY" title="Branding Studio" description="Bring your business identity into the design process. Add your brand details and see them reflected in a simple identity board."/><div className="branding-layout"><form className="brand-form" onSubmit={e=>{e.preventDefault();notify('Brand profile saved in this browser')}}><label>Business / brand name<input placeholder="Your brand name"/></label><label>Tagline<input placeholder="Your brand promise"/></label><label>Brand personality<select><option>Modern & professional</option><option>Luxury & premium</option><option>Friendly & approachable</option><option>Bold & energetic</option><option>Minimal & calm</option></select></label><label>Brand description<textarea rows="4" placeholder="Describe your business and audience"/></label><button className="studio-btn primary">Save brand profile <Check size={15}/></button></form><div className="brand-board"><span className="eyebrow">BRAND IDENTITY PREVIEW</span><div className="brand-logo-demo">YOUR<span>BRAND</span><i>®</i></div><p>YOUR TAGLINE GOES HERE</p><div className="brand-board-colours">{Object.values(selected.colors).map((c,i)=><i key={i} style={{background:c}}/>)}</div><div className="brand-board-footer"><span>VISUAL IDENTITY / 001</span><span>{font.toUpperCase()}</span></div></div></div></>

  const renderWireframes = () => <><SectionHeading eyebrow="09 / PAGE STRUCTURE" title="Wireframe Library" description="Plan the content and hierarchy before visual styling. Choose a page structure to inspect its basic layout."/><div className="wireframe-grid">{wireframes.map((w,i)=><button key={w} className="wireframe-card" onClick={()=>{setQuery(w);notify(`${w} wireframe selected`)}}><div className="wireframe-visual"><div className="wf-nav"/><div className="wf-hero"><i/><i/></div><div className="wf-row"><i/><i/><i/></div><div className="wf-footer"/></div><span className="eyebrow">WIREFRAME / {String(i+1).padStart(2,'0')}</span><b>{w}</b><small>Low-fidelity layout preview</small></button>)}</div></>

  const renderMockups = () => <><SectionHeading eyebrow="10 / WEBSITE CONCEPTS" title="UI Mockup Gallery" description="Explore complete visual directions for different website categories. Select a concept to use its palette as your starting point."/><div className="mockup-grid">{mockups.map((m,i)=><article className="mockup-card" key={m[0]}><div className="mockup-screen" style={{background:m[3]}}><div className="mockup-screen-nav"><b>{m[0].split('/')[1].trim().toUpperCase().slice(0,10)}.</b><span>ABOUT　 WORK　 CONTACT</span></div><div className="mockup-screen-content"><small>{m[1].toUpperCase()} / DIGITAL EXPERIENCE</small><h3 style={{color:m[5]}}>A better<br/>way to <em>connect.</em></h3><div className="mockup-shape" style={{background:m[4]}}/><button style={{background:m[5]}}>Explore <ArrowUpRight size={12}/></button></div></div><div className="mockup-card-info"><div><span className="eyebrow">{m[1]}</span><h3>{m[0]}</h3><p>{m[2]}</p></div><button onClick={()=>{const p=palettes[(i+3)*40];setSelected(p);notify(`${m[0]} concept selected`)}}><ArrowUpRight size={17}/></button></div></article>)}</div></>

  const renderDevice = () => <><SectionHeading eyebrow="11 / RESPONSIVE EXPERIENCE" title="Device Preview" description="Review how your selected design direction adapts across desktop, tablet and mobile screen sizes."/><div className="device-toolbar">{[['Desktop',Monitor],['Tablet',Tablet],['Mobile',Smartphone]].map(([d,I])=><button key={d} className={device===d?'active':''} onClick={()=>setDevice(d)}><I size={16}/>{d}</button>)}</div><div className={`device-stage ${device.toLowerCase()}`}><div className="device-frame"><PreviewWindow palette={selected} mode={darkPreview?'dark':'light'}/></div></div><div className="device-note"><Check size={16}/> Preview uses the selected palette: {selected.code}. Actual responsive layouts are finalised during website design.</div></>

  const renderMyDesigns = () => <><SectionHeading eyebrow="12 / CUSTOMER WORKSPACE" title="My Designs" description="Your saved design directions and submitted briefs are stored in this browser prototype."/><div className="workspace-block"><h3>Saved design directions <span>{savedDesigns.length}</span></h3>{savedDesigns.length===0?<div className="empty-workspace"><Bookmark size={25}/><b>No saved designs yet</b><p>Choose a colour palette and save your design direction.</p><button className="studio-btn primary" onClick={()=>go('Colour Studio')}>Explore palettes</button></div>:<div className="saved-grid">{savedDesigns.map(d=><div className="saved-card" key={d.id}><div className="mini-swatches">{Object.values(d.palette.colors).map((c,i)=><i key={i} style={{background:c}}/>)}</div><b>{d.palette.name}</b><small>{d.id} · {d.theme||d.mode+' theme'} · {d.font}</small><button className="text-action" onClick={()=>{setSelected(d.palette);setFont(d.font);setSelectedTheme(themePresets.find(t=>t.name===d.theme)||themePresets[0]);go('Colour Studio')}}>Open design <ArrowUpRight size={14}/></button></div>)}</div>}</div><div className="workspace-block"><h3>Submitted design briefs <span>{requests.length}</span></h3>{requests.length===0?<div className="empty-workspace"><FileText size={25}/><b>No design briefs submitted</b><p>Share your preferences with UN Digital Hub.</p><button className="studio-btn primary" onClick={()=>go('Submit Brief')}>Create a brief <ArrowRight size={15}/></button></div>:<div className="request-list">{requests.map(r=><div key={r.id}><div><b>{r.business||r.name}</b><small>{r.id} · {r.type} · {new Date(r.createdAt).toLocaleDateString()}</small></div><span className="status-pill">Local demo</span></div>)}</div>}</div></>

  const renderBrief = () => <><SectionHeading eyebrow="13 / SHARE YOUR DIRECTION" title="Design Brief" description="Tell us about your business and share the design direction you have selected. This prototype stores submissions locally only."/><div className="brief-layout"><form className="brand-form brief-form" onSubmit={e=>{e.preventDefault();const item={id:`DS-${new Date().getFullYear()}-${String(requests.length+1).padStart(4,'0')}`,...brief,palette:selected,font,theme:selectedTheme.name,createdAt:new Date().toISOString()};const next=[item,...requests];setRequests(next);localStorage.setItem('udh-design-requests',JSON.stringify(next));setBrief({name:'',business:'',email:'',type:'Business website',notes:''});notify(`Brief ${item.id} saved locally`);go('My Designs')}}><label>Your name<input required value={brief.name} onChange={e=>setBrief({...brief,name:e.target.value})} placeholder="Full name"/></label><label>Business name<input value={brief.business} onChange={e=>setBrief({...brief,business:e.target.value})} placeholder="Business or brand"/></label><label>Email address<input type="email" required value={brief.email} onChange={e=>setBrief({...brief,email:e.target.value})} placeholder="you@example.com"/></label><label>Website category<select value={brief.type} onChange={e=>setBrief({...brief,type:e.target.value})}><option>Business website</option><option>Portfolio website</option><option>E-commerce website</option><option>Restaurant website</option><option>Healthcare website</option><option>Real estate website</option><option>Landing page</option><option>Web application</option></select></label><label>Project requirements<textarea rows="5" value={brief.notes} onChange={e=>setBrief({...brief,notes:e.target.value})} placeholder="Tell us what you want your website to achieve..."/></label><div className="brief-actions"><button className="studio-btn secondary" type="button" onClick={() => { const colours = Object.entries(selected.colors).map(([k,v]) => `${k}: ${selected.name} - ${v}`).join('\n'); const message = `Hello UN Digital Hub,\n\nI would like to discuss my selected design.\n\nName: ${brief.name}\nBusiness: ${brief.business}\nService: ${brief.type}\nSelected palette: ${selected.name}\n${colours}\nTheme: ${selectedTheme.name}\nTypography: ${font}\nRequirements: ${brief.notes || 'Please contact me to discuss.'}\n\nSent through UN Digital Hub Design Studio.`; let number = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, ''); if (!number) number = (window.prompt('Enter your UN Digital Hub WhatsApp number with country code, digits only. Example: 919876543210') || '').replace(/\D/g, ''); if (number.length >= 10) window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); }}>Send enquiry on WhatsApp <Send size={15}/></button><button className="studio-btn primary" type="submit">Save locally <Bookmark size={15}/></button></div><small className="subtle-note">WhatsApp opens with your selected design details. Saved designs stay in this browser only.</small></form><div className="brief-summary"><span className="eyebrow">YOUR CURRENT DESIGN DIRECTION</span><h3>{selected.name}</h3><p>{selected.family} · {font} · {selectedTheme.name}</p><div className="summary-swatches">{Object.entries(selected.colors).map(([k,v])=><div key={k}><i style={{background:v}}/><span>{k}</span><b>{v}</b></div>)}</div><button className="text-action" onClick={()=>go('Colour Studio')}>Change selected palette <ArrowUpRight size={14}/></button></div></div></>

  const renderAdmin = () => <><SectionHeading eyebrow="14 / INTERNAL MANAGEMENT" title="Admin Dashboard" description="A front-end admin overview for catalogue planning. Authentication and protected administration are not connected in this prototype."/><div className="admin-stats"><div><span>PALETTES</span><b>520</b><small>13 collections</small></div><div><span>THEME PRESETS</span><b>10</b><small>Ready to select</small></div><div><span>SAVED DESIGNS</span><b>{savedDesigns.length}</b><small>This browser</small></div><div><span>BRIEF SUBMISSIONS</span><b>{requests.length}</b><small>This browser</small></div></div><div className="admin-grid"><div className="admin-panel"><span className="eyebrow">CATALOGUE MANAGEMENT</span><h3>Studio collections</h3>{['Colour palettes','Themes','Typography','Iconography','Mood boards','Components','Wireframes','UI mockups'].map((x,i)=><div className="admin-row" key={x}><span>{x}</span><b>{[520,10,24,24,6,12,12,6][i]}</b><button onClick={()=>go(['Colour Studio','Themes','Typography','Iconography','Mood Boards','Components','Wireframes','UI Mockups'][i])}>Manage <ArrowUpRight size={12}/></button></div>)}</div><div className="admin-panel"><span className="eyebrow">RECENT LOCAL SUBMISSIONS</span><h3>Design requests</h3>{requests.length===0?<p className="subtle-note">No local demo submissions yet.</p>:requests.slice(0,5).map(r=><div className="admin-row" key={r.id}><span>{r.business||r.name}<small>{r.id}</small></span><b className="status-pill">New</b></div>)}</div></div></>

  const pageRender = {
    'Overview':renderOverview, 'Style Guide':renderStyleGuide, 'Colour Studio':renderColours,
    'Themes':renderThemes, 'Typography':renderTypography, 'Iconography':renderIconography,
    'Mood Boards':renderMoodboards, 'Components':renderComponents, 'Branding':renderBranding,
    'Wireframes':renderWireframes, 'UI Mockups':renderMockups, 'Device Preview':renderDevice,
    'My Designs':renderMyDesigns, 'Submit Brief':renderBrief, 'Admin Dashboard':renderAdmin
  }

  return <div className="studio-app">
    <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
    <div className="ambient-glow ambient-glow-one"/><div className="ambient-glow ambient-glow-two"/>
    <aside className={`studio-sidebar ${mobileNav?'mobile-open':''}`}>
      <div className="sidebar-brand"><div className="brand-symbol"><span/><span/><span/></div><div><b>UN DIGITAL HUB</b><small>DESIGN STUDIO</small></div><button className="sidebar-close" onClick={()=>setMobileNav(false)}><X size={17}/></button></div>
      <div className="sidebar-scroll">{navGroups.map(group=><div className="nav-group" key={group.title}><span className="nav-group-title">{group.title}</span>{group.items.map(([name,Icon])=><button key={name} className={`side-link ${page===name?'active':''}`} onClick={()=>go(name)}><Icon size={16}/>{name}{name==='Colour Studio'&&<i>520</i>}</button>)}</div>)}</div>
      <div className="sidebar-bottom"><div className="help-card"><CircleHelp size={17}/><b>Need a hand?</b><small>Our team can help shape your direction.</small><button onClick={()=>go('Submit Brief')}>Talk to us <ArrowUpRight size={13}/></button></div><div className="profile-mini"><div>UD</div><span><b>UN Digital Hub</b><small>Studio workspace</small></span><Settings2 size={15}/></div></div>
    </aside>
    <div className="studio-main">
      <header className="studio-topbar"><button className="mobile-nav-toggle" onClick={()=>setMobileNav(true)}><Menu size={19}/></button><div className="breadcrumbs">UN DIGITAL HUB <span>/</span> <b>{page.toUpperCase()}</b></div><div className="topbar-right"><button className="studio-exit-link" onClick={onExit}><ArrowRight size={14}/> Back to website</button><span className="prototype-label"><i/> STUDIO</span><button className="topbar-cta" onClick={()=>go('Submit Brief')}>Start a project <ArrowUpRight size={14}/></button></div></header>
      <main className="studio-content"><AnimatePresence mode="wait" initial={false}><motion.div key={page} className="page-transition" initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(5px)' }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>{pageRender[page]?.()}</motion.div></AnimatePresence></main>
      <footer className="studio-footer"><span>© {new Date().getFullYear()} UN Digital Hub</span><span>YOUR VISION. YOUR DESIGN. OUR EXPERTISE.</span><span>DESIGN STUDIO / V3.0</span></footer>
    </div>
    {toast&&<div className="toast"><Check size={16}/>{toast}</div>}
  </div>
}

export default function App() {
  const [view, setView] = useState('website')
  return view === 'studio'
    ? <StudioApp onExit={() => { setView('website'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
    : <PublicWebsite onOpenStudio={() => { setView('studio'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
}
