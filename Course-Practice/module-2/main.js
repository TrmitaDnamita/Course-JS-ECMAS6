const USER_DATA = {
  'johndoe': {
    userName: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    gender: 'male',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    phone: '123-456-7890',
    password: '123password',
    email: 'G2Ct9@example.com',
    id: 'userSomeID',
    ip: '123.456.7.89',
    lastIP: '123.456.7.89',
    role: 'admin',
    permissions: ['read', 'write', 'delete'],
    lastLogin: new Date(),
    lastLogout: new Date(),
  },
  'admin': {
    userName: 'admin',
    firstName: 'Termita',
    lastName: 'Dinamita',
    age: 30,
    gender: 'male',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    phone: '123-456-7890',
    password: '1234',
    email: 'G2Ct9@example.com',
    id: 'userSomeID',
    ip: '45.168.192.113',
    lastIP: '45.168.192.113',
    role: 'admin',
    permissions: ['read', 'write', 'delete'],
    lastLogin: new Date(),
    lastLogout: new Date(),
  }
}

const formState = {
  ip: '',
  username: '',
  password: '',
  rememberMe: false,
  isPWVisible: false,
  hasError: false,
  clear: () => {
    formState.ip = '';
    formState.username = '';
    formState.password = '';
    formState.rememberMe = false;
    formState.isPWVisible = false;
    formState.hasError = false;
  }
}

function handleError(isError, errorMsg = '') {
  if (isError === formState.hasError) return
  
  formState.hasError = isError
  let errorElement = document.getElementById('error-handler-element')

  errorElement.style.display = isError ? 'block' : 'none'
  errorElement.innerHTML =  errorMsg
}

let cachedIP = null; // Use a consistent variable for caching

function getIP() {
  if (cachedIP) {
    // If already cached, return a resolved promise with cached data
    return Promise.resolve(cachedIP);
  }

  // Otherwise, fetch and cache the IP
  return fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
      cachedIP = data;
      return data;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
  handleError(false, '');
  
  try {
    const { ip } = await getIP();
    formState.ip = ip;
  } catch (err) {
    console.warn('Failed to get IP, User will not be remembered:', err);
  }
  
  document.getElementById('password-eye-btn').addEventListener('click', handlePasswordShow);
  document.getElementById('remember-me-input').addEventListener('change', (event) => handleRememberMe(event));
  
  document.getElementById('username').addEventListener('input', (event) => debouncedChange(event));
  document.getElementById('password').addEventListener('input', (event) => debouncedChange(event));
  
  document.getElementById('login-form').addEventListener('submit', (event) => handleLoginFormSubmitted(event));
});

function handleInputChange(event) {
  const value = event.target.value;
  const id = event.target.id;
  if (value === '') return;
  if (value === formState[id]) return;
  formState[id] = value;
  handleError(false, '');
}

const debouncedChange = deBounce(handleInputChange, 200);

function deBounce (fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function handlePasswordShow() {
  let inputPwElement = document.getElementById('password-input');
  let eyeIcoElement = document.getElementById('ico-password');
  
  inputPwElement.setAttribute('type', formState.isPWVisible ? 'password' : 'text');
  eyeIcoElement.setAttribute('src', formState.isPWVisible ? './open_eye.svg' : './closed_eye.svg');
  eyeIcoElement.setAttribute('data-state', formState.isPWVisible ? 'hidden' : 'visible');
  
  formState.isPWVisible = !formState.isPWVisible;
}

function handleRememberMe(event) {
  formState.rememberMe = event.target.checked;
}

function handleFormError(errorMsg) {
  handleError(true, errorMsg)
  formState.username = ''
  document.getElementById('username').value = ''
  formState.password = ''
  document.getElementById('password').value = ''
}

function handleLoginFormSubmitted(event) {
  event.preventDefault();
  if (!Object.keys(USER_DATA).includes(formState.username)) {
    handleFormError('Username not found')
    return
  }
  if (USER_DATA[formState.username].password !== formState.password) {
    handleFormError('Incorrect password')
    return
  }
  if (formState.rememberMe) {
    //Something something to remember the user with database or localStorage, haven't learnt yet.
    console.log('Remembering the user...')
  }
  logIn(USER_DATA[formState.username])
  
  formState.clear()
}

function logIn(userData) {
  //Something something to log in the user
  const body = document.body;
  body.innerHTML = `
    <style>
      .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        background-color: #f7f7f7;
        border-radius: 0.5rem;
      }
      .main h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      .main p {
        margin-bottom: 0.5rem;
      }
    </style>
    <main class="main">
      <h1>Logged in as ${userData.firstName} ${userData.lastName}</h1>
      <p>Your email is ${userData.email}</p>
      <p>Your phone number is ${userData.phone}</p>
      <p>Your IP is ${userData.ip}</p>
      <p>Your last IP was ${userData.lastIP}</p>
      <p>Role: ${userData.role}</p>
      <p>Permissions: ${userData.permissions.join(', ')}</p>
      <p>Last login: ${userData.lastLogin}</p>
      <p>Last logout: ${userData.lastLogout}</p>
      <p>You are living in ${userData.city}, ${userData.state}, ${userData.country}</p>
    </main>
  `
}
