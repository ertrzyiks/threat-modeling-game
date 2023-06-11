import { config } from '~/config'

export const allCodes = Object.keys(config).reduce((acc, group) => {
  const groupConfig = config[group]
  const prefix = groupConfig.prefix
  const codes = Object.keys(groupConfig.cards).map(value => prefix + value)
  codes.forEach(code => acc.push(code))

  return acc
}, [] as string[])
