const emojiRegex = require('emoji-regex')
const eRegex = emojiRegex();
const emojiUnicode = require("emoji-unicode")
const fs  = require('fs');
const request = require('request');
const cachedRequest = require('cached-request')(request)
cachedRequest.setCacheDirectory("./cache")
cachedRequest.setValue('ttl', 1000*60*60*24)


const api_url = "http://emojitracker.com/api/rankings"
cachedRequest({uri: api_url}, (error, response, body) =>{
  const data =  JSON.parse(body);
  const allowed = data.map((e)=>{return e.char})

	const req_url = 'https://unicode.org/Public/emoji/11.0/emoji-test.txt'
	cachedRequest({uri: req_url}, (error, response, body) =>{
		if(!error && response.statusCode == 200){

	    const lines = body.toString('utf8').split('\n');
	    let i = 0
	    let res = ''

	    for(let line of lines){

	      if(line.match(/flag/)){
	        let e = line.match(eRegex)
	        if(e && allowed.includes(e[0])){
	        }
	      }
	    }
	  }
	})
})
