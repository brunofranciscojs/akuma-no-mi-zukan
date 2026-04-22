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

export const getFruitsByType = (type) => {
  return akumasnomi.filter(f => f.type.includes(type) && !f.localImg.includes('.svg'))
}

export const get4Random = (fruits) => {
  return [...fruits].sort(() => Math.random() - 0.5).slice(0, 4);
}
