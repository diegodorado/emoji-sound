const googleTTS = require('google-tts-api');
const download = require('download');
const lame = require('lame');
const wav = require('wav');
const request = require('request');
const fs  = require('fs');

var api_url = "http://emojitracker.com/api/rankings"

var dir = './samples/'

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


request(api_url, (error, response, body) =>{
  var data =  JSON.parse(body);

  var padding = data[0].score.toString().length
  var pad = (n,p)=>{ return ("0".repeat(p)+n).slice(-p)}

  //uncomment to test with a subset
  //data = data.slice(0,3)

  var str =`\n[\n`
  for(const [i, e] of data.entries()){
    (function(i,e) {
      var name = e.name.replace(/\s/g, '_').toLowerCase()
      var f = './samples/'+name+'/'
      var iname = f + pad(i,4)+'.wav'

      str += `  ["${e.char}","${name}"], \n`

      if (!fs.existsSync(f)){
          fs.mkdirSync(f)
          var filename = e.id.toLowerCase() + '.png'
          var url = 'https://raw.githubusercontent.com/emojione/emojione-assets/master/png/128/' +  filename

          request(url).on('response', (res) => {
            res.pipe(fs.createWriteStream(f + filename))
          });
      }

      if (!fs.existsSync(iname)){
        googleTTS(e.name, 'en', 0.75)
        .then( (url)=> {
          download(url)
            .pipe(new lame.Decoder())
            .on('format', function(format){
              this.pipe(new wav.Writer(format))
                .pipe(fs.createWriteStream(iname));
            })

        })
        .catch(function (err) {
          console.error(err.stack);
        });
      }




    })(i,e);



  }

  str += `  ["","~"]\n]\n`
  fs.writeFileSync("./emojis.json", str)
  console.log(str)




})
