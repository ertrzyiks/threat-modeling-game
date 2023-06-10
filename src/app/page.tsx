import { Card } from '~/components/Card/Card'
import { config } from '~/config'
import { getCardByCode } from '~/getCardByCode'

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
