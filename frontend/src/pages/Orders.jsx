import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, resetOrdersSlice } from "../store/slices/ordersSlice";
import { getUserOrders } from "../store/slices/userOrdersSlice";
import { toast } from "react-toastify";

const Orders = () => {
  const dispatch = useDispatch();

  const { error, loading, message, order, orders } = useSelector(
    (state) => state.orders
  );
  const { userId } = useSelector((state) => state.auth);

  const handleCreateOrder = () => {
    const orderData = {
      userId,
      cartItems: [
        {
          productId: "6926c06cc73125818aff81cf",
          quantity: 2,
        },
      ],
      totalPrice: 100,
      discountPrice: 80,
      remarks: "deliver between 5-6 PM",
    };
    console.log(orderData);
    dispatch(createOrder(orderData));
  };

  useEffect(() => {
    if (userId) {
      getUserOrders(userId);
      console.log("orders😁: ", orders);
    }
  }, [orders, dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetOrdersSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetOrdersSlice());
    }
  }, [dispatch, message, error]);

  // ==========ordersSlice========

  // createOrder = (orderData)
  // verifyPayment = (orderId, paymentData)
  // getOrderById = (orderId)
  // getUserOrders = (userId)
  // getAllOrders = ()
  // getOrdersBetween = (start, end)
  // getOrdersByType = (type)

  // ========userOrdersSlice========

  // getUserOrders = (userId)
  // getUserOrderById = (userId, orderId)
  // addOrderToUser = (userId, orderData)

  return (
    <div className="min-h-screen pt-16">
      Orders
      <button onClick={handleCreateOrder}>Create Order</button>
    </div>
  );
};

export default Orders;
