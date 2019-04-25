var localStrategy=require('passport-local').Strategy;
var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var {User}=require('../models/User');
