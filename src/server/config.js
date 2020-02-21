module.exports = app => {

// setting
app.set('port', process.env.PORT || 3000);

    return app;
}