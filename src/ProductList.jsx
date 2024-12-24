import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice'; // Import the addItem action

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({}); // State to track added products
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items); // Retrieve cart items from the Redux store

    // Initialize the cart quantity by summing up all item quantities
    const getTotalCartQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15",
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12",
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18",
                },
                {
                    name: "Boston Fern",
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    cost: "$20",
                },
            ],
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20",
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop",
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: "$18",
                },
            ],
        },
    ];

    const handleAddToCart = (product) => {
        dispatch(addItem(product)); // Dispatch the product to the Redux store
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true, // Mark the product as added
        }));
    };

    const handleCartClick = () => {
        setShowCart(true);
    };

    const handleContinueShopping = () => {
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={{ backgroundColor: '#4CAF50', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <img
                        src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                        alt="Paradise Nursery Logo"
                        style={{ height: '50px', marginRight: '10px' }}
                    />
                    <h3 style={{ color: 'white', display: 'inline-block', margin: '0' }}>Paradise Nursery</h3>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <button style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }} onClick={handleContinueShopping}>
                        Plants
                    </button>
                    <button style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }} onClick={handleCartClick}>
                        Cart ({getTotalCartQuantity()}) {/* Show total cart quantity */}
                    </button>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
                    {plantsArray.map((category, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <h2>{category.category}</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                {category.plants.map((plant, plantIndex) => (
                                    <div
                                        className="product-card"
                                        key={plantIndex}
                                        style={{
                                            border: '1px solid #ccc',
                                            borderRadius: '10px',
                                            padding: '10px',
                                            textAlign: 'center',
                                            width: '250px',
                                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <img
                                            src={plant.image}
                                            alt={plant.name}
                                            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }}
                                        />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p style={{ fontWeight: 'bold' }}>{plant.cost}</p>
                                        <button
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={!!addedToCart[plant.name]}
                                            style={{
                                                padding: '10px 20px',
                                                backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer',
                                            }}
                                        >
                                            {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;