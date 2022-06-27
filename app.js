const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

// 允许跨域访问该服务
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

const targetUrl = 'http://localhost:8080'

// 设置拦截规则
app.use('/adming/*', createProxyMiddleware({ target: targetUrl, changeOrigin: true }))

app.use('/login', createProxyMiddleware({ target: targetUrl, changeOrigin: true }))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000, () => {
  console.log('localhost:3000')
})
