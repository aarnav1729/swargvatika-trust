require('dotenv').config();  
const express = require('express');  
const Razorpay = require('razorpay');  
const crypto = require('crypto');  
const bodyParser = require('body-parser');  
const cors = require('cors');  

const app = express();  
const port = process.env.PORT;  

// Middleware  
app.use(cors());  
app.use(bodyParser.json());  

// Razorpay instance  
const razorpay = new Razorpay({  
  key_id: process.env.RAZORPAY_KEY_ID,  
  key_secret: process.env.RAZORPAY_KEY_SECRET,  
});  

// Create an order  
app.post('/api/payment/order', async (req, res) => {  
  try {  
    const { amount, currency = 'INR', receipt, notes } = req.body;  
    const order = await razorpay.orders.create({  
      amount: parseInt(amount, 10),  // in paise  
      currency,  
      receipt: receipt || `rcpt_${Date.now()}`,  
      payment_capture: 1,  
      notes: notes || {},  
    });  
    res.status(201).json(order);  
  } catch (err) {  
    console.error(err);  
    res.status(500).json({ error: 'Order creation failed' });  
  }  
});  

// Verify payment signature  
app.post('/api/payment/verify', (req, res) => {  
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;  
  const generated = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)  
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)  
    .digest('hex');  
  if (generated === razorpay_signature) {  
    res.json({ verified: true });  
  } else {  
    res.status(400).json({ verified: false });  
  }  
});  

// Health check  
app.get('/api/health', (_, res) => res.send({ status: 'OK' }));  

// Start server  
app.listen(port, () => console.log(`Server running on port ${port}`));  