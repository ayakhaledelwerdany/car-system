import { MongoClient ,ObjectId} from "mongodb";

const client = new MongoClient('mongodb+srv://ayaelwerdany44:ayakhaled42021322@cluster0.zh60jpo.mongodb.net/')
const connectDB = ()=>{
        client.connect().then(()=> {
            console.log('Connected successfully to server')
        }).catch(()=>{
            console.log('database error')
        })
    }
const db = client.db('carsys');

    export{
        db,
        connectDB
    }