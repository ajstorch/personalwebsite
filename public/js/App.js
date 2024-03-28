import Picture from './Picture.js'
import apiRequest from './Connection.js';

class App {
    constructor() {
        this._pictureContainer = null
        this._pictureData = null
    }

    async setup() {
        this._pictureContainer = document.querySelector("#pictures-container")
        await this._loadPictures()
        this._setPictures()
    }

    async _loadPictures() {
        let response = await apiRequest("get", "/pictures");
        let data = await response
        this._pictureData = data;
    }

    async _setPictures() {
        for (let picture of this._pictureData) {
            new Picture(this._pictureContainer, picture)
        }
    }
}

let app = new App();
app.setup()