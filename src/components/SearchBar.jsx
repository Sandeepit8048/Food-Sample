import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const SearchBar = () => {
  const { state, dispatch } = useApp();
  const [searchType, setSearchType] = useState('name');
  const [barcode, setBarcode] = useState('');
  const [nameQuery, setNameQuery] = useState(state.searchQuery);

  const handleNameSearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: nameQuery });
    dispatch({ type: 'SET_CATEGORY', payload: '' });
  };



  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap gap-4 mb-4">
        {/* <button
          onClick={() => setSearchType('name')}
          className={`px-4 py-2 rounded-lg font-medium ${
            searchType === 'name'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Search by Name
        </button> */}
        {/* <button
          onClick={() => setSearchType('barcode')}
          className={`px-4 py-2 rounded-lg font-medium ${
            searchType === 'barcode'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Search by Barcode
        </button> */}
      </div>

      {searchType === 'name' ? (
        <form onSubmit={handleNameSearch} className="flex gap-2">
          <input
            type="text"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            placeholder="Search food products by name..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      ) : (
        <form onSubmit={handleBarcodeSearch} className="flex gap-2">
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Enter barcode..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;