if (!process.env.DB && process.env.TRAVIS) {
    process.env.DB = 'postgres://postgres@localhost/travis'
}

if (!process.env.DB) throw new Error('process.env.DB not set')

var fs = require('fs')
, path  = require('path')
, Client = require('pg').Client
, client = new Client(process.env.DB)
, files = fs.readdirSync(process.cwd()).filter(function(fn) {
    return fn.match((/\.sql$/))
})

function next(cb) {
    var fn = files.shift()
    if (!fn) return cb()
    console.log(fn)
    var q = fs.readFileSync(path.join(process.cwd(), fn), 'utf8')
    client.query(q, next)
}

next(function(err) {
    if (err) {
        console.error(err)
        console.error(err.stack)
    }
    process.exit(err ? 1 : 0)
})
