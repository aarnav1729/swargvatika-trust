// root/server/server.js
require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
require("isomorphic-fetch");
const { Client } = require("@microsoft/microsoft-graph-client");
const { ClientSecretCredential } = require("@azure/identity");

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

// Graph credentials
const CLIENT_ID = "5a58e660-dc7b-49ec-a48c-1fffac02f721";
const CLIENT_SECRET = "6_I8Q~U7IbS~NERqNeszoCRs2kETiO1Yc3cXAaup";
const TENANT_ID = "1c3de7f3-f8d1-41d3-8583-2517cf3ba3b1";
const SENDER_EMAIL = "leaf@premierenergies.com";

const credential = new ClientSecretCredential(
  TENANT_ID,
  CLIENT_ID,
  CLIENT_SECRET
);

const graphClient = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const tokenResponse = await credential.getToken(
        "https://graph.microsoft.com/.default"
      );
      return tokenResponse.token;
    },
  },
});

// Create an order
app.post("/api/payment/order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, notes } = req.body;
    const order = await razorpay.orders.create({
      amount: parseInt(amount, 10),
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      payment_capture: 1,
      notes: notes || {},
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// Verify payment signature
app.post("/api/payment/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const generated = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  if (generated === razorpay_signature) {
    res.json({ verified: true });
  } else {
    res.status(400).json({ verified: false });
  }
});

// Send receipt email via Microsoft Graph
app.post("/api/email/receipt", async (req, res) => {
  try {
    const { formData, selectedServices } = req.body;
    const { name, email, phone, address, notes } = formData;
    const servicesHtml = selectedServices
      .map((s) => `<li>${s.title} — ₹${s.price.toLocaleString()}</li>`)
      .join("");
    const total = selectedServices
      .reduce((sum, s) => sum + s.price, 0)
      .toLocaleString();

    const htmlContent = `  
      <p>Dear ${name},</p>  
      <p>Thank you for choosing SwargVatika.</p>  
      <h3>Your Receipt</h3>  
      <p><strong>Name:</strong> ${name}</p>  
      <p><strong>Email:</strong> ${email}</p>  
      <p><strong>Phone:</strong> ${phone}</p>  
      <p><strong>Address:</strong> ${address || "—"}</p>  
      <p><strong>Notes:</strong> ${notes || "—"}</p>  
      <h3>Services Availed</h3>  
      <ul>  
        ${servicesHtml}  
      </ul>  
      <p><strong>Total Amount:</strong> ₹${total}</p>  
      <p><strong>Please call +91-8008694888, +91-9701171222, or +91-6301341475 to confirm your date and time slot immediately.</strong></p>  
      <p>Thanks & Regards,<br/>Team Swarg Vatika</p>  
    `;

    const message = {
      message: {
        subject: "Swarg Vatika Payment Confirmation",
        body: { contentType: "HTML", content: htmlContent },
        toRecipients: [
          { emailAddress: { address: email } },
          { emailAddress: { address: "info@swargvatika.org" } },
          { emailAddress: { address: "msaiprakash3@gmail.com" } }
        ],
      },
      saveToSentItems: true,
    };

    await graphClient.api(`/users/${SENDER_EMAIL}/sendMail`).post(message);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Email sending failed" });
  }
});

// Health check
app.get("/api/health", (_, res) => res.send({ status: "OK" }));

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
