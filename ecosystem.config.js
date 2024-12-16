module.exports = {
    apps: [{
        script: 'npm start',
        name: 'gaanaworld-frontend',
        env: {
            NODE_ENV: 'production',
            PORT: 3015,
        },
        env_file: '.env'
    }]
};
