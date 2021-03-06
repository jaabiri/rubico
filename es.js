/* rubico v1.5.19
 * https://github.com/a-synchronous/rubico
 * (c) 2019-2020 Richard Tong
 * rubico may be freely distributed under the MIT license.
 */

const symbolIterator = Symbol.iterator

const symbolAsyncIterator = Symbol.asyncIterator

const globalThisHasBuffer = typeof Buffer == 'function'

const bufferAlloc = globalThisHasBuffer ? Buffer.alloc : function () {}

const objectValues = Object.values

const objectAssign = Object.assign

const objectProto = Object.prototype

const nativeObjectToString = objectProto.toString

const objectToString = x => nativeObjectToString.call(x)

const generatorFunctionTag = '[object GeneratorFunction]'

const asyncGeneratorFunctionTag = '[object AsyncGeneratorFunction]'

const promiseAll = Promise.all.bind(Promise)

const promiseRace = Promise.race.bind(Promise)

const isDefined = value => value != null

const isUndefined = value => typeof value == 'undefined'

const isNull = value => value === null

const isGeneratorFunction = value => objectToString(value) == generatorFunctionTag

const isAsyncGeneratorFunction = value => objectToString(value) == asyncGeneratorFunctionTag

const isIterator = value => value != null
  && typeof value.next == 'function'
  && typeof value[symbolIterator] == 'function'

const isAsyncIterator = value => value != null
  && typeof value.next == 'function'
  && typeof value[symbolAsyncIterator] == 'function'

const isIterable = value => value != null
  && typeof value[symbolIterator] == 'function'

const isAsyncIterable = value => value != null
  && typeof value[symbolAsyncIterator] == 'function'

const isNodeReadStream = value => value != null && typeof value.pipe == 'function'

const isWritable = value => value != null && typeof value.write == 'function'

const isFunction = value => typeof value == 'function'

const isArray = Array.isArray

const isObject = value => value != null && value.constructor == Object

const isSet = value => value != null && value.constructor == Set

const isMap = value => value != null && value.constructor == Map

const isBinary = ArrayBuffer.isView

const isNumber = function (value) {
  return typeof value == 'number'
    || (value != null && value.constructor == Number)
}

const isNaN = Number.isNaN

const isBigInt = x => typeof x == 'bigint'

const isString = value => typeof value == 'string'
  || (value != null && value.constructor == String)

const isPromise = value => value != null && typeof value.then == 'function'

const identity = value => value

const add = (a, b) => a + b

const range = (start, end) => Array.from({ length: end - start }, (x, i) => i + start)

/**
 * @name callPropUnary
 *
 * @synopsis
 * ```coffeescript [specscript]
 * callPropUnary(
 *   value object,
 *   property string,
 *   arg0 any,
 * ) -> value[property](arg0)
 * ```
 */
const callPropUnary = (value, property, arg0) => value[property](arg0)

const __ = Symbol('placeholder')

// argument resolver for curry2
const curry2ResolveArg0 = (
  baseFunc, arg1,
) => function arg0Resolver(arg0) {
  return baseFunc(arg0, arg1)
}

// argument resolver for curry2
const curry2ResolveArg1 = (
  baseFunc, arg0,
) => function arg1Resolver(arg1) {
  return baseFunc(arg0, arg1)
}

/**
 * @name curry2
 *
 * @synopsis
 * ```coffeescript [specscript]
 * __ = Symbol('placeholder')
 *
 * curry2(
 *   baseFunc function,
 *   arg0 __|any,
 *   arg1 __|any,
 * ) -> function
 * ```
 */
const curry2 = function (baseFunc, arg0, arg1) {
  return arg0 == __
    ? curry2ResolveArg0(baseFunc, arg1)
    : curry2ResolveArg1(baseFunc, arg0)
}

// argument resolver for curry3
const curry3ResolveArg0 = (
  baseFunc, arg1, arg2,
) => function arg0Resolver(arg0) {
  return baseFunc(arg0, arg1, arg2)
}

// argument resolver for curry3
const curry3ResolveArg1 = (
  baseFunc, arg0, arg2,
) => function arg1Resolver(arg1) {
  return baseFunc(arg0, arg1, arg2)
}

// argument resolver for curry3
const curry3ResolveArg2 = (
  baseFunc, arg0, arg1,
) => function arg2Resolver(arg2) {
  return baseFunc(arg0, arg1, arg2)
}

/**
 * @name curry3
 *
 * @synopsis
 * ```coffeescript [specscript]
 * __ = Symbol('placeholder')
 *
 * curry3(
 *   baseFunc function,
 *   arg0 __|any,
 *   arg1 __|any,
 *   arg2 __|any
 * ) -> function
 * ```
 */
const curry3 = function (baseFunc, arg0, arg1, arg2) {
  if (arg0 == __) {
    return curry3ResolveArg0(baseFunc, arg1, arg2)
  }
  if (arg1 == __) {
    return curry3ResolveArg1(baseFunc, arg0, arg2)
  }
  return curry3ResolveArg2(baseFunc, arg0, arg1)
}

// argument resolver for curry4
const curry4ResolveArg0 = (
  baseFunc, arg1, arg2, arg3,
) => function arg0Resolver(arg0) {
  return baseFunc(arg0, arg1, arg2, arg3)
}

// argument resolver for curry4
const curry4ResolveArg1 = (
  baseFunc, arg0, arg2, arg3,
) => function arg1Resolver(arg1) {
  return baseFunc(arg0, arg1, arg2, arg3)
}

// argument resolver for curry4
const curry4ResolveArg2 = (
  baseFunc, arg0, arg1, arg3,
) => function arg2Resolver(arg2) {
  return baseFunc(arg0, arg1, arg2, arg3)
}

// argument resolver for curry4
const curry4ResolveArg3 = (
  baseFunc, arg0, arg1, arg2,
) => function arg3Resolver(arg3) {
  return baseFunc(arg0, arg1, arg2, arg3)
}

/**
 * @name curry4
 *
 * @synopsis
 * ```coffeescript [specscript]
 * __ = Symbol('placeholder')
 *
 * curry4(
 *   baseFunc function,
 *   arg0 __|any,
 *   arg1 __|any,
 *   arg2 __|any,
 *   arg3 __|any,
 * ) -> function
 * ```
 */
const curry4 = function (baseFunc, arg0, arg1, arg2, arg3) {
  if (arg0 == __) {
    return curry4ResolveArg0(baseFunc, arg1, arg2, arg3)
  }
  if (arg1 == __) {
    return curry4ResolveArg1(baseFunc, arg0, arg2, arg3)
  }
  if (arg2 == __) {
    return curry4ResolveArg2(baseFunc, arg0, arg1, arg3)
  }
  return curry4ResolveArg3(baseFunc, arg0, arg1, arg2)
}

/**
 * @name always
 *
 * @synopsis
 * ```coffeescript [specscript]
 * always(value any) -> getter ()=>value
 * ```
 */
const always = value => function getter() { return value }

/**
 * @name thunkify1
 *
 * @synopsis
 * ```coffeescript [specscript]
 * thunkify1(
 *   func function,
 *   arg0 any,
 * ) -> ()=>func(arg0)
 * ```
 */
const thunkify1 = (func, arg0) => () => func(arg0)

/**
 * @name thunkify2
 *
 * @synopsis
 * ```coffeescript [specscript]
 * thunkify2(
 *   func function,
 *   arg0 any,
 *   arg1 any,
 * ) -> ()=>func(arg0, arg1)
 * ```
 */
const thunkify2 = (func, arg0, arg1) => () => func(arg0, arg1)

/**
 * @name thunkify3
 *
 * @synopsis
 * ```coffeescript [specscript]
 * thunkify3(
 *   func function,
 *   arg0 any,
 *   arg1 any,
 *   arg2 any,
 * ) -> ()=>func(arg0, arg1, arg2)
 * ```
 */
const thunkify3 = (func, arg0, arg1, arg2) => () => func(arg0, arg1, arg2)

/**
 * @name thunkifyArgs
 *
 * @synopsis
 * ```coffeescript [specscript]
 * thunkifyArgs(func function, args Array) -> ()=>func(...args)
 * ```
 */
const thunkifyArgs = (func, args) => () => func(...args)

/**
 * @name memoizeCappedUnary
 *
 * @synopsis
 * ```coffeescript [specscript]
 * memoizeCappedUnary(func function, cap number) -> memoized function
 * ```
 *
 * @todo explore Map reimplementation
 */
const memoizeCappedUnary = function (func, cap) {
  const cache = new Map(),
    memoized = function memoized(arg0) {
      if (cache.has(arg0)) {
        return cache.get(arg0)
      }
      const result = func(arg0)
      cache.set(arg0, result)
      if (cache.size > cap) {
        cache.clear()
      }
      return result
    }
  memoized.cache = cache
  return memoized
}

/**
 * @name _arrayExtend
 *
 * @synopsis
 * ```coffeescript [specscript]
 * _arrayExtend(array Array, values Array) -> array
 * ```
 */
const _arrayExtend = function (array, values) {
  const arrayLength = array.length,
    valuesLength = values.length
  let valuesIndex = -1
  while (++valuesIndex < valuesLength) {
    array[arrayLength + valuesIndex] = values[valuesIndex]
  }
  return array
}

/**
 * @name arrayExtend
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayExtend(array Array, values Array) -> array
 * ```
 */
const arrayExtend = function (array, values) {
  if (isArray(values)) {
    return _arrayExtend(array, values)
  }
  array.push(values)
  return array
}

/**
 * @name arrayExtendMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * any -> value; any -> mapped
 *
 * arrayExtendMap(
 *   array Array<mapped>,
 *   values Array<value>,
 *   valuesIndex number,
 *   valuesMapper value=>mapped,
 * ) -> array
 * ```
 *
 * @description
 * internal extend while mapping
 */
const arrayExtendMap = function (
  array, values, valuesMapper, valuesIndex,
) {
  const valuesLength = values.length
  let arrayIndex = array.length - 1
  while (++valuesIndex < valuesLength) {
    array[++arrayIndex] = valuesMapper(values[valuesIndex])
  }
  return array
}

/**
 * @name setAdd
 *
 * @synopsis
 * ```coffeescript [specscript]
 * setAdd(set Set, item any) -> set
 * ```
 */
const setAdd = (set, item) => set.add(item)

/**
 * @name setExtend
 *
 * @synopsis
 * ```coffeescript [specscript]
 * setExtend(set, values Set|any) -> set
 * ```
 *
 * @related arrayExtend
 */
const setExtend = function (set, values) {
  if (isSet(values)) {
    for (const value of values) {
      set.add(value)
    }
    return set
  }
  return set.add(values)
}

/**
 * @name then
 *
 * @synopsis
 * ```coffeescript [specscript]
 * then(value any, func value=>(result any)) -> result
 * ```
 */
const then = (value, func) => isPromise(value) ? value.then(func) : func(value)

/**
 * @name promiseObjectAll
 *
 * @synopsis
 * ```coffeescript [specscript]
 * promiseObjectAll(object<Promise|any>) -> Promise<object>
 * ```
 */
const promiseObjectAll = object => new Promise(function (resolve) {
  const result = {}
  let numPromises = 0
  for (const key in object) {
    const value = object[key]
    if (isPromise(value)) {
      numPromises += 1
      value.then((key => function (res) {
        result[key] = res
        numPromises -= 1
        if (numPromises == 0) resolve(result)
      })(key))
    } else {
      result[key] = value
    }
  }
  if (numPromises == 0) resolve(result)
})

/**
 * @name SyncThenable
 *
 * @synopsis
 * ```coffeescript [specscript]
 * new SyncThenable(value any) -> SyncThenable
 * ```
 */
const SyncThenable = function (value) { this.value = value }

/**
 * @name SyncThenable.prototype.then
 *
 * @synopsis
 * ```coffeescript [specscript]
 * new SyncThenable(value any).then(func function) -> any
 * ```
 */
SyncThenable.prototype.then = function (func) { return func(this.value) }

/**
 * @name funcConcat
 *
 * @synopsis
 * ```coffeescript [specscript]
 * any -> A, any -> B, any -> C
 *
 * funcConcat(
 *   funcA (args ...any)=>(intermediate any),
 *   funcB intermediate=>(result any)
 * ) -> pipedFunction ...args=>result
 * ```
 */
const funcConcat = (
  funcA, funcB,
) => function pipedFunction(...args) {
  const intermediate = funcA(...args)
  return isPromise(intermediate)
    ? intermediate.then(funcB)
    : funcB(intermediate)
}

/**
 * @name funcConcatSync
 *
 * @synopsis
 * funcConcatSync(funcA function, funcB function) -> pipedFunction function
 */
const funcConcatSync = (
  funcA, funcB,
) => function pipedFunction(...args) {
  return funcB(funcA(...args))
}

/**
 * @name pipe
 *
 * @synopsis
 * ```coffeescript [specscript]
 * pipe<args ...any>(
 *   funcs [
 *     ...args=>Promise|any,
 *     ...Array<any=>Promise|any>,
 *   ],
 * ) -> pipeline ...args=>Promise|any
 *
 * Reducer<T> = (any, T)=>Promise|any
 * Transducer = Reducer=>Reducer
 *
 * pipe(
 *   transducers Array<Transducer>,
 * )(reducer Reducer) -> composed Reducer
 * ```
 *
 * @description
 * Chain together an array of functions as a pipe, each function passing its return value as the first argument to the next function until all functions have executed. The final result is the return of the last function execution.
 *
 * ```javascript [playground]
 * console.log(
 *   pipe([
 *     number => number + 1,
 *     number => number + 2,
 *     number => number + 3,
 *   ])(5),
 * ) // 11
 * ```
 *
 * When passed a reducer, a pipe of transducers composes the reducer such that the transducers are applied in series, calling the reducer as the last step to end the chain. The resulting reducer must be used in conjunction with `reduce` to have a transducing effect. For more information on this behavior, see [this resource on transducers](https://github.com/a-synchronous/rubico/blob/master/TRANSDUCERS.md).
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * const square = number => number ** 2
 *
 * const add = (a, b) => a + b
 *
 * const squaredOdds = pipe([
 *   filter(isOdd),
 *   map(square),
 * ])
 *
 * console.log(
 *   [1, 2, 3, 4, 5].reduce(squaredOdds(add), 0),
 * ) // 35
 *
 * console.log(
 *   squaredOdds([1, 2, 3, 4, 5])
 * ) // [1, 9, 25]
 * ```
 *
 * @execution series
 *
 * @transducing
 */
const pipe = function (funcs) {
  const functionPipeline = funcs.reduce(funcConcat),
    functionComposition = funcs.reduceRight(funcConcat)
  return function pipeline(...args) {
    const firstArg = args[0]
    if (
      typeof firstArg == 'function'
        && !isGeneratorFunction(firstArg)
        && !isAsyncGeneratorFunction(firstArg)
    ) {
      return functionComposition(...args)
    }
    return functionPipeline(...args)
  }
}

// funcs Array<function> -> pipeline function
const pipeSync = funcs => funcs.reduce(funcConcatSync)

/**
 * @name pipe.sync
 *
 * @synopsis
 * ```coffeescript [specscript]
 * pipe.sync<args ...any>(
 *   funcs [
 *     ...args=>any,
 *     ...Array<any=>any>,
 *   ],
 * ) -> pipeline ...args=>any
 * ```
 *
 * @description
 * `pipe` that doesn't automatically resolve promises. This variant is a good option if more performance is desired or if manual promise handling is required.
 *
 * ```javascript [playground]
 * pipe.sync([
 *   Promise.resolve,
 *   promise => promise.then(console.log)
 * ])('hey') // hey
 * ```
 */
pipe.sync = pipeSync

/**
 * @name funcObjectAll
 *
 * @synopsis
 * ```coffeescript [specscript]
 * funcObjectAll(
 *   funcs Object<args=>Promise|any>
 * )(args ...any) -> objectAllFuncs ...args=>Promise|Object
 * ```
 */
const funcObjectAll = funcs => function objectAllFuncs(...args) {
  const result = {}
  let isAsync = false
  for (const key in funcs) {
    const resultItem = funcs[key](...args)
    if (isPromise(resultItem)) isAsync = true
    result[key] = resultItem
  }
  return isAsync ? promiseObjectAll(result) : result
}

/**
 * @name funcAll
 *
 * @synopsis
 * ```coffeescript [specscript]
 * funcAll<args ...any>(
 *   funcs Array<args=>Promise|any>
 * ) -> allFuncs args=>Promise|Array
 * ```
 */
const funcAll = funcs => function allFuncs(...args) {
  const funcsLength = funcs.length,
    result = Array(funcsLength)
  let funcsIndex = -1, isAsync = false
  while (++funcsIndex < funcsLength) {
    const resultItem = funcs[funcsIndex](...args)
    if (isPromise(resultItem)) isAsync = true
    result[funcsIndex] = resultItem
  }
  return isAsync ? promiseAll(result) : result
}

/**
 * @name fork
 *
 * @synopsis
 * ```coffeescript [specscript]
 * fork<args ...any>(
 *   funcs Object<...args=>Promise|any>,
 * )(...args) -> result Promise|Object
 *
 * fork<args ...any>(
 *   funcs Array<...args=>Promise|any>,
 * )(...args) -> result Promise|Array
 * ```
 *
 * @description
 * A multi-purpose function, parallelizes multiple functions with concurrent execution into either an object, an array, or a nested mix of both. Has use cases in parallel execution and object composition.
 *
 * ```javascript [playground]
 * console.log(
 *   fork({
 *     greetings: fork([
 *       greeting => greeting + ' world',
 *       greeting => greeting + ' mom',
 *     ]),
 *   })('hello'),
 * ) // { greetings: ['hello world', 'hello mom'] }
 * ```
 *
 * @execution concurrent
 */
const fork = funcs => isArray(funcs) ? funcAll(funcs) : funcObjectAll(funcs)

