// src/utils/cryptoUtils.js
import CryptoJS from "crypto-js";

const passphrase = import.meta.env.VITE_ENCRYPTION_PASSPHRASE; // ideally from .env
const secretKey = CryptoJS.SHA256(passphrase); // 256-bit key

export function encryptData(data) {
  // Ensure data is a string
  if (typeof data !== 'string') {
    console.error("Password must be a string, but received:", typeof data);
    throw new Error("Password must be a string for hashing");
  }

  // Generate SHA-256 hash of the input data
  const hashed = CryptoJS.SHA256(data).toString(CryptoJS.enc.Base64);

  // Return the base64-encoded SHA-256 hash
  return hashed;
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
