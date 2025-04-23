# dhanush
# utils/crypto_utils.py
import json, base64
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto.Random import get_random_bytes

def get_key(passphrase: str) -> bytes:
    return SHA256.new(passphrase.encode()).digest()

def pad(data: str) -> bytes:
    padding = 16 - len(data.encode()) % 16
    return data.encode() + bytes([padding] * padding)

def unpad(data: bytes) -> str:
    return data[:-data[-1]].decode()

def encrypt_data(data, passphrase: str) -> str:
    key = get_key(passphrase)
    iv = get_random_bytes(16)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    encrypted = cipher.encrypt(pad(json.dumps(data)))
    return base64.b64encode(iv + encrypted).decode()

def decrypt_data(cipher_b64: str, passphrase: str):
    key = get_key(passphrase)
    raw = base64.b64decode(cipher_b64)
    iv, ciphertext = raw[:16], raw[16:]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return json.loads(unpad(cipher.decrypt(ciphertext)))
