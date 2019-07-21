import Koa from 'koa'
import Router from 'koa-trie-router'
import IO from 'koa-socket-2'
import r from'rethinkdb'
// const fs = require('fs');


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

        console.log("GET /", ctx.response.status );
        
    }
    

//------------------


const router = new Router()
router
.get('/', getHome )



//------------------


const app = new Koa()


//------------------


const io = new IO({
    // namespace: "/MONITOR"
});

io.use( async ( ctx, next ) => {
    const start = new Date;
    await next();
    const ms = new Date - start;
    console.log( `WS ${ ms }ms` );
});       
  
io.use( async ( ctx, next ) => {
    ctx.teststring = 'test';
    await next();
});
  
  /**
   * Socket handlers
   */
io.on( 'connection', ctx => {
    console.log( 'Join event', io.connections.size );
    io.broadcast( 'connections', {
        numConnections: io.connections.size
    });
});

io.on( 'disconnect', ctx => {
    console.log( 'leave event', io.connections.size );
    io.broadcast( 'connections', {
        numConnections: io.connections.size-1
    });
});
  
// io.attach(app, true, {
//     key: fs.readFileSync(...),
//     cert: fs.readFileSync(...),
//     ca: fs.readFileSync(...)
// });
 
  
io.attach(app);
 
io.on('message', (ctx, data) => {
  console.log('client sent data to message endpoint', data);
});



// io.broadcast('sync', {
//     time: Math.random()
// })


//------------------

// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', 'null');
//     ctx.set('Access-Control-Allow-Credentials', 'true');
//     await next();
// });
   
//------------------

app.use(router.middleware())

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'null');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    await next();
});
  
let time = 0;

setInterval( () => {
    io.broadcast("sync",{ time })
    time++
    console.log(time);
    
}, 1000 )


app.listen( process.env.PORT || 4000 );


//------------------


console.log("RTSYNC");
console.warn("! NOT DEAD AND LISTENING ON PORT :4000");
console.warn("AWAITING CMDS...");
