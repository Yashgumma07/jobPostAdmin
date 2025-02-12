let currentId = null;
let emailId = null;
let totalJobPosts = null;
let totalAppliedJobs = null;
let totalShortlistedJobs = null;

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const loadFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setId = (id) => {
  currentId = id;
  saveToLocalStorage('currentId', currentId);
};

export const getId = () => currentId;

export const setEmailId = (email) => {
  emailId = email;
  saveToLocalStorage('emailId', emailId);
};

export const getEmailId = () => emailId;

export const setTotalJobs = (totalJobs) => {
  totalJobPosts = totalJobs;
  saveToLocalStorage('totalJobPosts', totalJobPosts);
};

export const getTotalJobs = () => totalJobPosts;

export const setTotalAppliedJobs = (totalJobs) => {
  totalAppliedJobs = totalJobs;
  saveToLocalStorage('totalAppliedJobs', totalAppliedJobs);
};

export const getTotalAppliedJobs = () => totalAppliedJobs;

export const setTotalShortlistedJobs = (totalJobs) => {
  totalShortlistedJobs = totalJobs;
  saveToLocalStorage('totalShortlistedJobs', totalShortlistedJobs);
};

export const getTotalShortlistedJobs = () => totalShortlistedJobs;

// Initialize values from localStorage on module load
currentId = loadFromLocalStorage('currentId');
emailId = loadFromLocalStorage('emailId');
totalJobPosts = loadFromLocalStorage('totalJobPosts');
totalAppliedJobs = loadFromLocalStorage('totalAppliedJobs');
totalShortlistedJobs = loadFromLocalStorage('totalShortlistedJobs');
