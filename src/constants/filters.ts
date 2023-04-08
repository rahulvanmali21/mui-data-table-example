export const DATE_OPERATOR = [
    "is",
    "is not",
    "is after",
    "is on or after",
    "is before",
    "is on or before",
    "is empty",
    "is not empty"
]
export const STRING_OPERATOR = [
    "contains",
    "equals",
    "startsWith",
    "endsWith",
    "isEmpty",
    "isNotEmpty",
    "isAnyOf",
]
export const NUMBERIC_OPERATOR = [
    "=",
    "!=",
    ">",
    "<",
    ">=",
    "<=",
    "is empty",
    "is not empty"
]

const operators = {
    "is" : "$eqi",
    "is not" : "$ne",
    "is after":"$gt",
    "is on or after":"$gte",
    "is before": "$lt",
    "is on or before" : "$lt",
    "is empty":"$null",
    "is not empty":"$notNull",
    "contains":"$contains",
    "not contains":"$notContains",
    "equals" : "$eqi",
    "startsWith":"$startsWith",
    "endsWith":"$endsWith",
    "isEmpty":"$null",
    "isNotEmpty":"$notNull",
    "isAnyOf":"$between",
    "=" :'$eqi',
    "!=":"$ne",
    ">":"$gt",
    "<" :"$lt",
    ">=":"$gte",
    "<=":"$lte",
}


