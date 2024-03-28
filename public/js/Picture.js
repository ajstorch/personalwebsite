import apiRequest from "./Connection.js";

class Picture {
    constructor(parentEl, picture) {
        this._parentEl = parentEl;

        this._id = picture.id;
        this._title = picture.title;
        this._path = picture.path;
        this._upvotes = picture.upvotes;
        this._downvotes = picture.downvotes;

        this._onUpvote = this._onUpvote.bind(this);
        this._onDownvote = this._onDownvote.bind(this);

        this.picture_div = null;
        this.picture_img = null;
        this.picture_h3 = null;
        this.picture_vote_counter = null;
        this.picture_btn_upvote = null;
        this.picture_btn_downvote = null;

        this.pictureEl = this._createElement();;
        //Append to DOM
        this._appendToDOM();
        this._setEventListener();
    }

    _createElement() {
        this.picture_div = document.createElement("div");
        this.picture_div.className = "picture-box";  //add classname 

        // Create Subelement to align in flexbox
        this.votecount_div = document.createElement("div");
        this.votecount_div.className = "votecount-container";

        this.picture_img = document.createElement("img");
        this.picture_img.setAttribute("src", this._path);

        this.picture_h4 = document.createElement("h4");
        this.picture_h4.innerText = this._title;
        this.picture_h4.className = "picture-titles"

        this.picture_vote_counter = document.createElement("div");
        this.picture_vote_counter.innerText = `${this._upvotes - this._downvotes}`;
        this.picture_vote_counter.className = "votecounter-div";

        this.picture_btn_upvote = document.createElement("button");
        this.picture_btn_upvote.className = "fa-solid fa-thumbs-up vote-button";
       

        this.picture_btn_downvote = document.createElement("button");
        this.picture_btn_downvote.className = "fa-solid fa-thumbs-down vote-button downvote-button";
        
        this.picture_vote_dislike = document.createElement("div");
        this.picture_vote_dislike.innerText = "Dislike";
        this.picture_vote_dislike.className = "dislike-div";

        this.picture_div.appendChild(this.picture_img);
        this.picture_div.appendChild(this.picture_h4);
        this.picture_div.appendChild(this.votecount_div);
        this.votecount_div.appendChild(this.picture_btn_upvote);
        this.votecount_div.appendChild(this.picture_vote_counter);
        this.votecount_div.appendChild(this.picture_btn_downvote);
        this.votecount_div.appendChild(this.picture_vote_dislike);
    }

    _refreshElement() {
        this.picture_vote_counter.innerText = `${this._upvotes - this._downvotes}`;
    }

    _appendToDOM() {
        this._parentEl.appendChild(this.picture_div);
    }

    _setEventListener() {
        this.picture_btn_upvote.addEventListener("click", this._onUpvote);
        this.picture_btn_downvote.addEventListener("click", this._onDownvote);
    }

    async _onUpvote() {
        this._upvotes += 1;
        this._refreshElement();
        apiRequest("post", `/pictures/${this._id}/vote`, JSON.stringify({ action: "upvote" }))
    }

    async _onDownvote() {
        this._downvotes += 1;
        this._refreshElement();
        apiRequest("post", `/pictures/${this._id}/vote`, JSON.stringify({ action: "downvote" }))
    }

}

export default Picture