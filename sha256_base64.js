const crypto = require('crypto')

const sha256_10 = (input) => {
    var b=0;
    const a =  crypto.createHash("sha256")
      .update(input)
      .digest("dec");
    for(var i = 0; i<a.length; i++){
        if(a[i]=='a')
            b+=10
        else if(a[i]=='b')
            b+=11
        else if(a[i]=='c')
            b+=12
        else if(a[i]=='d')
            b+=13
        else if(a[i]=='e')
            b+=14
        else if(a[i]=='f')
            b+=15
        else
            b+=a[i]
    }
    return BigInt(b)
  }

const sha256 = (input) => {
    return crypto.createHash("sha256")
      .update(input)
      .digest("base64").replace(/\+/g, '-')
      .replace(/\//g, '_').replace(/=+$/, '');
  }

const base64UrlEncode = (jsonString) => {
    
    // Mã hóa chuỗi này thành Base64
    const base64String = btoa(jsonString);
  
    // Thay thế các ký tự "+", "/" bằng "-", "_" tương ứng
    const base64UrlString = base64String.replace(/\+/g, '-')
                                       .replace(/\//g, '_');
  
    // Loại bỏ các ký tự "=" cuối chuỗi
    return base64UrlString.replace(/=+$/, '');
}

const JWTVerify = (jwt) => {
    // Thay thế các ký tự "-", "_" bằng "+", "/" tương ứng
    jwt = jwt.replace(/\-/g, '+')
                                       .replace(/\_/g, '/');

    // Mã hóa chuỗi này thành Base64
    jwt = atob(jwt);
    return jwt
}

module.exports={
    sha256,
    sha256_10,
    base64UrlEncode,
    JWTVerify
}