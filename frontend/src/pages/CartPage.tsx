import React from 'react';
import { useCart } from '../contexts/CartContext';
function CartPage() {
  const { state, updateQuantity, removeItem } = useCart();
  const cartItems = state.items;
  const total = state.total;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200 mb-4">
            {cartItems.map(item => (
              <li key={item.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-2">
                      Qty:
                      <button
                        className="px-2 py-1 bg-gray-200 rounded text-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded text-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.maxQuantity}
                      >+</button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="font-bold text-green-700 text-lg">Total: ${total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

export default CartPage;


