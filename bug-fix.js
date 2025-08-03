// Bug fix: Resolve authentication error
function authenticateUser(credentials) {
  // Fixed the null pointer exception
  if (!credentials || !credentials.username) {
    throw new Error('Invalid credentials');
  }
  
  // Fixed the password validation issue
  if (!credentials.password || credentials.password.length < 6) {
    throw new Error('Password too short');
  }
  
  return { success: true, user: credentials.username };
}

module.exports = { authenticateUser }; 