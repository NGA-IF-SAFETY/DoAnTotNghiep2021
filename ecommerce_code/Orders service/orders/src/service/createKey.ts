const eccrypto = require("eccrypto");
import fs from 'fs';
import {Convert} from './convertStringBuffer'


module.exports = () => {
// Generate two pairs of public and private keys
var privateKeyA = eccrypto.generatePrivate();

const arrByteToString = Convert.BufferToString(privateKeyA);
fs.writeFileSync("private.txt", arrByteToString, "utf8");

const publicKeyA = eccrypto.getPublic(privateKeyA);

const arrByteToString1 = Convert.BufferToString(publicKeyA);
fs.writeFileSync("public.txt", arrByteToString1, "utf8");

}