/**
 * @name asyncFuncAllSeries
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncFuncAllSeries(
 *   funcs Array<function>,
 *   args Array,
 *   result Array,
 *   funcsIndex number,
 * ) -> result
 * ```
 *
 * @TODO benchmark vs regular promise handling
 */
const asyncFuncAllSeries = async function (funcs, args, result, funcsIndex) {
  const funcsLength = funcs.length
  while (++funcsIndex < funcsLength) {
    result[funcsIndex] = await funcs[funcsIndex](...args)
  }
  return result
}

/**
 * @name funcAllSeries
 *
 * @synopsis
 * ```coffeescript [specscript]
 * funcAllSeries<args ...any>(
 *   funcs Array<...args=>any>,
 * ) -> allFuncsSeries ...args=>Promise|Array
 * ```
 *
 * @TODO .then quickscope
 */
const funcAllSeries = funcs => function allFuncsSeries(...args) {
  const funcsLength = funcs.length, result = []
  let funcsIndex = -1
  while (++funcsIndex < funcsLength) {
    const resultItem = funcs[funcsIndex](...args)
    if (isPromise(resultItem)) {
      return resultItem.then(res => {
        result[funcsIndex] = res
        return asyncFuncAllSeries(funcs, args, result, funcsIndex)
      })
    }
    result[funcsIndex] = resultItem
  }
  return result
}

/**
 * @name fork.series
 *
 * @synopsis
 * ```coffeescript [specscript]
 * fork.series<args ...any>(
 *   funcs Array<...args=>Promise|any>,
 * )(...args) -> Promise|Array
 * ```
 *
 * @description
 * `fork` with serial execution.
 *
 * ```javascript [playground]
 * const sleep = ms => () => new Promise(resolve => setTimeout(resolve, ms))
 *
 * fork.series([
 *   greeting => console.log(greeting + ' world'),
 *   sleep(1000),
 *   greeting => console.log(greeting + ' mom'),
 *   sleep(1000),
 *   greeting => console.log(greeting + ' darkness'),
 * ])('hello') // hello world
 *             // hello mom
 *             // hello darkness
 * ```
 *
 * @execution series
 */
fork.series = funcAllSeries

/**
 * @name assign
 *
 * @synopsis
 * ```coffeescript [specscript]
 * assign(
 *   funcs Object<source=>Promise|any>,
 * )(source Object) -> resultsMergedWithSource Promise|Object
 * ```
 *
 * @description
 * Compose an object from a source object merged with the evaluations of the property functions of a specifying object of functions. Functions of the specifying object of functions may be asynchronous.
 *
 * ```javascript [playground]
 * console.log(
 *   assign({
 *     squared: ({ number }) => number ** 2,
 *     cubed: ({ number }) => number ** 3,
 *   })({ number: 3 }),
 * ) // { number: 3, squared: 9, cubed: 27 }
 *
 * assign({
 *   asyncNumber: async ({ number }) => number,
 * })({ number: 3 }).then(console.log) // { number: 3, asyncNumber: 3 }
 * ```
 *
 * @execution concurrent
 */
const assign = function (funcs) {
  const allFuncs = funcObjectAll(funcs)
  return function assignment(value) {
    const result = allFuncs(value)
    return isPromise(result)
      ? result.then(curry2(objectAssign, value, __))
      : ({ ...value, ...result })
  }
}

/**
 * @name tap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * tap(tapper value=>Promise|any)(value any) -> value
 * ```
 *
 * @description
 * Call a function with a value, returning the value. Promises created by the tapper are resolved before returning the value.
 *
 * ```javascript [playground]
 * pipe([
 *   tap(console.log),
 *   value => value + 'bar',
 *   tap(console.log),
 * ])('foo') // 'foo'
 *           // 'foobar'
 * ```
 */
const tap = func => function tapping(...args) {
  const result = args[0],
    call = func(...args)
  return isPromise(call) ? call.then(always(result)) : result
}

/**
 * @name tapSync
 *
 * @synopsis
 * ```coffeescript [specscript]
 * tapSync(function)(args ...any) -> args[0]
 * ```
 */
const tapSync = func => function tapping(...args) {
  func(...args)
  return args[0]
}

/**
 * @name thunkConditional
 *
 * @synopsis
 * ```coffeescript [specscript]
 * thunkConditional(
 *   boolean,
 *   thunkA ()=>any,
 *   thunkB ()=>any,
 * ) -> any
 * ```
 */
const thunkConditional = (
  boolean, thunkA, thunkB,
) => boolean ? thunkA() : thunkB()

/**
 * @name tap.sync
 *
 * @synopsis
 * ```coffeescript [specscript]
 * tap.sync(
 *   tapper value=>any,
 * )(value any) -> value
 * ```
 *
 * @description
 * Synchronous tap
 *
 * ```javascript [playground]
 * pipe([
 *   tap.sync(number => console.log('square', number ** 2))
 *   tap.sync(number => console.log('cube', number ** 3))
 * ])(3) // 9
 *       // 27
 * ```
 */
tap.sync = tapSync

/**
 * @name tap.if
 *
 * @synopsis
 * ```coffeescript [specscript]
 * tap.if<args ...any>(
 *   predicate ...args=>Promise|boolean,
 *   func ...args=>Promise|any,
 * )(...args) -> Promise|value
 * ```
 *
 * @description
 * Conditional tap by predicate
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * const logIfOdd = tap.if(
 *   isOdd,
 *   number => console.log(number, 'is an odd number'))
 *
 * logIfOdd(2)
 * logIfOdd(3) // 3 is an odd number
 * ```
 *
 * @related tap
 */
tap.if = (predicate, func) => function tappingIf(...args) {
  const predication = predicate(...args)
  if (isPromise(predication)) {
    return predication.then(curry3(
      thunkConditional, __, thunkifyArgs(tap(func), args), always(args[0])))
  }
  if (predication) {
    func(...args)
  }
  return args[0]
}

/**
 * @name catcherApply
 *
 * @synopsis
 * ```coffeescript [specscript]
 * catcherApply(
 *   catcher function,
 *   err Error|any,
 *   args Array,
 * ) -> catcher(err, ...args)
 * ```
 */
const catcherApply = function (catcher, err, args) {
  return catcher(err, ...args)
}

/**
 * @name tryCatch
 *
 * @synopsis
 * ```coffeescript [specscript]
 * tryCatch<args ...any>(
 *   tryer ...args=>Promise|any,
 *   catcher (err Error|any, ...args)=>Promise|any,
 * )(...args) -> result Promise|any
 * ```
 *
 * @description
 * Try a tryer, catch with catcher. On error or rejected Promise, call the catcher with the error followed by any arguments to the tryer.
 *
 * ```javascript [playground]
 * const errorThrower = tryCatch(
 *   message => {
 *     throw new Error(message)
 *   },
 *   (err, message) => {
 *     console.log(err)
 *     return `${message} from catcher`
 *   },
 * )
 *
 * console.log(errorThrower('hello')) // Error: hello
 *                                    // hello from catcher
 * ```
 */
const tryCatch = (tryer, catcher) => function tryCatcher(...args) {
  try {
    const result = tryer(...args)
    return isPromise(result)
      ? result.catch(curry3(catcherApply, catcher, __, args))
      : result
  } catch (err) {
    return catcher(err, ...args)
  }
}

/**
 * @name asyncFuncSwitch
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncFuncSwitch(
 *   funcs Array<args=>Promise|any>,
 *   args Array,
 *   funcsIndex number,
 * ) -> Promise|any
 * ```
 *
 * @TODO isPromise conditional await
 * @TODO benchmark vs regular promise handling
 */
const asyncFuncSwitch = async function (funcs, args, funcsIndex) {
  const lastIndex = funcs.length - 1
  while ((funcsIndex += 2) < lastIndex) {
    if (await funcs[funcsIndex](...args)) {
      return funcs[funcsIndex + 1](...args)
    }
  }
  return funcs[funcsIndex](...args)
}

/**
 * @name funcApply
 *
 * @synopsis
 * ```coffeescript [specscript]
 * funcApply(func function, args Array) -> func(...args)
 * ```
 */
const funcApply = (func, args) => func(...args)

/**
 * @name switchCase
 *
 * @synopsis
 * ```coffeescript [specscript]
 * switchCase<args ...any>(
 *   conditionalFunctions Array<...args=>Promise|boolean|any>
 * )(...args) -> result Promise|any
 * ```
 *
 * @description
 * Conditional operator for functions. Odd indexed functions should be resolvers, while even indexed functions excluding the last should be predicates. For an odd number of functions, the last even indexed function should be a default resolver function. Any predicates or resolvers may be asynchronous.
 *
 * ```javascript [playground]
 * const fruitIsYellow = fruit => fruit.color == 'yellow'
 *
 * const fruitsGuesser = switchCase([
 *   fruitIsYellow, fruit => fruit.name + ' is possibly a banana',
 *   fruit => fruit.name + ' is probably not a banana',
 * ])
 *
 * console.log(
 *   fruitsGuesser({ name: 'plantain', color: 'yellow' }),
 * ) // plantain is possibly a banana
 * ```
 *
 * If an even number of functions is supplied, the last predicate should always return true.
 *
 * ```javascript [playground]
 * const questionableIsOdd = switchCase([
 *   number => number === 1, () => true,
 *   number => number === 2, () => false,
 *   number => number === 3, () => true,
 *   number => number === 4, () => false,
 *   number => number === 5, () => true,
 *   () => true, number => number % 2 === 1,
 * ])
 *
 * console.log(questionableIsOdd(1)) // true
 * console.log(questionableIsOdd(6)) // false
 * ```
 */
const switchCase = funcs => function switchingCases(...args) {
  const lastIndex = funcs.length - 1
  let funcsIndex = -2

  while ((funcsIndex += 2) < lastIndex) {
    const shouldReturnNext = funcs[funcsIndex](...args)
    if (isPromise(shouldReturnNext)) {
      return shouldReturnNext.then(curry3(
        thunkConditional,
        __,
        thunkify1(curry2(funcApply, funcs[funcsIndex + 1], __), args),
        thunkify3(asyncFuncSwitch, funcs, args, funcsIndex)))
    }
    if (shouldReturnNext) {
      return funcs[funcsIndex + 1](...args)
    }
  }
  return funcs[funcsIndex](...args)
}

/**
 * @name arrayMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayMap(
 *   array Array<T>,
 *   mapper T=>Promise|any,
 * ) -> Promise|Array
 * ```
 */
const arrayMap = function (array, mapper) {
  const arrayLength = array.length,
    result = Array(arrayLength)
  let index = -1,
    isAsync = false

  while (++index < arrayLength) {
    const resultItem = mapper(array[index])
    if (isPromise(resultItem)) {
      isAsync = true
    }
    result[index] = resultItem
  }
  return isAsync ? promiseAll(result) : result
}

/**
 * @name setMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * setMap(set Set, mapper function) -> result Set
 * ```
 */
const setMap = function (set, mapper) {
  const result = new Set(),
    promises = []
  for (const item of set) {
    const resultItem = mapper(item)
    if (isPromise(resultItem)) {
      promises.push(resultItem.then(curry2(setAdd, result, __)))
    } else {
      result.add(resultItem)
    }
  }
  return promises.length == 0
    ? result
    : promiseAll(promises).then(always(result))
}

// (map Map, key any, item any) -> map
const mapSetItem = (map, key, item) => map.set(key, item)

/**
 * @name mapMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * mapMap<T>(
 *   value Map<any, T>,
 *   mapper T=>Promise|any,
 * ) -> Promise|Map<any, any>
 * ```
 */
const mapMap = function (value, mapper) {
  const result = new Map(),
    promises = []
  for (const [key, item] of value) {
    const resultItem = mapper(item)
    if (isPromise(resultItem)) {
      promises.push(resultItem.then(
        curry3(mapSetItem, result, key, __)))
    } else {
      result.set(key, resultItem)
    }
  }
  return promises.length == 0
    ? result
    : promiseAll(promises).then(always(result))
}

/**
 * @name stringMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * stringMap(
 *   string String<T>,
 *   mapper T=>Promise|any,
 * ) -> Promise|String
 * ```
 *
 * @related stringFlatMap
 */
const stringMap = function (string, mapper) {
  const result = arrayMap(string, mapper)
  return isPromise(result)
    ? result.then(curry3(callPropUnary, __, 'join', ''))
    : result.join('')
}

/**
 * @name objectMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * objectMap(
 *   object Object<T>,
 *   mapper T=>Promise|any,
 * ) -> Promise|Object
 * ```
 */
const objectMap = function (object, mapper) {
  const result = {}
  let isAsync = false

  for (const key in object) {
    const resultItem = mapper(object[key])
    if (isPromise(resultItem)) isAsync = true
    result[key] = resultItem
  }
  return isAsync ? promiseObjectAll(result) : result
}

/**
 * @name generatorFunctionMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * generatorFunctionMap(
 *   generatorFunc ...any=>Generator<T>,
 *   mapper T=>Promise|any,
 * ) -> ...any=>Generator
 * ```
 */
const generatorFunctionMap = function (generatorFunc, mapper) {
  return function* mappingGeneratorFunc(...args) {
    for (const item of generatorFunc(...args)) {
      yield mapper(item)
    }
  }
}

/**
 * @name MappingIterator
 *
 * @synopsis
 * ```coffeescript [specscript]
 * const mappingIterator = new MappingIterator(
 *   iter Iterator<T>,
 *   mapper T=>any,
 * ) -> mappingIterator Iterator
 * ```
 *
 * mappingIterator.next() -> { value: any, done: boolean }
 */
const MappingIterator = function (iter, mapper) {
  this.iter = iter
  this.mapper = mapper
}

MappingIterator.prototype = {
  [symbolIterator]() {
    return this
  },
  next() {
    const iteration = this.iter.next()
    return iteration.done
      ? iteration
      : { value: this.mapper(iteration.value), done: false }
  },
}

/**
 * @name asyncGeneratorFunctionMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncGeneratorFunctionMap(
 *   asyncGeneratorFunc ...any=>AsyncGenerator<T>,
 *   mapper T=>Promise|any,
 * ) -> ...any=>AsyncGenerator
 * ```
 */
const asyncGeneratorFunctionMap = function (asyncGeneratorFunc, mapper) {
  return async function* mappingAsyncGeneratorFunc(...args) {
    for await (const item of asyncGeneratorFunc(...args)) {
      yield mapper(item)
    }
  }
}

/**
 * @name toIteration
 *
 * @synopsis
 * ```coffeescript [specscript]
 * toIteration(value any) -> { value, done: false }
 * ```
 */
const toIteration = value => ({ value, done: false })

/**
 * @name MappingAsyncIterator
 *
 * @synopsis
 * ```coffeescript [specscript]
 * mappingAsyncIterator = new MappingAsyncIterator(
 *   asyncIter AsyncIterator<T>,
 *   mapper T=>Promise|any,
 * ) -> mappingAsyncIterator AsyncIterator
 *
 * mappingAsyncIterator.next() -> Promise<{ value: any, done: boolean }>
 * ```
 */
const MappingAsyncIterator = function (asyncIter, mapper) {
  this.asyncIter = asyncIter
  this.mapper = mapper
}

MappingAsyncIterator.prototype = {
  [symbolAsyncIterator]() {
    return this
  },
  async next() {
    const iteration = await this.asyncIter.next()
    if (iteration.done) {
      return iteration
    }

    const mapped = this.mapper(iteration.value)
    return isPromise(mapped)
      ? mapped.then(toIteration)
      : { value: mapped, done: false }
  }
}

/**
 * @name reducerMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * reducerMap(
 *   reducer (any, T)=>any,
 *   mapper T=>Promise|any,
 * ) -> mappingReducer (any, any)=>any
 * ```
 */
const reducerMap = (reducer, mapper) => function mappingReducer(result, value) {
  const mapped = mapper(value)
  return isPromise(mapped)
    ? mapped.then(curry2(reducer, result, __))
    : reducer(result, mapped)
}

