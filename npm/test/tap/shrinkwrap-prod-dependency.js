var fs = require('fs')
var path = require('path')

var mkdirp = require('mkdirp')
var mr = require('npm-registry-mock')
var osenv = require('osenv')
var rimraf = require('rimraf')
var test = require('tap').test

var npm = npm = require('../../')

var common = require('../common-tap.js')
var pkg = path.resolve(__dirname, 'shrinkwrap-prod-dependency')

test("shrinkwrap --dev doesn't strip out prod dependencies", function (t) {
  t.plan(1)

  mr({port: common.port}, function (er, s) {
    setup({}, function (err) {
      if (err) return t.fail(err)

      npm.install('.', function (err) {
        if (err) return t.fail(err)

        npm.config.set('dev', true)
        npm.commands.shrinkwrap([], true, function (err, results) {
          if (err) return t.fail(err)

          t.deepEqual(results, desired)
          s.close()
          t.end()
        })
      })
    })
  })
})

test('cleanup', function (t) {
  cleanup()
  t.end()
})

var desired = {
  name: 'npm-test-shrinkwrap-prod-dependency',
  version: '0.0.0',
  dependencies: {
    request: {
      version: '0.9.0',
      from: 'request@0.9.0',
      resolved: common.registry + '/request/-/request-0.9.0.tgz'
    },
    underscore: {
      version: '1.5.1',
      from: 'underscore@1.5.1',
      resolved: common.registry + '/underscore/-/underscore-1.5.1.tgz'
    }
  }
}

var json = {
  author: 'Domenic Denicola',
  name: 'npm-test-shrinkwrap-prod-dependency',
  version: '0.0.0',
  dependencies: {
    request: '0.9.0'
  },
  devDependencies: {
    underscore: '1.5.1'
  }
}

function setup (opts, cb) {
  cleanup()
  mkdirp.sync(pkg)
  fs.writeFileSync(path.join(pkg, 'package.json'), JSON.stringify(json, null, 2))
  process.chdir(pkg)

  var allOpts = {
    cache: path.resolve(pkg, 'cache'),
    registry: common.registry
  }

  for (var key in opts) {
    allOpts[key] = opts[key]
  }

  npm.load(allOpts, cb)
}

function cleanup () {
  process.chdir(osenv.tmpdir())
  rimraf.sync(pkg)
}
