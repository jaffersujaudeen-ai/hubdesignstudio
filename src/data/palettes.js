const families = [
  { name: 'Luxury & Premium', hue: 42, sat: 44, light: 28, tags: ['luxury', 'premium', 'elegant'] },
  { name: 'Corporate & Professional', hue: 218, sat: 54, light: 34, tags: ['corporate', 'business', 'professional'] },
  { name: 'Minimal & Neutral', hue: 28, sat: 13, light: 57, tags: ['minimal', 'neutral', 'clean'] },
  { name: 'Modern & Contemporary', hue: 268, sat: 48, light: 48, tags: ['modern', 'contemporary', 'digital'] },
  { name: 'Creative & Artistic', hue: 326, sat: 63, light: 52, tags: ['creative', 'artistic', 'bold'] },
  { name: 'Nature & Organic', hue: 139, sat: 38, light: 35, tags: ['nature', 'organic', 'eco'] },
  { name: 'Warm & Earthy', hue: 19, sat: 52, light: 40, tags: ['warm', 'earthy', 'rustic'] },
  { name: 'Cool & Calm', hue: 192, sat: 48, light: 43, tags: ['cool', 'calm', 'serene'] },
  { name: 'Pastel & Soft', hue: 304, sat: 36, light: 73, tags: ['pastel', 'soft', 'gentle'] },
  { name: 'Bold & Vibrant', hue: 6, sat: 79, light: 51, tags: ['bold', 'vibrant', 'energetic'] },
  { name: 'Monochrome', hue: 220, sat: 7, light: 35, tags: ['monochrome', 'black', 'white'] },
  { name: 'Editorial & Elegant', hue: 345, sat: 36, light: 36, tags: ['editorial', 'elegant', 'fashion'] },
  { name: 'Futuristic & Technology', hue: 185, sat: 78, light: 43, tags: ['futuristic', 'technology', 'tech'] }
]

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => {
    const color = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export const paletteFamilies = families.map((family, familyIndex) => family.name)

export const palettes = families.flatMap((family, familyIndex) =>
  Array.from({ length: 40 }, (_, i) => {
    const wave = i * 13
    const primaryHue = (family.hue + wave + familyIndex * 7) % 360
    const primarySat = clamp(family.sat + ((i % 5) - 2) * 7, 12, 88)
    const primaryLight = clamp(family.light + ((i % 7) - 3) * 4, 20, 72)
    const secondaryHue = (primaryHue + 24 + (i % 4) * 9) % 360
    const accentHue = (primaryHue + 145 + (i % 6) * 8) % 360
    const secondary = hslToHex(secondaryHue, clamp(primarySat - 15 + (i % 3) * 5, 10, 82), clamp(primaryLight + 34 - (i % 4) * 3, 42, 91))
    const primary = hslToHex(primaryHue, primarySat, primaryLight)
    const accent = hslToHex(accentHue, clamp(primarySat + 9, 18, 92), clamp(primaryLight + ((i % 2) ? 4 : 12), 30, 78))
    const id = familyIndex * 40 + i + 1
    return {
      id,
      code: `UDH-${String(id).padStart(3, '0')}`,
      name: `${['Signature', 'Studio', 'Modern', 'Classic', 'Select', 'Aura', 'Edition', 'Muse'][i % 8]} ${family.name.split(' ')[0]} ${String(i + 1).padStart(2, '0')}`,
      family: family.name,
      tags: family.tags,
      colors: { primary, secondary, accent }
    }
  })
)

export const getPaletteById = id => palettes.find(p => p.id === Number(id))
