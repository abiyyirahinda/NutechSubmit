
# API Reference
## POST
#### Register
```http
https://nutech-abiyyi.vercel.app/register
```
| Parameter | Type     |
| :-------- | :------- | 
| `email`   | `string` | 
| `first_name`   | `string` | 
| `last_name`   | `string` | 
| `password`   | `string` | 

#### Login

```http
https://nutech-abiyyi.vercel.app/login
```
| Parameter | Type     |
| :-------- | :------- | 
| `email`   | `string` | 
| `password`   | `string` | 

#### TopUp
##### BearerToken
```http
https://nutech-abiyyi.vercel.app/topup
```
| Parameter | Type     |
| :-------- | :------- | 
| `top_up_amount`   | `int` |

#### Transaction
##### BearerToken
```http
https://nutech-abiyyi.vercel.app/transaction
```
| Parameter | service (string)    |
| :-------- | :------- | 
| `service_code`   | `PULSA`, `VOUCHER_GAME`, `LISTRIK` |

## GET
#### Profile
```http
https://nutech-abiyyi.vercel.app/profile
```
##### BearerToken

#### Balance
```http
https://nutech-abiyyi.vercel.app/balance
```
##### BearerToken
#
