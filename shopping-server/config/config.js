module.exports = {
    server: {
        host: '0.0.0.0',
        port: 8000
    },
    database: {
        host: '127.0.0.1',
        port: 27017,
        db: 'shopping-portal',
        username: '',
        password: ''
    },
    key: {
        privateKey: '37LvDNugXvjYOh9Y',
        tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
    }
};
