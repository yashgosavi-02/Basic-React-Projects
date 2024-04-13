import React, { useState } from 'react';
import UseAxios from '../hooks/UseAxios';
import CoinTrending from './CoinTrending';
import Skeleton from './Skeleton';

const Search = () => {
  const [query, setQuery] = useState('');
  const { response, loading, error } = UseAxios(`/coins/markets?vs_currency=usd&ids=${query}`);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Here"
        value={query}
        onChange={handleChange}
      />
      {response && response.length === 0 && !loading && <p>No results found.</p>} {/* Show no results message */}
    </div>
  );
};

export default Search;
