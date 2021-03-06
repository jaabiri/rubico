const timeInLoop = require('./timeInLoop')
const isEmpty = require('./isEmpty')
const _ = require('lodash')
const R = require('ramda')

/**
 * @name isEmpty
 *
 * @benchmark
 * _.isEmpty([]): 1e+6: 71.697ms
 * isEmpty([]): 1e+6: 9.229ms
 * R.isEmpty([]): 1e+6: 3.314s
 */

// timeInLoop('_.isEmpty([])', 1e6, () => _.isEmpty([]))

// timeInLoop('isEmpty([])', 1e6, () => isEmpty([]))

// timeInLoop('R.isEmpty([])', 1e6, () => R.isEmpty([]))
