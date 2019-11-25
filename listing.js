const fs = require('fs');
const path = require('path');

var dir = './samples4/'

const walkSync = (d) => fs.statSync(d).isDirectory() ? fs.readdirSync(d).map(f => walkSync(path.join(d, f))) : d;

const entries = []
for(let f of fs.readdirSync(dir)){
  const files = fs.readdirSync(path.join(dir,f))
  if(files.length)
    entries.push([f,path.join(f,files[0])])
}

const str = `{\n ${entries.map(e =>`  "${e[0]}": "${e[1]}"`).join(`,\n`)} \n}\n`
fs.writeFileSync("./listing.json", str)

console.log(str)
