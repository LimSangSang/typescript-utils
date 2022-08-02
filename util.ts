const obj = {
  aa: 'aaValue',
  bb: 'bbValue',
  cc: 999,
}

// object.entries
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
  }[keyof T][];
const entries = Object.entries as <T>(o: T) => Entries<T>;
// console.log(entries(obj))

// object.keys
type Keys<T> = (keyof T)[];
const keys = Object.keys as <T>(o: T) => Keys<T>;
// console.log(keys(obj))

// object.values
// type Values<T> = {
//   [K in keyof T] : T[K]
// };
type Values<T> = T[keyof T][];
const values = Object.values as <T>(o: T) => Values<T>;
// console.log(values(obj))

type FilterEntries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

const filterObject = <T extends object>(
  obj: T,
  fn: (value: FilterEntries<T>, index: number, array: FilterEntries<T>[]) => Boolean
) => {
  return Object.fromEntries(
    (Object.entries(obj) as FilterEntries<T>[]).filter(fn)
  ) as Partial<T>
}
const filterbyKey = filterObject(obj, ([k, v]) => k === "aa")
// console.log(filterbyKey)

const filterbyValue = filterObject(obj, ([k, v]) => v === "bbValue")
// console.log(filterbyValue)


// string util
interface OptionList {
  caseSensitive: boolean
}
const getHighlightByKeword = (value: string, keyword: string, option: OptionList) => {
  // if (txt.includes(keyword)) {
  //   const highlight = option.highlight
  //   const replaceTxt = highlight + keyword + highlight
  //   const regex = new RegExp(keyword, 'g');
  //   const returnTxt = txt.replace(regex, replaceTxt)
  //   return returnTxt
  // }
  const { caseSensitive } = option

  const result=[]
  
  let idx
  if (caseSensitive) idx=value.indexOf(keyword)
  else idx=value.toLowerCase().indexOf(keyword.toLowerCase())

  for (let i=0; i<value.length; i++) {
    
    if (idx>0 && i>=idx && i<idx+keyword.length) result.push([{value: value[i], highlight: true}])
    else result.push([{value: value[i], highlight: false}]) 
  }
  return result
   
}
const res = getHighlightByKeword('AaaaBcbbb', 'bc', {caseSensitive: false})
console.log(res)
// [
//   [ { value: 'A', highlight: false } ],
//   [ { value: 'a', highlight: false } ],
//   [ { value: 'a', highlight: false } ],
//   [ { value: 'a', highlight: false } ],
//   [ { value: 'B', highlight: true } ],
//   [ { value: 'c', highlight: true } ],
//   [ { value: 'b', highlight: false } ],
//   [ { value: 'b', highlight: false } ],
//   [ { value: 'b', highlight: false } ]
// ]