/**
 * @name map
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Functor<T> = Array<T>|Object<T>
 *   |Iterator<T>|AsyncIterator<T>|{ map: T=>any }
 * Reducer<T> = (any, T)=>Promise|any
 *
 * map<T>(
 *   mapper T=>Promise|any,
 * )(Functor<T>) -> mappedFunctor Promise|Functor
 *
 * map<T>(
 *   mapper T=>any, # note: only synchronous predicates allowed here
 * )(generatorFunction GeneratorFunction<T>)
 *   -> mappingGeneratorFunction GeneratorFunction
 *
 * map<T>(
 *   mapper T=>Promise|any,
 * )(asyncGeneratorFunction AsyncGeneratorFunction<T>)
 *   -> mappingAsyncGeneratorFunction AsyncGeneratorFunction
 *
 * map<T>(
 *   mapper T=>Promise|any,
 * )(reducer Reducer<T>) -> mappingReducer Reducer
 * ```
 *
 * @description
 * Apply a mapper concurrently to each item of a collection, returning a collection of the same type with all results. If order is implied by the collection, it is maintained in the result. Below are valid collections along with their iteration behavior.
 *
 *  * `Array` - iterate values by index
 *  * `Object` - iterate object values
 *  * `Iterator`/`Generator` - iterate by calling `.next`
 *  * `AsyncIterator`/`AsyncGenerator` - iterate by calling `.next`, then awaiting. Mapper is still applied concurrently.
 *  * `{ map: mapper (T=>any)=>this }` - literal functor - call `.map` directly with mapper.
 *
 * For all other types, the mapper is applied directly to the data parameter.
 *
 * ```javascript [playground]
 * const square = number => number ** 2
 *
 * console.log(
 *   map(square)([1, 2, 3, 4, 5]),
 * ) // [1, 4, 9, 16, 25]
 *
 * console.log(
 *   map(square)({ a: 1, b: 2, c: 3 }),
 * ) // { a: 1, b: 4, c: 9 }
 *
 * console.log(
 *   map(square)(3)
 * ) // 9
 * ```
 *
 * Functions are regarded as resolvers. Each of the following calls, when passed to a mapping function `map(mapper)`, creates a function with all items of its return transformed by the mapper.
 *
 *  * `...any=>Iterator` or `GeneratorFunction` - items of the iterator are mapped into a new iterator. Warning: using an async mapper in a synchronous generator function is not recommended and could lead to unexpected behavior.
 *  * `...any=>AsyncIterator` or `AsyncGeneratorFunction` - items of the async iterator are mapped into a new async iterator. Async result items are awaited in a new async iterator. Async mapper functions are valid.
 *  * `Reducer<T> = (any, T)=>Promise|any` - when combined with `reduce` or any implementation thereof, items of the reducing operation are transformed by the mapper function. If an async mapper function is desired here, it is possible with rubico `reduce`.
 *
 * With mapping generator functions and mapping async generator functions, transformations on iterators and their async counterparts are simple to compose.
 *
 * ```javascript [playground]
 * const capitalize = string => string.toUpperCase()
 *
 * const abc = function* () {
 *   yield 'a'; yield 'b'; yield 'c'
 * }
 *
 * const ABC = map(capitalize)(abc)
 *
 * const abcIter = abc()
 *
 * const ABCIter = ABC()
 *
 * console.log([...abcIter]) // ['a', 'b', 'c']
 *
 * console.log([...ABCIter]) // ['A', 'B', 'C']
 * ```
 *
 * Function laziness is extended to reducer functions as [transducers](https://github.com/a-synchronous/rubico/blob/master/TRANSDUCERS.md).
 *
 * ```
 * Reducer<T> = (any, T)=>Promise|any
 *
 * Transducer = Reducer=>Reducer
 * ```
 *
 * A reducer is a variadic function like the one supplied to `Array.prototype.reduce`, but without the index and reference to the accumulated result per call. A transducer is a function that accepts a reducer function as an argument and returns another reducer function, which enables chaining functionality for reducers. `map` is core to this mechanism, and provides a way to create transducers with mapper functions.
 *
 * ```javascript [playground]
 * const square = number => number ** 2
 *
 * const concat = (array, item) => array.concat(item)
 *
 * const mapSquare = map(square)
 * // mapSquare could potentially be a transducer, but at this point, it is
 * // undifferentiated and not necessarily locked in to transducer behavior.
 *
 * console.log(
 *   mapSquare([1, 2, 3, 4, 5]),
 * ) // [1, 4, 9, 16, 25]
 *
 * const squareConcatReducer = mapSquare(concat)
 * // now mapSquare is passed the function concat, so it assumes transducer
 * // position. squareConcatReducer is a reducer with chained functionality
 * // square and concat.
 *
 * console.log(
 *   [1, 2, 3, 4, 5].reduce(squareConcatReducer, []),
 * ) // [1, 4, 9, 16, 25]
  *
 * console.log(
 *   [1, 2, 3, 4, 5].reduce(squareConcatReducer, ''),
 * ) // '1491625'
 * ```
 *
 * @execution concurrent
 *
 * @transducing
 *
 * @TODO streamMap
 */
const map = mapper => function mapping(value) {
  if (isArray(value)) {
    return arrayMap(value, mapper)
  }
  if (typeof value == 'function') {
    if (isGeneratorFunction(value)) {
      return generatorFunctionMap(value, mapper)
    }
    if (isAsyncGeneratorFunction(value)) {
      return asyncGeneratorFunctionMap(value, mapper)
    }
    return reducerMap(value, mapper)
  }
  if (value == null) {
    return value
  }

  if (typeof value.next == 'function') {
    return symbolIterator in value
      ? new MappingIterator(value, mapper)
      : new MappingAsyncIterator(value, mapper)
  }
  if (typeof value == 'string' || value.constructor == String) {
    return stringMap(value, mapper)
  }
  if (value.constructor == Set) {
    return setMap(value, mapper)
  }
  if (value.constructor == Map) {
    return mapMap(value, mapper)
  }
  if (value.constructor == Object) {
    return objectMap(value, mapper)
  }
  return typeof value.map == 'function' ? value.map(mapper) : mapper(value)
}

/**
 * @name asyncArrayMapSeries
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncArrayMapSeries(
 *   array Array,
 *   mapper function,
 *   result Array,
 *   index number,
 * ) -> result
 * ```
 */
const asyncArrayMapSeries = async function (array, mapper, result, index) {
  const arrayLength = array.length
  while (++index < arrayLength) {
    result[index] = await mapper(array[index])
  }
  return result
}

/**
 * @name setProperty
 *
 * @synopsis
 * ```coffeescript [specscript]
 * setProperty(
 *   object Object,
 *   property string,
 *   value any,
 * ) -> object
 * ```
 */
const setProperty = function (object, property, value) {
  object[property] = value
  return object
}

/**
 * @name arrayMapSeries
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayMapSeries<T>(array Array<T>, mapper T=>any) -> result Array
 * ```
 */
const arrayMapSeries = function (array, mapper) {
  const arrayLength = array.length,
    result = Array(arrayLength)
  let index = -1

  while (++index < arrayLength) {
    const resultItem = mapper(array[index])
    if (isPromise(resultItem)) {
      return resultItem.then(funcConcat(
        curry3(setProperty, result, index, __),
        curry4(asyncArrayMapSeries, array, mapper, __, index)))
    }
    result[index] = resultItem
  }
  return result
}

/**
 * @name map.series
 *
 * map.series(
 *   mapper any=>Promise|any,
 * )(value Array) -> Promise|Array
 *
 * @description
 * `map` with serial execution.
 *
 * ```javascript [playground]
 * const delayedLog = number => new Promise(function (resolve) {
 *   setTimeout(function () {
 *     console.log(number)
 *     resolve()
 *   }, 1000)
 * })
 *
 * console.log('start')
 * map.series(delayedLog)([1, 2, 3, 4, 5])
 * ```
 *
 * @execution series
 */
map.series = mapper => function serialMapping(value) {
  if (isArray(value)) {
    return arrayMapSeries(value, mapper)
  }
  throw new TypeError(`${value} is not an Array`)
}

/**
 * @name asyncArrayMapPool
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncArrayMapPool(
 *   array Array<A>,
 *   mapper A=>B,
 *   concurrencyLimit number,
 *   result Array<B>,
 *   index number,
 *   promises Set<Promise>,
 * ) -> result
 * ```
 */
const asyncArrayMapPool = async function (
  array, mapper, concurrencyLimit, result, index, promises,
) {
  const arrayLength = array.length

  while (++index < arrayLength) {
    if (promises.size >= concurrencyLimit) {
      await promiseRace(promises)
    }
    const resultItem = mapper(array[index])
    if (isPromise(resultItem)) {
      const selfDeletingPromise = resultItem.then(
        tapSync(() => promises.delete(selfDeletingPromise)))
      promises.add(selfDeletingPromise)
      result[index] = selfDeletingPromise
    } else {
      result[index] = resultItem
    }
  }
  return promiseAll(result)
}

/**
 * @name
 * arrayMapPool
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayMapPool<T>(
 *   array Array<T>,
 *   mapper T=>any,
 *   concurrentLimit number,
 * ) -> result Promise|Array
 * ```
 */
const arrayMapPool = function (array, mapper, concurrentLimit) {
  const arrayLength = array.length,
    result = Array(arrayLength)
  let index = -1

  while (++index < arrayLength) {
    const resultItem = mapper(array[index])
    if (isPromise(resultItem)) {
      const promises = new Set(),
        selfDeletingPromise = resultItem.then(
          tapSync(() => promises.delete(selfDeletingPromise)))
      promises.add(selfDeletingPromise)
      result[index] = selfDeletingPromise
      return asyncArrayMapPool(
        array, mapper, concurrentLimit, result, index, promises)
    }
    result[index] = resultItem
  }
  return result
}

/**
 * @name map.pool
 *
 * @synopsis
 * ```coffeescript [specscript]
 * map.pool(
 *   maxConcurrency number,
 *   mapper any=>Promise|any
 * )(value Array) -> Promise|Array
 * ```
 *
 * @description
 * `map` with a concurrency limit that specifies the maximum number of promises in flight at any given moment.
 *
 * ```javascript [playground]
 * const delayedLog = x => new Promise(function (resolve) {
 *   setTimeout(function () {
 *     console.log(x)
 *     resolve()
 *   }, 1000)
 * })
 *
 * console.log('start')
 * map.pool(2, delayedLog)([1, 2, 3, 4, 5])
 * ```
 *
 * @execution concurrent
 */
map.pool = (concurrencyLimit, mapper) => function concurrentPoolMapping(value) {
  if (isArray(value)) {
    return arrayMapPool(value, mapper, concurrencyLimit)
  }
  throw new TypeError(`${value} is not an Array`)
}

/**
 * @name arrayMapWithIndex
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayMapWithIndex(
 *   array Array<T>,
 *   mapper (item T, index number, array Array<T>)=>Promise|any
 * ) -> Promise|Array
 * ```
 */
const arrayMapWithIndex = function (array, mapper) {
  const arrayLength = array.length,
    result = Array(arrayLength)
  let index = -1, isAsync = false

  while (++index < arrayLength) {
    const resultItem = mapper(array[index], index, array)
    if (isPromise(resultItem)) {
      isAsync = true
    }
    result[index] = resultItem
  }
  return isAsync ? promiseAll(result) : result
}

/**
 * @name map.withIndex
 *
 * @synopsis
 * ```coffeescript [specscript]
 * map.withIndex(
 *   mapper (item T, index number, Array<T>)=>Promise|any,
 * )(Array<T>) -> Promise|Array
 * ```
 *
 * @description
 * `map` with index and collection parameters additionally supplied to the mapper each iteration.
 *
 * ```javascript [playground]
 * const range = length => map.withIndex(
 *   (_, index) => index + 1)(Array(length))
 *
 * console.log(range(5)) // [1, 2, 3, 4, 5]
 * ```
 *
 * @execution concurrent
 *
 * @related
 * map, filter.withIndex
 */
map.withIndex = mapper => function mappingWithIndex(value) {
  if (isArray(value)) {
    return arrayMapWithIndex(value, mapper)
  }
  throw new TypeError(`${value} is not an Array`)
}

/**
 * @name map.own
 *
const Person = function (name) {
  this.name = name
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`)
}

const david = new Person('david')

david.greet() // Hello, my name is david

david.a = 1
david.b = 2
david.c = 3

const square = number => number ** 2

const nativeHasOwnProperty = Object.prototype.hasOwnProperty

const objectHasOwnProperty = (object, property) => nativeHasOwnProperty.call(object, property)

map.own = mapper => function mappingOwnProperties(object) {
  const result = {}
  for (const key in object) {
    if (objectHasOwnProperty(object, key)) {
      result[key] = mapper(object[key]) // TODO promise support
    }
  }
  return result
}

console.log(
  map.own(square)(david),
) // { name: NaN, a: 1, b: 4, c: 9 }
 *
 *
 */

/**
 * @name arrayFilterByConditions
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayFilterByConditions(
 *   array Array,
 *   result Array,
 *   index number,
 *   conditions Array<boolean>,
 * ) -> result
 * ```
 */
const arrayFilterByConditions = function (
  array, result, index, conditions,
) {
  const arrayLength = array.length,
    resultPush = result.push.bind(result)
  let conditionsIndex = -1

  while (++index < arrayLength) {
    if (conditions[++conditionsIndex]) {
      resultPush(array[index])
    }
  }
  return result
}

/**
 * @name arrayFilter
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayFilter<T>(
 *   array Array<T>,
 *   predicate T=>Promise|boolean,
 * ) -> result Promise|Array<T>
 * ```
 */
const arrayFilter = function (array, predicate) {
  const arrayLength = array.length,
    result = []
  let index = -1,
    resultIndex = -1

  while (++index < arrayLength) {
    const item = array[index]
    const shouldIncludeItem = predicate(item)
    if (isPromise(shouldIncludeItem)) {
      return promiseAll(
        arrayExtendMap(
          [shouldIncludeItem], array, predicate, index)).then(
            curry4(arrayFilterByConditions, array, result, index - 1, __))
    }
    if (shouldIncludeItem) {
      result[++resultIndex] = item
    }
  }
  return result
}

/**
 * @name transferPropertyByCondition
 *
 * @synopsis
 * ```coffeescript [specscript]
 * transferPropertyByCondition(
 *   objectA object,
 *   objectB object,
 *   key string,
 *   condition boolean,
 * ) -> ()
 * ```
 */
const transferPropertyByCondition = function (
  target, source, key, condition,
) {
  if (condition) {
    target[key] = source[key]
  }
}

/**
 * @name objectFilter
 *
 * @synopsis
 * ```coffeescript [specscript]
 * objectFilter<T>(
 *   object Object<T>,
 *   predicate T=>boolean,
 * ) -> result Object<T>
 * ```
 */
const objectFilter = function (object, predicate) {
  const result = {},
    promises = []

  for (const key in object) {
    const item = object[key]
    const shouldIncludeItem = predicate(item)
    if (isPromise(shouldIncludeItem)) {
      promises.push(shouldIncludeItem.then(
        curry4(transferPropertyByCondition, result, object, key, __)))
    } else if (shouldIncludeItem) {
      result[key] = item
    }
  }
  return promises.length == 0
    ? result
    : promiseAll(promises).then(always(result))
}

/**
 * @name generatorFunctionFilter
 *
 * @synopsis
 * ```coffeescript [specscript]
 * generatorFunctionFilter(
 *   generatorFunction GeneratorFunction<args, T>
 *   predicate T=>boolean,
 * ) -> filteringGeneratorFunction GeneratorFunction<args, T>
 * ```
 */
const generatorFunctionFilter = function (generatorFunction, predicate) {
  return function* filteringGeneratorFunction(...args) {
    for (const item of generatorFunction(...args)) {
      if (predicate(item)) {
        yield item
      }
    }
  }
}

/**
 * @name FilteringIterator
 *
 * @synopsis
 * ```coffeescript [specscript]
 * filteringIterator = new FilteringIterator(
 *   iter Iterator<T>,
 *   predicate T=>boolean,
 * )
 *
 * filteringIterator.next() -> { value: any, done: boolean }
 * ```
 */
const FilteringIterator = function (iter, predicate) {
  this.iter = iter
  this.predicate = predicate
}

FilteringIterator.prototype = {
  [symbolIterator]() {
    return this
  },
  next() {
    const thisIterNext = this.iter.next.bind(this.iter),
      thisPredicate = this.predicate
    let iteration = this.iter.next()

    while (!iteration.done) {
      const { value } = iteration
      if (thisPredicate(value)) {
        return { value, done: false }
      }
      iteration = thisIterNext()
    }
    return iteration
  },
}

/**
 * @name asyncGeneratorFunctionFilter
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncGeneratorFunctionFilter(
 *   asyncGeneratorFunction AsyncGeneratorFunction<args, T>,
 *   predicate T=>boolean,
 * ) -> filteringAsyncGeneratorFunction AsyncGeneratorFunction<args, T>
 * ```
 */
const asyncGeneratorFunctionFilter = function (asyncGeneratorFunction, predicate) {
  return async function* filteringAsyncGeneratorFunction(...args) {
    for await (const item of asyncGeneratorFunction(...args)) {
      const shouldIncludeItem = predicate(item)
      if (
        isPromise(shouldIncludeItem)
          ? await shouldIncludeItem
          : shouldIncludeItem
      ) {
        yield item
      }
    }
  }
}

/**
 * @name FilteringAsyncIterator
 *
 * @synopsis
 * ```coffeescript [specscript]
 * const filteringAsyncIterator = new FilteringAsyncIterator(
 *   iter AsyncIterator<T>,
 *   predicate T=>boolean,
 * ) -> FilteringAsyncIterator<T>
 *
 * filteringAsyncIterator.next() -> { value: Promise, done: boolean }
 * ```
 */
const FilteringAsyncIterator = function (iter, predicate) {
  this.iter = iter
  this.predicate = predicate
}

FilteringAsyncIterator.prototype = {
  [symbolAsyncIterator]() {
    return this
  },
  async next() {
    const thisIterNext = this.iter.next.bind(this.iter),
      thisPredicate = this.predicate
    let iteration = await thisIterNext()

    while (!iteration.done) {
      const { value } = iteration
      const shouldIncludeItem = thisPredicate(value)
      if (
        isPromise(shouldIncludeItem)
          ? await shouldIncludeItem
          : shouldIncludeItem
      ) {
        return { value, done: false }
      }
      iteration = await thisIterNext()
    }
    return iteration
  },
}

/**
 * @name reducerFilterByCondition
 *
 * @synopsis
 * ```coffeescript [specscript]
 * reducerFilterByCondition(
 *   reducer (any, T)=>Promise|any,
 *   result any,
 *   item T,
 *   condition boolean,
 * ) -> any
 * ```
 */
const reducerFilterByCondition = (
  reducer, result, item, condition,
) => condition ? reducer(result, item) : result

/**
 * @name reducerFilter
 *
 * @synopsis
 * ```coffeescript [specscript]
 * reducerFilter(
 *   reducer (any, T)=>Promise|any,
 *   predicate T=>Promise|boolean,
 * ) -> filteringReducer (result any, item T)=>Promise|any
 * ```
 */
const reducerFilter = (
  reducer, predicate,
) => function filteringReducer(result, item) {
  const shouldInclude = predicate(item)
  return isPromise(shouldInclude)
    ? shouldInclude.then(
      curry4(reducerFilterByCondition, reducer, result, item, __))
    : shouldInclude ? reducer(result, item) : result
}

