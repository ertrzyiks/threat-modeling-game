interface Props {
  codes: string[]
}

export default function CardTransitions({ codes }: Props) {
  const css = codes.map(code => (
    `
      .card-${code} { view-transition-name: ${code}; }
    `
  )).join('')
  return (
    <style dangerouslySetInnerHTML={{ __html: css }} />
  )
}
