import crypto from 'crypto'
import { security } from '../config.json'

const generateSalt = () => crypto.randomBytes(16).toString('base64')

const getHash = (password, salt) => {
  return crypto.pbkdf2Sync(`${security.pepper}.${password}`, salt, 1000, 64, `sha512`).toString('base64')
}

const isMatched = (passwordEntered, salt, currentHash) => {
  let hashToVerify = getHash(passwordEntered, salt)
  return currentHash === hashToVerify
}

export { generateSalt, getHash, isMatched }