/**
 * @name filter
 *
 * @catchphrase
 * exclude items by predicate
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Filterable<T> = Array<T>|Object<T>
 *   |Iterable<T>|AsyncIterable<T>|{ filter: T=>boolean }
 *
 * filter<T>(
 *   predicate T=>Promise|boolean,
 * )(value Filterable<T>) -> filtered Promise|Filterable<T>
 *
 * filter<T>(
 *   predicate T=>boolean, # note: only synchronous predicates allowed here
 * )(generatorFunction GeneratorFunction<T>)
 *   -> filteringGeneratorFunction GeneratorFunction<T>
 *
 * filter<T>(
 *   predicate T=>Promise|boolean,
 * )(asyncGeneratorFunction AsyncGeneratorFunction<T>)
 *   -> filteringAsyncGeneratorFunction AsyncGeneratorFunction<T>
 *
 * filter<T>(
 *   predicate T=>Promise|boolean,
 * )(reducer (any, T)=>Promise|any)
 *   -> filteringReducer (any, T)=>Promise|any
 * ```
 *
 * @description
 * Exclude items from a collection based on the results of their concurrent execution with the predicate. The predicate may be asynchronous.
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * console.log(
 *   filter(isOdd)([1, 2, 3, 4, 5]),
 * ) // [1, 3, 5]
 *
 * console.log(
 *   filter(isOdd)({ a: 1, b: 2, c: 3, d: 4, e: 5 }),
 * ) // { a: 1, c: 3, e: 5 }
 * ```
 *
 * Passing a generator function to `filter` returns a filtering generator function; all values that are normally yielded by a generator function that test falsy with the predicate are skipped by the returned filtering generator function.
 *
 * **Warning**: usage of an async predicate with generator functions or iterators may lead to undesirable behavior.
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * const numbers = function* () {
 *   yield 1; yield 2; yield 3; yield 4; yield 5
 * }
 *
 * const oddNumbers = filter(isOdd)(numbers)
 *
 * for (const number of oddNumbers()) {
 *   console.log(number) // 1
 *                       // 3
 *                       // 5
 * }
 *
 * const oddNumbersGenerator = filter(isOdd)(numbers())
 *
 * for (const number of oddNumbersGenerator) {
 *   console.log(number) // 1
 *                       // 3
 *                       // 5
 * }
 * ```
 *
 * In a similar vein to generators, `filter` also filters elements from async generators.
 *
 * ```javascript [playground]
 * const asyncIsOdd = async number => number % 2 == 1
 *
 * const asyncNumbers = async function* () {
 *   yield 1; yield 2; yield 3; yield 4; yield 5
 * }
 *
 * const asyncOddNumbers = filter(asyncIsOdd)(asyncNumbers)
 *
 * for await (const number of asyncOddNumbers()) {
 *   console.log(number) // 1
 *                       // 3
 *                       // 5
 * }
 *
 * const asyncOddNumbersGenerator = filter(asyncIsOdd)(asyncNumbers())
 *
 * for await (const number of asyncOddNumbersGenerator) {
 *   console.log(number) // 1
 *                       // 3
 *                       // 5
 * }
 * ```
 *
 * Finally, `filter` creates filtering transducers. A reducer created from a filtering transducer skips items of a reducing operation if they test falsy under the predicate.
 *
 * Note: It is possible to use an asynchronous predicate when filtering a reducer, however the implementation of `reduce` must support asynchronous operations. This library provides such an implementation as `reduce`.
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * const concat = (array, item) => array.concat(item)
 *
 * const concatOddNumbers = filter(isOdd)(concat)
 *
 * console.log(
 *   [1, 2, 3, 4, 5].reduce(concatOddNumbers, []),
 * ) // [1, 3, 5]
 * ```
 *
 * @execution concurrent
 *
 * @transducing
 */
const filter = predicate => function filtering(value) {
  if (isArray(value)) {
    return arrayFilter(value, predicate)
  }
  if (isFunction(value)) {
    if (isGeneratorFunction(value)) {
      return generatorFunctionFilter(value, predicate)
    }
    if (isAsyncGeneratorFunction(value)) {
      return asyncGeneratorFunctionFilter(value, predicate)
    }
    return reducerFilter(value, predicate)
  }
  if (value == null) {
    return value
  }

  if (typeof value.next == 'function') {
    return symbolIterator in value
      ? new FilteringIterator(value, predicate)
      : new FilteringAsyncIterator(value, predicate)
  }
  if (value.constructor == Object) {
    return objectFilter(value, predicate)
  }
  return typeof value.filter == 'function' ? value.filter(predicate) : value
}

/**
 * @name arrayExtendMapWithIndex
 *
 * @catchphrase
 * internal extend while mapping with index
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayExtendMapWithIndex(
 *   array Array<B>,
 *   values Array<A>,
 *   valuesMapper (A, valuesIndex number, values)=>B,
 *   valuesIndex number,
 * ) -> array
 * ```
 */
const arrayExtendMapWithIndex = function (
  array, values, valuesMapper, valuesIndex,
) {
  const valuesLength = values.length
  let arrayIndex = array.length - 1

  while (++valuesIndex < valuesLength) {
    array[++arrayIndex] = valuesMapper(
      values[valuesIndex], valuesIndex, values)
  }
  return array
}

/**
 * @name arrayFilterWithIndex
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayFilterWithIndex(
 *   array Array<T>,
 *   predicate (item T, index number, array Array<T>)=>Promise|boolean,
 * ) -> result Promise|Array<T>
 * ```
 */
const arrayFilterWithIndex = function (array, predicate) {
  const arrayLength = array.length,
    result = []
  let index = -1,
    resultIndex = -1

  while (++index < arrayLength) {
    const item = array[index]
    const shouldIncludeItem = predicate(item, index, array)
    if (isPromise(shouldIncludeItem)) {
      return promiseAll(
        arrayExtendMapWithIndex(
          [shouldIncludeItem], array, predicate, index)).then(
            curry4(arrayFilterByConditions, array, result, index - 1, __))
    }
    if (shouldIncludeItem) {
      result[++resultIndex] = item
    }
  }
  return result
}

/**
 * @name filter.withIndex
 *
 * @synopsis
 * ```coffeescript [specscript]
 * filter.withIndex(
 *   predicate T=>Promise|boolean,
 * )(value Array<T>) -> filteredArray Array<T>
 * ```
 *
 * @description
 * `filter` with each predicate call supplemented by index and reference to original collection.
 *
 * ```javascript [playground]
 * const uniq = filter.withIndex(
 *   (item, index, array) => item !== array[index + 1])
 *
 * console.log(
 *   uniq([1, 1, 1, 2, 2, 2, 3, 3, 3]),
 * ) // [1, 2, 3]
 * ```
 *
 * @execution concurrent
 */
filter.withIndex = predicate => function filteringWithIndex(value) {
  if (isArray(value)) {
    return arrayFilterWithIndex(value, predicate)
  }
  throw new TypeError(`${value} is not an Array`)
}

/**
 * @name asyncArrayReduce
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncArrayReduce(
 *   array Array,
 *   reducer function,
 *   result any,
 *   index number,
 * ) -> result
 * ```
 */
const asyncArrayReduce = async function (array, reducer, result, index) {
  const arrayLength = array.length
  while (++index < arrayLength) {
    result = await reducer(result, array[index])
  }
  return result
}

/**
 * @name arrayReduce
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayReduce(
 *   array Array<T>,
 *   reducer (any, T)=>Promise|any,
 *   result any,
 * ) -> result
 * ```
 */
const arrayReduce = function (array, reducer, result) {
  const arrayLength = array.length
  let index = -1
  if (result === undefined) {
    result = array[++index]
  }

  while (++index < arrayLength) {
    result = reducer(result, array[index])
    if (isPromise(result)) {
      return result.then(
        curry4(asyncArrayReduce, array, reducer, __, index))
    }
  }
  return result
}

/**
 * @name asyncIteratorReduce
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncIteratorReduce(
 *   asyncIterator AsyncIterator<T>,
 *   reducer (any, T)=>Promise|any,
 *   result any,
 * ) -> result any
 * ```
 */
const asyncIteratorReduce = async function (asyncIterator, reducer, result) {
  let iteration = await asyncIterator.next()
  if (iteration.done) {
    return result
  }
  if (result === undefined) {
    result = iteration.value
    iteration = await asyncIterator.next()
  }

  while (!iteration.done) {
    result = await reducer(result, iteration.value)
    iteration = await asyncIterator.next()
  }
  return result
}

/**
 * @name asyncGeneratorFunctionReduce
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncGeneratorFunctionReduce(
 *   asyncGeneratorFunc ...args=>AsyncGenerator<T>,
 *   reducer (any, T)=>any,
 *   result any,
 * ) -> (...any args)=>any
 * ```
 */
const asyncGeneratorFunctionReduce = (
  asyncGeneratorFunc, reducer, result,
) => funcConcat(
  asyncGeneratorFunc,
  curry3(asyncIteratorReduce, __, reducer, result))

/**
 * @name iteratorReduce
 *
 * @synopsis
 * ```coffeescript [specscript]
 * iteratorReduce(
 *   iterator Iterator<T>,
 *   reducer (any, T)=>Promise|any,
 *   result any,
 * ) -> result
 * ```
 */
const iteratorReduce = function (iterator, reducer, result) {
  let iteration = iterator.next()
  if (iteration.done) {
    return result
  }
  if (result === undefined) {
    result = iteration.value
    iteration = iterator.next()
  }

  while (!iteration.done) {
    result = reducer(result, iteration.value)
    if (isPromise(result)) {
      return result.then(curry3(asyncIteratorReduce, iterator, reducer, __))
    }
    iteration = iterator.next()
  }
  return result
}

/**
 * @name generatorFunctionReduce
 *
 * @synopsis
 * ```coffeescript [specscript]
 * generatorFunctionReduce(
 *   generatorFunc ...args=>AsyncGenerator<T>,
 *   reducer (any, T)=>Promise|any,
 *   result any,
 * ) -> (...any args)=>any
 * ```
 */
const generatorFunctionReduce = (
  generatorFunc, reducer, result,
) => funcConcat(
  generatorFunc,
  curry3(iteratorReduce, __, reducer, result))

/**
 * @name reducerConcat
 *
 * @synopsis
 * ```coffeescript [specscript]
 * reducerConcat(
 *   reducerA (any, T)=>(intermediate Promise|any),
 *   reducerB (intermediate, T)=>Promise|any,
 * ) -> pipedReducer (any, T)=>Promise|any
 * ```
 */
const reducerConcat = function (reducerA, reducerB) {
  return function pipedReducer(result, item) {
    const intermediate = reducerA(result, item)
    return isPromise(intermediate)
      ? intermediate.then(curry2(reducerB, __, item))
      : reducerB(intermediate, item)
  }
}

/**
 * @name reducerConcatSync
 *
 * @synopsis
 * reducerConcatSync(
 *   reducerA (any, T)=>(intermediate any),
 *   reducerB (intermediate, T)=>any,
 * ) -> pipedReducer (any, T)=>any
const reducerConcatSync = (
  reducerA, reducerB,
) => function pipedReducer(result, item) {
  return reducerB(reducerA(result, item), item)
} */

/**
 * @name tacitGenericReduce
 *
 * @synopsis
 * ```coffeescript [specscript]
 * tacitGenericReduce(
 *   reducer (any, T)=>any,
 *   result any,
 * ) -> reducing ...any=>result
 * ```
 */
const tacitGenericReduce = (
  reducer, result,
) => function reducing(...args) {
  return genericReduce(args, reducer, result)
}

/**
 * @name genericReduce
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Foldable<T> = Iterable<T>|AsyncIterable<T>
 *   |{ reduce: (any, T)=>any }|Object<T>
 *
 * genericReduce<T>(
 *   args [collection Foldable<T>, ...any],
 *   reducer (any, T)=>any,
 *   result any?,
 * ) -> result
 * ```
 *
 * @related genericReduceConcurrent
 *
 * @TODO genericReduceSync(args, reducer, init) - performance optimization for some of these genericReduces that we know are synchronous
 *
 * @TODO genericReducePool(poolSize, args, reducer, init) - for some of these genericReduces that we want to race - result should not care about order of concatenations
 * reduce.pool
 * transform.pool
 * flatMap.pool
 */
var genericReduce = function (args, reducer, result) {
  const collection = args[0]
  if (isArray(collection)) {
    return arrayReduce(collection, reducer, result)
  }
  if (collection == null) {
    return result === undefined
      ? reducer(collection)
      : reducer(result, collection)
  }

  if (typeof collection.next == 'function') {
    return symbolIterator in collection
      ? iteratorReduce(collection, reducer, result)
      : asyncIteratorReduce(collection, reducer, result)
  }
  if (typeof collection[symbolIterator] == 'function') {
    return iteratorReduce(
      collection[symbolIterator](), reducer, result)
  }
  if (typeof collection[symbolAsyncIterator] == 'function') {
    return asyncIteratorReduce(
      collection[symbolAsyncIterator](), reducer, result)
  }
  if (isFunction(collection)) {
    if (isGeneratorFunction(collection)) {
      return generatorFunctionReduce(collection, reducer, result)
    }
    if (isAsyncGeneratorFunction(collection)) {
      return asyncGeneratorFunctionReduce(collection, reducer, result)
    }
    return tacitGenericReduce(
      args.length == 0 ? reducer : args.reduce(reducerConcat, reducer),
      result)
  }
  if (typeof collection.reduce == 'function') {
    return collection.reduce(reducer, result)
  }
  if (typeof collection.chain == 'function') {
    return collection.chain(curry2(reducer, result, __))
  }
  if (typeof collection.flatMap == 'function') {
    return collection.flatMap(curry2(reducer, result, __))
  }
  if (collection.constructor == Object) {
    return arrayReduce(objectValues(collection), reducer, result)
  }
  return result === undefined
    ? reducer(collection)
    : reducer(result, collection)
}

/**
 * @name reduce
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Foldable<T> = Iterable<T>|AsyncIterable<T>
 *   |{ reduce: (any, T)=>any }|Object<T>
 * Reducer<T> = (any, T)=>Promise|any
 * Transducer = Reducer=>Reducer
 *
 * reduce<T>(
 *   reducer Reducer<T>,
 *   init (collection=>Promise|any)|any?,
 * )(collection Foldable<T>) -> Promise|any
 *
 * reduce<args ...any>(
 *   reducer Reducer,
 *   init (...args=>Promise|any)|any?,
 * )(value GeneratorFunction|AsyncGeneratorFunction)
 *   -> reducingFunction ...args=>Promise|Semigroup|any
 *
 * reduce<args ...any>(
 *   reducer Reducer,
 *   init (...args=>Promise|any)|any?,
 * )(anotherReducer Reducer, moreReducers ...Reducer)
 *   -> chainedReducingFunction ...args=>Promise|any
 * ```
 *
 * @description
 * Execute a reducer for each item of a collection, resulting in a single output value.
 *
 * ```javascript [playground]
 * const max = (a, b) => a > b ? a : b
 *
 * console.log(
 *   reduce(max)([1, 3, 5, 4, 2]),
 * ) // 5
 * ```
 *
 * If the optional initialization parameter is supplied, the result starts as that parameter rather than the first item of the collection.
 *
 * ```javascript [playground]
 * const add = (a, b) => a + b
 *
 * console.log(
 *   reduce(add)([1, 2, 3, 4, 5], 0),
 * ) // 15
 * ```
 *
 * If the initialization parameter is a function, it is treated as a resolver and called with the input arguments to resolve an initial value for the accumulator. Unless care is exercised when handling references for this initial value, a function `init` is the recommended way to use reduce for transformations on non-primitive initial values.
 *
 * ```javascript [playground]
 * const concatSquares = (array, value) => array.concat(value ** 2)
 *
 * const initEmptyArray = () => []
 *
 * console.log(
 *   reduce(concatSquares, initEmptyArray)([1, 2, 3, 4, 5]),
 * ) // [1, 4, 9, 16, 25]
 * ```
 *
 * The concept of iteratable reducer execution goes beyond synchronous reducers on arrays. Reducers can be asynchronous, while data parameters can be asynchronous streams.
 *
 * ```javascript [playground]
 * const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
 *
 * // asyncAppReducer(
 * //   state { todos: Array },
 * //   action { type: string, todoID: string },
 * // ) -> state
 * const asyncAppReducer = async function (state, action) {
 *   if (action.type == 'FETCH_TODO') {
 *     const todo = await fetch(
 *       'https://jsonplaceholder.typicode.com/todos/' + action.todoID,
 *     ).then(response => response.json())
 *     console.log('fetched', todo)
 *     state.todos.push(todo)
 *     return state
 *   }
 *   return state
 * }
 *
 * const asyncFetchActions = async function* (count) {
 *   let idCount = 0
 *   while (++idCount <= count) {
 *     await sleep(1000)
 *     yield { type: 'FETCH_TODO', todoID: idCount }
 *   }
 * }
 *
 * const state = { todos: [] }
 *
 * reduce(asyncAppReducer, state)(asyncFetchActions(5)).then(
 *   reducedState => console.log('finalState', reducedState))
 *
 * // fetched { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
 * // fetched { userId: 1, id: 2, title: 'quis ut nam facilis...', completed: false }
 * // fetched { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false }
 * // fetched { userId: 1, id: 4, title: 'et porro tempora', completed: true }
 * // fetched { userId: 1, id: 5, title: 'laboriosam mollitia...', completed: false }
 * // finalState {
 * //   todos: [
 * //     { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
 * //     { userId: 1, id: 2, title: 'quis ut nam facilis...', completed: false },
 * //     { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false },
 * //     { userId: 1, id: 4, title: 'et porro tempora', completed: true },
 * //     { userId: 1, id: 5, title: 'laboriosam mollitia...', completed: false },
 * //   ],
 * // }
 * ```
 *
 * If the first argument to a reducing function is a reducer, `reduce` concatenates any reducers in argument position onto the initial reducer, producing a combined reducer that performs a chained operation per each item in a reducing operation.
 *
 * ```javascript [playground]
 * const reducerA = (state, action) => {
 *   if (action.type == 'A') return { ...state, A: true }
 *   return state
 * }
 *
 * const reducerB = (state, action) => {
 *   if (action.type == 'B') return { ...state, B: true }
 *   return state
 * }
 *
 * const reducerC = (state, action) => {
 *   if (action.type == 'C') return { ...state, C: true }
 *   return state
 * }
 *
 * const reducingABC = reduce(
 *   reducerA, () => ({}))(reducerB, reducerC)
 *
 * const actions = [{ type: 'A' }, { type: 'B' }, { type: 'C' }]
 *
 * console.log(
 *   reducingABC(actions),
 * ) // { A: true, B: true, C: true }
 * ```
 *
 * @execution series
 *
 * @transducing
 *
 * @TODO readerReduce
 *
 * @TODO reduce.concurrent
 */
