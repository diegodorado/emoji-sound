const googleTTS = require('google-tts-api');
const download = require('download');
const lame = require('lame');
const wav = require('wav');
const request = require('request');
const fs  = require('fs');
const cachedRequest = require('cached-request')(request)
cachedRequest.setCacheDirectory("./cache")
cachedRequest.setValue('ttl', 1000*60*60*24)

const emojiRegex = require('emoji-regex')
const eRegex = emojiRegex();
const emojiUnicode = require("emoji-unicode")



const dir = './emoji-samples/'

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


const api_url = "http://emojitracker.com/api/rankings"
cachedRequest({uri: api_url}, (error, response, body) =>{
  const data =  JSON.parse(body);
  const allowed = data.map((e)=>{return e.char})


  const req_url = 'https://unicode.org/Public/emoji/11.0/emoji-test.txt'
  cachedRequest({uri: req_url}, (error, response, body) =>{
  	if(!error && response.statusCode == 200){

      let groups = []
      let group = null
      let subgroup = null

      const lines = body.toString('utf8').split('\n');
      for(let line of lines){

        let g = line.match(/# group: (.*)/)
        if(g){

          if(group){
            if(subgroup)
              group.subgroups.push(subgroup)
            groups.push(group)
          }

          group = {
            name: g[1].toLowerCase(),
            subgroups: []
          }
          subgroup = null
        }

        let s = line.match(/# subgroup: (.*)/)
        if(s){
          if(subgroup)
            group.subgroups.push(subgroup)

          subgroup = {
            name: s[1].toLowerCase(),
            emojis: []
          }
        }

        let e = line.match(eRegex)
        //filter out too new emojis
        if(e && allowed.includes(e[0]) && !subgroup.emojis.includes(e[0])){
          subgroup.emojis.push(e[0])
        }


        if(line.match(/#EOF/)){
          if(group){
            if(subgroup)
              group.subgroups.push(subgroup)
            groups.push(group)
          }
        }

      }

      const exceptions = [
        'food-asian',
        'food-prepared',
        'face-role',
        'person-role',
        'animal-marine',
        'plant-other',
        'place-religious']

      const replacements1 = [
        ['face-',''],
        ['animal-',''],
        ['food-',''],
        ['place-',''],
        ['plant-',''],
        ['country-flag','flag'],
        ['subdivision-flag','flag']
      ]

      const replacements2 = [
        ['-','_'],
        [' & ','_and_']
      ]

      var str =`\n[\n`
      for(let g of groups){
        for(let s of g.subgroups){

          if(!exceptions.includes(s.name)){
            s.name = replacements1.reduce( (acc, r) => {
              return acc.replace(r[0],r[1])
            }, s.name)
          }

          s.name = replacements2.reduce( (acc, r) => {
            return acc.replace(r[0],r[1])
          }, s.name)



          if(s.emojis.length >0){
            str += `  ["${s.emojis.join('')}","${s.name}"], \n`
            const f = dir+s.name+'/'
            if (!fs.existsSync(f)){
                fs.mkdirSync(f)
                for(let e of s.emojis){
                  const filename = emojiUnicode(e) + '.png'
                  const url = 'https://raw.githubusercontent.com/emojione/emojione-assets/master/png/128/' +  filename;

                  (function(url, output){
                    request(url).on('response', (res) => {
                      res.pipe(fs.createWriteStream(output))
                    });
                  })(url, (f + filename))

                }
            }
          }



        }
      }


      str += `  ["","~"]\n]\n`
      fs.writeFileSync("./emojis.json", str)


  	}
  })

})
