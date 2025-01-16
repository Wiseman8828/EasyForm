const dbCredentials  = () => {
    return {
        "connectionLimit": 10,
        "host":  process.env.DB_HOST || "127.0.0.1",
        "user": process.env.DB_USER || "root",
        "password": process.env.DB_PASSWORD || "Root@2075137",
        "port": process.env.DB_PORT || "3306",
        "database": process.env.DB_NAME ||"formCraft",
        "debug": false
    } 
}

const jwtSecret  = () => {
    return {
        "JWT_SECRET":  process.env.JWT_SECRET || 'Happy Life!'
    } 
}


const mongoDbCredentials  = () => {
    return {
        "hostURL":  process.env.host_URL || "mongodb+srv://ashwinidev260:fTaEMhrM08k9Oia3@cluster0.ahs4k.mongodb.net/formCraft?retryWrites=true&w=majority&appName=Cluster0",
        "database": process.env.DB_NAME || "formCraft",
    } 
}


module.exports = {
    dbCredentials,
    jwtSecret,
    mongoDbCredentials
}
