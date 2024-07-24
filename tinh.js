
const crypto = require("crypto");

function base64UrlEncode(jsonString) {
    
    // Mã hóa chuỗi này thành Base64
    const base64String = btoa(jsonString);
  
    // Thay thế các ký tự "+", "/" bằng "-", "_" tương ứng
    const base64UrlString = base64String.replace(/\+/g, '-')
                                       .replace(/\//g, '_');
  
    // Loại bỏ các ký tự "=" cuối chuỗi
    return base64UrlString.replace(/=+$/, '');
  }

var json = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWY2NTM5MTllNGRlYzEwMzVlZWIyOSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjE3ODk3MTcsImV4cCI6MTcyMTc4OTc0N30.j2T1XcDdjEXAZJe1t5GzlM_BIpdCvWZtJOde0JHm6cw'
var decodeHeader = atob(json.split('.')[0])
var decodePayload = atob(json.split('.')[1])

console.log('decodeHeader',decodeHeader)
console.log('decodePayload',decodePayload)

var encodeHead = base64UrlEncode(decodeHeader)
console.log('encodeHead',encodeHead)
var encodePay = base64UrlEncode(decodePayload)
console.log('encodePay',encodePay)

// Khóa bí mật
const secretKey = 'access_token'

// Tạo chữ ký HMAC SHA-256
const signature = crypto.createHmac('sha256', secretKey)
                        .update(`${encodeHead}.${encodePay}`)
                        .digest('base64')
                        .replace(/=+$/, '')
                        .replace(/\+/g, '-')
                        .replace(/\//g, '_');

console.log('Chữ ký HMAC SHA-256 (base64 encoded):', signature);

if(signature===json.split('.')[2])
{
    console.log(true)
}
else{
    console.log(false)
}