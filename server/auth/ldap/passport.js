var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');


function loginSuccess(User,userLdap, done) {
  User.findOne({
    email: userLdap.uid
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      var role=function () {
        if(userLdap.sAMAccountName=== 'sdonose' || 'gcretu'){
          return role='admin'
        }
        else{
          return role='user'
        }
      };
      user = new User({
        name: userLdap.displayName,
        email: userLdap.mail,
        provider: 'ldap',
        role:role()
      });
      user.save(function(err) {
        return done(err, user); // Error happens here
      });
    } else {
      return done(err, user); // Error happens here
    }
  });
}



export function setup(User, config) {
console.log("ceva",User);
  var server = {
    url: 'ldap://pentalog.com:389',
    bindDn: 'CN=,OU=DEV,OU=Users,OU=BRA,OU=PENTALOG,DC=pentalog,DC=com',
    bindCredentials: '',
    searchBase: 'dc=pentalog,dc=com',
    searchFilter: '(sAMAccountName={{username}})'
  };
  passport.use(
    new LdapStrategy({ server: server },
      function (userLdap, done) {
        loginSuccess(User,userLdap, done)
      }

  ))

}
