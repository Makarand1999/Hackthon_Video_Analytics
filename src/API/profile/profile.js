const profile = {
    dev:"http://172.20.1.80:5001",
    //dev:"http://192.168.1.7:5000",
    prod:"https://sanket101.pythonanywhere.com",
    Test:"https://staging.api.example.com",
    getBaseUrl: function() {
        return process.env.NODE_ENV === 'production' ? this.prod : 
               process.env.NODE_ENV === 'Test' ? this.Test : 
               this.dev;
    }
};
export default profile;