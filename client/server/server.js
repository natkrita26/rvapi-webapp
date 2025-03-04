import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Yeahh! MongoDB connected'))
  .catch((msg) => console.error('MongoDB connection error:', msg));

// Define the product schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

// Define the product model
const Product = mongoose.model("Product", productSchema);

// Set up the root route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Modern Express Server</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg,rgb(255, 255, 255), #42A5F5); /* Blue gradient background */
          color: #333;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          text-align: center;
          max-width: 600px;
          padding: 40px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-size: 48px;
          color: #007BFF; /* Modern blue */
          margin-bottom: 20px;
          font-weight: 600;
        }
        p {
          font-size: 18px;
          color: #555; /* Light grey text */
          margin-bottom: 30px;
        }
        .button {
          background-color: #007BFF; /* Blue */
          color: white;
          padding: 15px 30px;
          font-size: 18px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .button:hover {
          background-color: #0056b3; /* Darker blue on hover */
          transform: translateY(-2px); /* Subtle lift effect */
        }
        .button:focus {
          outline: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to the Modern Express Server</h1>
        <p>Experience the elegance of modern web design with a blue theme.</p>
        <button class="button" onclick="window.location.href='/about'">Learn More</button>
      </div>
    </body>
    </html>
  `);
});




// Route to get all products
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Route to create a new product
app.post('/products', async (req, res) => {
    const product = new Product(req.body); // Use 'Product' (capitalized)
    await product.save();
    res.json(product);
});

// Start the server
const PORT = process.env.PORT || 5127;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
