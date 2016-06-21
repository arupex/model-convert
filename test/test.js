/**
 * Created by daniel.irwin on 6/20/16.
 */

describe('model-convert', function(){

    var ConverterFactory = require('../index');

    var assert = require('assert-diff').deepEqual;
    

    it('readme example', function(){


        var rules = {
            v1 : {
                'userObject.userName' : 'name'
            },
            v2 : {
                'user_object.user_name' : 'name'
            }
        };

        var converter = new ConverterFactory(rules);

        assert(converter({ userObject : { userName : 'dan' } }), { name : 'dan' });

        assert(converter({ user_object : { user_name : 'dan' } }), { name : 'dan' });

    });

});