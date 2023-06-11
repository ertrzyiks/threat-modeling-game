'use client'
import { useState } from 'react'
import { Card } from '~/components/Card/Card'
import { getCardByCode } from '~/getCardByCode'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const params = useSearchParams()
  const codes = params.get('cards')
  const cards = (codes ? codes.split(',') : []).map(code => getCardByCode(code))

  const [usedCards, setUsedCards] = useState<string[]>([])

  const toggleCard = (code: string) => {
    if (usedCards.includes(code)) {
      setUsedCards(usedCards.filter(usedCode => usedCode !== code))
    } else {
      setUsedCards([...usedCards, code])
    }
  }

  return (
    <main>
      <div className="px-12">
        <h2 className="text-4xl my-4">Your cards</h2>



        <div className="flex flex-wrap gap-4">
          {cards.map(card => (
            <div
              key={card.code}
              className={['cursor-pointer transition-opacity duration-300', usedCards.includes(card.code) ? 'opacity-70' : ''].join(' ')}
              onClick={() => toggleCard(card.code)}
            >
              <Card
                code={card.code}
                group={card.group}
                value={card.value}
                description={card.description}
                className={usedCards.includes(card.code) ? 'text-slate-600 opacity-40' : card.className}
              />
            </div>
          ))}
        </div>

        <p className="mt-4">Click a card to discard it, click again to bring it back.</p>
      </div>
    </main>
  )
}
