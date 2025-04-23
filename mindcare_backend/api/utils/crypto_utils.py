# utils/crypto_utils.py
import json, base64
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto.Random import get_random_bytes

def get_key(passphrase: str) -> bytes:
    """
    Derives a 256-bit key from a given passphrase using SHA-256 hashing.

    Args:
        passphrase (str): The passphrase to be hashed.

    Returns:
        bytes: A 32-byte hash derived from the passphrase.
    """

    return SHA256.new(passphrase.encode()).digest()

def pad(data: str) -> bytes:
    """
    Pads a given string with padding.

    padding scheme that fills the remaining bytes of the block
    with the number of padding bytes required. This is useful for encrypting
    the last block of data when the data is not a multiple of the block size.

    For example, if the block size is 16 bytes, and the last block of plaintext
    is 10 bytes, the padding scheme would add 6 bytes of padding with the
    value 6 (0x06).

    Args:
        data (str): The string to be padded.

    Returns:
        bytes: The padded data.
    """
    padding = 16 - len(data.encode()) % 16
    return data.encode() + bytes([padding] * padding)

def unpad(data: bytes) -> str:
    """
    Removes the padding from a given byte string.

    The last byte of the data is used to determine the number of padding bytes
    to remove. The remaining bytes are then returned as a string.

    Args:
        data (bytes): The padded data.

    Returns:
        str: The unpadded data.
    """
    return data[:-data[-1]].decode()

def encrypt_data(data, passphrase: str) -> str:
    """
    Encrypts the given data using AES encryption with a specified passphrase.

    This function uses a 256-bit key derived from the passphrase and 
    AES encryption in CBC mode with a random initialization vector (IV).
    The data is first padded to ensure it is a multiple of the block size,
    then encrypted, and finally encoded to a base64 string.

    Args:
        data: The data to be encrypted, typically a dictionary or serializable object.
        passphrase (str): The passphrase used to derive the encryption key.

    Returns:
        str: The base64-encoded string of the IV concatenated with the encrypted data.
    """

    key = get_key(passphrase)
    iv = get_random_bytes(16)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    #CBC = Chipher Block Chaining(XOR)
    encrypted = cipher.encrypt(pad(json.dumps(data)))
    return base64.b64encode(iv + encrypted).decode()

def decrypt_data(cipher_b64: str, passphrase: str):
    """
    Decrypts the given base64-encoded ciphertext using AES encryption with a specified passphrase.

    This function derives a 256-bit key from the passphrase and uses AES decryption in CBC mode with an initialization vector (IV).
    The base64-encoded input is decoded to separate the IV and ciphertext, which are then used to decrypt the data.
    The decrypted data is unpadded and deserialized from JSON.

    Args:
        cipher_b64 (str): The base64-encoded string containing the IV and ciphertext.
        passphrase (str): The passphrase used to derive the decryption key.

    Returns:
        The original data as a Python object, typically a dictionary or other JSON-serializable structure.
    """

    key = get_key(passphrase)
    raw = base64.b64decode(cipher_b64)
    iv, ciphertext = raw[:16], raw[16:]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return json.loads(unpad(cipher.decrypt(ciphertext)))
