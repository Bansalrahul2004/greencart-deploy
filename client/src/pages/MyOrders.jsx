import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyOrders } from '../assets/assets'
import OrderTracking from '../components/OrderTracking'

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([])
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const {currency, axios, user} = useAppContext()

    const fetchMyOrders = async ()=>{
        try {
            const { data } = await axios.get('/api/order/user')
            if(data.success){
                setMyOrders(data.orders)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(user){
            fetchMyOrders()
        }
    },[user])

    const getStatusColor = (status) => {
        switch (status) {
            case 'Order Placed':
                return 'bg-blue-100 text-blue-800';
            case 'Confirmed':
                return 'bg-yellow-100 text-yellow-800';
            case 'Processing':
                return 'bg-orange-100 text-orange-800';
            case 'Shipped':
                return 'bg-purple-100 text-purple-800';
            case 'Out for Delivery':
                return 'bg-indigo-100 text-indigo-800';
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

  return (
    <div className='mt-16 pb-16'>
        <div className='flex flex-col items-end w-max mb-8'>
            <p className='text-2xl font-medium uppercase'>My orders</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        {myOrders.map((order, index)=>(
            <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                <div className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col mb-4'>
                    <span>OrderId : {order._id}</span>
                    <span>Payment : {order.paymentType}</span>
                    <span>Total Amount : {currency}{order.amount}</span>
                </div>
                
                {/* Order Status and Tracking */}
                <div className='flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg'>
                    <div className='flex items-center space-x-3'>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                        {order.trackingNumber && (
                            <span className='text-sm text-gray-600'>
                                Tracking: {order.trackingNumber}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setSelectedOrderId(order._id)}
                        className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 text-sm'
                    >
                        Track Order
                    </button>
                </div>

                {order.items.map((item, index)=>(
                    <div key={index}
                    className={`relative bg-white text-gray-500/70 ${
                order.items.length !== index + 1 && "border-b"
              } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>

                      <div className='flex items-center mb-4 md:mb-0'>
                        <div className='bg-primary/10 p-4 rounded-lg'>
                         <img src={item.product.image[0]} alt="" className='w-16 h-16' />
                         </div>
                         <div className='ml-4'>
                            <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                            <p>Category: {item.product.category}</p>
                         </div>
                       </div>

                    <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                        <p>Quantity: {item.quantity || "1"}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className='text-primary text-lg font-medium'>
                        Amount: {currency}{item.product.offerPrice * item.quantity}
                    </p>
                        
                    </div>
                ))}
            </div>
        ))}

        {/* Order Tracking Modal */}
        {selectedOrderId && (
            <OrderTracking 
                orderId={selectedOrderId} 
                onClose={() => setSelectedOrderId(null)} 
            />
        )}
      
    </div>
  )
}

export default MyOrders
