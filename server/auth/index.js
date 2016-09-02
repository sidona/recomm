'use strict';

import express from 'express';
import config from '../config/environment';
import User from '../api/user/user.model';

// Passport Configuration
require('./local/passport').setup(User, config);
require('./ldap/passport').setup(User,config);

var router = express.Router();

router.use('/local', require('./local').default);
router.use('/ldap',require('./ldap').default);


export default router;
