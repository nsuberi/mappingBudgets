
var conn = "postgres://peimqntngkgvkj:Il061m86mRi9CsunKN1V-EUf4u@ec2-54-243-199-79.compute-1.amazonaws.com:5432/dbhnujh4tn8nt8";
module.exports = process.env.DATABASE_URL || conn;

//'postgres://postgres:admin@localhost/todo';
