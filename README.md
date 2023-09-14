# WorkIndia
## API Endpoints
- /api/users/signup : Register a user
- /api/user/login : Login user
- /api/trains/create : Create Trains (Private/admin)
- /api/trains/availability : Check availability
- /api/trains/:train_number/book : Book a train
- /api/bookings/:booking_id : Get the bookings

## Run on your maching
- `git clone https://github.com/SagarM21/WorkIndia.git`
- cd backend
- npm start
- Add env file with the following details
    - mongoURI = YOUR DATABASE CONNECTION STRING
    - PORT = PORT_NUMBER
    - JWT_SECRET = YOUR_JWT_SECRET
- Hit the apis in postman/thunderclient

## Temporary Creds
- USER:
  - email: sagar@mg.com
  - password: 123456
- ADMIN:
   - email: sagar@workindia.com
  - password: 123456

- All routes are protected, kindly login before htting the api as you will need token for verifying.
- For admin routes, kindly login with admin credentials.

THANK YOU🙂
