import React, { useState, useEffect } from 'react';
import axios from '../commons/axios';


const CatProduct = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        axios.get('/get-cats')
            .then(response => {
                setCats(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div className="cat-product">
            <div className="container">
                <div className='columns is-multiline is-mobile'>
                    {cats.map((cat) => (
                        <div className="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen" key={cat.id}>
                            <div className="card">
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
        </div>
    );
}

export default CatProduct;
