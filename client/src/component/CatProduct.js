import React, { useState, useEffect } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';
import SearchBar from './SearchBar';
import UseAuth from './UseAuth';

const CatProduct = () => {
    const [cats, setCats] = useState([]);
    const [search, setSearch] = useState('');
    const [cartNum, setCartNum] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    const { isLoggedIn, premission, userId, objId } = UseAuth();
    useEffect(() => {
        axios
            .get('/get-cats')
            .then(response => {
                const formattedCats = response.data.map(cat => ({
                    ...cat,
                    id: cat._id // Assign the _id property as the id
                }));
                setCats(formattedCats);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        if (userId) {
            initCartNum();
        }
    }, [userId]);

    const initCartNum = async () => {
        try {
            const res = await axios.get(`${baseURL}/get-employees-accounts/${userId}`);
            const carts = res.data.employee.cartNum ? res.data.employee.cartNum + 1 : 1;
            setCartNum(carts);
        } catch (error) {
            console.error('Error while fetching cart information:', error);
        }
    };



    const filteredCats = search
        ? cats.filter(
            cat =>
                cat.name.toLowerCase().includes(search.toLowerCase()) ||
                cat.breed.toLowerCase().includes(search.toLowerCase())
            // cat.description.toLowerCase().includes(search.toLowerCase())
        )
        : cats;


    // update cart 
    // update toolbox card nums 
    const updateCartNum = async (e, catId) => {
        e.preventDefault();

        if (clickedCards.includes(catId)) {
            setIsAdded(true);
            return;
        }

        try {
            await axios.put(`${baseURL}/update-employees-accounts/${objId}`, { cartNum });
            setCartNum(cartNum + 1);
            setClickedCards((prevClickedCards) => [...prevClickedCards, catId]);
        } catch (error) {
            console.error('Error while updating cartNum:', error);
        }
    };

    return (
        <div className="cat-product">
            <div className="container">
                <div className="columns">
                    <SearchBar cartNum={cartNum} search={search} setSearch={setSearch} />
                </div>

                <div className="columns is-multiline is-mobile">
                    {filteredCats.map((cat) => (
                        <div className="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen" key={cat.id}>
                            <div className="card">
                                <button
                                    onClick={(e) => { updateCartNum(e, cat.id) }}
                                    className={`add-cart ${clickedCards.includes(cat.id) ? 'clicked' : ''}`}
                                >
                                    <i className="fas fa-heart"></i>
                                </button>
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={cat.image} alt={cat.name} />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-4">{cat.name}</p>
                                            <p className="subtitle is-6">{cat.breed}</p>
                                        </div>
                                    </div>
                                    <div className="content">
                                        {cat.description}
                                        <br />
                                        <span>Age: {cat.age}</span><br />
                                        <span>Location: {cat.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isAdded && (
                <div className="message">You have already added this item to the cart.</div>
            )}
        </div>
    );
}

export default CatProduct;
