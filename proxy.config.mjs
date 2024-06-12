export default {
    '/api/*': {
        target:'http://dataservice.accuweather.com/',
        secure: false,
        changeOrigin: true,
        debug: true,
        logLevel: 'debug'
    }
}