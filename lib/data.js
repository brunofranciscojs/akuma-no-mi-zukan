import fruitsData from '../src/assets/akumanomi2.json'

export const akumasnomi = fruitsData

export const slugify = (text) => 
  text.toLowerCase()
    .normalize('NFD') // handle accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

export const desacentuar = (busca) => 
  busca.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export const getFruitBySlug = (slug) => {
  return akumasnomi.find(f => slugify(f.name) === slug || f.id === slug)
}
