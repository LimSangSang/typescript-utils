interface ItemName {
    name: string
}

interface ItemPrice {
    price: number
}


interface CartItem {
    cart: Array<ItemName>,
    name: string,
    price: number
}

function setPrice(item: ItemPrice, new_price: number) {
    var item_copy = Object.assign({}, item)
    item_copy.price = new_price
    return item_copy
}

function setPriceByName ({cart, name, price}: CartItem) {
    var i = indexOfItem(cart, name)
    if (i !== null) {
        var item = arrayGet(cart, i)
        return arraySet(cart, i, setPrice(item, price))
    }
    return cart
}

function indexOfItem(cart: Array<ItemName>, name: string) {
    for(var i=0; i<cart.length; i++) {
        if(arrayGet(cart, i).name === name)
        return i
    }
    return null
}

function arrayGet(array: any[], idx: number) {
    return array[idx]
}

function arraySet(array: any[], idx: number, value: any) {
    var copy = array.slice()
    copy[idx]=value
    return copy
}