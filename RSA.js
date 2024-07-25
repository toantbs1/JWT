
//Hàm kiểm tra số nguyên tố
const isPrime = (n, k = 100) => {
  // Kiểm tra các trường hợp cơ bản
  if (n < 2n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;

  //Tách n-1 thành d*2^s
  let s = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    s++;
    d/=2n;
  }

  for (let i = 0; i < k; i++) {
    let a = BigInt(Math.floor(Math.random() * (Number(n - 1n))) + 1);
    let x = modulus(a, d, n);

    if (x === 1n || x === (n - 1n)) continue;

    for (let r = 1n; r < s; r++) {
      x = modulus(x, 2n, n);
      if (x === (n - 1n)) break;
    }
    if (x !== (n - 1n)) return false;
  }

  return true;
};

//Hàm UCLN
const gcd = (a, b) => {
  a = a || 0
  b = b || 0
  if (a < b) {
    var tmp = a
    a = b
    b = tmp
  }
  while (b != 0) {
    var r = a % b
    a = b
    b = r
  }
  return a
}

//Hàm Euclid mở rộng
const egcd = (e, n) => {
  let xe = 1n
  let xn = 0n
  let q
  let xr
  let r
  let t = n
  while(n !== 0n) {
    q = e / n
    xr = xe - q * xn
    xe = xn
    xn = xr
    r = e % n
    e = n
    n = r
  }
  if (e !== 1n) {
    return null
  }
  return (xe % t + t) % t
}

//Tạo số nguyên tố ngẫu nhiên
const getRandom = () => {
  let n = 0n
  do {
    n = BigInt(Math.floor(Math.random() * (9000000000000000 - 1000000000000000 + 1)) + 1000000000000000)
  } while (isPrime(n, 100) != true)
  return n
}

//Hàm tính y^n mod m
const modulus = (y, n, m) => {
  let res = BigInt(1)
  y = BigInt(y)
  n = BigInt(n)
  m = BigInt(m)
  while (n > 0n) {
    if (n % 2n == 1n) {
      res = (res * y) % m
    }
    y = (y * y) % m
    n = n / 2n
  }
  return res
}

//Hàm tạo public key
const chooseE = (phi) => {
  // Tìm số e ngẫu nhiên trong khoảng (1, phi)
  let e;
  do {
    e = BigInt(Math.floor(Math.random() * Number(phi - BigInt(1)))) + BigInt(1);
  } while (gcd(e, phi) !== BigInt(1));

  return e;
}

module.exports = {
  egcd,
  getRandom,
  modulus,
  chooseE
}
