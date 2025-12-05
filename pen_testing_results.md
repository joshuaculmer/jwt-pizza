# Penetration Testing Report

## Tristen Bitter, Josh Culmer

## Self Attack

#### Tristen vs Tristen:

- Friday, December 5, 2025
- https://pizza.bamboogarden.click/
- Severity Level 4 (I would say that this is a breach that can become critical if not properly addressed. )
- OWASP level 7 attack (an Authentication failure/ weakness)

- For my self-attack, I was able to hack in through the admin level using the Burp site to try many different passwords all at once using a brute force technique. I realized that my website was very vulnerable to hackers because of a weak password. In the future, I will make my passwords stronger to prevent this form of attack.
- I changed the password in my database.js file and attempted to reset the database, but was unsuccessful before penetration began.
- Below is an image of me gaining access to the admin using Burp, I got a response code 200.
  <img width="2774" height="1744" alt="image" src="https://github.com/user-attachments/assets/48cee023-6124-4e9e-85f4-4f2a8beea3a6" />

#### Josh vs Josh:

- Date: December 5th 2025
- Target Website: https://pizza.dancingdatabase.com/
- OWASOP 7: Identification and Authentication Failures
- Severity Scale: 4 - Critical
- Result: Admin Access gained,
- Corrections: I changed the admin password on the site, then I changed the initialize database function to use a different default admin with a much more secure password.

## Peer Attack

#### Tristen vs Josh:

- Friday, December 5, 2025
- https://pizza.dancingdatabase.com/
- Severity Level 4 Pizzas Purchased for free
- OWASP #4 - Insecure Design / OWASP #1 - Broken Access Control
- I tried using the Repeater tool on Burp, and I was able to turn intercept on, and before his website could send a proper response, I edited the price of all the pizzas I ordered to be 0.00 Bitcoin. And I was able to buy many pizzas for free. This exploit did not steal user data, but it did rob the owner of pizzas, exploiting him in that way. This could be a critical problem in any business that needs to be addressed immediately; otherwise, they will lose money and go out of business quickly.
  <img width="1280" height="1410" alt="image" src="https://github.com/user-attachments/assets/dd3a3eb5-f077-4bd3-a636-9d870b74556d" />

<img width="2658" height="1914" alt="image" src="https://github.com/user-attachments/assets/db2f828f-81c3-481f-bff8-fc0ef6f6cd54" />

#### Tristen vs Josh

- Friday, December 5, 2025
- https://pizza.dancingdatabase.com/
- Severity Level 0 Unsuccessful
- OWASP #3 Injection
- I attempted SQL injection in the login endpoint (PUT /api/auth) using multiple payloads including ' OR '1'='1, admin' --, and a@jwt.com' --. All attempts returned standard "unknown user" error with no indication of SQL parsing or injection success. Application appears to use parameterized queries correctly, preventing SQL injection attacks.
  <img width="3144" height="1826" alt="image" src="https://github.com/user-attachments/assets/7d908d83-8410-41ff-80ac-f510d770c707" />

#### Josh vs Tristen

- Date: December 5th 2025
- Target Website: https://pizza.bamboogarden.click/
- OWASOP 7: Identification and Authentication Failures
- Severity Scale: 4 - Critical
- Result: Admin Access gained, franchise data destroyed and refabricated

##### Description:

I started by checking the admin password, which was admin. So naturally I fixed that, changed the email, and username of the admin to something more appropriate. I then proceeded to do as much as I could with admin priviledges

![alt text](/images_from_pen_testing/admin.png)

Next I removed the other stores from the other franchisees

Before:
![before franchises](/images_from_pen_testing/before_franchises.png)

After:
![after franchises](/images_from_pen_testing/after_franchises.png)

#### Josh vs Tristen

- Date: December 5th 2025
- Target Website: https://pizza.bamboogarden.click/
- OWASOP 4: Insecure design
- Severity Scale: 4 - Critical
- Result: Pizzas purchased for free!

