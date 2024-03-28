import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";

// TODO: Risky because unclear if database does exist on grader's computer
const DATABASE_NAME = "cs193x_finalproject";

const api = express.Router();

// Define variables for scoping
let Pictures = null;
let db = null;
let conn = null;

const initApi = async app => {

  // Initialize api route space
  app.set("json spaces", 2);
  app.use("/api", api);

  // Initialize database connection
  conn = await MongoClient.connect("mongodb://127.0.0.1:27017");
  db = conn.db(DATABASE_NAME);
  Pictures = db.collection("pictures");
};

api.use(bodyParser.json());
api.use(cors());

api.get("/", (req, res) => {
  res.json({ message: "Picture voting API" });
});

api.get("/pictures", async (req, res) => {
  let pictures = await Pictures.find().toArray();
  res.json(pictures);
});

api.post("/pictures/:id/vote", async (req, res) => {
  // Find picture in collection based on ID
  let picture = await Pictures.findOne(
    {
      id: req.params.id
    }
  )

  // Check if picture can be found
  if (!picture) {
    res.status(404).json({ error: `Picture with the given ID does not exist` });
    return
  }

  // Check if request body contains an action (upvote or downvote)
  if (!req.body.action) {
    res.status(400).json({ error: `Request body is empty or does not contain an action` });
    return
  }
    
  // Update vote count
  if (req.body.action === "upvote") {
    Pictures.updateOne({
      id: req.params.id
    }, {
      $set: {
        upvotes: picture.upvotes + 1
      }
    });
    res.status(200).json({ success: `Upvoted picture` });
    return
  } else if (req.body.action === "downvote") {
    Pictures.updateOne({
      id: req.params.id
    }, {
      $set: {
        downvotes: picture.downvotes + 1
      }
    })
    res.status(200).json({ success: `Downvoted picture` });
    return
  }

  res.status(404).json({ error: `Failed` });
  return
});

/* Catch-all route to return a JSON error if endpoint not defined */
api.all("/*", (req, res) => {
  res.status(404).json({ error: `Not found: ${req.method} ${req.url}` });
});

export default initApi;
