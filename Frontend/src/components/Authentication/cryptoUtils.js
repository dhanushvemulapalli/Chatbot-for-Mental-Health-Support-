// src/utils/cryptoUtils.js
import CryptoJS from "crypto-js";

const passphrase = import.meta.env.VITE_ENCRYPTION_PASSPHRASE; // ideally from .env
const secretKey = CryptoJS.SHA256(passphrase); // 256-bit key

// Encrypt any JS object (like array, object, etc.)
export function encryptData(data) {
  const jsonData = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
  return encrypted;
}

// Decrypt base64 string from backend (iv + ciphertext)
export function decryptData(cipherText) {
  try {
    const rawData = CryptoJS.enc.Base64.parse(cipherText);
    const rawBytes = CryptoJS.enc.Hex.parse(rawData.toString(CryptoJS.enc.Hex)); // get byte array

    // Extract IV and ciphertext
    const iv = CryptoJS.lib.WordArray.create(rawBytes.words.slice(0, 4)); // 16 bytes = 4 words
    const ciphertext = CryptoJS.lib.WordArray.create(rawBytes.words.slice(4));

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext },
      secretKey,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}
