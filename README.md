
# API Reference
## POST
#### Register
```http
  POST https://nutech-abiyyi.vercel.app/register
```
| Parameter | Type     |
| :-------- | :------- | 
| `email`   | `string` | 
| `first_name`   | `string` | 
| `last_name`   | `string` | 
| `password`   | `string` | 

#### Login

```http
  POST https://nutech-abiyyi.vercel.app/login
```
| Parameter | Type     |
| :-------- | :------- | 
| `email`   | `string` | 
| `password`   | `string` | 

#### TopUp
##### BearerToken
```http
  POST https://nutech-abiyyi.vercel.app/topup
```
| Parameter | Type     |
| :-------- | :------- | 
| `top_up_amount`   | `int` |

#### Transaction
##### BearerToken
```http
  POST https://nutech-abiyyi.vercel.app/transaction
```
| Parameter | service (string)    |
| :-------- | :------- | 
| `service_code`   | `PULSA`, `VOUCHER_GAME`, `LISTRIK` |

## GET
#### Profile
```http
  GET https://nutech-abiyyi.vercel.app/profile
```
##### BearerToken

#### Balance
```http
  GET https://nutech-abiyyi.vercel.app/balance
```
##### BearerToken
#
