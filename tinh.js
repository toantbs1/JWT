const { egcd, getRandom, modulus, chooseE} = require("./RSA")
const {sha256, sha256_10, base64UrlEncode, JWTVerify} = require('./sha256_base64')

//Tạo số nguyên tố p và q ngẫu nhiên
var p = getRandom()
var q = getRandom()
console.log('Số nguyên tố p:', p)
console.log('Số nguyên tố q:', q)

//Tính n và phiN
let n = p*q
console.log('n:', n)

let phiN = (p-BigInt(1))*(q-BigInt(1))
console.log("phiN:",phiN)

//Public key
let e = chooseE(phiN)
console.log('Public Key: e:', e, ', n:', n)

//Private key
let d = egcd(e, phiN)
console.log('Private Key: d:', d, ', n:', n)

console.log('\nSIGN JWT\n')
// Tạo mã iat và exp
const iat = Math.floor(Date.now() / 1000);
const exp = iat + 30; // Hết hạn sau 30s

var Header = {
    alg:'RS256',
    typ:'JWT'
}
var Payload = {
    id:'669f653919e4dec1035eeb29',
    isAdmin:false,
    iat: iat,
    exp: exp
}
var encodeHead = base64UrlEncode(JSON.stringify(Header))
var encodePay = base64UrlEncode(JSON.stringify(Payload))

// Tạo chữ ký HMAC SHA-256
const signature = modulus(sha256_10(`${encodeHead}.${encodePay}`), d, n)
//Kiểm tra chữ ký 
const checkSignature = modulus(signature, e, n)
const JWT = `${encodeHead}.${encodePay}.${sha256(`${encodeHead}.${encodePay}`)}`
if(checkSignature === sha256_10(`${encodeHead}.${encodePay}`)){
    console.log('Mã JWT:', JWT)
} else {
    console.log("Chữ ký không hợp lệ")
}

console.log('\nVERIFY JWT\n')
//Verify jwt
var testHeader = {
    alg:'RS256',
    typ:'JWT'
}
var testPayload = {
    id:'669f653919e4dec1035eeb29',
    isAdmin:false,
    iat: iat,
    exp: exp
}
var encodeTestHead = base64UrlEncode(JSON.stringify(testHeader))
var encodeTestPayload = base64UrlEncode(JSON.stringify(testPayload))
const decodeTestHeader = JSON.parse(JWTVerify(encodeTestHead))
const decodeTestPayload = JSON.parse(JWTVerify(encodeTestPayload))

if(decodeTestHeader.alg === testHeader.alg && decodeTestHeader.typ === testHeader.typ){
    if(modulus(signature, e, n) === sha256_10(`${encodeTestHead}.${encodeTestPayload}`)) {
        if(decodeTestPayload.id === testPayload.id && decodeTestPayload.isAdmin === testPayload.isAdmin && Math.floor(Date.now() / 1000) < decodeTestPayload.exp) 
        {
            console.log('Mã jwt hợp lệ', Payload)
        } else {
            console.log('Mã jwt không hợp lệ')
        }
    } 
    else {
        console.log('Mã jwt không hợp lệ')
    }
} else {
    console.log('Mã jwt không hợp lệ')
}