const reduce = function (reducer, init) {
  if (typeof init == 'function') {
    return function reducing(...args) {
      const result = init(...args)
      return isPromise(result)
        ? result.then(curry3(genericReduce, args, reducer, __))
        : genericReduce(args, reducer, result)
    }
  }
  return tacitGenericReduce(reducer, init)
}

/**
 * @name emptyTransform
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Reducer<T> = (any, T)=>Promise|any
 *
 * Transducer = Reducer=>Reducer
 *
 * emptyTransform(
 *   args Array,
 *   transducer Transducer,
 *   result any,
 * ) -> result
 * ```
 */
const emptyTransform = function (args, transducer, result) {
  const nil = genericReduce(args, transducer(identity), null)
  return isPromise(nil) ? nil.then(always(result)) : result
}

/**
 * @name _binaryExtend
 *
 * @synopsis
 * ```coffeescript [specscript]
 * _binaryExtend(
 *   typedArray TypedArray,
 *   array Array|TypedArray,
 * ) -> concatenatedTypedArray
 * ```
 */
const _binaryExtend = function (typedArray, array) {
  const offset = typedArray.length
  const result = new typedArray.constructor(offset + array.length)
  result.set(typedArray)
  result.set(array, offset)
  return result
}

/**
 * @name binaryExtend
 *
 * @synopsis
 * ```coffeescript [specscript]
 * binaryExtend(
 *   typedArray TypedArray,
 *   array Array|TypedArray|any,
 * ) -> concatenatedTypedArray
 * ```
 */
const binaryExtend = function (typedArray, array) {
  if (isArray(array) || isBinary(array)) {
    return _binaryExtend(typedArray, array)
  }
  return _binaryExtend(typedArray, [array])
}

/**
 * @name streamAppender
 *
 * @synopsis
 * ```coffeescript [specscript]
 * streamAppender(stream Writable) -> appender (
 *   chunk string|Buffer|Uint8Array|any,
 *   encoding string|undefined,
 *   callback function|undefined,
 * )=>stream
 * ```
 */
const streamAppender = stream => function appender(
  chunk, encoding, callback,
) {
  stream.write(chunk, encoding, callback)
  return stream
}

/**
 * @name streamExtendExecutor
 *
 * @synopsis
 * ```coffeescript [specscript]
 * streamExtendExecutor(
 *   resultStream Writable, stream Readable,
 * ) -> executor (resolve function, reject function)=>()
 * ```
 *
 * @note optimizes function creation within streamExtend
 */
const streamExtendExecutor = (
  resultStream, stream,
) => function executor(resolve, reject) {
  stream.on('data', streamAppender(resultStream))
  stream.on('end', thunkify1(resolve, resultStream))
  stream.on('error', reject)
}

/**
 * @name _streamExtend
 *
 * @synopsis
 * ```coffeescript [specscript]
 * _streamExtend(
 *   resultStream Writable, stream Readable,
 * ) -> writableStream
 * ```
 */
const _streamExtend = (
  resultStream, stream,
) => new Promise(streamExtendExecutor(resultStream, stream))

/**
 * @name streamExtend
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Writable = { write: function }
 *
 * Readable = { pipe: function }
 *
 * streamExtend(
 *   stream Writable,
 *   values Readable|any,
 * ) -> stream
 * ```
 *
 * @note support `.read` maybe
 */
const streamExtend = function (stream, values) {
  if (isNodeReadStream(values)) {
    return _streamExtend(stream, values)
  }
  stream.write(values)
  return stream
}

/**
 * @name callConcat
 *
 * @synopsis
 * ```coffeescript [specscript]
 * callConcat(object Object, values any) -> object
 * ```
 */
const callConcat = function (object, values) {
  return object.concat(values)
}

/**
 * @name genericTransform
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Reducer<T> = (any, T)=>Promise|any
 *
 * Transducer = Reducer=>Reducer
 *
 * Semigroup = Array|string|Set|TypedArray
 *   |{ concat: function }|{ write: function }|Object
 *
 * genericTransform(
 *   args Array,
 *   transducer Transducer,
 *   result Semigroup|any,
 * ) -> result
 * ```
 */
const genericTransform = function (args, transducer, result) {
  if (isArray(result)) {
    return genericReduce(args, transducer(arrayExtend), result)
  }
  if (isBinary(result)) {
    const intermediateArray = genericReduce(args, transducer(arrayExtend), [])
    return isPromise(intermediateArray)
      ? intermediateArray.then(curry2(_binaryExtend, result, __))
      : _binaryExtend(result, intermediateArray)
  }
  if (result == null) {
    return emptyTransform(args, transducer, result)
  }

  const resultConstructor = result.constructor
  if (typeof result == 'string' || resultConstructor == String) {
    return genericReduce(args, transducer(add), result)
  }
  if (typeof result.concat == 'function') {
    return genericReduce(args, transducer(callConcat), result)
  }
  if (typeof result.write == 'function') {
    return genericReduce(args, transducer(streamExtend), result)
  }
  if (resultConstructor == Set) {
    return genericReduce(args, transducer(setExtend), result)
  }
  if (resultConstructor == Object) {
    return genericReduce(args, transducer(objectAssign), result)
  }
  return emptyTransform(args, transducer, result)
}

/**
 * @name transform
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Reducer<T> = (any, T)=>Promise|any
 * Transducer = Reducer=>Reducer
 * Semigroup = Array|string|Set|TypedArray
 *   |{ concat: function }|{ write: function }|Object
 * Foldable = Iterable|AsyncIterable|{ reduce: function }|Object|any
 *
 * transform(
 *   transducer Transducer,
 *   init (collection=>Promise|Semigroup|any)|Semigroup|any,
 * )(collection Foldable)
 *   -> result Promise|Semigroup|any
 *
 * transform<args ...any>(
 *   transducer Transducer,
 *   init (...args=>Promise|Semigroup|any)|Semigroup|any,
 * )(value GeneratorFunction|AsyncGeneratorFunction)
 *   -> transformingFunction ...args=>Promise|Semigroup|any
 *
 * transform<args ...any>(
 *   transducer Transducer,
 *   init (...args=>Promise|Semigroup|any)|Semigroup|any,
 * )(reducer Reducer, moreReducers ...Reducer)
 *   -> chainedTransformingFunction ...args=>Promise|Semigroup|any
 * ```
 *
 * @description
 * Execute a transducer for each item of a collection, concatenating results into the accumulator. The initial value may be a function, in which case it is treated as a resolver.
 *
 * ```javascript [playground]
 * const square = number => number ** 2
 *
 * const isOdd = number => number % 2 == 1
 *
 * const squaredOdds = pipe([
 *   filter(isOdd),
 *   map(square),
 * ])
 *
 * console.log(
 *   transform(squaredOdds, () => [])([1, 2, 3, 4, 5]),
 * ) // [1, 9, 25]
 *
 * console.log(
 *   transform(squaredOdds, '')([1, 2, 3, 4, 5]),
 * ) // '1925'
 *
 * console.log(
 *   transform(squaredOdds, () => new Uint8Array())([1, 2, 3, 4, 5]),
 * ) // Uint8Array(3) [ 1, 9, 25 ]
 * ```
 *
 * Concatenation varies by aggregate result and pipeline item. Generally, if an item is of the same type as the aggregate result, it is flattened into the result. Otherwise, the item is appended.
 *
 *  * `Array` - concatenation resembles `result.concat(item)`. Non-arrays are concatenated as items, while arrays are flattened.
 *  * `string` - concatenation is `result + item`
 *  * `Set` - concatenation resembles `result.add(item)` for individual items; other sets are flattened.
 *  * `TypedArray` - concatenation is managing ArrayBuffers while appending items. Careful about the types here - a `Uint8Array` should only concatenate 8-bit unsigned numbers if not concatenating other `Uint8Array`s
 *  * { concat: function } - an object that implements concat. Concatenation calls the `.concat` method in `result.concat(item)`. Flattening is left to the implementation.
 *  * { write: function } - an object that implements write; these are for Node.js streams. Concatenation calls the method `.write` in `result.write(item)` or `item.pipe(result)` if the `item` is readable.
 *  * Object - a regular object, this could be state. Concatenation is a shallow merge `{ ...object, ...item }` or identity for null and undefined.
 *
 * Any object that implements `.concat` can be transformed as a Semigroup.
 *
 * ```javascript [playground]
 * const Max = function (number) {
 *   this.number = number
 * }
 *
 * Max.prototype.concat = function (otherMax) {
 *   return new Max(Math.max(
 *     this.number,
 *     otherMax.constructor == Max ? otherMax.number : otherMax,
 *   ))
 * }
 *
 * console.log(
 *   transform(
 *     map(Math.abs), new Max(-Infinity),
 *   )([-1, -2, -3, -4, -5]).number,
 * ) // 5
 * ```
 *
 * Node.js WritableStream interfaces are consumed as well.
 *
 * ```javascript
 * // this example is duplicated in rubico/examples/transformStreamRandomInts.js
 *
 * const { pipe, map, transform } = require('rubico')
 *
 * const square = number => number ** 2
 *
 * const toString = value => value.toString()
 *
 * const randomInt = () => Math.ceil(Math.random() * 100)
 *
 * const streamRandomInts = async function* () {
 *   while (true) {
 *     yield randomInt()
 *   }
 * }
 *
 * transform(
 *   map(pipe([square, toString])), process.stdout,
 * )(streamRandomInts()) // 9216576529289484980147613249169774446246768649...
 * ```
 *
 * `transform`, like `reduce`, supports reducer combination. This has a use case in state management, where for an aggregate state object, incoming values are concatenated (shallowly assigned).
 *
 * ```javascript [playground]
 * const reducerA = async (state, action) => {
 *   if (action.type == 'A') return { ...state, A: true }
 *   return state
 * }
 *
 * const reducerB = async (state, action) => {
 *   if (action.type == 'B') return { ...state, B: true }
 *   return state
 * }
 *
 * const reducerC = async (state, action) => {
 *   if (action.type == 'C') return { ...state, C: true }
 *   return state
 * }
 *
 * const logAction = function (action) {
 *   console.log('action', action)
 *   return action
 * }
 *
 * const reducingABC = transform(
 *   map(logAction), // transducer middleware
 *   () => ({}),
 * )(reducerA, reducerB, reducerC)
 *
 * const actions = [{ type: 'A' }, { type: 'B' }, { type: 'C' }]
 *
 * reducingABC(actions).then(
 *   state => console.log('state', state)) // action { type: 'A' }
 *                                         // action { type: 'B' }
 *                                         // action { type: 'C' }
 *                                         // state { A: true, B: true, C: true }
 * ```
 *
 * @execution series
 *
 * @transducing
 *
 * TODO explore Semigroup = Iterator|AsyncIterator
 */
const transform = function (transducer, init) {
  if (isFunction(init)) {
    return function reducing(...args) {
      const result = init(...args)
      return isPromise(result)
        ? result.then(curry3(genericTransform, args, transducer, __))
        : genericTransform(args, transducer, result)
    }
  }
  return function reducing(...args) {
    return genericTransform(args, transducer, init)
  }
}

/**
 * @name flatteningTransducer
 *
 * @synopsis
 * ```coffeescript [specscript]
 * flatteningTransducer(concat Reducer) -> flatteningReducer Reducer
 *
 * DuplexStream = { read: function, write: function }
 *
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 *
 * FlatteningReducer<T> = (any, T)=>Promise|Monad|Foldable|any
 *
 * Reducer<T> = (any, T)=>Promise|any
 *
 * flatteningTransducer(concat Reducer) -> flatteningReducer FlatteningReducer
 * ```
 *
 * @execution series
 */
const flatteningTransducer = concat => function flatteningReducer(
  result, item,
) {
  return genericReduce([item], concat, result)
}

/**
 * @name asyncIteratorForEach
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncIteratorForEach(asyncIterator AsyncIterable, callback function) -> ()
 * ```
 */
const asyncIteratorForEach = async function (asyncIterator, callback) {
  for await (const item of asyncIterator) {
    callback(item)
  }
}

/**
 * @name arrayPush
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayPush(array, item) => array.push(item)
 * ```
 */
const arrayPush = function (array, item) {
  array.push(item)
  return array
}

/**
 * @name monadArrayFlatten
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * monadArrayFlatten(array Array<Monad|Foldable|any>) -> Array
 * ```
 *
 * @related genericReduceConcurrent
 */
const monadArrayFlatten = function (array) {
  const length = array.length,
    promises = [],
    result = [],
    resultPushReducer = (_, subItem) => result.push(subItem),
    resultPush = curry2(arrayPush, result, __),
    getResult = () => result
  let index = -1

  while (++index < length) {
    const item = array[index]
    if (isArray(item)) {
      const itemLength = item.length
      let itemIndex = -1
      while (++itemIndex < itemLength) {
        result.push(item[itemIndex])
      }
    } else if (item == null) {
      result.push(item)
    } else if (typeof item[symbolIterator] == 'function') {
      for (const subItem of item) {
        result.push(subItem)
      }
    } else if (typeof item[symbolAsyncIterator] == 'function') {
      promises.push(
        asyncIteratorForEach(item[symbolAsyncIterator](), resultPush))
    } else if (typeof item.chain == 'function') {
      const monadValue = item.chain(identity)
      isPromise(monadValue)
        ? promises.push(monadValue.then(resultPush))
        : result.push(monadValue)
    } else if (typeof item.flatMap == 'function') {
      const monadValue = item.flatMap(identity)
      isPromise(monadValue)
        ? promises.push(monadValue.then(resultPush))
        : result.push(monadValue)
    } else if (typeof item.reduce == 'function') {
      const folded = item.reduce(resultPushReducer, null)
      isPromise(folded) && promises.push(folded)
    } else if (item.constructor == Object) {
      for (const key in item) {
        result.push(item[key])
      }
    } else {
      result.push(item)
    }
  }
  return promises.length == 0
    ? result
    : promiseAll(promises).then(getResult)
}

/**
 * @name arrayFlatMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * DuplexStream = { read: function, write: function }
 *
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 *
 * arrayFlatMap(
 *   array Array,
 *   flatMapper item=>Promise|Monad|Foldable|any,
 * ) -> Array
 * ```
 */
const arrayFlatMap = function (array, flatMapper) {
  const monadArray = arrayMap(array, flatMapper)
  return isPromise(monadArray)
    ? monadArray.then(monadArrayFlatten)
    : monadArrayFlatten(monadArray)
}

/**
 * @name monadObjectFlatten
 *
 * @synopsis
 * ```coffeescript [specscript]
 * monadObjectFlatten(object Object) -> Object
 * ```
 */
const monadObjectFlatten = function (object) {
  const promises = [],
    result = {},
    resultAssignReducer = (_, subItem) => objectAssign(result, subItem),
    resultAssign = curry2(objectAssign, result, __),
    getResult = () => result

  for (const key in object) {
    const item = object[key]
    if (item == null) {
      continue
    } else if (typeof item[symbolIterator] == 'function') {
      for (const monadItem of item) {
        objectAssign(result, monadItem)
      }
    } else if (typeof item[symbolAsyncIterator] == 'function') {
      promises.push(
        asyncIteratorForEach(item[symbolAsyncIterator](), resultAssign))
    } else if (typeof item.chain == 'function') {
      const monadValue = item.chain(identity)
      isPromise(monadValue)
        ? promises.push(monadValue.then(resultAssign))
        : objectAssign(result, monadValue)
    } else if (typeof item.flatMap == 'function') {
      const monadValue = item.flatMap(identity)
      isPromise(monadValue)
        ? promises.push(monadValue.then(resultAssign))
        : resultAssign(monadValue)
    } else if (typeof item.reduce == 'function') {
      const folded = item.reduce(resultAssignReducer, null)
      isPromise(folded) && promises.push(folded)
    } else {
      objectAssign(result, item)
    }
  }
  return promises.length == 0
    ? result
    : promiseAll(promises).then(getResult)
}

/**
 * @name objectFlatMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * DuplexStream = { read: function, write: function }
 *
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 *
 * objectFlatMap(
 *   object Object,
 *   flatMapper item=>Promise|Monad|Foldable|any,
 * ) -> Object
 * ```
 *
 * @related objectReduceConcurrent
 */
const objectFlatMap = function (object, flatMapper) {
  const monadObject = objectMap(object, flatMapper)
  return isPromise(monadObject)
    ? monadObject.then(monadObjectFlatten)
    : monadObjectFlatten(monadObject)
}

/**
 * @name monadSetFlatten
 *
 * @synopsis
 * ```coffeescript [specscript]
 * monadSetFlatten(set Set<Monad|Foldable|any>) -> Set
 * ```
 */
