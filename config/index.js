
var conn1 = "postgres://peimqntngkgvkj:Il061m86mRi9CsunKN1V-EUf4u@ec2-54-243-199-79.compute-1.amazonaws.com:5432/dbhnujh4tn8nt8";
var conn2 = "postgres://ctuyliivedqbvb:sEtK-OO0Fa39bOh9VSr4UQewtx@ec2-54-243-245-58.compute-1.amazonaws.com:5432/d4v6n1pb8i7dsd";

module.exports = process.env.DATABASE_URL || conn1;

//'postgres://postgres:admin@localhost/todo';
