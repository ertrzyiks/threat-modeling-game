'use client'

import { Card } from '~/components/Card/Card'
import { getCardByCode } from '~/getCardByCode'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const params = useSearchParams()
  const codes = params.get('cards')
  const cards = (codes ? codes.split(',') : []).map(code => getCardByCode(code))

  return (
    <main>
      <div className="px-12">
        <h2 className="text-4xl my-4">Your cards</h2>

        <div className="flex flex-wrap gap-4">
          {cards.map(card => (
            <Card
              key={card.code}
              code={card.code}
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
