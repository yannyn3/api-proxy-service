# API代理服务

解决CORS和API调用问题的简单代理服务。

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yannyn3/api-proxy-service)

## 使用方法

向 `/api/proxy` 端点发送POST请求，格式如下：

```json
{
  "targetUrl": "https://api.example.com/endpoint",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer your-api-key",
    "Content-Type": "application/json"
  },
  "body": {
    "key": "value"
  }
}