##### Description

I setup a shop under my own account and ordered as many pizzas as I could for free, with my new shop. I automated the purchasing process with curl and let it run for the remainder of the attack.
![alt text](/images_from_pen_testing/new_shop.png)
![alt text](/images_from_pen_testing/pizza_order_script_start.png)
![alt text](/images_from_pen_testing/hundreds_of_free_pizzas_ordered.png)

#### Josh vs Tristen

- Date: December 5th 2025
- Target Website: https://pizza.bamboogarden.click/
- OWASOP 7: Identification and Authentication Failures
- Severity Scale: 3 - High
- Result: Some API's keys gained, but unable to get further access to resources

##### Description

I checked the github for the project and found a config.js within the src folder for jwt pizza service. Its contents were the following:

```
export const jwtSecret =
  process.env.JWT_SECRET || "yourRandomJWTGenerationSecretForAuth";

export const sqlDb = {
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "NewPassword123!",
    database: process.env.DB_NAME || "jwtpizza",
    connectTimeout: 60000,
  },
  listPerPage: 10,
};

export const factory = {
  url: process.env.FACTORY_URL || "https://pizza-factory.cs329.click",
  apiKey: process.env.FACTORY_API_KEY || "4a253a1c77e14bd3b0e8dcfcc594d434",
};

export const metrics = {
  source: process.env.METRICS_SOURCE || "jwt-pizza-service-dev",
  url:
    process.env.METRICS_URL ||
    "https://otlp-gateway-prod-us-east-2.grafana.net/otlp/v1/metrics",
  apiKey:
    process.env.METRICS_API_KEY ||
    "1429590:glc_eyJvIjoiMTU4MjExNyIsIm4iOiJzdGFjay0xNDI5NTkwLWludGVncmF0aW9uLWp3dC1waXp6YS1tZXRyaWNzIiwiayI6Ik0zMHBySTJZOEE2V3VqUDFRQkswMFA3OSIsIm0iOnsiciI6InByb2QtdXMtZWFzdC0wIn19",
};

export const logging = {
  source: "jwt-pizza-service",
  userId: 1387384,
  url: "https://logs-prod-036.grafana.net/loki/api/v1/push",
  apiKey: "glc_eyJvIjoiMTU4MjExNyIsIm4iOiJzdGFjay0xNDI5NTkwLWludGVncmF0aW9uLWp3dC1waXp6YS1sb2dzLTIiLCJrIjoiaWlxbEZzNTA4OWRENjlnOVhobzR3SzAzIiwibSI6eyJyIjoicHJvZC11cy1lYXN0LTAifX0=",
};
```

## Combined Learning Summary

#### Password Security

Changing Admin passwords is important. We both had issues with our admin password being admin and changing the admin password dramatically slowed down Tristen's progress on attacking Josh's site.

#### Validating User input

Both of us were able to purchase pizzas for free by changing the req body from the client and then sending that modified request to the server. After some setup, it took seconds to purchase hundreds of pizzas for free.

It is not enough to validate user input on the client side, the server must also be able to process user input and not execute modified information. If either of our servers had a fixed price, or method to dynamically compute the pizza price, then it could have prevented pizzas purchased for free.

#### Api Endpoints

It is important to thnk about how we protect our API endpoints. It was much easier to exploit and explore the site without url validation. Josh was able to navigate to the franchise dashboard as an admin and run commands with both admin and franchisee privilidges.

#### Environment Variables

Storing critical information such as API keys, passwords, url, and secrets in a public repo is also a critical security failure. Even though Josh couldn't figure out if the api keys posted in the repo were valid or even use them during the time we had for the Penetration testing, Tristen had no idea they were there, and without any actual impact, the keys were leaked silently.

#### Importance of vigilance

Neither of us were quite as thorough with testing our own site, which would have secured both of our sites much more than the state that we found them in.
