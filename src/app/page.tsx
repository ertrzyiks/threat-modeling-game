import { Card } from '~/components/Card/Card'
import { config } from '~/config'
import { getCardByCode } from '~/getCardByCode'
import Link from 'next/link'

const allCodes = Object.keys(config).reduce((acc, group) => {
  const groupConfig = config[group]
  const prefix = groupConfig.prefix
  const codes = Object.keys(groupConfig.cards).map(value => prefix + value)
  codes.forEach(code => acc.push(code))

  return acc
}, [] as string[])

const examples = [
  'S2',
  'S2,I8',
  'S2,I8,IJ',
  'S2,I8,IJ,TQ',
]

export default function Home() {
  const cards = allCodes.map(code => getCardByCode(code))

  return (
    <main>
      <div className='my-2 px-12 mb-12'>
        <h2 className="text-4xl my-4">Examples</h2>

        <ul className="list-disc list-inside">
          {examples.map(example => (
            <li key={example}><Link href={`/hand?cards=${example}`}>/hand?cards={example}</Link></li>
          ))}
        </ul>
      </div>

      <div className="px-12">
        <h2 className="text-4xl my-4">All cards</h2>

        <div className="flex flex-wrap gap-4">
          {cards.map(card => (
            <Card
              key={card.code}
              group={card.group}
              value={card.value}
              description={card.description}
              className={card.className}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
