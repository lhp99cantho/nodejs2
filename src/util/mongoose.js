module.exports = {
    coverstoObject: function (params) {
        return params.map((param) => param.toObject());
    },
    covertoObject: function (params) {
        return params ? params.toObject() : params;
    },
};
