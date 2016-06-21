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




    it('graceful handle mismatch object', function(){


        var rules = {
            v1 : {
                'userObject.userName' : 'name',
                'iDontExist' : 'not_required'
            },
            v2 : {
                'user_object.user_name' : 'name',
                'i_dont_exist' : 'not_required'
            }
        };

        var converter = new ConverterFactory(rules);

        assert(converter({ userObject : { userName : 'dan' } }), { name : 'dan' });

        assert(converter({ user_object : { user_name : 'dan' } }), { name : 'dan' });

    });




    it('graceful handle mismatch object with merge', function(){


        var rules = {
            v1 : {
                'userObject.userName' : 'name',
                'iMNotRequired' : 'not_required'
            },
            v2 : {
                'user_object.user_name' : 'name',
                'i_m_not_required' : 'not_required'
            }
        };

        var converter = new ConverterFactory(rules);

        assert(converter({ userObject : { userName : 'dan'}, i_m_not_required : 'but here i am snake' }), { name : 'dan' , not_required : 'but here i am snake'});

        assert(converter({ user_object : { user_name : 'dan'},  iMNotRequired : 'but here i am camel'  }), { name : 'dan', not_required : 'but here i am camel' });

    });

});