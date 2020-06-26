const Order = require('../models/order');
const stringify = require('json-stringify-safe');

const OrderRouter = {}

OrderRouter.get = async (req, res, next) => {
    console.log(req.params.exp_id)
    const query = {
        user_id: req.params.exp_id
    }
    try {
       await  Order.find(query).then(element => {
            console.log(element);
            return res.status(200).json({element})
            // return res.send({
            //     element
            //  })
        });
        // res.status(404).json({
        //     element: ['no!!']
        //  })
    } catch (e) {
        next(e);
    }
}
OrderRouter.create = async (req, res, next) => {
    console.log(req.body.order)
  
    const order = {
        name,
        amount,
        kind,
        orderDate,
        paid,
        price,
        orderRecivedDate,
        note,
        user_id
      } = req.body.order;
    const newExp = new Order({
        name,
        amount,
        kind,
        orderDate,
        paid,
        price,
        orderRecivedDate,
        note,
        user_id
    });

    try {
        const saved = await newExp.save();
        return res.send({
            message: "saved"
        })
    } catch (err) {
        next(err);
    }
}

OrderRouter.update = async (req, res, next) => {
    const Order_id = req.params.exp_id;
    const order = {
        name,
        amount,
        kind,
        orderDate,
        paid,
        price,
        orderRecivedDate,
      } = req.body.order;
    try {
        const updateOrder = await Order.update({ _id: Order_id }, { amount, name, kind,orderDate,paid,price,orderRecivedDate })
            .then(e => {
                console.log(e);
            });
        return res.send({
            message: "updated",
            updateOrder: updateOrder
        })
    } catch (err) {
        next(err);
    }
}

OrderRouter.remove = async (req, res, next) => {
    const Order_id = req.params.exp_id;
    try {
        await Order.deleteOne({ _id: Order_id });
        return res.send({
            message: "deleted"
        })
    } catch (err) {
        next(err);
    }
}

module.exports = OrderRouter;