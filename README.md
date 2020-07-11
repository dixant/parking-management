## Parking-Management
This is a car parking management application, where all the parking spaces are defined
with-in the system and been allocated to cars for certain period of time.

## functionalities:
1. Sign-in
    1. Types of user: Booking Counter Agent, Parking Zone Assistant 
2. Initialize: Initialize the data with a button click ( (only for Booking Counter Agent))
    1. Parking Zone Data: Add 3 parking zones by naming them as A, B, and C
    2. Parking Space Data: Add 30 parking space by naming them as A01...A10, B01...B10, and C01...C10.
    3. Allocation: Remove all transactional data
3. Dashboard
    1. Parking Space Listing (sort by parking_space_title ascending, with fliter by parking_zone_title)
    2. Shows Parking Space Title, Availability (Vacant: Green and Occupied: Gray), Vehicle Registration Number (if occupied)
    3. Visible to both Booking Counter Agent, Parking Zone Assistant
    4. Book Parking Space (only for Booking Counter Agent)
        1. Require Vehicle Registration Number
    5. Release Parking Space (only for Booking Counter Agent)
        1. Require Vehicle Registration Number
4. Reports: Show on the browser
    1. Parking Zone Report
    
## Entities / Attributes
1. user
    1. user_id
    2. name
    3. email (use it as user name for sign-in)
    4. password
    5. type (Booking Counter Agent, Parking Zone Assistant)
2. parking_zone
    1. parking_zone_id
    2. parking_zone_title
    3. parking_space
    4. parking_space_id
    5. parking_space_title
    6. parking_zone_id
3. vehicle_parking
    1. vehicle_parking_id
    2. parking_zone_id
    3. parking_space_id
    4. booking_date_time
    5. release_date_time

## Dependencies included in Project
1. Node
2. Express
3. MongoDB
4. Nodemon
5. react
6. react-dom
7. react-router
8. react-router-dom

**If you are going to use your own DB then you need to replace below the line in src/server.js file** (replace <> data with your own dbuser, password and DB name):
`const dbUri = "mongodb+srv://<DBuser>:<password>@cluster0-bdc8i.mongodb.net/<dbname>?retryWrites=true&w=majority"`

## Available Scripts

In the project directory, you can run:

### `cd src/server`
### `nodemon server.js`

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
