import { Card } from '../components/Card/Card'
import { config } from '../config'

const lookup = Object.keys(config).reduce((acc, group) => {
  acc[config[group].prefix] = { name: group, color: config[group].color, cards: config[group].cards }
  return acc
}, {} as Record<string, { name: string, color: string, cards: Record<string, string> }>)

function getCardByCode(code: string) {
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

const allCodes = Object.keys(config).reduce((acc, group) => {
  const groupConfig = config[group]
  const prefix = groupConfig.prefix
  const codes = Object.keys(groupConfig.cards).map(value => prefix + value)
  codes.forEach(code => acc.push(code))

  return acc
}, [] as string[])

export default function Home() {

  const cards = allCodes

  const values = cards.map(code => getCardByCode(code))

  return (
    <main className="flex flex-wrap gap-4 p-12">
      {values.map(card => (
        <Card
          key={card.code}
          group={card.group}
          value={card.value}
          description={card.description}
          className={card.className}
        />
      ))}
    </main>
  )
}
