import { useState } from 'react';
import { defaultData } from './data';

const STORAGE_KEY = 'aw_portfolio_v2';
const PENDING_KEY = 'aw_pending_testimonials';

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  } catch {
    return defaultData;
  }
}

function loadPending() {
  try {
    const saved = localStorage.getItem(PENDING_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function useSiteData() {
  const [data, setData] = useState(loadData);
  const [pending, setPending] = useState(loadPending);

  const updateData = (newData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      console.error('Could not save to localStorage');
    }
  };

  const submitTestimonial = (testimonial) => {
    const newPending = [...pending, {
      id: 't' + Date.now(),
      ...testimonial,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    }];
    setPending(newPending);
    try {
      localStorage.setItem(PENDING_KEY, JSON.stringify(newPending));
    } catch {
      console.error('Could not save pending testimonial');
    }
  };

  const approvePending = (id) => {
    const item = pending.find(p => p.id === id);
    if (!item) return;
    const approved = {
      quote: item.quote,
      author: item.author,
      role: item.role,
    };
    const newData = {
      ...data,
      testimonials: [...data.testimonials, approved],
    };
    updateData(newData);
    removePending(id);
  };

  const removePending = (id) => {
    const newPending = pending.filter(p => p.id !== id);
    setPending(newPending);
    try {
      localStorage.setItem(PENDING_KEY, JSON.stringify(newPending));
    } catch {
      console.error('Could not save pending testimonials');
    }
  };

  const resetData = () => {
    updateData(defaultData);
  };

  return {
    data,
    updateData,
    resetData,
    pending,
    submitTestimonial,
    approvePending,
    removePending,
  };
}