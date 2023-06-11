interface Props {
  code: string
  group: string
  value: string
  description: string
  className: string
}

function Card({ code, group, value, description, className }: Props) {
  const highValue = ['J', 'Q', 'K', 'A'].includes(value)

  return (
    <div className={['transition-all duration-300 ease-out w-64 h-96 border-solid border-2 border-current relative', className, highValue ? 'bg-current' : 'bg-white'].join(' ')}>
      <div className="flex py-3">
        <div title='Card value' className={['p-3 w-12 text-center rounded-e-lg text-md mr-2', highValue ? 'bg-white' : 'bg-current'].join(' ')}>
          <span className={highValue ? 'text-current' : 'text-white'}>{value}</span>
        </div>
        <span
          title='Card group'
          className={['py-3 text-md', highValue ? 'text-white opacity-80' : 'text-current'].join(' ')}
        >
          {group}
        </span>
      </div>

      <div title='Card description' className={['mt-2 px-4 text-md', highValue ? 'text-white' : 'text-black'].join(' ')}>
        {description}
      </div>

      <span className={["absolute bottom-0 right-0 text-9xl opacity-30", highValue ? 'text-white' : 'text-current'].join(' ')}>{value}</span>
      <span
        title='Card code'
        className='absolute bottom-1 left-1 text-xs bg-white text-slate-400 px-2 border border-slate-300'
      >
        {code}
      </span>
    </div>
  )
}

export { Card }
