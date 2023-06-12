'use client'
import { useState } from 'react'
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
        <div className="grid grid-col-1 lg:grid-cols-card-deck">
          <div className='relative z-10'>
            <h2 className="text-4xl my-4">Your hand</h2>

            <p className="mb-4">Click a card to discard it, click again to bring it back.</p>

            <div className="flex flex-wrap gap-4">
              {activeCards.map(card => (
                <button
                  key={card.code}
                  onClick={() => toggleCard(card.code)}
                >
                  <Card
                    code={card.code}
                    group={card.group}
                    value={card.value}
                    description={card.description}
                    className={card.className}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className='relative z-0'>
            <h2 className="text-4xl my-4">Discarded cards</h2>

            <div className="flex flex-wrap gap-4 relative">
              {discardedCards.map((card, index) => (
                <button
                  key={card.code}
                  className=' bg-white absolute top-0'
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
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
