'use client';
import React from 'react';

import CheckoutFlow from './CheckoutFlow';
import StoreItem from './StoreItem';
import DATA from './data';
import reducer from './reducer';
import './styles.css';

function CheckoutExercise() {
    const [items, dispatch] = React.useReducer(reducer);

    React.useEffect(() => {
        const savedItems = window.localStorage.getItem('cart-items');

        if (savedItems === null) {
            dispatch({ type: 'initialise-cart', items: [] });
            return;
        }

        dispatch({ type: 'initialise-cart', items: JSON.parse(savedItems) });
    }, []);

    React.useEffect(() => {
        window.localStorage.setItem('cart-items', JSON.stringify(items));
    }, [items]);

    return (
        <>
            <h1>Neighborhood Shop</h1>

            <main>
                <div className='items'>
                    {DATA.map(item => (
                        <StoreItem
                            key={item.id}
                            item={item}
                            handleAddToCart={item => {
                                dispatch({
                                    type: 'add-item',
                                    item,
                                });
                            }}
                        />
                    ))}
                </div>

                <CheckoutFlow
                    items={items}
                    taxRate={0.15}
                    handleDeleteItem={item =>
                        dispatch({
                            type: 'delete-item',
                            item,
                        })
                    }
                />
            </main>
        </>
    );
}

export default CheckoutExercise;