const monadSetFlatten = function (set) {
  const size = set.size,
    promises = [],
    result = new Set(),
    resultAddReducer = (_, subItem) => result.add(subItem),
    resultAdd = curry2(setAdd, result, __),
    getResult = () => result

  for (const item of set) {
    if (isArray(item)) {
      const itemLength = item.length
      let itemIndex = -1
      while (++itemIndex < itemLength) {
        result.add(item[itemIndex])
      }
    } else if (item == null) {
      result.add(item)
    } else if (typeof item[symbolIterator] == 'function') {
      for (const subItem of item) {
        result.add(subItem)
      }
    } else if (typeof item[symbolAsyncIterator] == 'function') {
      promises.push(
        asyncIteratorForEach(item[symbolAsyncIterator](), resultAdd))
    } else if (typeof item.chain == 'function') {
      const monadValue = item.chain(identity)
      isPromise(monadValue)
        ? promises.push(monadValue.then(resultAdd))
        : result.add(monadValue)
    } else if (typeof item.flatMap == 'function') {
      const monadValue = item.flatMap(identity)
      isPromise(monadValue)
        ? promises.push(monadValue.then(resultAdd))
        : result.add(monadValue)
    } else if (typeof item.reduce == 'function') {
      const folded = item.reduce(resultAddReducer, null)
      isPromise(folded) && promises.push(folded)
    } else if (item.constructor == Object) {
      for (const key in item) {
        result.add(item[key])
      }
    } else {
      result.add(item)
    }
  }
  return promises.length == 0
    ? result
    : promiseAll(promises).then(getResult)
}

/**
 * @name setFlatMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * DuplexStream = { read: function, write: function }
 *
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 *
 * setFlatMap(
 *   set Set,
 *   flatMapper item=>Promise|Monad|Foldable|any,
 * ) -> Set
 * ```
 */
const setFlatMap = function (set, flatMapper) {
  const monadSet = setMap(set, flatMapper)
  return isPromise(monadSet)
    ? monadSet.then(monadSetFlatten)
    : monadSetFlatten(monadSet)
}

/**
 * @name arrayJoin
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayJoin(array Array, delimiter string) -> string
 * ```
 */
const arrayJoin = (array, delimiter) => array.join(delimiter)

/**
 * @name monadArrayFlattenToString
 *
 * @synopsis
 * ```coffeescript [specscript]
 * monadArrayFlattenToString(
 *   array Array<Monad|Foldable|any>,
 * ) -> string
 * ```
 */
const monadArrayFlattenToString = funcConcat(
  monadArrayFlatten, curry2(arrayJoin, __, ''))

/**
 * @name stringFlatMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * DuplexStream = { read: function, write: function }
 *
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 *
 * stringFlatMap(
 *   string,
 *   flatMapper item=>Promise|Monad|Foldable|any,
 * ) -> string
 * ```
 *
 * @related arrayFlatMap
 */
const stringFlatMap = function (string, flatMapper) {
  const monadArray = arrayMap(string, flatMapper)
  return isPromise(monadArray)
    ? monadArray.then(monadArrayFlattenToString)
    : monadArrayFlattenToString(monadArray)
}

/**
 * @name streamWrite
 *
 * @synopsis
 * ```coffeescript [specscript]
 * streamWrite(
 *   stream Writable,
 *   chunk string|Buffer|Uint8Array|any,
 *   encoding string|undefined,
 *   callback function|undefined,
 * ) -> stream
 * ```
 */
const streamWrite = function (stream, chunk, encoding, callback) {
  stream.write(chunk, encoding, callback)
  return stream
}

/**
 * @name streamFlatten
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 *
 * streamFlatExtend(stream DuplexStream, item Monad|Foldable|any) -> stream
 * ```
 */
const streamFlatExtend = function (stream, item) {
  const resultStreamWrite = curry2(streamWrite, stream, __),
    resultStreamWriteReducer = (_, subItem) => stream.write(subItem),
    promises = []
  if (isArray(item)) {
    const itemLength = item.length
    let itemIndex = -1
    while (++itemIndex < itemLength) {
      stream.write(item[itemIndex])
    }
  } else if (item == null) {
    stream.write(item)
  } else if (typeof item[symbolIterator] == 'function') {
    for (const subItem of item) {
      stream.write(subItem)
    }
  } else if (typeof item[symbolAsyncIterator] == 'function') {
    promises.push(
      asyncIteratorForEach(item[symbolAsyncIterator](), resultStreamWrite))
  } else if (typeof item.chain == 'function') {
    const monadValue = item.chain(identity)
    isPromise(monadValue)
      ? promises.push(monadValue.then(resultStreamWrite))
      : stream.write(monadValue)
  } else if (typeof item.flatMap == 'function') {
    const monadValue = item.flatMap(identity)
    isPromise(monadValue)
      ? promises.push(monadValue.then(resultStreamWrite))
      : stream.write(monadValue)
  } else if (typeof item.reduce == 'function') {
    const folded = item.reduce(resultStreamWriteReducer, null)
    isPromise(folded) && promises.push(folded)
  } else if (item.constructor == Object) {
    for (const key in item) {
      stream.write(item[key])
    }
  } else {
    stream.write(item)
  }
  return promises.length == 0
    ? stream
    : promiseAll(promises).then(always(stream))
}

/**
 * @name streamFlatMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * DuplexStream = { read: function, write: function }
 *
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 *
 * streamFlatMap(
 *   stream DuplexStream,
 *   flatMapper item=>Promise|Monad|Foldable|any,
 * ) -> stream
 * ```
 *
 * @related monadArrayFlatten
 */
const streamFlatMap = async function (stream, flatMapper) {
  const promises = new Set()
  for await (const item of stream) {
    const monad = flatMapper(item)
    if (isPromise(monad)) {
      const selfDeletingPromise = monad.then(
        curry2(streamFlatExtend, stream, __)).then(
          () => promises.delete(selfDeletingPromise))
      promises.add(selfDeletingPromise)
    } else {
      const streamFlatExtendOperation = streamFlatExtend(stream, monad)
      if (isPromise(streamFlatExtendOperation)) {
        const selfDeletingPromise = streamFlatExtendOperation.then(
          () => promises.delete(selfDeletingPromise))
        promises.add(selfDeletingPromise)
      }
    }
  }
  while (promises.size > 0) {
    await promiseRace(promises)
  }
  return stream
}

/**
 * @name arrayJoinToBinary
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayJoinToBinary(array Array, init TypedArray|Buffer) -> TypedArray|Buffer
 * ```
 */
const arrayJoinToBinary = function (array, init) {
  const length = array.length
  let index = -1,
    result = init
  while (++index < length) {
    result = binaryExtend(result, array[index])
  }
  return result
}

/**
 * @name monadArrayFlattenToBinary
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 *
 * monadArrayFlattenToBinary(
 *   array Array<Monad|Foldable|any>,
 *   result TypedAray|Buffer,
 * ) -> TypedArray|Buffer
 * ```
 */
const monadArrayFlattenToBinary = function (array, result) {
  const flattened = monadArrayFlatten(array)
  return isPromise(flattened)
    ? flattened.then(curry2(arrayJoinToBinary, __, result))
    : arrayJoinToBinary(flattened, result)
}

/**
 * @name binaryFlatMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * DuplexStream = { read: function, write: function }
 *
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 *
 * binaryFlatMap(
 *   stream DuplexStream,
 *   flatMapper item=>Promise|Monad|Foldable|any,
 * ) -> stream
 * ```
 */
const binaryFlatMap = function (binary, flatMapper) {
  const monadArray = arrayMap(binary, flatMapper),
    result = globalThisHasBuffer && binary.constructor == Buffer
      ? bufferAlloc(0)
      : new binary.constructor(0)

  return isPromise(monadArray)
    ? monadArray.then(curry2(monadArrayFlattenToBinary, __, result))
    : monadArrayFlattenToBinary(monadArray, result)
}

/**
 * @name generatorFunctionFlatMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * generatorFunctionFlatMap(
 *   generatorFunction GeneratorFunction,
 *   flatMapper item=>Promise|Monad|Foldable|any,
 * ) -> flatMappingGeneratorFunction GeneratorFunction
 * ```
 */
const generatorFunctionFlatMap = (
  generatorFunction, flatMapper,
) => function* flatMappingGeneratorFunction(...args) {
  yield* new FlatMappingIterator(generatorFunction(...args), flatMapper)
}

/**
 * @name reducerFlatMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * DuplexStream = { read: function, write: function }
 *
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 *
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 *
 * reducerFlatMap(
 *   reducer (any, T)=>Promise|any,
 *   flatMapper item=>Promise|Monad|Foldable|any,
 * )
 * ```
 *
 * @related forEachReduceConcurrent
 *
 * @note cannot use genericReduceConcurrent because
 */
const reducerFlatMap = (
  reducer, flatMapper,
) => function flatMappingReducer(result, value) {
  const monad = flatMapper(value)
  return isPromise(monad)
    ? monad.then(tacitGenericReduce(
      flatteningTransducer(reducer),
      result))
    : genericReduce([monad],
      flatteningTransducer(reducer),
      result)
}

/**
 * @name FlatMappingIterator
 *
 * @synopsis
 * ```coffeescript [specscript]
 * new FlatMappingIterator(
 *   iterator Iterator, flatMapper function,
 * ) -> FlatMappingIterator { next, SymbolIterator }
 * ```
 */
const FlatMappingIterator = function (iterator, flatMapper) {
  this.iterator = iterator
  this.flatMapper = flatMapper
  this.buffer = []
  this.bufferIndex = Infinity
}

FlatMappingIterator.prototype = {
  [symbolIterator]() {
    return this
  },

  /**
   * @name FlatMappingIterator.prototype.next
   *
   * @synopsis
   * ```coffeescript [specscript]
   * new FlatMappingIterator(
   *   iterator Iterator, flatMapper function
   * ).next() -> { value: any, done: boolean }
   * ```
   */
  next() {
    if (this.bufferIndex < this.buffer.length) {
      const value = this.buffer[this.bufferIndex]
      this.bufferIndex += 1
      return { value, done: false }
    }

    const iteration = this.iterator.next()
    if (iteration.done) {
      return iteration
    }
    const monadAsArray = genericReduce(
      [this.flatMapper(iteration.value)],
      arrayPush,
      []) // this will always have at least one item
    if (monadAsArray.length > 1) {
      this.buffer = monadAsArray
      this.bufferIndex = 1
    }
    return {
      value: monadAsArray[0],
      done: false,
    }
  },
}

/**
 * @name FlatMappingAsyncIterator
 *
 * @synopsis
 * ```coffeescript [specscript]
 * new FlatMappingAsyncIterator(
 *   asyncIterator AsyncIterator, flatMapper function,
 * ) -> FlatMappingAsyncIterator AsyncIterator
 * ```
 *
 * @execution concurrent
 *
 * @muxing
 */
const FlatMappingAsyncIterator = function (asyncIterator, flatMapper) {
  this.asyncIterator = asyncIterator
  this.flatMapper = flatMapper
  this.buffer = []
  this.bufferIndex = 0
  this.promises = new Set()
}

FlatMappingAsyncIterator.prototype = {
  [symbolAsyncIterator]() {
    return this
  },

  toString() {
    return '[object FlatMappingAsyncIterator]'
  },

  /**
   * @name FlatMappingAsyncIterator.prototype.next
   *
   * @synopsis
   * ```coffeescript [specscript]
   * new FlatMappingAsyncIterator(
   *   asyncIterator AsyncIterator, flatMapper function,
   * ).next() -> Promise<{ value, done }>
   * ```
   *
   * @note
   * Promises
   * 1. asyncIterator.next() -> { value, done }
   * 2. flatMapper(value) -> monad
   * 3. flatten operation -> deferred promise set
   */
  async next() {
    const { buffer, bufferIndex } = this
    if (bufferIndex < buffer.length) {
      const value = buffer[bufferIndex]
      delete buffer[bufferIndex]
      this.bufferIndex += 1
      return { value, done: false }
    }

    const iteration = await this.asyncIterator.next()
    if (iteration.done) {
      if (this.promises.size == 0) {
        return iteration
      }
      await promiseRace(this.promises)
      return this.next()
    }
    let monad = this.flatMapper(iteration.value)
    if (isPromise(monad)) {
      monad = await monad
    }
    // this will always load at least one item
    const bufferLoading = genericReduce([monad], arrayPush, this.buffer)
    if (isPromise(bufferLoading)) {
      const promise = bufferLoading.then(() => this.promises.delete(promise))
      this.promises.add(promise)
    }
    return this.next()
  },
}

/**
 * @name asyncGeneratorFunctionFlatMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncGeneratorFunctionFlatMap(
 *   generatorFunction GeneratorFunction,
 *   flatMapper item=>Promise|Monad|Foldable|any,
 * ) -> flatMappingAsyncGeneratorFunction GeneratorFunction
 * ```
 *
 * @related streamFlatMap
 */
const asyncGeneratorFunctionFlatMap = (
  asyncGeneratorFunction, flatMapper,
) => async function* flatMappingAsyncGeneratorFunction(...args) {
  yield* new FlatMappingAsyncIterator(
    asyncGeneratorFunction(...args), flatMapper)
}

/**
 * @name flatMap
 *
 * @synopsis
 * ```coffeescript [specscript]
 * DuplexStream = { read: function, write: function }
 * Monad = Array|String|Set
 *   |TypedArray|DuplexStream|Iterator|AsyncIterator
 *   |{ chain: function }|{ flatMap: function }|Object
 * Foldable = Iterable|AsyncIterable|{ reduce: function }
 * Reducer<T> = (any, T)=>Promise|any
 *
 * flatMap<T>(
 *   flatMapper T=>Promise|Monad|Foldable|any,
 * )(value Monad<T>) -> result Monad
 *
 * flatMap<T>(
 *   flatMapper T=>Promise|Monad|Foldable|any,
 * )(value GeneratorFunction<T>|AsyncGeneratorFunction<T>)
 *   -> flatMappingGeneratorFunction GeneratorFunction<T>|AsyncGeneratorFunction<T>
 *
 * flatMap<T>(
 *   flatMapper T=>Promise|Monad|Foldable|any,
 * )(value Reducer<T>) -> flatMappingReducer Reducer
 * ```
 *
 * @description
 * Apply a function to each item of a collection, flattening any resulting collection. The result is always the same type as the input value with all items mapped and flattened. The following outlines behavior for various collections.
 *
 *   * `Array` - map items then flatten results into a new `Array`
 *   * `String|string` - map items then flatten (`+`) results into a new `string`
 *   * `Set` - map items then flatten results into a new `Set`
 *   * `TypedArray` - map items then flatten results into a new `TypedArray`
 *   * `Buffer (Node.js)` - map items then flatten results into a new `Buffer`
 *   * `stream.Duplex (Node.js)` - map over stream items by async iteration, then call stream's `.write` to flatten
 *   * `{ chain: function }`, i.e. object that implements `.chain` - this function is called directly
 *   * `{ flatMap: function }`, i.e. object that implements `.flatMap` - this function is called directly
 *   * `Object` - a plain Object, values are mapped then flattened into result by `Object.assign`
 *   * `Reducer` - a function to be used in a reducing operation. Items of a flatMapped reducing operation are mapped then flattened into the aggregate
 *
 * On arrays, map the flatMapper function with concurrent asynchronous execution, then flatten the result one depth.
 *
 * ```javascript [playground]
 * const duplicate = number => [number, number]
 *
 * console.log(
 *   flatMap(duplicate)([1, 2, 3, 4, 5]),
 * ) // [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
 *
 * const asyncDuplicate = async number => [number, number]
 *
 * flatMap(asyncDuplicate)( // concurrent execution
 *   [1, 2, 3, 4, 5]).then(console.log) // [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
 * ```
 *
 * Collections returned by the flatMapper are flattened into the result by type-specific iteration and concatenation, while async iterables are muxed. Muxing, or asynchronously "mixing", is the process of combining multiple asynchronous sources into one source, with order determined by the asynchronous resolution of the individual items. This behavior is useful for working with asynchronous streams, e.g. of DOM events or requests.
 *
 * ```javascript [playground]
 * const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
 *
 * const repeat3 = function* (message) {
 *   yield message; yield message; yield message
 * }
 *
 * console.log( // sync is concatenated
 *   flatMap(repeat3)(['foo', 'bar', 'baz']),
 * ) // ['foo', 'foo', 'foo', 'bar', 'bar', 'bar', 'baz', 'baz', 'baz']
 *
 * const asyncRepeat3 = async function* (message) {
 *   yield message
 *   await sleep(100)
 *   yield message
 *   await sleep(1000)
 *   yield message
 * }
 *
 * flatMap(asyncRepeat3)( // async is muxed
 *   ['foo', 'bar', 'baz']).then(console.log)
 * // ['foo', 'bar', 'baz', 'foo', 'bar', 'baz', 'foo', 'bar', 'baz']
 * ```
 *
 * Upon flatMapper execution, flatten any collection return into the result.
 *
 *   * Iterable - items are concatenated into the result
 *   * Iterator/Generator - items are concatenated into the result. Source is consumed.
 *   * Object that implements `.reduce` - this function is called directly for flattening
 *   * Object that implements `.chain` or `.flatMap` - either of these is called directly to flatten
 *   * any other Object - values are flattened
 *   * AsyncIterable - items are muxed by asynchronous resolution
 *   * AsyncIterator/AsyncGenerator - items are muxed by asynchronous resolution. Source is consumed.
 *
 * All other types are left in the result as they are.
 *
 * ```javascript [playground]
 * const identity = value => value
 *
 * flatMap(identity)([
 *   [1, 1],
 *   new Set([2, 2]),
 *   (function* () { yield 3; yield 3 })(),
 *   (async function* () { yield 4; yield 4 })(),
 *   { a: 5, b: 5 },
 *   6,
 *   Promise.resolve(7),
 *   new Uint8Array([8]),
 * ]).then(console.log)
 * // [1, 1, 2, 3, 3, 5, 5, 6, 7, 8, 4, 4]
 * ```
 *
 * Purer functional programming is possible with flatMap operation on monads. A monad could be any object that implements `.chain` or `.flatMap`. When a flatMapping operation encounters a monad, it calls the monad's `.chain` method directly to flatten.
 *
 * ```javascript [playground]
 * const Maybe = value => ({
 *   chain(flatMapper) {
 *     return value == null ? value : flatMapper(value)
 *   },
 * })
 *
 * flatMap(console.log)(Maybe(null))
 *
 * flatMap(console.log)(Maybe('hello world')) // hello world
 * ```
 *
 * In addition to monads, `flatMap` is a powerful option when working with transducers as well. A flatMapping transducer is like a mapping transducer except all items of the reducing operation are additionally flattened into the result.
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * const powers = number => [number, number ** 2, number ** 3]
 *
 * const oddPowers = pipe([
 *   filter(isOdd),
 *   flatMap(powers),
 * ])
 *
 * console.log(
 *   transform(oddPowers, [])([1, 2, 3, 4, 5]),
 * ) // [1, 1, 1, 3, 9, 27, 5, 25, 125]
 *
 * const asyncPowers = async number => [number, number ** 2, number ** 3]
 *
 * const asyncOddPowers = pipe([
 *   filter(isOdd),
 *   flatMap(asyncPowers),
 * ])
 *
 * transform(asyncOddPowers, [])([1, 2, 3, 4, 5]).then(console.log)
 * // [1, 1, 1, 3, 9, 27, 5, 25, 125]
 * ```
 *
 * @execution concurrent
 *
 * @transducing
 */
