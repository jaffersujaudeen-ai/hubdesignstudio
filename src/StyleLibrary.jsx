import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Search, RotateCcw, SlidersHorizontal, MessageCircle, X } from 'lucide-react'

const groups = [
  ['01–05','Clean & Professional',['Swiss Clarity','Corporate Precision','Minimal Grid','Modern Consulting','Quiet Interface']],
  ['06–10','People & Campaigns',['Human Stories','Culture in Motion','Portrait Editorial','Community First','Campaign Energy']],
  ['11–15','Retro-Futuristic & Tech',['Neo Future','Cyber Systems','Chrome Interface','Digital Nostalgia','Future Lab']],
  ['16–20','Bold & Raw',['Brutalist Impact','Anti-Grid','Raw Typography','Experimental Blocks','Unfiltered Studio']],
  ['21–25','Luxury & Premium',['Quiet Luxury','Noir Prestige','Modern Heritage','Gold Standard','Refined Elegance']],
  ['26–30','Retro & Nostalgic',['Analog Revival','Vintage Modern','Y2K Pulse','Retro Diner','Archive Rewind']],
  ['31–35','Print & Texture',['Editorial Print','Paper Craft','Ink & Grain','Risograph Studio','Tactile Layers']],
  ['36–40','Concept & Collage',['Surreal Composition','Dream Assembly','Cut & Paste','Mixed Media','Art Direction']],
  ['41–45','Product Advertising',['Product Spotlight','Sculpted Objects','Beauty Campaign','Tech Showcase','Motion Product']],
  ['46–50','Playful & Illustrated',['Playful Geometry','Character World','Soft 3D','Illustrated Story','Colour Pop']],
  ['51–55','Nature & Organic',['Botanical Calm','Earth Form','Fluid Nature','Organic Matter','Sustainable Future']],
  ['56–60','Architecture & Spaces',['Spatial Minimalism','Monumental Forms','Interior Journal','Urban Geometry','Light & Structure']],
  ['61–65','Editorial & Typography',['Type as Image','Magazine Culture','Serif Expression','Letterform Lab','Editorial Motion']],
  ['66–70','Minimal & Monochrome',['Monochrome Focus','Essential Forms','Black & White','Quiet Contrast','Ultra Minimal']],
  ['71–75','Motion & Experimental',['Kinetic Identity','Motion Grammar','Liquid Transitions','Interactive Canvas','Generative Energy']]
]

const tagPool = ['Minimal','3D','Motion','Editorial','Typography','Texture','Campaign','Interactive','Experimental','Luxury','Retro','Illustration','Product','Photography','Brutalist','Organic','Architecture','Monochrome','Storytelling','Responsive']
const techPool = ['React','Three.js','GSAP','WebGL','Framer Motion','CSS','Webflow','Lottie','Shopify','Vite']
const styleItems = groups.flatMap((group, gi) => group[2].map((name, si) => {
  const n = gi * 5 + si + 1
  const tags = [tagPool[(n * 2 + gi) % tagPool.length], tagPool[(n * 3 + 4) % tagPool.length], tagPool[(n * 5 + 7) % tagPool.length]].filter((v, i, a) => a.indexOf(v) === i)
  const tech = [techPool[(n + gi) % techPool.length], techPool[(n * 3 + 2) % techPool.length], techPool[(n * 7 + 1) % techPool.length]].filter((v, i, a) => a.indexOf(v) === i)
  return { id:n, name, range:group[0], group:group[1], tags, tech, hue:(n * 37 + gi * 19) % 360, index:String(n).padStart(2,'0') }
}))

const allTags = ['All tags', ...tagPool]
const allTech = ['All technologies', ...techPool]

function whatsapp(message) {
  let number = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
  if (!number) number = (window.prompt('Enter your UN Digital Hub WhatsApp number with country code. Example: 919876543210') || '').replace(/\D/g, '')
  if (number.length >= 10) window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}

