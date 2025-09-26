// validator.js - small form validation helpers
function isRequired(value){return value!==null && value!==undefined && String(value).trim().length>0}
function isEmail(value){const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return re.test(String(value).toLowerCase())}
function minLength(value,len){return String(value||"").trim().length>=len}

// Expose for non-module usage
window.FormValidator = { isRequired, isEmail, minLength };