const flatMap = flatMapper => function flatMapping(value) {
  if (isArray(value)) {
    return arrayFlatMap(value, flatMapper)
  }
  if (isFunction(value)) {
    if (isGeneratorFunction(value)) {
      return generatorFunctionFlatMap(value, flatMapper)
    }
    if (isAsyncGeneratorFunction(value)) {
      return asyncGeneratorFunctionFlatMap(value, flatMapper)
    }
    return reducerFlatMap(value, flatMapper)
  }
  if (isBinary(value)) {
    return binaryFlatMap(value, flatMapper)
  }
  if (value == null) {
    return value
  }

  if (typeof value.next == 'function') {
    return symbolIterator in value
      ? new FlatMappingIterator(value, flatMapper)
      : new FlatMappingAsyncIterator(value, flatMapper)
  }
  if (typeof value.chain == 'function') {
    return value.chain(flatMapper)
  }
  if (typeof value.flatMap == 'function') {
    return value.flatMap(flatMapper)
  }
  if (
    typeof value[symbolAsyncIterator] == 'function'
      && typeof value.write == 'function'
  ) {
    return streamFlatMap(value, flatMapper)
  }
  const valueConstructor = value.constructor
  if (valueConstructor == Object) {
    return objectFlatMap(value, flatMapper)
  }
  if (valueConstructor == Set) {
    return setFlatMap(value, flatMapper)
  }
  if (typeof value == 'string' || valueConstructor == String) {
    return stringFlatMap(value, flatMapper)
  }
  return flatMapper(value)
}

// a[0].b.c
const pathStringSplitRegex = /[.|[|\]]+/

/**
 * @name memoizedCappedPathStringSplit
 *
 * @synopsis
 * ```coffeescript [specscript]
 * memoizedCappedPathStringSplit(pathString string) -> Array<string>
 * ```
 *
 * @note
 * a[0].b.c
 * a.0.b[0][1].c
 */
const pathStringSplit = function (pathString) {
  const pathStringLastIndex = pathString.length - 1,
    firstChar = pathString[0],
    lastChar = pathString[pathStringLastIndex],
    isFirstCharLeftBracket = firstChar == '[',
    isLastCharRightBracket = lastChar == ']'

  if (isFirstCharLeftBracket && isLastCharRightBracket) {
    return pathString.slice(1, pathStringLastIndex).split(pathStringSplitRegex)
  } else if (isFirstCharLeftBracket) {
    return pathString.slice(1).split(pathStringSplitRegex)
  } else if (isLastCharRightBracket) {
    return pathString.slice(0, pathStringLastIndex).split(pathStringSplitRegex)
  }
  return pathString.split(pathStringSplitRegex)
}

// memoized version of pathStringSplit, max cache size 500
const memoizedCappedPathStringSplit = memoizeCappedUnary(pathStringSplit, 500)

/**
 * @name pathToArray
 *
 * @synopsis
 * ```coffeescript [specscript]
 * pathToArray(path Array|string|object)
 * ```
 */
const pathToArray = function (path) {
  if (typeof path == 'string' || path.constructor == String) {
    return memoizedCappedPathStringSplit(path)
  }
  if (isArray(path)) {
    return path
  }
  return [path]
}

/**
 * @name getByPath
 *
 * @synopsis
 * ```coffeescript [specscript]
 * getByPath(object Object, path string|Array|any) -> any
 * ```
 */
const getByPath = function (object, path) {
  const pathArray = pathToArray(path),
    pathArrayLength = pathArray.length
  let index = -1,
    result = object
  while (++index < pathArrayLength) {
    result = result[pathArray[index]]
    if (result == null) {
      return undefined
    }
  }
  return result
}

/**
 * @name get
 *
 * @synopsis
 * ```coffeescript [specscript]
 * get(
 *   path string|Array|any,
 *   defaultValue (object=>any)|any?,
 * )(object) -> result any
 * ```
 *
 * @description
 * Access properties on objects. `get(property)` creates a function that, when supplied an object, returns the value on the object associated with `property`.
 *
 * ```javascript [playground]
 * console.log(
 *   get('hello')({ hello: 'world' }),
 * ) // world
 * ```
 *
 * `get` accepts a default value to return if the property is not found. This default value may be a resolver of such value.
 *
 * ```javascript [playground]
 * console.log(
 *   get('hello', 'default')({ foo: 'bar' }),
 * ) // default
 *
 * console.log(
 *   get('hello', object => object.foo)({ foo: 'bar' }),
 * ) // bar
 * ```
 *
 * At times it is necessary to access nested properties. `get` supports nested property access for the following `path` patterns.
 *
 *  * a dot delimited string
 *  * bracket notation property access
 *  * an array of string keys or number indices
 *
 * ```javascript [playground]
 * const nestedABC0 = { a: { b: { c: ['hello'] } } }
 *
 * console.log(
 *   get('a.b.c[0]')(nestedABC0),
 * ) // hello
 *
 * const nested00000 = [[[[['foo']]]]]
 *
 * console.log(
 *   get('0.0.0.0.0')(nested00000),
 * ) // foo
 *
 * console.log(
 *   get('[0][0][0][0][0]')(nested00000),
 * ) // foo
 *
 * console.log(
 *   get([0, 0, 0, 0, 0])(nested00000),
 * ) // foo
 * ```
 */
const get = (path, defaultValue) => function getter(value) {
  const result = value == null ? undefined : getByPath(value, path)
  return result === undefined
    ? typeof defaultValue == 'function' ? defaultValue(value) : defaultValue
    : result
}

/**
 * @name pick
 *
 * @synopsis
 * ```coffeescript [specscript]
 * pick<T>(Array<string>)(source Object<T>) -> picked Object<T>
 * ```
 *
 * @description
 * Create a new object by including specific keys.
 *
 * ```javascript [playground]
 * console.log(
 *   pick(['hello', 'world'])({ goodbye: 1, world: 2 }),
 * ) // { world: 2 }
 * ```
 */
const pick = keys => function picking(source) {
  if (source == null) {
    return source
  }

  const keysLength = keys.length,
    result = {}
  let keysIndex = -1
  while (++keysIndex < keysLength) {
    const key = keys[keysIndex],
      value = source[key]
    if (value != null) {
      result[key] = value
    }
  }
  return result
}

/**
 * @name omit
 *
 * @synopsis
 * ```coffeescript [specscript]
 * omit<T>(Array<string>)(source Object<T>) -> omitted Object<T>
 * ```
 *
 * @description
 * Create a new object by excluding specific keys.
 *
 * ```javascript [playground]
 * console.log(
 *   omit(['_id'])({ _id: '1', name: 'George' }),
 * ) // { name: 'George' }
 * ```
 */
const omit = keys => function omitting(source) {
  if (source == null) {
    return source
  }

  const keysLength = keys.length,
    result = { ...source }
  let keysIndex = -1
  while (++keysIndex < keysLength) {
    delete result[keys[keysIndex]]
  }
  return result
}

/**
 * @name promiseInFlight
 *
 * @synopsis
 * ```coffeescript [specscript]
 * promiseInFlight(basePromise<T>) -> Promise<[T, basePromise<T>]>
 * ```
 */
const promiseInFlight = function (basePromise) {
  const promise = basePromise.then(res => [res, promise])
  return promise
}

/**
 * @name asyncArrayAny
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncArrayAny(
 *   array Array,
 *   predicate any=>Promise|boolean,
 *   index number,
 *   promisesInFlight Set<Promise>,
 * ) -> boolean
 * ```
 */
const asyncArrayAny = async function (
  array, predicate, index, promisesInFlight,
) {
  const length = array.length

  while (++index < length) {
    const predication = predicate(array[index])
    if (isPromise(predication)) {
      promisesInFlight.add(promiseInFlight(predication))
    } else if (predication) {
      return true
    }
  }
  while (promisesInFlight.size > 0) {
    const [predication, promise] = await promiseRace(promisesInFlight)
    promisesInFlight.delete(promise)
    if (predication) {
      return true
    }
  }
  return false
}

/**
 * @name arrayAny
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayAny(
 *   array Array,
 *   predicate any=>Promise|boolean,
 * ) -> boolean
 * ```
 */
const arrayAny = function (array, predicate) {
  const length = array.length
  let index = -1
  while (++index < length) {
    const predication = predicate(array[index])
    if (isPromise(predication)) {
      return asyncArrayAny(
        array, predicate, index, new Set([promiseInFlight(predication)]))
    }
    if (predication) {
      return true
    }
  }
  return false
}

/**
 * @name asyncIteratorAny
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncIteratorAny(
 *   iterator Iterator|AsyncIterator,
 *   predicate any=>Promise|boolean,
 *   index number,
 *   promisesInFlight Set<Promise>,
 *   maxConcurrency number=20,
 * ) -> boolean
 * ```
 */
const asyncIteratorAny = async function (
  iterator, predicate, promisesInFlight, maxConcurrency = 20,
) {
  let iteration = iterator.next()
  if (isPromise(iteration)) {
    iteration = await iteration
  }

  while (!iteration.done) {
    if (promisesInFlight.size >= maxConcurrency) {
      const [predication, promise] = await promiseRace(promisesInFlight)
      promisesInFlight.delete(promise)
      if (predication) {
        return true
      }
    }
    const predication = predicate(iteration.value)
    if (isPromise(predication)) {
      promisesInFlight.add(promiseInFlight(predication))
    } else if (predication) {
      return true
    }
    iteration = iterator.next()
    if (isPromise(iteration)) {
      iteration = await iteration
    }
  }
  while (promisesInFlight.size > 0) {
    const [predication, promise] = await promiseRace(promisesInFlight)
    promisesInFlight.delete(promise)
    if (predication) {
      return true
    }
  }
  return false
}

/**
 * @name iteratorAny
 *
 * @synopsis
 * ```coffeescript [specscript]
 * iteratorAny(
 *   iterator Iterator,
 *   predicate any=>Promise|boolean,
 * ) -> boolean
 * ```
 */
const iteratorAny = function (iterator, predicate) {
  for (const item of iterator) {
    const predication = predicate(item)
    if (isPromise(predication)) {
      return asyncIteratorAny(
        iterator, predicate, new Set([promiseInFlight(predication)]))
    }
    if (predication) {
      return true
    }
  }
  return false
}

/**
 * @name objectValuesGenerator
 *
 * @synopsis
 * ```coffeescript [specscript]
 * objectValuesGenerator(object Object<T>) -> Generator<T>
 * ```
 */
const objectValuesGenerator = function* (object) {
  for (const key in object) {
    yield object[key]
  }
}


/**
 * @name _foldableAnyReducer
 *
 * @synopsis
 * ```coffeescript [specscript]
 * _foldableAnyReducer(predicate any=> boolean, result boolean, item any) -> boolean
 * ```
 */
const _foldableAnyReducer = (predicate, result, item) => result ? true : predicate(item)

/**
 * @name foldableAnyReducer
 *
 * @synopsis
 * ```coffeescript [specscript]
 * foldableAnyReducer(
 *   predicate any=>boolean,
 * ) -> reducer(result boolean, item any)=>boolean
 * ```
 *
 * @related foldableAllReducer
 */
const foldableAnyReducer = predicate => function anyReducer(result, item) {
  return result === true ? true
    : isPromise(result) ? result.then(
      curry3(_foldableAnyReducer, predicate, __, item))
    : result ? true : predicate(item)
}

/**
 * @name any
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Foldable<T> = Iterable<T>|AsyncIterable<T>
 *   |{ reduce: (any, T)=>any }|Object<T>
 *
 * any<T>(
 *   predicate T=>Promise|boolean
 * )(value Foldable<T>) -> anyTruthyByPredicate Promise|boolean
 * ```
 *
 * @description
 * Test a predicate concurrently across all items of a collection, returning true if any predication is truthy.
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * console.log(
 *   any(isOdd)([1, 2, 3, 4, 5]),
 * ) // true
 * ```
 *
 * The predicate may return a Promise, while the value may be an asynchronous stream.
 *
 * ```javascript [playground]
 * const toTodosUrl = id => 'https://jsonplaceholder.typicode.com/todos/' + id
 *
 * const fetchedToJson = fetched => fetched.json()
 *
 * const fetchTodo = pipe([
 *   toTodosUrl,
 *   fetch,
 *   fetchedToJson,
 * ])
 *
 * const todoIDsGenerator = async function* () {
 *   yield 1; yield 2; yield 3; yield 4; yield 5
 * }
 *
 * any(pipe([
 *   fetchTodo,
 *   todo => todo.title.startsWith('fugiat'),
 * ]))(todoIDsGenerator()).then(console.log) // true
 * ```
 *
 * @execution concurrent
 *
 * @muxing
 *
 * @related or
 */
const any = predicate => function anyTruthy(value) {
  if (isArray(value)) {
    return arrayAny(value, predicate)
  }
  if (value == null) {
    return predicate(value)
  }
  if (typeof value[symbolIterator] == 'function') {
    return iteratorAny(value[symbolIterator](), predicate)
  }
  if (typeof value[symbolAsyncIterator] == 'function') {
    return asyncIteratorAny(value[symbolAsyncIterator](), predicate, new Set())
  }
  if (typeof value.reduce == 'function') {
    return value.reduce(foldableAnyReducer(predicate), false)
  }
  if (value.constructor == Object) {
    return iteratorAny(objectValuesGenerator(value), predicate)
  }
  return !!predicate(value)
}

/**
 * @name arrayAll
 *
 * @synopsis
 * ```coffeescript [specscript]
 * arrayAll(array Array, predicate ...any=>boolean) -> boolean
 * ```
 */
const arrayAll = function (array, predicate) {
  const arrayLength = array.length,
    promises = []
  let index = -1
  while (++index < arrayLength) {
    const predication = predicate(array[index])
    if (isPromise(predication)) {
      promises.push(predication)
    } else if (!predication) {
      return false
    }
  }
  return promises.length == 0
    ? true
    : promiseAll(promises).then(curry3(callPropUnary, __, 'every', Boolean))
}

/**
 * @name iteratorAll
 *
 * @synopsis
 * ```coffeescript [specscript]
 * iteratorAll(iterator Iterator, predicate ...any=>boolean) -> boolean
 * ```
 */
const iteratorAll = function (iterator, predicate) {
  const promises = []
  for (const item of iterator) {
    const predication = predicate(item)
    if (isPromise(predication)) {
      promises.push(predication)
    } else if (!predication) {
      return false
    }
  }
  return promises.length == 0
    ? true
    : promiseAll(promises).then(curry3(callPropUnary, __, 'every', Boolean))
}

/**
 * @name asyncIteratorAll
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncIteratorAll(asyncIterator AsyncIterator, predicate ...any=>boolean) -> boolean
 * ```
 *
 * @related asyncIteratorAny
 */
const asyncIteratorAll = async function (
  iterator, predicate, promisesInFlight, maxConcurrency = 20,
) {
  let iteration = iterator.next()
  if (isPromise(iteration)) {
    iteration = await iteration
  }

  while (!iteration.done) {
    if (promisesInFlight.size >= maxConcurrency) {
      const [predication, promise] = await promiseRace(promisesInFlight)
      promisesInFlight.delete(promise)
      if (!predication) {
        return false
      }
    }
    const predication = predicate(iteration.value)
    if (isPromise(predication)) {
      promisesInFlight.add(promiseInFlight(predication))
    } else if (!predication) {
      return false
    }
    iteration = iterator.next()
    if (isPromise(iteration)) {
      iteration = await iteration
    }
  }
  while (promisesInFlight.size > 0) {
    const [predication, promise] = await promiseRace(promisesInFlight)
    promisesInFlight.delete(promise)
    if (!predication) {
      return false
    }
  }
  return true
}

/**
 * @name _foldableAllReducer
 *
 * @synopsis
 * ```coffeescript [specscript]
 * _foldableAllReducer(predicate any=> boolean, result boolean, item any) -> boolean
 * ```
 */
const _foldableAllReducer = (predicate, result, item) => result ? predicate(item) : false

/**
 * @name foldableAllReducer
 *
 * @synopsis
 * ```coffeescript [specscript]
 * foldableAllReducer(
 *   predicate any=>boolean,
 * ) -> reducer(result boolean, item any)=>boolean
 * ```
 *
 * @related foldableAnyReducer
 */
const foldableAllReducer = predicate => function allReducer(result, item) {
  return result === false ? false
    : isPromise(result) ? result.then(
      curry3(_foldableAllReducer, predicate, __, item))
    : result ? predicate(item) : false
}

