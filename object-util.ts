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
console.log(values(obj))

const author = { name: "Steve", age: 93, height: 241 }
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
console.log(filterbyKey)

const filterbyValue = filterObject(obj, ([k, v]) => v === "bbValue")
console.log(filterbyValue)


// string util
interface OptionList {
  highlight: string
}
const searchText = (txt: string, keyword: string, option: OptionList) => {
  if (txt.includes(keyword)) {
    const highlight = option.highlight
    const replaceTxt = highlight + keyword + highlight
    const regex = new RegExp(keyword, 'g');
    const returnTxt = txt.replace(regex, replaceTxt)
    return returnTxt
  }
}
const res = searchText('안녕하세요. 임슬아입니다.', '임슬아', {highlight: '***'})
console.log(res)
