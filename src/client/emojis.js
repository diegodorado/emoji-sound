const emojiRegex = require('emoji-regex')
const eRegex = emojiRegex()
import groups from '../../emojis.json'

groups.forEach((group, i) => {
  const str = group[0]
  group[0] = []
  let match;
  while (match = eRegex.exec(str)) {
    group[0].push(match[0])
  }
})

const emojis = groups.reduce((acc, g) => {
    acc.push(g[0].reduce((acc2, e) => {
        acc2.push(e)
        return acc2
    },[]))
    return [].concat.apply([], acc)
},[])


export  {
  groups,
  emojis
}
