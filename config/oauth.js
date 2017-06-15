module.exports = {
  instagram: {
    loginUrl: 'https://api.instagram.com/oauth/authorize/',
    accessTokenUrl: 'https://api.instagram.com/oauth/access_token',
    redirectUri: 'http://localhost:8000/oauth/instagram',
    clientId: process.env.INSTAGRAM_ID,
    clientSecret: process.env.INSTAGRAM_SECRET,
    responseCode: 'code',
    getLoginUrl() {
      return `${this.loginUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=${this.responseCode}`;
    }
  }
};
