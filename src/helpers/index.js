export const isObject = el => el !== null && typeof el === 'object'
export const isString = el => typeof el === 'string' && el.trim()
export const isTruthy = el => typeof el !== 'undefined' && el !== null && el !== false

export const truthyArguments = (args) => args.reduce((acc, arg) => {
    if (!isTruthy(arg)) {
        acc = false
        return acc
    }
    return acc
}, true)
