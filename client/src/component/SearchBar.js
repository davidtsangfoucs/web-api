import React from 'react';
import { Link } from 'react-router-dom';
import UseAuth from './UseAuth';

const SearchBar = ({ search, setSearch }) => {
    const handleSearch = event => {
        setSearch(event.target.value);
    };

    const { isLoggedIn, premission } = UseAuth();

    return (
        <div className="field has-icons-right">
            <div className="dis-flex">
                <div className="control is-expanded">
                    <input
                        className="input is-medium"
                        type="text"
                        placeholder="Search cats..."
                        value={search}
                        onChange={handleSearch}
                    />
                    <span className="icon is-right">
                        <i className="fas fa-search"></i>
                    </span>
                </div>

                {isLoggedIn && premission === 'Admin' &&
                    <Link to="/add-cat">
                        <button class="margin-left-2rem button is-primary">Add Cat</button>
                    </Link>}
            </div>
        </div>
    );
}

export default SearchBar;