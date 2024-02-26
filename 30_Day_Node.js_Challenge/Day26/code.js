const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const Product = mongoose.model("Product", productSchema);

const uri = "mongodb://0.0.0.0.:27017/challenge";

async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function getProductStatistics() {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" },
        },
      },
    ]);

    if (result.length > 0) {
      return result[0];
    } else {
      return { totalProducts: 0, averagePrice: 0, highestQuantity: 0 };
    }
  } catch (error) {
    console.error("\nError getting product statistics:", error);
    throw error;
  }
}

async function main() {
  await connectToDB();
  try {
    const productStats = await getProductStatistics();
    console.log("\nProduct Statistics:", productStats);
  } catch (error) {
    console.error("\nError getting product statistics:", error);
  } finally {
    mongoose.disconnect();
    console.log("\nDisconnected from MongoDB server");
  }
}
main();
