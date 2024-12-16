module.exports = {
    apps: [{
        script: 'npm start',
        name: 'gaanaworld-frontend',
        env: {
            NODE_ENV: 'production',
            PORT: 3020,
        },
        env_file: '.env'
    }]
};
