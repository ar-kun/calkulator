let numbers = document.querySelectorAll('.number-item');
let operator = document.querySelectorAll('.operator');
let kecilHasil = document.querySelector('.kecil');
let besarHasil = document.querySelector('.besar');
let hapusAll = document.querySelector('.hapus-semua');
let hapusSatu = document.querySelector('.hapus-satu');
let hasil = document.querySelector('.hasil');

function calculateStr(fn) {
 return new Function('return ' + fn)();
}

function hapus() {
 besarHasil.value = '0';
 kecilHasil.value = '0';
}

numbers.forEach((number) => {
 number.addEventListener('click', function () {
  hNumber = number.dataset.value;
  if (kecilHasil.value == '0') {
   kecilHasil.value = '';
  }

  kecilHasil.value += hNumber;

  if (kecilHasil.value == '00' || kecilHasil.value == '000') {
   kecilHasil.value = '0';
  }
 });
});

function operatorPersen() {
 kecilHasil.value = calculateStr(kecilHasil.value);
 besarHasil.value = calculateStr(kecilHasil.value);
 document.querySelector('.btn-copy').style.display = 'flex';
}

operator.forEach((m) => {
 let opt = m.dataset.value;

 m.addEventListener('click', function () {
  const optReg = /[+*\/-]/g;
  let perhitungan = kecilHasil.value.match(optReg);

  if (perhitungan == null) {
   kecilHasil.value += opt;
   if (kecilHasil.value.match('/100')) {
    operatorPersen();
   }
  } else {
   if (kecilHasil.value.slice(-1).match(optReg)) {
    let hapusOperator = kecilHasil.value.split('').reverse().join('').substr(1, kecilHasil.value.length);

    kecilHasil.value = hapusOperator.split('').reverse().join('');

    kecilHasil.value += opt;

    if (kecilHasil.value.match('/100')) {
     operatorPersen();
     perhitungan = null;
    }
    perhitungan = null;
   } else {
    kecilHasil.value += opt;
    if (kecilHasil.value.match('/100')) {
     operatorPersen();
     perhitungan = null;
    }
    perhitungan = null;
   }
  }
 });
});

hapusAll.addEventListener('click', function () {
 hapus();
 document.querySelector('.btn-copy').style.display = 'none';
});

hapusSatu.addEventListener('click', function () {
 if (kecilHasil.value == '0' || kecilHasil.value == '0.') {
  document.querySelector('.btn-copy').style.display = 'none';
  hapus();
 } else {
  let iptVal = kecilHasil.value;
  if (iptVal.length == 1) {
   hapus();
   document.querySelector('.btn-copy').style.display = 'none';
  } else {
   iptVal = iptVal.split('').reverse().join('').substr(1, iptVal.length);
   kecilHasil.value = iptVal.split('').reverse().join('');
  }
 }
});

hasil.addEventListener('click', function () {
 const inputOperator = kecilHasil.value;
 const optReg = /[+*\/-]/g;

 if (inputOperator.slice(-1).match(optReg)) {
  let errorText = `ERROR\n${inputOperator}?\nInput Invalid !`;

  alert(errorText);
  hapus();

  document.querySelector('.btn-copy').style.display = 'none';
 } else {
  let result = calculateStr(inputOperator);
  besarHasil.value = result;
  document.querySelector('.btn-copy').style.display = 'flex';
 }
});
