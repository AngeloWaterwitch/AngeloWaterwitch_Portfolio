import { useState } from 'react';
import { defaultData } from './data';


const ACTIVITY_KEY = 'aw_activity_log';
const STORAGE_KEY = 'aw_portfolio_v2';
const PENDING_KEY = 'aw_pending_testimonials';
const MESSAGES_KEY = 'aw_messages';

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

function loadMessages() {
  try {
    const saved = localStorage.getItem(MESSAGES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function loadActivityLog() {
  try {
    const saved = localStorage.getItem(ACTIVITY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function useSiteData() {
  const [data, setData] = useState(loadData);
  const [pending, setPending] = useState(loadPending);
  const [messages, setMessages] = useState(loadMessages);
  const [activityLog, setActivityLog] = useState(loadActivityLog);

  const logActivity = (action, detail) => {
    const entry = {
      id: 'a' + Date.now(),
      action,
      detail,
      timestamp: new Date().toISOString(),
    };
    const updated = [entry, ...activity].slice(0, 50);
    setActivity(updated);
    try {
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
    } catch {
      console.error('Could not save activity log');
    }
  };

const updateData = (newData) => {
    setData(newData);
    logActivity('save', 'Site content saved and published');
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
    logActivity('approve', 'Testimonial approved from ' + item.author);
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

  const saveMessage = (msg) => {
    const newMessages = [...messages, {
      id: 'm' + Date.now(),
      ...msg,
      receivedAt: new Date().toISOString(),
      read: false,
    }];
    setMessages(newMessages);
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(newMessages));
    } catch {
      console.error('Could not save message');
    }
  };

  const markMessageRead = (id) => {
    const updated = messages.map(m =>
      m.id === id ? { ...m, read: true } : m
    );
    setMessages(updated);
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
    } catch {
      console.error('Could not update message');
    }
  };

  const deleteMessage = (id) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
    } catch {
      console.error('Could not delete message');
    }
  };

const resetData = () => {
    logActivity('restore', 'Site content restored to defaults');
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
    messages,
    saveMessage,
    markMessageRead,
    deleteMessage,
    activity,
  };
}