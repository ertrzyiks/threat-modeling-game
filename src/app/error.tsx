'use client'

export default function Error({ error }: { error: Error }) {
  const description = error.message.startsWith('Invalid card code') ? error.message : null

  return (
    <main>
      <div className='my-2 px-12 mb-12'>
        <h2 className="text-4xl my-4">Something went wrong</h2>

        {description && (
          <p className="mb-4 text-xl">{description}</p>
        )}
      </div>
    </main>
  )
}
