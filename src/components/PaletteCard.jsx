import { Heart, ArrowUpRight, Check } from 'lucide-react'

export default function PaletteCard({ palette, active, favourite, onSelect, onFavourite }) {
  const colors = [palette.colors.primary, palette.colors.secondary, palette.colors.accent]
  return (
    <article className={`palette-card ${active ? 'selected' : ''}`}>
      <button className="palette-main" onClick={() => onSelect(palette)} aria-label={`Select ${palette.name}`}>
        <div className="swatches">
          {colors.map((color, index) => (
            <div key={index} className="swatch" style={{ background: color }}>
              <span>{color}</span>
            </div>
          ))}
        </div>
        <div className="palette-meta">
          <div>
            <span className="eyebrow">{palette.code} · {palette.family}</span>
            <h3>{palette.name}</h3>
          </div>
          <span className="select-mark">{active ? <Check size={17} /> : <ArrowUpRight size={17} />}</span>
        </div>
      </button>
      <button className={`favourite-btn ${favourite ? 'is-favourite' : ''}`} onClick={() => onFavourite(palette.id)} aria-label="Toggle favourite">
        <Heart size={16} fill={favourite ? 'currentColor' : 'none'} />
      </button>
    </article>
  )
}
