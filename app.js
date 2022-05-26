const http = require('http');
const url = require('url');
const express = require('express');
const app = express();

require('dotenv').config()


    let routes = {

        "GET" : {

            "/" : (req,res,params) => {
                
              res.writeHead(200, {'Content-Type' : 'text/html'})  
            
              res.end(`<h1>Get method ===> empty path and query params ${params.query.name} and ${params.query.age}</h1>`)
            
            },


            "/home" : (req,res,params) => {
                
                res.writeHead(200, {'Content-Type' : 'text/html'})  
            
               res.end('<h1>Get method ===> home path</h1>')
                
            
            }
            
        },


        "POST" : {

            "/" : (req,res,params) => {
                
                res.writeHead(200, {'Content-Type' : 'text/html'})  
            
                res.end('<h1>Post method ===> empty path</h1>')
            
            },


            "/contact" : (req,res,params) => {
                
                res.writeHead(200, {'Content-Type' : 'text/html'})  
            
                res.end('<h1>Post method ===> contact path</h1>')
            
            }

        },

        "NA" : (req,res,params) => {

            res.writeHead(404)
            res.end('<h1>Error 404</h1>')
        }
        

        


    }

    let startServer = (req,res) => {

        let reqMethod = req.method
        let params = url.parse(req.url , true)




       let resolveRoute =  routes[reqMethod][params.pathname];

        

        if(resolveRoute != undefined){

            resolveRoute(req,res,params)

        }else{

            routes["NA"](req,res,params)

        }
    }   

    const server = http.createServer(startServer)





server.listen(process.env.port, (event) => {

    console.log(`server is running at port ${process.env.port}`)
})
