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

// object.keys
type Keys = [key: string]
const keys = Object.keys as <T>(o: T) => Keys;

// object.values
type Values<T> = {
[K in keyof T] : T[K]
}
const values = Object.values as <T>(o: T) => Values<T>;

const author = { name: "Steve", age: 93, height: 241 }
type Entry<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

const filterObject = <T extends object>(
  obj: T,
  fn: (value: Entry<T>, index: number, array: Entry<T>[]) => Boolean
) => {
  return Object.fromEntries(
    (Object.entries(obj) as Entry<T>[]).filter(fn)
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
