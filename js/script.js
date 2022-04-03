/****
    References
    https://pt.wikipedia.org/wiki/EAN-13#C%C3%A1lculo_do_d%C3%ADgito_verificador_EAN_13    
*****/
const urlParams = new URLSearchParams(window.location.search)
const urlCode = urlParams.get('code')

function EAN13(code) {
    if (code.length === 12) {
        codeSplit = code.split('')
        for (let i = 0; i < codeSplit.length; i++) {
            sum = (typeof (sum) === 'undefined' ? 0 : sum)
            sum = (code[i] * (i % 2 === 0 ? 1 : 3)) + sum
        }
        digit = ((Math.trunc(sum / 10) + 1) * 10) - sum
        sum = 0
        return createJSON(code, digit)
    } else {
        console.log('Codigo deve conter 12 digitos')
    }
}

m = { //collection 1
    '0': ['0', '0', '0', '0', '0', '0'],
    '1': ['0', '0', '1', '0', '1', '1'],
    '2': ['0', '0', '1', '1', '0', '1'],
    '3': ['0', '0', '1', '1', '1', '0'],
    '4': ['0', '1', '0', '0', '1', '1'],
    '5': ['0', '1', '1', '0', '0', '1'],
    '6': ['0', '1', '1', '1', '0', '0'],
    '7': ['0', '1', '0', '1', '0', '1'],
    '8': ['0', '1', '0', '1', '1', '0'],
    '9': ['0', '1', '1', '0', '1', '0']
}

m2 = { //collection 2
    '0': ['A', 'K', 'a'],
    '1': ['B', 'L', 'b'],
    '2': ['C', 'M', 'c'],
    '3': ['D', 'N', 'd'],
    '4': ['E', 'O', 'e'],
    '5': ['F', 'P', 'f'],
    '6': ['G', 'Q', 'g'],
    '7': ['H', 'R', 'h'],
    '8': ['I', 'S', 'i'],
    '9': ['J', 'T', 'j']
}

function codeFont(code) {
    code = code.split("")
    c = m[code[0]]
    m2c = ''
    for (let i = 0; i < 6; i++) {
        f = i + 1
        m2c = m2c + m2[code[f]][c[i]]
    }
    e = ''
    for (let i = 7; i < 13; i++) {
        e = e + m2[code[i]][2]
    }
    return code[0] + m2c + '*' + e + '+'
}

function createJSON(code, digit) {
    codeEAN13 = code + digit
    return JSON.stringify({
        "code": code,
        "codeLength": code.length,
        "codeEAN13": codeEAN13,
        "codeEAN13Length": codeEAN13.length,
        "digitEAN13": digit,
        "fontEAN13": codeFont(codeEAN13),
    })
}

const json = EAN13(urlCode)
let body = document.querySelector('body')
// create new element
let tagP = document.createElement('p')
tagP.textContent = JSON.parse(json).fontEAN13
// add it to the element
body.appendChild(tagP);

// create new element
let tagCode = document.createElement('code')
tagCode.textContent = json
// add it to the element
body.appendChild(tagCode)



console.log(JSON.parse(json).fontEAN13)



        //let blob = new Blob([json], { type: "application/json" });
        //console.log(json)
        //window.location.href = URL.createObjectURL(blob);