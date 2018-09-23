var config = {
    development: {
        //url to be used in link generation
        url: 'http://my.site.com',
        //mongodb connection settings
        database: {
            host:               'us-cdbr-iron-east-04.cleardb.net',
            user:               'b7e70715e009f3',
            password:           'e4c29fa4',
            database:           'heroku_38034b0ac6d41c9',
            connectionLimit:    10
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '5000'
        }
    },
    production: {
        //url to be used in link generation
        url: 'http://my.site.com',
        //mongodb connection settings
        database: {
            host:               'us-cdbr-iron-east-04.cleardb.net',
            user:               'b7e70715e009f3',
            password:           'e4c29fa4',
            database:           'heroku_38034b0ac6d41c9',
            connectionLimit:    10
        },
        //server details
        server: {
            host:   '127.0.0.1',
            port:   '4000'
        }
    }
    };
    module.exports = config;
    