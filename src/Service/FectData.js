import axios from 'axios';

export const fetchOptionChainData = async (symbol, expiry, lot) => {
  const url = `/api/optionChain/fetch-data?symbol=${symbol}&expiry=${expiry}&lotSize=${lot}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching option chain data:', error);
    throw error;
  }
};