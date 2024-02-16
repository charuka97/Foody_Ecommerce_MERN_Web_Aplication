const Payment = require("../models/Payments");
const Cart = require("../models/Carts");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// post a new menu item
const postPaymentItem = async (req, res) => {
  const newPayment = req.body;
  try {
    const paymentRequest = await Payment.create(newPayment);

    //Remove items from cart after make payment
    const cartIds = newPayment.cartItems.map((id) => new ObjectId(id));
    const deleteCartRequest = await Cart.deleteMany({ _id: { $in: cartIds } });
    res.status(200).json({ paymentRequest, deleteCartRequest });

    res.status(200).json(paymentRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all payment requests
const getAllPaymentRequest = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };

  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden Access" });
    }
    const paymentRequests = await Payment.find(query)
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(paymentRequests);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postPaymentItem,
  getAllPaymentRequest,
};
