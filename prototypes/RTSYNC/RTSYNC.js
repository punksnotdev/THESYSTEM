import Koa from 'koa'
import Router from 'koa-trie-router'
import r from'rethinkdb'


const db = async() => {
    const connection = await r.connect({
      host: 'localhost',
      port: '28015',
      db: 'mydb'
    })
    return connection;
}


const getHome = async(ctx, next) => {
    await next()
  
    // // Get the db connection.
    // const connection = await db()
  
    // // Check if a table exists.
    // var exists = await r.tableList().contains('users').run(connection)
    // if (exists === false) {
    //   ctx.throw(500, 'users table does not exist')
    // }
  
    // // Retrieve documents.
    // var cursor = await r.table('users')
    //   .run(connection)
  
    // var users = await cursor.toArray()
  
    ctx.type = 'json'
    ctx.body = {
        "title": "Home"
    }
}

  


const router = new Router()
router
  .get('/', getHome )
  

const app = new Koa()

app.use(router.middleware())


app.listen(6666);