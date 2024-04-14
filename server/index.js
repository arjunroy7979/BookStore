import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import moment from 'moment'; // For date formatting

const PORT = 8080;
const hostName = '127.0.0.8';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/employee')
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    loginDate: {
        type: [String],
        default: [],
    },
    loginTimes: {
        type: [String],
        default: [],
    },
    logoutTime: {
        type: [String],
        default: [],
    },
});

// Model 
const UserModel = new mongoose.model('emp', userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishername: {
        type: String,
        required: true,
    },
    publisherdate: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    newprice: {
        type: Number,
        required: true,
    },
});

// Model 
const productModel = new mongoose.model('product', productSchema);

// Home Page
app.get('/', (req, res) => {
    res.send("Express Server started")
});

// Product Routes
app.post('/product-listing', async (req, res) => {
    const { img, name, author, publishername, publisherdate, qty, language, price, newprice } = req.body;
    try {
        const newProduct = new productModel({
            img,
            name,
            author,
            publishername,
            publisherdate,
            qty,
            language,
            price,
            newprice,
        });
        await newProduct.save();
        res.status(200).send({ status: 200, message: "Product Added Sucessfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

// Get product all
app.get("/product", async (req, res) => {
    try {
        const allProduct = await productModel.find();
        res.send({ status: 'ok', data: allProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

// get single product
app.get('/product/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send({ status: 200, data: product });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

// Update Product by ID 
app.put('/product/:id', async (req, res) => {
    const productId = req.params.id;
    const { img, name, author, publishername, publisherdate, qty, language, price, newprice } = req.body;
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId, {
            img,
            name,
            author,
            publishername,
            publisherdate,
            qty,
            language,
            price,
            newprice,
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send({ status: 200, message: `Product Updated Successfull`, data: updatedProduct });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});



// Delete Product by ID
app.delete('/product/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send({ status: 200, message: "Product deleted successfully", data: deletedProduct });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});


// Cart Schema
const cartSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishername: {
        type: String,
        required: true,
    },
    publisherdate: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    newprice: {
        type: Number,
        required: true,
    },
});

// Cart Model
const CartModel = new mongoose.model('Cart', cartSchema);

// adding product to cart
app.post('/add-to-cart', async (req, res) => {
    try {
        const { img, name, author, publishername, publisherdate, _id, language, price, newprice } = req.body.data;
        const existingProduct = await CartModel.findOne({ _id });
        if (existingProduct) {
            existingProduct.qty += 1;
            await existingProduct.save();
            return res.status(200).send({ status: 200, message: "Product quantity updated" });
        }
        const newProduct = new CartModel({
            img,
            name,
            author,
            publishername,
            publisherdate,
            qty: 1,
            _id,
            language,
            price,
            newprice
        })
        await newProduct.save()
        res.status(200).send({ status: 200, message: "Product Added Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch cart data
app.get('/cart-data', async (req, res) => {
    try {
        const cartData = await CartModel.find();

        res.status(200).json({ cartData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete cart product by ID
app.delete('/cart-data/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await CartModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found in cart" });
        }

        res.status(200).send({ status: 200, message: "Product deleted from cart", data: deletedProduct });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }

});

// Decrease quantity in cart
app.put('/cart-data/decrease/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await CartModel.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found in cart" });
        }
        if (product.qty > 1) {
            product.qty -= 1;
            await product.save();
            res.status(200).send({ status: 200, message: "Quantity decreased in cart" });
        } else {
            await product.remove();
            res.status(200).send({ status: 200, message: "Product removed from cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

// Increase quantity in cart
app.put('/cart-data/increase/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await CartModel.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found in cart" });
        }
        product.qty += 1;
        await product.save();
        res.status(200).send({ status: 200, message: "Quantity increased in cart" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

// Decrease quantity in product
app.put('/product/decrease-qty/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        if (product.qty > 1) {
            product.qty -= 1;
            await product.save();
            res.status(200).send({ status: 200, message: "Quantity decreased in product" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

// Increase quantity in product
app.put('/product/increase-qty/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        product.qty += 1;
        await product.save();
        res.status(200).send({ status: 200, message: "Quantity increased in product" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});





// ............User Routes..........
// Login API
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.send({ message: "User not registered" });
        }

        if (password !== user.password) {
            return res.send({ message: "Password didn't match" });
        }

        const loginDate = moment().format('YYYY-MM-DD')
        user.loginDate.push(loginDate);

        const loginTime = moment().format('hh:mm:ss A');
        user.loginTimes.push(loginTime);

        await user.save();
        res.send({ message: "Login successful", user });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

// Logout API
app.post('/logout', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ status: 404, message: "User Not Found" });
        }

        const logoutTime = moment().format('hh:mm:ss A');
        user.logoutTime.push(logoutTime);

        await user.save();
        res.status(200).send({ status: 200, message: "Logout Successful" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});




// Register userdata API
app.post('/register', async (req, res) => {
    const { fullname, username, email, password, role } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(201).send({ status: 201, message: "User already registered" });
        }

        const newUser = new UserModel({
            fullname,
            username,
            email,
            password,
            role,
        });

        await newUser.save();
        res.status(200).send({ status: 200, message: "User Successfully registered" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Server error" });
    }
});

// Get user-data 
app.get("/user-data", async (req, res) => {
    try {
        const allUsers = await UserModel.find({ role: "user" });
        res.send({ status: 'ok', data: allUsers });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

// Get admin-data 
app.get("/admin-data", async (req, res) => {
    try {
        const allUsers = await UserModel.find({ role: "admin" });
        res.send({ status: 'ok', data: allUsers });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

app.listen(PORT, hostName, () => {
    console.log(`Server started at http://${hostName}:${PORT}`);
});
