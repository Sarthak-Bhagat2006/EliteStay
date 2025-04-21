const sampleListings = [
  {
    "title": "Beachfront Villa in Greece",
    "description": "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGJlYWNoJTIwdmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 2700,
    "location": "Santorini",
    "country": "Greece",
    "category": "Beach"
  },
  {
    "title": "Modern Glass House in the Forest",
    "description": "A serene retreat surrounded by trees, this modern glass house blends architecture and nature.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2xhc3MlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1950,
    "location": "Portland",
    "country": "USA",
    "category": "Iconic Cities"
  },
  {
    "title": "Rustic Cabin in the Woods",
    "description": "Escape the city and unwind in this charming rustic cabin deep in the woods.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FiaW4lMjB3b29kc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1100,
    "location": "Big Bear",
    "country": "USA",
    "category": "Farms"
  },
  {
    "title": "Luxury Penthouse with City Views",
    "description": "Experience the height of luxury in this spacious penthouse with panoramic city views.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1655265173643-f096686bb597?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "price": 4500,
    "location": "New York",
    "country": "USA",
    "category": "Iconic Cities"
  },
  {
    "title": "Snowy Mountain Chalet",
    "description": "Cozy up by the fireplace in this snowy mountain chalet, perfect for winter getaways.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hhbGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    "price": 2300,
    "location": "Zermatt",
    "country": "Switzerland",
    "category": "Arctic"
  },
  {
    "title": "Treehouse Adventure Stay",
    "description": "Reconnect with nature in this elevated treehouse tucked away in a peaceful forest.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJlZWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    "price": 980,
    "location": "Bali",
    "country": "Indonesia",
    "category": "Farms"
  },
  {
    "title": "Sahara Desert Camp",
    "description": "An unforgettable night under the stars in a traditional Berber tent in the Sahara Desert.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1559169690-131bab5594a4?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "price": 680,
    "location": "Merzouga",
    "country": "Morocco",
    "category": "Camping"
  },
  {
    "title": "Cave Hotel in Cappadocia",
    "description": "Stay in a unique cave room carved into the soft volcanic rocks of Cappadocia.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1642594283045-cea9d728b89f?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "price": 1450,
    "location": "Göreme",
    "country": "Turkey",
    "category": "Castles"
  },
  {
    "title": "Cliffside Tiny Home",
    "description": "Minimalistic living with breathtaking views—this tiny home sits perched on a scenic cliff.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlueSUyMGhvbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 800,
    "location": "Queenstown",
    "country": "New Zealand",
    "category": "Mountains"
  },
  {
    "title": "Farm Stay with Vineyards",
    "description": "Relax and enjoy wine tasting at this peaceful countryside farm stay surrounded by vineyards.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmVpbmV5YXJkJTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1250,
    "location": "Tuscany",
    "country": "Italy",
    "category": "Farms"
  }
];
module.exports = {
  data: sampleListings
};