export default function StyleLibrary() {
  const [group, setGroup] = useState('All styles')
  const [tag, setTag] = useState('All tags')
  const [tech, setTech] = useState('All technologies')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const visible = useMemo(() => styleItems.filter(item =>
    (group === 'All styles' || item.group === group) &&
    (tag === 'All tags' || item.tags.includes(tag)) &&
    (tech === 'All technologies' || item.tech.includes(tech)) &&
    (!search || `${item.name} ${item.group} ${item.tags.join(' ')} ${item.tech.join(' ')}`.toLowerCase().includes(search.toLowerCase()))
  ), [group, tag, tech, search])
  const reset = () => { setGroup('All styles'); setTag('All tags'); setTech('All technologies'); setSearch('') }
  const enquire = item => whatsapp([
    'Hello UN Digital Hub,', '',
    'I found a visual style in your Style Library and would like to discuss a project.', '',
    `Selected style: ${item.name}`,
    `Style number: ${item.index}`,
    `Collection: ${item.group} (${item.range})`,
    `Tags: ${item.tags.join(', ')}`,
    `Suggested technologies: ${item.tech.join(', ')}`,
    '', 'Please contact me to discuss the design and quotation.',
    '', 'Sent through the UN Digital Hub website.'
  ].join('\n'))

  return <section className="style-library section-pad" id="style-library">
    <div className="style-library-heading">
      <div><span className="site-kicker">THE UN DESIGN INDEX / 001–075</span><h2>Find your visual <em>language.</em></h2><p>Explore 75 original style directions. Filter by creative category, tags or technology, then send your selection to our team on WhatsApp.</p></div>
      <div className="style-total"><b>75</b><span>STYLE DIRECTIONS</span><small>15 collections · 5 styles each</small></div>
    </div>
    <div className="style-library-tools">
      <label className="style-library-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search styles, tags or technology"/><kbd>75</kbd></label>
      <button className={`style-filter-toggle ${filtersOpen?'active':''}`} onClick={()=>setFiltersOpen(v=>!v)}><SlidersHorizontal size={15}/> Filters <span>{(group!=='All styles'?1:0)+(tag!=='All tags'?1:0)+(tech!=='All technologies'?1:0)}</span></button>
      <button className="style-reset" onClick={reset}><RotateCcw size={14}/> Reset</button>
    </div>
    <div className={`style-filter-drawer ${filtersOpen?'open':''}`}>
      <div className="style-filter-block"><span>01 / STYLE COLLECTION</span><div className="style-filter-chips"><button className={group==='All styles'?'active':''} onClick={()=>setGroup('All styles')}>All styles <b>75</b></button>{groups.map(g=><button key={g[1]} className={group===g[1]?'active':''} onClick={()=>setGroup(g[1])}><small>STYLES {g[0]}</small>{g[1]}</button>)}</div></div>
      <div className="style-filter-block"><span>02 / CREATIVE TAGS</span><div className="style-filter-chips compact">{allTags.map(t=><button key={t} className={tag===t?'active':''} onClick={()=>setTag(t)}>{t==='All tags'?t:`#${t}`}</button>)}</div></div>
      <div className="style-filter-block"><span>03 / TECHNOLOGY</span><div className="style-filter-chips compact">{allTech.map(t=><button key={t} className={tech===t?'active':''} onClick={()=>setTech(t)}>{t}</button>)}</div></div>
    </div>
    <div className="style-results-line"><span>SHOWING <b>{String(visible.length).padStart(2,'0')}</b> OF 75 DIRECTIONS</span><span>SELECT A STYLE TO VIEW DETAILS & ENQUIRE</span></div>
    <motion.div layout className="style-direction-grid">
      <AnimatePresence mode="popLayout">
        {visible.map((item, i)=><motion.article layout key={item.id} className={`style-direction-card ${expanded===item.id?'expanded':''}`} style={{'--style-hue':item.hue}} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.96}} transition={{duration:.28,delay:Math.min(i*.012,.12)}}>
          <button className="style-artwork" onClick={()=>setExpanded(expanded===item.id?null:item.id)} aria-label={`View ${item.name}`}>
            <span className="style-art-no">STYLE / {item.index}</span><span className={`style-art-object object-${item.id%8}`}><i/><b/><em/></span><span className="style-art-caption">{item.name}</span><span className="style-art-open">{expanded===item.id?'CLOSE':'EXPLORE'} <ArrowUpRight size={13}/></span>
          </button>
          <div className="style-direction-meta"><span>{item.range} / {item.group}</span><h3>{item.name}</h3><div className="style-card-tags">{item.tags.map(t=><button key={t} onClick={()=>setTag(t)}>#{t}</button>)}</div>
            <AnimatePresence>{expanded===item.id&&<motion.div className="style-details" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><div><b>Suggested stack</b><p>{item.tech.join(' · ')}</p></div><div><b>Creative direction</b><p>Use this style as a starting point for layout, colour, typography, imagery and interaction decisions.</p></div><button onClick={()=>enquire(item)}><MessageCircle size={14}/> Enquire about this style <ArrowUpRight size={13}/></button></motion.div>}</AnimatePresence>
          </div>
        </motion.article>)}
      </AnimatePresence>
    </motion.div>
    {visible.length===0&&<div className="site-empty"><Search size={24}/><b>No style directions match your filters.</b><button onClick={reset}>Show all 75 styles</button></div>}
    <div className="style-library-foot"><span>ORIGINAL UN DIGITAL HUB STYLE DIRECTIONS</span><span>DESIGN / TECHNOLOGY / EXPERIENCE</span></div>
  </section>
}
