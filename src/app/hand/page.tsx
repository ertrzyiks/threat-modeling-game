'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Card } from '~/components/Card/Card'
import { getCardByCode } from '~/getCardByCode'

export default function Hand() {
  const params = useSearchParams()

  const codes = params.get('cards')

  const cards = (codes ? codes.split(',') : []).map(code => getCardByCode(code))

  return (
    <main className="flex flex-wrap gap-4 p-12">
      {codes === null && (
        <div>
          <h1 className="text-4xl my-2">Examples</h1>

          <ul className="list-disc list-inside">
            <li><Link href="/hand?cards=S2">hand?cards=S2</Link></li>
            <li><Link href="/hand?cards=S2,I8">hand?cards=S2,I8</Link></li>
          </ul>

        </div>
      )}

      {cards.map(card => (
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
