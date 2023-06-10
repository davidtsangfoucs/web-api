import React, { useState, useEffect } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';
import SearchBar from './SearchBar';
import UseAuth from './UseAuth';
import MsgPanel from '../component/MsgPanel';

const CatProduct = () => {
    const [cats, setCats] = useState([]);
    const [search, setSearch] = useState('');
    const [cartNum, setCartNum] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [showPanel, setShowPanel] = useState(false); // New state variable
    const [selectedLocation, setSelectedLocation] = useState(''); // Add selectedLocation state variable

    const { isLoggedIn, premission, userId, objId, userName } = UseAuth();
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

    // get the init cart number of db 
    const initCartNum = async () => {
        try {
            const res = await axios.get(`${baseURL}/get-employees-accounts/${userId}`);
            const carts = res.data.employee.cartNum ? res.data.employee.cartNum : 0;
            setClickedCards(res.data.employee.clickedCards);
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
            const updatedClickedCards = [...clickedCards, catId]; // Create the updated clickedCards array

            await setClickedCards(updatedClickedCards); // Update the clickedCards state and wait for it to complete

            await axios.put(`${baseURL}/update-employees-accounts/${objId}`, {
                cartNum: cartNum + 1,
                clickedCards: updatedClickedCards,
            }); // Use the updated clickedCards array

            setCartNum(cartNum + 1); // Update the cartNum state
        } catch (error) {
            console.error('Error while updating cartNum:', error);
        }
    };

    // Show the panel
    const showMessagePanel = (cat) => {
        setShowPanel(true);
        setSelectedLocation(cat.location);
    };

    // Close the panel
    const closeMessagePanel = () => {
        setShowPanel(false);
    };

    return (
        <div className="cat-product">
            <div className="container">
                <div className="columns">
                    <SearchBar cartNum={cartNum} search={search} setSearch={setSearch} />
                </div>

                <div className="columns is-multiline is-mobile">
                    {filteredCats.map(cat => (
                        <div className="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen" key={cat.id}>
                            <div className="card">
                                <button onClick={(e) => { updateCartNum(e, cat.id) }} className={`add-cart ${clickedCards.includes(cat.id) ? 'clicked' : ''}`}>
                                    <i className="fas fa-heart"></i>
                                </button>
                                <button onClick={() => showMessagePanel(cat)} className={`msg-staff`}>
                                    <i className="fa-solid fa-message"></i>
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
                                        <span>Age: {cat.age}</span>
                                        <br />
                                        <span>Location: {cat.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isAdded && <div className="message">You have already added this item to the cart.</div>}

            {showPanel && (
                <MsgPanel userName={userName} objId={objId} 
                closePanel={closeMessagePanel}
                 selectedLocation={selectedLocation}>
                    {/* Panel Content */}
                </MsgPanel>
            )}
        </div>
    );
};

export default CatProduct;
