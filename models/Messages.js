const fs = require("fs");
const mapper = require("../utils/ObjectMapper");

class Messages {

    constructor(fileName) {
        this.fileName = fileName;
        this._loadMessages();
    }

    _loadMessages() {
        if (! this.existFile(this.fileName)) {
            this.messages = [];

            return;
        }

        try {
            const messages = fs.readFileSync(this.fileName, {encoding: 'utf8', flag: 'r'});

            this.messages = (!!messages) ? mapper.toObject(messages) : [];

        } catch (e) {
            console.log(e);
        }
    }

    async getAll(){
        return this.messages;
    }

    async save(message) {
        try {
            this.messages.push(message);

            return this._internalSave();
        } catch (error) {
            console.error(error);
        }
    }

    async _internalSave() {
        try {
            await fs.promises.writeFile(`${this.fileName}`, `${mapper.toString(this.messages)}`);
        } catch (e) {
            console.log(e);
        }
    }

    existFile(path) {
        return fs.existsSync(path);
    }

}

module.exports = Messages;