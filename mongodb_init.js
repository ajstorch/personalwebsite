const DATABASE_NAME = "cs193x_finalproject";

db = new Mongo ().getDB(DATABASE_NAME);
db.dropDatabase();

// File with the mock data for pictures to vote about
db.pictures.insertMany([
    { 
        id: "1",
        title: "Morning Lake",
        path: "pictures/IMG_0170.jpg",
        upvotes: 0,
        downvotes: 0,
    },
    { 
        id: "2",
        title: "Dessert",
        path: "pictures/IMG_0764.jpg",
        upvotes: 0,
        downvotes: 0,
    },
    { 
        id: "3",
        title: "Ocean Views",
        path: "pictures/IMG_0723.jpg",
        upvotes: 0,
        downvotes: 0,
    },
    { 
        id: "4",
        title: "Surfing",
        path: "pictures/IMG_1446.jpg",
        upvotes: 0,
        downvotes: 0,
    },
    { 
        id: "5",
        title: "Wild West",
        path: "pictures/IMG_1343.jpg",
        upvotes: 0,
        downvotes: 0,
    },
    { 
        id: "6",
        title: "Golden Gate",
        path: "pictures/IMG_8873.jpg",
        upvotes: 0,
        downvotes: 0,
    },
    { 
        id: "7",
        title: "Road Trip",
        path: "pictures/IMG_0523.jpg",
        upvotes: 0,
        downvotes: 0,
    },
    { 
        id: "8",
        title: "Crater Lake",
        path: "pictures/IMG_0394.jpg",
        upvotes: 0,
        downvotes: 0,
    },

])

console.log("Successfully created back-end data")