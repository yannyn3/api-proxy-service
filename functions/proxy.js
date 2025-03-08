// Netlify函数 - API代理
exports.handler = async function(event, context) {
  // 仅接受POST请求
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "只接受POST请求" })
    };
  }

  // CORS头设置
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  try {
    // 解析请求体
    const requestBody = JSON.parse(event.body);
    const { targetUrl, headers: customHeaders = {}, method = "POST", body } = requestBody;

    if (!targetUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "缺少目标URL" })
      };
    }

    // 准备请求选项
    const fetchOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...customHeaders
      }
    };

    // 添加请求体（如果有）
    if (body && method !== "GET") {
      fetchOptions.body = typeof body === "string" ? body : JSON.stringify(body);
    }

    // 发送请求到目标API
    const response = await fetch(targetUrl, fetchOptions);
    
    // 读取响应数据
    const responseData = await response.json();

    // 返回处理后的响应
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        data: responseData
      })
    };
  } catch (error) {
    console.log("代理请求错误:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "代理请求失败",
        message: error.message
      })
    };
  }
};
