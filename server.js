const express = require('express');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/klkbat';
let db;
let ordersCollection;
let settingsCollection;

// Connect to MongoDB
async function connectDB() {
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('✅ Connected to MongoDB');
        
        db = client.db('klkbat');
        ordersCollection = db.collection('orders');
        settingsCollection = db.collection('settings');
        
        // Initialize default settings if not exist
        const settingsExist = await settingsCollection.findOne({});
        if (!settingsExist) {
            await settingsCollection.insertOne({
                basic_name: 'Basic',
                basic_price: 99,
                pro_name: 'Pro',
                pro_price: 399,
                super_name: 'Super',
                super_price: 999,
                product_name: 'Landing Page Pro',
                product_price: 499,
                company_name: 'KLKBAT',
                support_email: 'support@klkbat.com',
                phone_number: '+966 XX XXX XXXX'
            });
            console.log('✅ Default settings initialized');
        }
        
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// API Routes

// Get all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await ordersCollection.find({}).sort({ date: -1 }).toArray();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Add new order
app.post('/api/orders', async (req, res) => {
    try {
        // Get count for ID generation
        const count = await ordersCollection.countDocuments();
        const newOrder = {
            id: 'ORD-' + String(count + 1).padStart(3, '0'),
            ...req.body,
            status: 'new',
            date: new Date().toISOString().split('T')[0],
            createdAt: new Date()
        };
        
        const result = await ordersCollection.insertOne(newOrder);
        newOrder._id = result.insertedId;
        
        res.json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Update order
app.put('/api/orders/:id', async (req, res) => {
    try {
        const result = await ordersCollection.findOneAndUpdate(
            { id: req.params.id },
            { $set: { ...req.body, updatedAt: new Date() } },
            { returnDocument: 'after' }
        );
        
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
});

// Delete order
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const result = await ordersCollection.deleteOne({ id: req.params.id });
        
        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

// Get settings
app.get('/api/settings', async (req, res) => {
    try {
        const settings = await settingsCollection.findOne({});
        res.json(settings || {});
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

// Update settings
app.post('/api/settings', async (req, res) => {
    try {
        const result = await settingsCollection.findOneAndUpdate(
            {},
            { $set: { ...req.body, updatedAt: new Date() } },
            { upsert: true, returnDocument: 'after' }
        );
        
        res.json(result);
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

// HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// HTML Routes (Clean URLs without .html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

app.get('/basic-service', (req, res) => {
    res.sendFile(path.join(__dirname, 'basic-service.html'));
});

app.get('/pro-service', (req, res) => {
    res.sendFile(path.join(__dirname, 'pro-service.html'));
});

app.get('/super-service', (req, res) => {
    res.sendFile(path.join(__dirname, 'super-service.html'));
});

app.get('/landing-page-pro', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing-page-pro.html'));
});

// Start server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`🌐 Website: http://localhost:${PORT}`);
        console.log(`🎛️  Admin: http://localhost:${PORT}/admin`);
    });
});
