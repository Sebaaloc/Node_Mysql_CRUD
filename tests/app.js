'use strict';

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const config = require('../config');
const chaiHttp = require('chai-http');

const db = require('../app/models');

chai.use(chaiHttp);

const normalizedPath = path.join(__dirname, '.');

const includeFile = file => {
  if (fs.lstatSync(`${normalizedPath}/${file}`).isDirectory()) {
    fs.readdirSync(`${normalizedPath}/${file}`).forEach(inFile => {
      includeFile(`./${file}/${inFile}`);
    });
  } else {
    require(`./${file}`);
  }
};

fs.readdirSync(normalizedPath).forEach(file => {
  includeFile(file);
});
