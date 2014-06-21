if (!process.env.DB && process.env.TRAVIS) {
    process.env.DB = 'postgres://postgres@localhost/travis'
}

if (!process.env.DB) throw new Error('process.env.DB not set')

var fs = require('fs')
, path  = require('path')
, Client = require('pg').Client
, client = new Client(process.env.DB)
, path = require('path')
, p = path.resolve(process.argv[2] || process.cwd())
, files = fs.readdirSync(p).filter(function(fn) {
    return fn.match((/\.sql$/i))
}).sort(function(a, b) {
    if (a == 'before.sql') return -1
    if (b == 'before.sql') return 1
    return a.localCompare(b)
})
client.connect()

function next(cb) {
    var fn = files.shift()
    process.stdout.write(fn + '...')
    var q = fs.readFileSync(path.join(p, fn), 'utf8')
    client.query(q, function(err) {
        if (err) return cb(err)
        console.log('OK')
        if (files.length) return next(cb)
        cb()
    })
}

next(function(err) {
    if (err) {
        console.error(err)
        console.error(err.stack)
    }
    process.exit(err ? 1 : 0)
})
