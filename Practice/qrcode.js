const QRCode = require('qrcode');
const fs = require('fs');

// Data you want to encode into the QR code
const url = 'https://www.youtube.com/';

// Generate QR code
QRCode.toFile('qrcode.png', url, (err) => {
  if (err) throw err;
  console.log('QR code generated successfully!');
});
