# Elogs Test (Front-End)

This project is developed with React Js
and it is wholly dependant on the backend project. You will need to clone and follow the setup instruction from
[https://github.com/jerrywap/elog-backend.git](https://github.com/jerrywap/elog-backend.git)

### Setup Instruction for Elog Frontend

1. Configure backend api url at `src/Assets/Services/Api.js` and change `const API_ROOT = "http://127.0.0.1:8000";` to the backend base url.
2. `npm install` *This will install the necessary packages in the package.json file*
3. `npm start` The application will start on port 3000 and autocatically run on the browser.


## Project Description
The Miniature interface that allows facility managers assigned to propertiesto log in their jobs into a reporting system.
The Main Screen is a table view of jobs listings, already logged by the facility manager.
If there are multiple properties, in the system, the Facility manager can as well switch between properties on the screen.

Each Property listing has and Edit and a View Details button where the user can either edit a previous entry or view an expanded information about the property.

There is also a section to create new report from the screen.
