function indodax(action, type, pair, amount, price, market) {
  const url = "https://indodax.com/tapi";
  const timestamp = new Date().getTime().toString();
  const apiKey = getDataSheet("User")[0].apiKey;
  const secretKey = getDataSheet("User")[0].secretKey;

  // Construct request data
  let requestBody = {
    method: "",
    timestamp: timestamp,
    recvWindow: "1578303937000"
  };

  if (action === "getBalance") {
    requestBody.method = "getInfo";
    const { success, return: { balance: rawBalances } = {} } = request() || {};
    
    if (success === 1) {
      const balances = Object.entries(rawBalances)
        .filter(([_, value]) => value !== 0 && value !== '0')
        .map(([key, value]) => ({ symbol: key, amount: value }));
      return balances;
    }
  } else if (action === "order") {
    requestBody.method = "trade";
    requestBody["pair"] = pair;
    requestBody["type"] = type === "buy" ? "buy" : "sell";
    if (price !== "") {
     requestBody["price"] = price;
    }
    requestBody["order_type"] = market === true ? "market" : "limit";
    requestBody[market === true ? "idr" : pair.replace("_idr", "")] = amount;
    const data = request();
    return data;
  } else if (action === "cancel") {
    requestBody.method = "cancelOrder";
    let sheetData = getDataSheet("pending")
      sheetData.forEach((item, index) => {
        if (type === item.id) {
          requestBody["pair"] = `${item.symbol}_idr`;
          requestBody["order_id"] = item.id;
          requestBody["type"] = item.type === "buy" ? "buy" : "sell";
          deleteRow("pending", index + 1)
        }
      })

    const data = request();
    return data;
  } else if (action === "orderHistory") {
    requestBody.method = "orderHistory";
    if (pair) {
      requestBody["order_id"] = pair;
    }
    requestBody["pair"] = `${type}`;
    const data = request();
    return data
  } else if (action === "tradeHistory") {
    requestBody.method = "tradeHistory";
    requestBody["pair"] = type;
    requestBody["order_id"] = pair;
    const data = request();
    return data
  } else if (action === "openOrders") {
    requestBody.method = "openOrders";
    requestBody["pair"] = type;
    const data = request();
    return data
  } else if (action === "getOrder") {
    requestBody.method = "getOrder";
    requestBody["pair"] = type;
    requestBody["order_id"] = pair
    const data = request();
    return data
  }

  function request() {
    // Mengonversi requestBody menjadi query string manual
    const payloadString = toQueryString(requestBody);
    const signature = hmac_sha512(payloadString);
    const headers = { Key: apiKey, Sign: signature };
    const options = {
      method: "post",
      headers: headers,
      payload: payloadString
    };

    const response = UrlFetchApp.fetch(url, options);
    const responseData = JSON.parse(response.getContentText());
    return responseData;
  }

  function hmac_sha512(payloadString) {
    var hmacBytes = Utilities.computeHmacSignature(
      Utilities.MacAlgorithm.HMAC_SHA_512,
      payloadString,
      secretKey
    );
    var hmacString = "";
    for (var i = 0; i < hmacBytes.length; i++) {
      hmacString += ("0" + (hmacBytes[i] & 0xff).toString(16)).slice(-2);
    }
    return hmacString;
  }

  // Fungsi untuk mengonversi objek menjadi query string
  function toQueryString(obj) {
    return Object.keys(obj)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
      )
      .join("&");
  }
}
