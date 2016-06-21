# model-convert
Convert models from different schemas into a unified model you can actually use

[![npm version](https://badge.fury.io/js/model-convert.svg)](https://badge.fury.io/js/model-convert) [![dependencies](https://david-dm.org/arupex/model-convert.svg)](http://github.com/arupex/model-convert) ![Build Status](https://api.travis-ci.org/arupex/model-convert.svg?branch=master) <a href='https://pledgie.com/campaigns/31873'><img alt='Pledge To Arupex!' src='https://pledgie.com/campaigns/31873.png?skin_name=chrome' border='0' ></a>

#Install

    npm install model-convert --save

#Usage

    var ConverterFactory = require('model-convert');

    var rules = {
        v1 : {
            'userObject.userName' : 'name'
        },
        v2 : {
            'userObject.user_name' : 'name'
        }
    };

    var converter = new ConverterFactory(rules);


For:

    converter({ userObject : { userName : 'dan' } })

Result:

    { name : 'dan' });


For:

    converter({ user_object : { user_name : 'dan' } } )

Result:

    { name : 'dan' });


#Things to be aware of!

vNull is the version name if no proper version is found
As Per [model-detect](https://www.npmjs.com/package/model-detect)

deep-value can search arrays
[deep-value](https://www.npmjs.com/package/deep-value)

deep-setter can set arrays *syntax varies from deep-value
[deep-setter](https://www.npmjs.com/package/deep-setter)
