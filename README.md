# Wallet Engine Backend API

This contains all the API implementation

# About the project implementation

## Tech Stack

- Backend Framework: Express.js
- Database: Mongodb
- Test: Jest & Supertest

## Run Locally

Clone the project

```bash
 git clone <Repo URL>
```

Go to the project directory

```bash
  cd gohighlevel-wallet-be
```

Install dependencies

```bash
  npm install
```

Start the server:

this command will automatically start express server.

```bash
  npm run dev
```

API server

```bash
http://localhost:3000/api
```

Swagger UI to:

```bash
http://localhost:3000/doc
```

## API Reference

#### Setup Wallet

```http
  POST /api/wallet/setup
```

| Body Parameter     | Type     | Description   |
| :----------------- | :------- | :------------ |
| `name` | `string` | **Required**. |
| `balance` | `float` | **Required**. |

#### Returns Wallet & Initial Transaction Detail


```
{
    "id": "64fc0fd064af00a916ca179e",
    "balance": 30,
    "transactionId": "64fc0fd164af00a916ca17a1",
    "name": "Test",
    "date": "2023-09-09T06:25:20.984Z"
}
```

#### Credit/ Debit Amount - Transaction

```http
  POST /api/wallet/transact/:walletId
```

| Body Parameter     | Type     | Description   |
| :----------------- | :------- | :------------ |
| `amount` | `float` | **Required**. |
| `description` | `strig` | **Required**. |

#### Returns Updated Balance


```
{
    "balance": 40,
    "transactionId": "64fbeadad66c50dca6c566de"
}
```

#### Get All Transactions

```http
  POST /api/transactions?walletId=<walletId>&skip=0&page=1&sort=date
```

| Query Parameter     | Type     | Description   |
| :----------------- | :------- | :------------ |
| `WalletId` | `string` | **Required**. |
| `skip` | `number` | **Optional**. |
| `limit` | `number` | **Optional**. |
| `page` | `number` | **Optional**. |
| `sort` | `number` | **Optional**. |

#### Returns Transactions


```
{
    "transactions": [
        {
            "id": "64fb5ecb363aaaabddc85569",
            "walletId": "64fb2b3e04465ad6120f70b6",
            "amount": 10,
            "balance": 170,
            "description": "Test",
            "date": "2023-09-08T17:50:03.163Z",
            "type": "CREDIT"
        },
    ],
    "totalPages": null,
    "currentPage": "1"
}
```

#### Get Wallet Details

```http
  POST /api/wallet/:walletId
```

| Query Parameter     | Type     | Description   |
| :----------------- | :------- | :------------ |
| `walletId` | `string` | **Required**. |


#### Returns Wallet Details


```
{
    "id": "64faeb1c43469907f8186127",
    "balance": 30,
    "name": "Test",
    "date": "2023-09-08T09:36:28.849Z"
}
```

### Tests

Have created test cases using the follwing:

- Jest
- Supertest

To run tests

`npm run test`


**Current Test Case Result:**


[![](https://github.com/tejassrivastava/gohighlevel-wallet-be/blob/main/TestResult.png)](https://github.com/tejassrivastava/gohighlevel-wallet-be/blob/main/TestResult.png)

**Current Test Coverage Result:**

[![](https://github.com/tejassrivastava/gohighlevel-wallet-be/blob/main/TestCoverage.png)](https://github.com/tejassrivastava/gohighlevel-wallet-be/blob/main/TestCoverage.png)


------------


## Authors

- [@tejassrivastava](https://www.github.com/tejassrivastava)
