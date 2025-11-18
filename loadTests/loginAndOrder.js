import { sleep, check, fail } from "k6";
import http from "k6/http";

export const options = {
  cloud: {
    distribution: {
      "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
    },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Imported_HAR: {
      executor: "ramping-vus",
      gracefulStop: "30s",
      stages: [
        { target: 20, duration: "1m" },
        { target: 20, duration: "3m30s" },
        { target: 0, duration: "1m" },
      ],
      gracefulRampDown: "30s",
      exec: "imported_HAR",
    },
  },
};

export function imported_HAR() {
  let response;
  const vars = {};

  // Login
  response = http.put(
    "https://pizza-service.dancingdatabase.com/api/auth",
    '{"email":"test@jwt.com","password":"test"}',
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
    }
  );
  if (
    !check(response, {
      "status equals 200": (response) => response.status.toString() === "200",
    })
  ) {
    console.log(response.body);
    fail("Login was *not* 200");
  }

  vars.authToken = response.json().token;

  response = http.options(
    "https://pizza-service.dancingdatabase.com/api/auth",
    null,
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "access-control-request-headers": "content-type",
        "access-control-request-method": "PUT",
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        authorization: `Bearer ${vars.authToken}`,
      },
    }
  );
  sleep(13.7);

  // Get Menu
  response = http.get(
    "https://pizza-service.dancingdatabase.com/api/order/menu",
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "if-none-match": 'W/"1fc-cgG/aqJmHhElGCplQPSmgl2Gwk0"',
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        authorization: `Bearer ${vars.authToken}`,
      },
    }
  );

  response = http.options(
    "https://pizza-service.dancingdatabase.com/api/order/menu",
    null,
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "access-control-request-headers": "authorization,content-type",
        "access-control-request-method": "GET",
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        authorization: `Bearer ${vars.authToken}`,
      },
    }
  );

  // Get Franchise
  response = http.get(
    "https://pizza-service.dancingdatabase.com/api/franchise?page=0&limit=20&name=*",
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "if-none-match": 'W/"5c-UrU6FPurLC0JcnOrzddwdfUXFBA"',
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        authorization: `Bearer ${vars.authToken}`,
      },
    }
  );

  response = http.options(
    "https://pizza-service.dancingdatabase.com/api/franchise?page=0&limit=20&name=*",
    null,
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "access-control-request-headers": "authorization,content-type",
        "access-control-request-method": "GET",
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        authorization: `Bearer ${vars.authToken}`,
      },
    }
  );
  sleep(7.3);

  // Get Me Account
  response = http.get("https://pizza-service.dancingdatabase.com/api/user/me", {
    headers: {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "if-none-match": 'W/"5a-Jc8w6ywXrypI09sKOi4wG329OIc"',
      origin: "https://pizza.dancingdatabase.com",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      authorization: `Bearer ${vars.authToken}`,
    },
  });

  response = http.options(
    "https://pizza-service.dancingdatabase.com/api/user/me",
    null,
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "access-control-request-headers": "authorization,content-type",
        "access-control-request-method": "GET",
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        authorization: `Bearer ${vars.authToken}`,
      },
    }
  );
  sleep(2.2);

  // Order a pizza
  response = http.post(
    "https://pizza-service.dancingdatabase.com/api/order",
    '{"items":[{"menuId":3,"description":"Margarita","price":0.0042},{"menuId":3,"description":"Margarita","price":0.0042}],"storeId":"1","franchiseId":1}',
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        authorization: `Bearer ${vars.authToken}`,
      },
    }
  );

  response = http.options(
    "https://pizza-service.dancingdatabase.com/api/order",
    null,
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "access-control-request-headers": "authorization,content-type",
        "access-control-request-method": "POST",
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        authorization: `Bearer ${vars.authToken}`,
      },
    }
  );
  sleep(3.1);

  if (
    !check(response, {
      "status equals 200": (response) => response.status.toString() === "200",
    })
  ) {
    console.log(response.body);
    fail("Pizza Order was *not* 200");
  }

  vars.pizzajwt = response.json().jwt;

  // Verify JWT
  response = http.post(
    "https://pizza-factory.cs329.click/api/order/verify",
    `{"jwt":"${vars.pizzajwt}"}`,
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "sec-fetch-storage-access": "active",
        authorization: `Bearer ${vars.authToken}`,
      },
    }
  );

  response = http.options(
    "https://pizza-factory.cs329.click/api/order/verify",
    null,
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "access-control-request-headers": "authorization,content-type",
        "access-control-request-method": "POST",
        origin: "https://pizza.dancingdatabase.com",
        priority: "u=1, i",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        authorization: `Bearer ${vars.authToken}`,
      },
    }
  );
}
