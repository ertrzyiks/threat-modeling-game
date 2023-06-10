import { config } from './config'

const lookup = Object.keys(config).reduce((acc, group) => {
  acc[config[group].prefix] = { name: group, color: config[group].color, cards: config[group].cards }
  return acc
}, {} as Record<string, { name: string, color: string, cards: Record<string, string> }>)

export function getCardByCode(code: string) {
  if (code.length < 2) {
    throw new Error(`Invalid card code: ${code}`)
  }

  const group = code[0]
  const value = code.slice(1)

  const groupConfig = lookup[group] ?? null

  if (!groupConfig || typeof groupConfig.cards[value] === 'undefined') {
    throw new Error(`Invalid card code: ${code}`)
  }

  return {
    code,
    group: groupConfig.name,
    value: value,
    description: groupConfig.cards[value],
    className: groupConfig.color
  }
}
