const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

mongoose
  .connect("mongodb://0.0.0.0.:27017/challenge", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(async () => {
    // Create categories
    const category1 = await Category.create({
      name: "Category 1",
      description: "Description 1",
    });
    const category2 = await Category.create({
      name: "Category 2",
      description: "Description 2",
    });

    await Product.create({
      name: "Product 1",
      description: "Description 1",
      price: 10,
      category: category1._id,
    });
    await Product.create({
      name: "Product 2",
      description: "Description 2",
      price: 20,
      category: category2._id,
    });

    const productsWithCategory = await Product.find()
      .populate("category")
      .exec();
    console.log(productsWithCategory);

    await mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error:", error);
  });
