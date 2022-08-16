# ProductBox: OTP Generator Task

## Setup
- Enter Database (Mysql) creditional in `/config/configs.json`
- Run ```npm install``` to install node dependencies.
- Run ```npm run setup``` to create database & tables
## API Reference

#### Create new User
```http
  POST /users
```
| Parameter | Type     | Required |
| :-------- | :------- | :------- |
| `name` | `string` | true |
| `phone_number` | `string` | true |

#### Generate OTP
```http
  POST /users/generateOTP
```
| Parameter | Type     | Required |
| :-------- | :------- | :------- |
| `phone_number` | `string` | true |

#### Verify OTP
```http
  GET /users/:userId/?otp={otp}
```
| Parameter | Type     | Required |
| :-------- | :------- | :------- |
| `phone_number` | `string` | true|


