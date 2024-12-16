module.exports = {
    apps: [{
        script: 'npm start',
        name: 'gaanaworld-frontend',
        env: {
            NODE_ENV: 'production',
            PORT: 3040,
        },
        env_file: '.env'
    }]
};
