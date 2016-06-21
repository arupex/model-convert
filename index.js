/**
 * Created by daniel.irwin on 6/20/16.
 */
function arupex_model_convert(versionAttributes){

    if(typeof arupex_model_detect === 'undefined' && typeof require !== 'undefined'){
        arupex_model_detect = require('model-detect');
    }

    if(typeof arupex_deep_value === 'undefined' && typeof require !== 'undefined'){
        arupex_deep_value = require('deep-value');
    }

    if(typeof arupex_deep_setter === 'undefined' && typeof require !== 'undefined'){
        arupex_deep_setter = require('deep-setter');
    }

    var modelDetections = {};

    Object.keys(versionAttributes).forEach(function(version){
        modelDetections[version] = { properties : Object.keys(versionAttributes[version]) };
    });

    var detector = arupex_model_detect(modelDetections);


    return function converter(model){
        var isVersion = detector(model);

        var newModel = {};

        if(isVersion === 'vNull') {
            Object.keys(versionAttributes).forEach(function(version){
                var versionAttribute = versionAttributes[version];
                Object.keys(versionAttribute).forEach(function(originKey){
                    if(!arupex_deep_value(newModel, versionAttribute[originKey]) && arupex_deep_value(model, originKey)) {
                        arupex_deep_setter(newModel,versionAttribute[originKey], arupex_deep_value(model, originKey));
                    }
                });
            });
        }
        else {
            var versionAttribute = versionAttributes[isVersion];
            Object.keys(versionAttribute).forEach(function (originKey) {
                arupex_deep_setter(newModel, versionAttribute[originKey], arupex_deep_value(model, originKey));
            });
        }
        return newModel;
    };
}

if(typeof module !== 'undefined'){
    module.exports = arupex_model_convert;
}