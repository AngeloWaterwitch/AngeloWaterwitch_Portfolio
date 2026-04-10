import { useState } from 'react';
import { defaultData } from './data';

const STORAGE_KEY = 'aw_portfolio_v2';

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  } catch {
    return defaultData;
  }
}

export function useSiteData() {
  const [data, setData] = useState(loadData);

  const updateData = (newData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      console.error('Could not save to localStorage');
    }
  };

  const resetData = () => {
    updateData(defaultData);
  };

  return { data, updateData, resetData };
}