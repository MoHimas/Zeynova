import mongoose from "mongoose";
import "dotenv/config";
import orderModel from "./models/orderModel.js";
import userModel from "./models/userModel.js";
import productModel from "./models/productModel.js";
import bcrypt from "bcryptjs";

const seedOrders = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
    console.log("Connected to MongoDB");

    // Clear existing orders and mock users
    await orderModel.deleteMany({});
    await userModel.deleteMany({ email: /@example.com$/ }); // Delete only mock users
    console.log("Cleared existing mock data");

    const products = await productModel.find({});
    if (products.length === 0) {
      console.log("Error: Need products to seed orders. Run seed.js first.");
      process.exit(1);
    }

    // Hash a default password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash("password123", salt);

    // Create 10 mock users
    const mockUsers = [];
    for (let i = 0; i < 10; i++) {
        mockUsers.push({
            name: "Mock Customer " + (i + 1),
            email: `customer${i+1}@example.com`,
            password: hashPassword,
            phoneNumber: "1234567890",
            address: {
                street: "123 Random St",
                city: "Fashion City",
                state: "Stylesville",
                zip: "12345",
                country: "US"
            }
        });
    }

    const createdUsers = await userModel.insertMany(mockUsers);
    console.log("Seeded 10 mock users");

    const mockOrders = [];
    const statuses = ["Order Placed", "Packing", "Shipped", "Out for delivery", "Order Delivered"];
    const now = new Date();

    for (let i = 0; i < 25; i++) {
        const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Random date within the last 30 days
        const randomDate = new Date();
        randomDate.setDate(now.getDate() - Math.floor(Math.random() * 30));

        mockOrders.push({
            userId: randomUser._id,
            items: [{
                _id: randomProduct._id,
                name: randomProduct.name,
                price: randomProduct.price,
                size: randomProduct.Sizes[0] || "M",
                quantity: Math.floor(Math.random() * 3) + 1,
                image: randomProduct.image
            }],
            amount: (randomProduct.price * (Math.floor(Math.random() * 3) + 1)) + 10,
            address: {
                firstName: randomUser.name.split(" ")[0],
                lastName: randomUser.name.split(" ")[1],
                email: randomUser.email,
                street: randomUser.address.street,
                city: randomUser.address.city,
                state: randomUser.address.state,
                zipCode: randomUser.address.zip,
                country: randomUser.address.country,
                phone: randomUser.phoneNumber
            },
            paymentMethod: i % 2 === 0 ? "Stripe" : "COD",
            payment: i % 2 === 0,
            status: randomStatus,
            date: randomDate.getTime()
        });
    }

    await orderModel.insertMany(mockOrders);
    console.log("Successfully seeded 25 mock orders!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedOrders();
