const fsAsync = require('fs/promises');
const fsSync = require('fs');
const os = require('os');
const pth = require('path');

class CTCLogger {
  constructor({path, fileName} = {}) {
    this.path = path || __dirname;
    this.sep = pth.sep;
    this.dirName = 'logs';
    this.dir = this.path + this.sep + this.dirName;
    this.today = new Date();
    this.extension = ".ctc.log";
    this.fileName = fileName? fileName + this.extension : 
      this.today.getDate() + "_" + 
      this.today.getMonth() + "_" +
      this.today.getFullYear() + this.extension
    ;
    this.file = this.dir + this.sep + this.fileName;
    if(!fsSync.existsSync(this.dir)) {
      fsSync.mkdirSync(this.dir);
    }
    if(!fsSync.existsSync(this.file)) {
      fsSync.appendFile(this.file, `INIT LOG >>> ${this.today.toDateString()}`, (err) => {
        if(err) throw err;
      })
    }
  }

  async log(message) {
    const OUT = 'LOG >>>';
    await fsAsync.appendFile(this.file, 
      `\n${OUT} ${message} - ${new Date().toISOString().split('T')[1]}`
    );
  }

  async info(message) {
    const OUT = 'INFO >>>';
    await fsAsync.appendFile(this.file, 
      `\n${OUT} ${message} - ${new Date().toISOString().split('T')[1]}`
    );
  }

  async debug(message) {
    const OUT = 'DEBUG >>>';
    await fsAsync.appendFile(this.file, 
      `\n${OUT} ${message} - ${new Date().toISOString().split('T')[1]}`
    );

  }

  async error(message) {
    const OUT = 'ERROR >>>';
    await fsAsync.appendFile(this.file, 
      `\n${OUT} ${message} - ${new Date().toISOString().split('T')[1]}`
    );
  }

}

const logger = new CTCLogger({
  fileName: "testing"
});

const crypto = require('crypto');
for(let i = 0; i < 5; i++) {
  let message = crypto.randomBytes(10).toString('hex');
  logger.log(message);
  logger.info(message);
  logger.error(message);
  logger.debug(message);
}

module.exports = CTCLogger;