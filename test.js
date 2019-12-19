const assert = require('assert')
const _ = require('.')

const giveNull = () => null
const giveNullAsync = async () => null
const hi = x => x + 'hi'
const ho = async x => x + 'ho'
const hey = x => new Promise(res => setTimeout(() => res(x + 'hey'), 10))
const add = (a, b) => a + b
const add1 = x => add(1, x)
const delayedAdd1 = x => new Promise(res => setTimeout(() => res(add(1, x)), 10))
const range = (start, end) => {
  const arr = Array(end - start)
  for (let i = start; i < end; i++) arr[i - start] = i
  return arr
}
const traceError = (...args) => err => {
  const name = err && (
    err.name || err.code || err.errCode || (
      err.toString && err.toString()
    )
  )
  console.log(JSON.stringify({
    name,
    message: err && err.message,
    arguments: args,
    stack: new Error().stack,
  }))
  return err
}

describe('rubico', () => {
  describe('_.is', () => {
    it('string -> typeof', async () => {
      assert.strictEqual(_.is('string')('hey'), true)
      assert.strictEqual(_.is('string')(null), false)
      assert.strictEqual(_.is('number')(1), true)
      assert.strictEqual(_.is('number')(NaN), true)
      assert.strictEqual(_.is('number')({}), false)
      assert.strictEqual(_.is('object')({}), true)
      assert.strictEqual(_.is('nil')(null), true)
      assert.strictEqual(_.is('nil')(undefined), true)
      assert.strictEqual(_.is('nil')(0), false)
      assert.strictEqual(_.is('int')(1), true)
      assert.strictEqual(_.is('int')(1.1), false)
    })

    it('function -> instanceof', async () => {
      assert.strictEqual(_.is(Array)([]), true)
      assert.strictEqual(_.is(Array)({}), false)
      assert.strictEqual(_.is(Set)(new Set()), true)
      assert.strictEqual(_.is(Set)({}), false)
      assert.strictEqual(_.is(WeakSet)(new WeakSet()), true)
      assert.strictEqual(_.is(WeakSet)({}), false)
      assert.strictEqual(_.is(Map)(new Map()), true)
      assert.strictEqual(_.is(Map)({}), false)
      assert.strictEqual(_.is(NaN)(NaN), true)
      assert.strictEqual(_.is(NaN)(1), false)
      assert.strictEqual(_.is(NaN)(), false)
      assert.strictEqual(_.is(Object)({}), true)
      assert.strictEqual(_.is(Object)(new Set()), true)
      assert.strictEqual(_.is(Object)([]), true)
      assert.strictEqual(_.is(Object)('hey'), false)
      assert.strictEqual(_.is(Object)(1), false)
    })
  })

  describe('_.isNot', () => {
    it('string -> typeof', async () => {
      assert.strictEqual(_.isNot('string')('hey'), false)
      assert.strictEqual(_.isNot('string')(null), true)
      assert.strictEqual(_.isNot('number')(1), false)
      assert.strictEqual(_.isNot('number')(NaN), false)
      assert.strictEqual(_.isNot('number')({}), true)
      assert.strictEqual(_.isNot('object')({}), false)
    })

    it('function -> instanceof', async () => {
      assert.strictEqual(_.isNot(Array)([]), false)
      assert.strictEqual(_.isNot(Array)({}), true)
      assert.strictEqual(_.isNot(Set)(new Set()), false)
      assert.strictEqual(_.isNot(Set)({}), true)
      assert.strictEqual(_.isNot(WeakSet)(new WeakSet()), false)
      assert.strictEqual(_.isNot(WeakSet)({}), true)
      assert.strictEqual(_.isNot(Map)(new Map()), false)
      assert.strictEqual(_.isNot(Map)({}), true)
      assert.strictEqual(_.isNot(NaN)(NaN), false)
      assert.strictEqual(_.isNot(NaN)(1), true)
      assert.strictEqual(_.isNot(NaN)(), true)
      assert.strictEqual(_.isNot(Object)({}), false)
      assert.strictEqual(_.isNot(Object)(new Set()), false)
      assert.strictEqual(_.isNot(Object)([]), false)
      assert.strictEqual(_.isNot(Object)('hey'), true)
      assert.strictEqual(_.isNot(Object)(1), true)
    })
  })

  describe('_.toString', () => {
    it('converts to string', async () => {
      assert.strictEqual(_.toString('hey'), 'hey')
      assert.strictEqual(_.toString(null), '')
      assert.strictEqual(_.toString(undefined), '')
      assert.strictEqual(_.toString({}), '[object Object]')
      assert.strictEqual(_.toString([]), '')
      assert.strictEqual(_.toString(1), '1')
    })
  })

  describe('_.toNumber', () => {
    it('converts to number', async () => {
      assert.strictEqual(_.toNumber(1), 1)
      assert.strictEqual(_.toNumber(1.1), 1.1)
      assert.strictEqual(_.toNumber('1'), 1)
      assert.strictEqual(_.toNumber('1.1'), 1.1)
      assert.strictEqual(_.toNumber(Infinity), Infinity)
      assert.strictEqual(_.toNumber(), 0)
      assert.strictEqual(_.toNumber(null), 0)
      assert.strictEqual(_.toNumber([]), 0)
      assert.strictEqual(_.toNumber({}), NaN)
    })
  })

  describe('_.get', () => {
    const x = { a: { b: { c: 1 } } }
    const y = [1, 2, [3, [4]]]
    it('safely gets a property', async () => {
      assert.strictEqual(_.get('a')({ a: 1 }), 1)
      assert.strictEqual(_.get('b')({ a: 1 }), undefined)
      assert.strictEqual(_.get('b')({}), undefined)
      assert.strictEqual(_.get('b')(), undefined)
      assert.strictEqual(_.get('a.b.c')(x), 1)
      assert.strictEqual(_.get('a.b.d')(x), undefined)
      assert.strictEqual(_.get('a.b.d')({}), undefined)
      assert.strictEqual(_.get('a.b.d')(), undefined)
      assert.strictEqual(_.get(0)(y), 1)
      assert.deepEqual(_.get(2)(y), [3, [4]])
      assert.strictEqual(_.sflow(_.get(2), _.get(0))(y), 3)
      assert.strictEqual(_.get('2.0')(y), 3)
      assert.strictEqual(_.sflow(_.get(2), _.get(1), _.get(0))(y), 4)
      assert.strictEqual(_.get('2.1.0')(y), 4)
      assert.strictEqual(_.get(3)(y), undefined)
      assert.strictEqual(_.get('a')('hey'), undefined)
      assert.strictEqual(_.get('a')(1), undefined)
    })
  })

  describe('_.lookup', () => {
    it('like get but args reversed', async () => {
      assert.strictEqual(_.lookup({ a: 1 })('a'), 1)
      assert.strictEqual(_.lookup({ a: 1 })('b'), undefined)
      assert.strictEqual(_.lookup({ a: { b: { c: 1 } } })('a.b.c'), 1)
      assert.strictEqual(_.lookup([1, [2]])(0), 1)
      assert.strictEqual(_.lookup([1, [2]])('1.0'), 2)
    })
  })

  describe('_.pick', () => {
    it('makes a new object using picked properties', async () => {
      assert.deepEqual(_.pick(['a', 'b'])({ a: 1, b: 2, c: 2 }), { a: 1, b: 2 })
      assert.deepEqual(_.pick(['d'])({ a: 1, b: 2, c: 2 }), {})
    })

    it('throws a TypeError', async () => {
      try {
        const y = _.pick(['a', 'b'])('hey')
        assert(!y)
      } catch (e) {
        assert(e instanceof TypeError)
      }
    })
  })

  describe('_.parseJSON', () => {
    it('safely parses JSON', async () => {
      assert.deepEqual(_.parseJSON('{"a":1}'), { a: 1 })
      assert.deepEqual(_.parseJSON('{}'), {})
      assert.strictEqual(_.parseJSON('{hey}'), undefined)
      assert.strictEqual(_.parseJSON(''), undefined)
      assert.strictEqual(_.parseJSON(), undefined)
    })
  })

  describe('_.stringifyJSON', () => {
    const circular = {}
    circular.circular = circular
    it('safely stringifies JSON', async () => {
      assert.strictEqual(_.stringifyJSON({ a: 1 }), '{"a":1}')
      assert.strictEqual(_.stringifyJSON({}), '{}')
      assert.strictEqual(_.stringifyJSON(circular), undefined)
      assert.strictEqual(_.stringifyJSON('hey'), undefined)
      assert.strictEqual(_.stringifyJSON(), undefined)
      console.log(_.prettifyJSON(2)({ a: 1 }))
    })
  })

  describe('_.flip', () => {
    it('flips a value given arr', async () => {
      assert.strictEqual(_.flip(['heads', 'tails'])('heads'), 'tails')
    })
  })

  describe('_.split', () => {
    it('splits a string into an array from given delimiter', async () => {
      assert.deepEqual(_.split('.')('a.b.c'), ['a', 'b', 'c'])
      assert.deepEqual(_.split(1)('a1b'), ['a', 'b'])
      assert.deepEqual(_.split('.')(1), ['1'])
      assert.deepEqual(_.split()('a.b.c'), ['a.b.c'])
      assert.deepEqual(_.split('.')(), [''])
      assert.deepEqual(_.split()(), [''])
    })
  })

  describe('_.toLowerCase', () => {
    it('lowercases', async () => {
      assert.strictEqual(_.toLowerCase('AAA'), 'aaa')
      assert.strictEqual(_.toLowerCase('Aaa'), 'aaa')
      assert.strictEqual(_.toLowerCase('Aaa '), 'aaa ')
      assert.strictEqual(_.toLowerCase(null), '')
      assert.strictEqual(_.toLowerCase(), '')
    })
  })

  describe('_.toUpperCase', () => {
    it('uppercases', async () => {
      assert.strictEqual(_.toUpperCase('aaa'), 'AAA')
      assert.strictEqual(_.toUpperCase('Aaa'), 'AAA')
      assert.strictEqual(_.toUpperCase('Aaa '), 'AAA ')
      assert.strictEqual(_.toUpperCase(null), '')
      assert.strictEqual(_.toUpperCase(), '')
    })
  })

  describe('_.capitalize', () => {
    it('capitalizes', async () => {
      assert.strictEqual(_.capitalize('george'), 'George')
      assert.strictEqual(_.capitalize('george benson'), 'George benson')
      assert.strictEqual(_.capitalize(null), '')
      assert.strictEqual(_.capitalize(), '')
    })
  })

  describe('_.promisify', () => {
    const cbHey = cb => setTimeout(() => cb(null, 'hey'), 10)
    it('promisifies', async () => {
      assert.strictEqual(await _.promisify(cbHey)(), 'hey')
      try {
        const fn = _.promisify('wut')
        assert(!fn)
      } catch (e) {
        assert(e instanceof TypeError)
      }
    })
  })

  describe('_.callbackify', () => {
    const promiseHey = () => new Promise(res => setTimeout(() => res('hey'), 10))
    it('callbackifies', (done) => {
      _.callbackify(promiseHey)((err, hey) => {
        assert.ifError(err)
        assert.strictEqual(hey, 'hey')
        done()
      })
    })
  })

  describe('_.promisifyAll', () => {
    function cbModule(){}
    cbModule.cbHey = cb => setTimeout(() => cb(null, 'hey'), 10)
    cbModule.hey = 'hey'
    it('promisifies an entire module', async () => {
      assert.strictEqual(await _.promisifyAll(cbModule).cbHey(), 'hey')
      assert.strictEqual(_.promisifyAll(cbModule).hey, 'hey')
    })
  })

  describe('_.callbackifyAll', () => {
    function promiseModule(){}
    promiseModule.promiseHey = () => new Promise(res => setTimeout(() => res('hey'), 10))
    promiseModule.hey = 'hey'
    it('callbackifies an entire module', (done) => {
      assert.strictEqual(_.callbackifyAll(promiseModule).hey, 'hey')
      _.callbackifyAll(promiseModule).promiseHey((err, hey) => {
        assert.ifError(err)
        assert.strictEqual(hey, 'hey')
        done()
      })
    })
  })

  describe('_.map', () => {
    it('async a -> b', async () => {
      assert.deepEqual(
        await _.map(delayedAdd1)([1, 2, 3]),
        [2, 3, 4],
      )
      assert.deepEqual(
        await _.map(delayedAdd1)(new Set([1,2,3])),
        new Set([2, 3, 4]),
      )
      assert.deepEqual(
        await _.map(delayedAdd1)(
          new Map([['a', 1], ['b', 2], ['c', 3]])
        ),
        new Map([['a', 2], ['b', 3], ['c', 4]]),
      )
      assert.deepEqual(
        await _.map(delayedAdd1)(
          { a: 1, b: 2, c: 3 }
        ),
        { a: 2, b: 3, c: 4 },
      )
    }).timeout(5000)
  })

  describe('_.smap', () => {
    it('a -> b', async () => {
      assert.deepEqual(
        _.smap(add1)([1, 2, 3]),
        [2, 3, 4],
      )
      assert.deepEqual(
        _.smap(add1)(new Set([1,2,3])),
        new Set([2, 3, 4]),
      )
      assert.deepEqual(
        _.smap(add1)(
          new Map([['a', 1], ['b', 2], ['c', 3]])
        ),
        new Map([['a', 2], ['b', 3], ['c', 4]]),
      )
      assert.deepEqual(
        _.smap(add1)(
          { a: 1, b: 2, c: 3 }
        ),
        { a: 2, b: 3, c: 4 },
      )
    }).timeout(5000)
  })

  describe('_.mapEntries', () => {
    it('async a -> b', async () => {
      assert.deepEqual(
        await _.mapEntries(delayedAdd1)([1, 2, 3]),
        [2, 3, 4],
      )
      assert.deepEqual(
        await _.mapEntries(delayedAdd1)(new Set([1,2,3])),
        new Set([2, 3, 4]),
      )
      assert.deepEqual(
        await _.mapEntries(async ([k, v]) => [k, await delayedAdd1(v)])(
          new Map([['a', 1], ['b', 2], ['c', 3]])
        ),
        new Map([['a', 2], ['b', 3], ['c', 4]]),
      )
      assert.deepEqual(
        await _.mapEntries(async ([k, v]) => [k, await delayedAdd1(v)])(
          { a: 1, b: 2, c: 3 }
        ),
        { a: 2, b: 3, c: 4 },
      )
    }).timeout(5000)
  })

  describe('_.smapEntries', () => {
    it('a -> b', async () => {
      assert.deepEqual(
        _.smapEntries(add1)([1, 2, 3]),
        [2, 3, 4],
      )
      assert.deepEqual(
        _.smapEntries(add1)(new Set([1,2,3])),
        new Set([2, 3, 4]),
      )
      assert.deepEqual(
        _.smapEntries(([k, v]) => [k, add1(v)])(
          new Map([['a', 1], ['b', 2], ['c', 3]])
        ),
        new Map([['a', 2], ['b', 3], ['c', 4]]),
      )
      assert.deepEqual(
        _.smapEntries(([k, v]) => [`${k}${k}`, add1(v)])(
          { a: 1, b: 2, c: 3 }
        ),
        { aa: 2, bb: 3, cc: 4 },
      )
    }).timeout(5000)
  })

  describe('_.filter', () => {
    it('filters x by fn', async () => {
      assert.deepEqual(
        await _.filter(x => x === 1)([1,2,3]),
        [1],
      )
      assert.deepEqual(
        await _.filter(x => x === 1)(new Set([1,2,3])),
        new Set([1]),
      )
      assert.deepEqual(
        await _.filter(([k, v]) => v === 1)(new Map([['a', 1],['b', 2]])),
        new Map([['a', 1]]),
      )
      assert.deepEqual(
        await _.filter(([k, v]) => v === 1)({ a: 1, b: 2 }),
        ({ a: 1 }),
      )
    })
  })

  describe('_.sfilter', () => {
    it('filters x by fn', async () => {
      assert.deepEqual(
        _.sfilter(x => x === 1)([1,2,3]),
        [1],
      )
      assert.deepEqual(
        _.sfilter(x => x === 1)(new Set([1,2,3])),
        new Set([1]),
      )
      assert.deepEqual(
        _.sfilter(([k, v]) => v === 1)(new Map([['a', 1],['b', 2]])),
        new Map([['a', 1]]),
      )
      assert.deepEqual(
        _.sfilter(([k, v]) => v === 1)({ a: 1, b: 2 }),
        ({ a: 1 }),
      )
    })
  })

  describe('_.reduce', () => {
    it('can add 1 2 3', async () => {
      assert.strictEqual(await _.reduce(add)([1, 2, 3]), 6)
    })

    it('can add 1 2 3 starting with 10', async () => {
      assert.strictEqual(await _.reduce(add, 10)([1, 2, 3]), 6 + 10)
    })

    it('=> first element for array length 1', async () => {
      assert.strictEqual(await _.reduce(add)([1]), 1)
    })

    it('=> memo for []', async () => {
      assert.strictEqual(await _.reduce(add, 'yoyoyo')([]), 'yoyoyo')
    })

    it('=> undefined for []', async () => {
      assert.strictEqual(await _.reduce(add)([]), undefined)
    })

    it('many calls', async () => {
      assert.strictEqual(await _.reduce(add)(range(0, 10000)), 49995000)
    })
  })

  describe('_.sreduce', () => {
    it('can add 1 2 3', async () => {
      assert.strictEqual(_.sreduce(add)([1, 2, 3]), 6)
    })

    it('can add 1 2 3 starting with 10', async () => {
      assert.strictEqual(_.sreduce(add, 10)([1, 2, 3]), 6 + 10)
    })
  })

  describe('_.flow', () => {
    it('chains async and regular functions together', async () => {
      assert.strictEqual(await _.flow(hi, ho, hey)('yo'), 'yohihohey')
    })

    it('does something without arguments', async () => {
      assert.strictEqual(await _.flow(hi, ho, hey)(), 'undefinedhihohey')
    })

    it('chaining one fn is the same as just calling that fn', async () => {
      assert.strictEqual(await _.flow(hey)('yo'), await hey('yo'))
    })

    it('chaining no fns is identity', async () => {
      assert.strictEqual(await _.flow()('yo'), 'yo')
    })
  })

  describe('_.sflow', () => {
    it('chains regular functions only', async () => {
      assert.strictEqual(_.sflow(hi, hi, hi)('hi'), 'hihihihi')
    })
  })

  describe('_.amp', () => {
    it('executes fns in series like fn && fn ...', async () => {
      assert.strictEqual(await _.amp(hi, ho, hey)('yo'), 'yohihohey')
    })

    it('breaks execution on falsy return', async () => {
      assert.strictEqual(await _.amp(hi, ho, () => null, hey)('yo'), null)
    })

    it('multiple arguments => [...args]', async () => {
      assert.deepEqual(await _.amp((...x) => x)('yo', 'hey'), ['yo', 'hey'])
    })

    it('no fns => x', async () => {
      assert.strictEqual(await _.amp()('yo'), 'yo')
    })
  })

  describe('_.alt', () => {
    it('alternates flow paths based on first not null execution', async () => {
      assert.strictEqual(
        await _.alt(giveNullAsync, giveNull, hey, ho, giveNullAsync)('yo'),
        'yohey',
      )
    })

    it('alternating one fn is the same as calling that fn', async () => {
      assert.strictEqual(await _.alt(hey)('yo'), await hey('yo'))
    })

    it('alternating no fns => x', async () => {
      assert.strictEqual(await _.alt()('yo'), 'yo')
    })
  })

  describe('_.diverge', () => {
    it('diverges flow to provided container', async () => {
      assert.deepEqual(
        await _.diverge([hi, ho, hey])('yo'),
        ['yohi', 'yoho', 'yohey'],
      )
      assert.deepEqual(
        await _.diverge(new Set([hi, ho, hey]))('yo'),
        new Set(['yohi', 'yoho', 'yohey']),
      )
      assert.deepEqual(
        await _.diverge(new Map([['a', hi], ['b', ho], ['c', hey]]))('yo'),
        new Map([['a', 'yohi'], ['b', 'yoho'], ['c', 'yohey']])
      )
      assert.deepEqual(
        await _.diverge({ a: hi, b: ho, c: hey })('yo'),
        ({ a: 'yohi', b: 'yoho', c: 'yohey' }),
      )
    })

    it('throws a TypeError', async () => {
      try {
        x = await _.diverge('ayelmao')('yo')
        assert(!x)
      } catch (e) {
        assert(e instanceof TypeError)
      }
    })
  })

  describe('_.sdiverge', () => {
    it('diverges flow to provided container', async () => {
      assert.deepEqual(
        _.sdiverge([hi, hi, hi])('yo'),
        ['yohi', 'yohi', 'yohi'],
      )
      assert.deepEqual(
        _.sdiverge(new Set([hi, hi, hi]))('yo'),
        new Set(['yohi', 'yohi', 'yohi']),
      )
      assert.deepEqual(
        _.sdiverge(new Map([['a', hi], ['b', hi], ['c', hi]]))('yo'),
        new Map([['a', 'yohi'], ['b', 'yohi'], ['c', 'yohi']])
      )
      assert.deepEqual(
        _.sdiverge({ a: hi, b: hi, c: hi })('yo'),
        ({ a: 'yohi', b: 'yohi', c: 'yohi' }),
      )
    })

    it('throws a TypeError', async () => {
      try {
        x = _.sdiverge('ayelmao')('yo')
        assert(!x)
      } catch (e) {
        assert(e instanceof TypeError)
      }
    })
  })

  describe('_.sideEffect', () => {
    it('executes a function but returns arguments', async () => {
      assert.strictEqual(await _.sideEffect(console.log)('hey'), 'hey')
    })

    it('multiple arguments => [...args]', async () => {
      assert.deepEqual(
        await _.sideEffect(console.log)('yo', 'yo'),
        ['yo', 'yo'],
      )
    })

    it('handles errors with second fn', async () => {
      assert.strictEqual(
        await _.sideEffect(() => { throw new Error() }, x => e => console.log(x, e))('hey'),
        'hey',
      )
    })
  })

  describe('_.trace', () => {
    it('console logs a tag and args', async () => {
      assert.strictEqual(await _.trace('hey')('hey'), 'hey')
    })
  })

  describe('_.benchmark', () => {
    it('times the execution of the given function', async () => {
      assert.strictEqual(
        await _.benchmark(hey)('benchmark for hey')('hey'),
        'heyhey',
      )
    })
  })

  describe('_.braid', () => {
    it('braids two or more arrays into one single array', async () => {
      assert.deepEqual(
        _.braid([1, 2])([
          Array(2).fill('a'),
          Array(4).fill('b'),
        ]),
        ['a', 'b', 'b', 'a', 'b', 'b'],
      )
      assert.deepEqual(
        _.braid([1, 1])([
          _.braid([1, 2])([
            Array(2).fill('a'),
            Array(4).fill('b'),
          ]),
          Array(2).fill('c'),
        ]),
        ['a', 'c', 'b', 'c', 'b', 'a', 'b', 'b'],
      )
    })
  })

  describe('_.unbraid', () => {
    it('unbraids an array into multiple arrays', async () => {
      assert.deepEqual(
        _.unbraid([1, 2])(['a', 'b', 'b', 'a', 'b', 'b']),
        [Array(2).fill('a'), Array(4).fill('b')],
      )
    })
  })

  describe('_.flatten', () => {
    it('flattens an array of arrays', async () => {
      assert.deepEqual(
        _.flatten([[1], [2], [3]]),
        [1, 2, 3],
      )
    })
  })

  describe('_.uniq', () => {
    it('uniques an array', async () => {
      assert.deepEqual(
        _.uniq([1, 1, 1, 2, 2, 2, 3, 3, 3]),
        [1, 2, 3],
      )
    })
  })
})

