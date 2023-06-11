'use client'
import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { Card } from '~/components/Card/Card'
import { getCardByCode } from '~/getCardByCode'
import { useSearchParams } from 'next/navigation'

const withViewTransition = (fn: () => void) => {
  if (!document.startViewTransition) {
    fn()
    return
  }

  document.startViewTransition(() => {
    flushSync(() => {
      fn()
    })
  })
}

export default function Home() {
  const params = useSearchParams()
  const codes = params.get('cards') ?? ''
  const cardCodes = codes.split(',')

  const [activeCardCodes, setActiveCardCodes] = useState<string[]>(cardCodes)
  const [discardedCardCodes, setDiscardedCardCodes] = useState<string[]>([])

  const toggleCard = (code: string) => {
    withViewTransition(() => {
      if (discardedCardCodes.includes(code)) {
        setDiscardedCardCodes(discardedCardCodes.filter(discardedCardCode => discardedCardCode !== code))
        setActiveCardCodes([...activeCardCodes, code])
      } else {
        console.log({ activeCardCodes, discardedCardCodes, code })
        setDiscardedCardCodes([...discardedCardCodes, code])
        setActiveCardCodes(activeCardCodes.filter(activeCardCode => activeCardCode !== code))
      }
    });
  }

  const activeCards = activeCardCodes.map(code => getCardByCode(code))
  const discardedCards = discardedCardCodes.map(code => getCardByCode(code))

  return (
    <main>
      <div className="px-12">
        <h2 className="text-4xl my-4">Your cards</h2>

        <div className="card-decks">
          <div>
            <div className="flex flex-wrap gap-4">
              {activeCards.map(card => (
                <div
                  key={card.code}
                  className='cursor-pointer'
                  onClick={() => toggleCard(card.code)}
                >
                  <Card
                    code={card.code}
                    group={card.group}
                    value={card.value}
                    description={card.description}
                    className={card.className}
                  />
                </div>
              ))}
            </div>

            <p className="mt-4">Click a card to discard it, click again to bring it back.</p>
          </div>
          <div>
            <div className="flex flex-wrap gap-4 relative">
              {discardedCards.map((card, index) => (
                <div
                  key={card.code}
                  className='cursor-pointer bg-white absolute top-0'
                  onClick={() => toggleCard(card.code)}
                  style={{ top: `${index}rem`, left: `${index}rem` }}
                >
                  <Card
                    code={card.code}
                    group={card.group}
                    value={card.value}
                    description={card.description}
                    className={card.className}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
