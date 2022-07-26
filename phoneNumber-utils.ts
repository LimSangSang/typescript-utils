const phoneNumber = '010'
const seoulNumber = '02'
const provinceNumbers = ['02', '051', '053', '032', '062', '042', '052', '044', '031', '033', '043', '041', '063', '061', '054', '055', '064']

const checkValidNumber = (number: string, phone: boolean) => {
    if (12<number.length || 9>number.length ) return false
    const two_letters = number.slice(0, 2)
    const three_letters = number.slice(0, 3)
    const checkPhoneNumber = three_letters === phoneNumber
    const checkLocalNumber = two_letters === seoulNumber || provinceNumbers.includes(three_letters)
    const validNumber = phone ? checkPhoneNumber : checkLocalNumber
    return validNumber
}

const getAutoHyphenNumber = (number: string, phone: boolean) => {
    const validNumber=checkValidNumber(number, phone)
    if (!validNumber) return '유효한 번호가 아닙니다.'
    const autoHyphenNumber= number
        .replace(/[^0-9]/g, '')
        .replace(/(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        return autoHyphenNumber
}
console.log(getAutoHyphenNumber('01046667293', true)) // true: 핸드폰 번호, false: 지역번호