/**
 * @name all
 *
 * @synopsis
 * ```coffeescript [specscript]
 * Foldable<T> = Iterable<T>|AsyncIterable<T>
 *   |{ reduce: (any, T)=>any }|Object<T>
 *
 * all<T>(
 *   predicate T=>Promise|boolean,
 * )(value Foldable<T>) -> allTruthyByPredicate Promise|boolean
 * ```
 *
 * @description
 * Test a predicate concurrently across all items of a collection, returning true if all predications are truthy.
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * console.log(
 *   all(isOdd)([1, 2, 3, 4, 5]),
 * ) // false
 *
 * console.log(
 *   all(isOdd)([1, 3, 5]),
 * ) // true
 * ```
 *
 * The predicate may return a Promise, while the value may be an asynchronous stream.
 *
 * ```javascript [playground]
 * const asyncNumbers = async function* () {
 *   yield 1; yield 2; yield 3; yield 4; yield 5
 * }
 *
 * all(async number => number < 6)(asyncNumbers()).then(console.log) // true
 * ```
 *
 * @execution concurrent
 *
 * @muxing
 */
const all = predicate => function allTruthy(value) {
  if (isArray(value)) {
    return arrayAll(value, predicate)
  }
  if (value == null) {
    return predicate(value)
  }

  if (typeof value[symbolIterator] == 'function') {
    return iteratorAll(value, predicate)
  }
  if (typeof value[symbolAsyncIterator] == 'function') {
    return asyncIteratorAll(value, predicate, new Set())
  }
  if (typeof value.reduce == 'function') {
    return value.reduce(foldableAllReducer(predicate), true)
  }
  if (value.constructor == Object) {
    return iteratorAll(objectValuesGenerator(value), predicate)
  }
  return !!predicate(value)
}

// true -> false
const _not = value => !value

/**
 * @name not
 *
 * @synopsis
 * ```coffeescript [specscript]
 * not(
 *   predicate ...any=>Promise|boolean,
 * ) -> invertedPredicate ...any=>Promise|boolean
 * ```
 *
 * @description
 * Logically invert a predicate (`!`) by always logically inverting its return value. Predicate may be asynchronous.
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * console.log(
 *   not(isOdd)(3),
 * ) // false
 * ```
 */
const not = func => function logicalInverter(...args) {
  const boolean = func(...args)
  return isPromise(boolean) ? boolean.then(_not) : !boolean
}

/**
 * @name notSync
 *
 * @synopsis
 * ```coffeescript [specscript]
 * notSync(func ...any=>boolean) -> logicallyInverted ...any=>boolean
 * ```
 */
const notSync = func => function notSync(...args) {
  return !func(...args)
}

/**
 * @name not.sync
 *
 * @synopsis
 * ```coffeescript [specscript]
 * not.sync(func ...any=>boolean) -> logicallyInverted ...any=>boolean
 * ```
 *
 * @description
 * Logically invert a function without promise handling.
 *
 * ```javascript [playground]
 * console.log(
 *   not.sync(isOdd)(2),
 * ) // true
 * ```
 */
not.sync = notSync

/**
 * @name asyncAnd
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncAnd(
 *   predicates Array<value=>Promise|boolean>
 *   value any,
 * ) -> allTruthy boolean
 * ```
 */
const asyncAnd = async function (predicates, value) {
  const length = predicates.length
  let index = -1
  while (++index < length) {
    let predication = predicates[index](value)
    if (isPromise(predication)) {
      predication = await predication
    }
    if (!predication) {
      return false
    }
  }
  return true
}

// handles the first predication before asyncAnd
const _asyncAndInterlude = (
  predicates, value, firstPredication,
) => firstPredication ? asyncAnd(predicates, value) : false

/**
 * @name and
 *
 * @synopsis
 * ```coffeescript [specscript]
 * and(
 *   predicates Array<value=>Promise|boolean>
 * )(value any) -> allTruthy Promise|boolean
 * ```
 *
 * @description
 * Test an array of predicates concurrently against a single input, returning true if all are truthy. Predicates may be asynchronous.
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * const isPositive = number => number > 0
 *
 * const isLessThan3 = number => number < 3
 *
 * console.log(
 *   and([isOdd, isPositive, isLessThan3])(1),
 * ) // true
 * ```
 *
 * @execution serial
 *
 * @note ...args slows down here by an order of magnitude
 */
const and = predicates => function allPredicates(value) {
  const length = predicates.length,
    promises = []
  let index = -1

  while (++index < length) {
    const predication = predicates[index](value)
    if (isPromise(predication)) {
      return predication.then(curry3(_asyncAndInterlude, predicates, value, __))
    }
    if (!predication) {
      return false
    }
  }
  return true
}

/**
 * @name asyncOr
 *
 * @synopsis
 * ```coffeescript [specscript]
 * asyncOr(
 *   predicates Array<value=>Promise|boolean>
 *   value any,
 * ) -> allTruthy boolean
 * ```
 */
const asyncOr = async function (predicates, value) {
  const length = predicates.length
  let index = -1
  while (++index < length) {
    let predication = predicates[index](value)
    if (isPromise(predication)) {
      predication = await predication
    }
    if (predication) {
      return true
    }
  }
  return false
}

// handles the first predication before asyncOr
const _asyncOrInterlude = (
  predicates, value, firstPredication,
) => firstPredication ? true : asyncOr(predicates, value)

/**
 * @name or
 *
 * @synopsis
 * ```coffeescript [specscript]
 * or(
 *   predicates Array<value=>Promise|boolean>
 * )(value any) -> anyTruthy Promise|boolean
 * ```
 *
 * @description
 * Test an array of predicates concurrently against a single input, returning true if any of them test truthy. Predicates may be asynchronous.
 *
 * ```javascript [playground]
 * const isOdd = number => number % 2 == 1
 *
 * const isEven = number => number % 2 == 0
 *
 * console.log(
 *   or([isOdd, isEven])(0),
 * ) // true
 * ```
 *
 * @execution series
 *
 * @note ...args slows down here by an order of magnitude
 */
const or = predicates => function anyPredicates(value) {
  const length = predicates.length
  let index = -1

  while (++index < length) {
    const predication = predicates[index](value)
    if (isPromise(predication)) {
      return predication.then(curry3(_asyncOrInterlude, predicates, value, __))
    }
    if (predication) {
      return true
    }
  }
  return false
}

/**
 * @name spread2
 *
 * @synopsis
 * ```coffeescript [specscript]
 * spread2(func function) -> spreading2 (
 *   arg0 any, arg1 any,
 * )=>func(arg0, arg1)
 * ```
 */
const spread2 = func => function spreading2([arg0, arg1]) {
  return func(arg0, arg1)
}

/**
 * @name strictEqual
 *
 * @synopsis
 * ```coffeescript [specscript]
 * strictEqual(a any, b any) -> boolean
 * ```
 */
const strictEqual = (a, b) => a === b

/**
 * @name eq
 *
 * @synopsis
 * ```coffeescript [specscript]
 * eq(
 *   left (any=>Promise|boolean)|any,
 *   right (any=>Promise|boolean)|any,
 * ) -> strictEqualBy (value any)=>Promise|boolean
 * ```
 *
 * @description
 * Test for strict equality (`===`) between two values. Either parameter may be an asynchronous resolver.
 *
 * ```javascript [playground]
 * const personIsGeorge = eq(person => person.name, 'George')
 *
 * console.log(
 *   personIsGeorge({ name: 'George', likes: 'bananas' }),
 * ) // true
 * ```
 *
 * @execution concurrent
 */
const eq = function (left, right) {
  const isLeftResolver = typeof left == 'function',
    isRightResolver = typeof right == 'function'
  if (isLeftResolver && isRightResolver) {
    return function strictEqualBy(value) {
      const leftResolve = left(value),
        rightResolve = right(value)
      const isLeftPromise = isPromise(leftResolve),
        isRightPromise = isPromise(rightResolve)
      if (isLeftPromise && isRightPromise) {
        return promiseAll(
          [leftResolve, rightResolve]).then(spread2(strictEqual))
      } else if (isLeftPromise) {
        return leftResolve.then(curry2(strictEqual, __, rightResolve))
      } else if (isRightPromise) {
        return rightResolve.then(curry2(strictEqual, leftResolve, __))
      }
      return leftResolve === rightResolve
    }
  }

  if (isLeftResolver) {
    return function strictEqualBy(value) {
      const leftResolve = left(value)
      return isPromise(leftResolve)
        ? leftResolve.then(curry2(strictEqual, __, right))
        : leftResolve === right
    }
  }
  if (isRightResolver) {
    return function strictEqualBy(value) {
      const rightResolve = right(value)
      return isPromise(rightResolve)
        ? rightResolve.then(curry2(strictEqual, left, __))
        : left === rightResolve
    }
  }
  return always(left === right)
}

/**
 * @name greaterThan
 *
 * @synopsis
 * ```coffeescript [specscript]
 * greaterThan(left any, right any) -> boolean
 * ```
 */
const greaterThan = (left, right) => left > right

/**
 * @name gt
 *
 * @synopsis
 * ```coffeescript [specscript]
 * gt(
 *   left (any=>Promise|boolean)|any,
 *   right (any=>Promise|boolean)|any,
 * )(value any) -> greaterThanBy(value any)=>Promise|boolean
 * ```
 *
 * @description
 * Test for left value greater than (`>`) right value. Either parameter may be an asynchronous resolver.
 *
 * ```javascript [playground]
 * const isOfLegalAge = gt(21, person => person.age)
 *
 * const juvenile = { age: 16 }
 *
 * console.log(isOfLegalAge(juvenile)) // false
 * ```
 */
const gt = function (left, right) {
  const isLeftResolver = typeof left == 'function',
    isRightResolver = typeof right == 'function'
  if (isLeftResolver && isRightResolver) {
    return function greaterThanBy(value) {
      const leftResolve = left(value),
        rightResolve = right(value)
      const isLeftPromise = isPromise(leftResolve),
        isRightPromise = isPromise(rightResolve)
      if (isLeftPromise && isRightPromise) {
        return promiseAll(
          [leftResolve, rightResolve]).then(spread2(greaterThan))
      } else if (isLeftPromise) {
        return leftResolve.then(curry2(greaterThan, __, rightResolve))
      } else if (isRightPromise) {
        return rightResolve.then(curry2(greaterThan, leftResolve, __))
      }
      return leftResolve > rightResolve
    }
  }

  if (isLeftResolver) {
    return function greaterThanBy(value) {
      const leftResolve = left(value)
      return isPromise(leftResolve)
        ? leftResolve.then(curry2(greaterThan, __, right))
        : leftResolve > right
    }
  }
  if (isRightResolver) {
    return function strictEqualBy(value) {
      const rightResolve = right(value)
      return isPromise(rightResolve)
        ? rightResolve.then(curry2(greaterThan, left, __))
        : left > rightResolve
    }
  }
  return always(left > right)
}

/**
 * @name lessThan
 *
 * @synopsis
 * ```coffeescript [specscript]
 * lessThan(left any, right any) -> boolean
 * ```
 */
const lessThan = (left, right) => left < right

/**
 * @name lt
 *
 * @synopsis
 * ```coffeescript [specscript]
 * lt(
 *   left (any=>Promise|boolean)|any,
 *   right (any=>Promise|boolean)|any,
 * )(value any) -> lessThanBy(value any)=>Promise|boolean
 * ```
 *
 * @description
 * Test for left value less than (`<`) right value. Either parameter may be an asynchronous resolver.
 *
 * ```javascript [playground]
 * const identity = value => value
 *
 * const isLessThan3 = lt(identity, 3)
 *
 * console.log(isLessThan3(1), true)
 * console.log(isLessThan3(3), false)
 * console.log(isLessThan3(5), false)
 * ```
 */
const lt = function (left, right) {
  const isLeftResolver = typeof left == 'function',
    isRightResolver = typeof right == 'function'
  if (isLeftResolver && isRightResolver) {
    return function lessThanBy(value) {
      const leftResolve = left(value),
        rightResolve = right(value)
      const isLeftPromise = isPromise(leftResolve),
        isRightPromise = isPromise(rightResolve)
      if (isLeftPromise && isRightPromise) {
        return promiseAll(
          [leftResolve, rightResolve]).then(spread2(lessThan))
      } else if (isLeftPromise) {
        return leftResolve.then(curry2(lessThan, __, rightResolve))
      } else if (isRightPromise) {
        return rightResolve.then(curry2(lessThan, leftResolve, __))
      }
      return leftResolve < rightResolve
    }
  }

  if (isLeftResolver) {
    return function lessThanBy(value) {
      const leftResolve = left(value)
      return isPromise(leftResolve)
        ? leftResolve.then(curry2(lessThan, __, right))
        : leftResolve < right
    }
  }
  if (isRightResolver) {
    return function strictEqualBy(value) {
      const rightResolve = right(value)
      return isPromise(rightResolve)
        ? rightResolve.then(curry2(lessThan, left, __))
        : left < rightResolve
    }
  }
  return always(left < right)
}

/**
 * @name greaterThanOrEqualTo
 *
 * @synopsis
 * ```coffeescript [specscript]
 * greaterThanOrEqualTo(left any, right any) -> boolean
 * ```
 */
const greaterThanOrEqualTo = (left, right) => left >= right

/**
 * @name gte
 *
 * @synopsis
 * ```coffeescript [specscript]
 * gte(
 *   left (any=>Promise|boolean)|any,
 *   right (any=>Promise|boolean)|any,
 * )(value any) -> greaterThanOrEqualToBy(value any)=>Promise|boolean
 * ```
 *
 * @description
 * Test for left value greater than or equal to (`>=`) right value. Either parameter may be an asynchronous resolver.
 *
 * ```javascript [playground]
 * const identity = value => value
 *
 * const isAtLeast100 = gte(identity, 100)
 *
 * console.log(isAtLeast100(99)) // false
 * console.log(isAtLeast100(100)) // true
 * console.log(isAtLeast100(101)) // true
 * ```
 */
const gte = function (left, right) {
  const isLeftResolver = typeof left == 'function',
    isRightResolver = typeof right == 'function'
  if (isLeftResolver && isRightResolver) {
    return function greaterThanOrEqualToBy(value) {
      const leftResolve = left(value),
        rightResolve = right(value)
      const isLeftPromise = isPromise(leftResolve),
        isRightPromise = isPromise(rightResolve)
      if (isLeftPromise && isRightPromise) {
        return promiseAll(
          [leftResolve, rightResolve]).then(spread2(greaterThanOrEqualTo))
      } else if (isLeftPromise) {
        return leftResolve.then(curry2(greaterThanOrEqualTo, __, rightResolve))
      } else if (isRightPromise) {
        return rightResolve.then(curry2(greaterThanOrEqualTo, leftResolve, __))
      }
      return leftResolve >= rightResolve
    }
  }

  if (isLeftResolver) {
    return function greaterThanOrEqualToBy(value) {
      const leftResolve = left(value)
      return isPromise(leftResolve)
        ? leftResolve.then(curry2(greaterThanOrEqualTo, __, right))
        : leftResolve >= right
    }
  }
  if (isRightResolver) {
    return function strictEqualBy(value) {
      const rightResolve = right(value)
      return isPromise(rightResolve)
        ? rightResolve.then(curry2(greaterThanOrEqualTo, left, __))
        : left >= rightResolve
    }
  }
  return always(left >= right)
}

/**
 * @name lessThanOrEqualTo
 *
 * @synopsis
 * ```coffeescript [specscript]
 * lessThanOrEqualTo(left any, right any) -> boolean
 * ```
 */
const lessThanOrEqualTo = (left, right) => left <= right

/**
 * @name lte
 *
 * @synopsis
 * ```coffeescript [specscript]
 * lte(
 *   left (any=>Promise|boolean)|any,
 *   right (any=>Promise|boolean)|any,
 * )(value any) -> lessThanBy(value any)=>Promise|boolean
 * ```
 *
 * @description
 * Test for left value less than or equal to (`<=`) right value. Either parameter may be an asynchronous resolver.
 *
 * ```javascript [playground]
 * const identity = value => value
 *
 * const isLessThanOrEqualTo3 = lte(identity, 3)
 *
 * console.log(isLessThanOrEqualTo3(1), true)
 * console.log(isLessThanOrEqualTo3(3), true)
 * console.log(isLessThanOrEqualTo3(5), false)
 * ```
 */
const lte = function (left, right) {
  const isLeftResolver = typeof left == 'function',
    isRightResolver = typeof right == 'function'
  if (isLeftResolver && isRightResolver) {
    return function lessThanBy(value) {
      const leftResolve = left(value),
        rightResolve = right(value)
      const isLeftPromise = isPromise(leftResolve),
        isRightPromise = isPromise(rightResolve)
      if (isLeftPromise && isRightPromise) {
        return promiseAll(
          [leftResolve, rightResolve]).then(spread2(lessThanOrEqualTo))
      } else if (isLeftPromise) {
        return leftResolve.then(curry2(lessThanOrEqualTo, __, rightResolve))
      } else if (isRightPromise) {
        return rightResolve.then(curry2(lessThanOrEqualTo, leftResolve, __))
      }
      return leftResolve <= rightResolve
    }
  }

  if (isLeftResolver) {
    return function lessThanBy(value) {
      const leftResolve = left(value)
      return isPromise(leftResolve)
        ? leftResolve.then(curry2(lessThanOrEqualTo, __, right))
        : leftResolve <= right
    }
  }
  if (isRightResolver) {
    return function strictEqualBy(value) {
      const rightResolve = right(value)
      return isPromise(rightResolve)
        ? rightResolve.then(curry2(lessThanOrEqualTo, left, __))
        : left <= rightResolve
    }
  }
  return always(left <= right)
}

export {
  pipe, fork, assign,
  tap, tryCatch, switchCase,
  map, filter, reduce, transform, flatMap,
  any, all, and, or, not,
  eq, gt, lt, gte, lte,
  get, pick, omit,
}

export default {
  pipe, fork, assign,
  tap, tryCatch, switchCase,
  map, filter, reduce, transform, flatMap,
  any, all, and, or, not,
  eq, gt, lt, gte, lte,
  get, pick, omit,
}
