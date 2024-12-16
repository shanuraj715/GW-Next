module.exports = {
    apps: [{
        "script": "node_modules/next/dist/bin/next",
        "args": "start",
        "cwd": "./",
        "instances": "max",
        "exec_mode": "cluster",
        name: 'gaanaworld-frontend',
        env: {
            NODE_ENV: 'production',
            PORT: 3015,
        },
        env_file: '.env'
    }]
};
