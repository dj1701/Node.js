const env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if(env === 'development'){
    process.env.PORT = 4001;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 4001;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

console.log(`Mongo URL: ${process.env.MONGODB_URI}`);