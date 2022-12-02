# Weather App

### Please find the working app at [https://palakkeni5.github.io/Weather-App/](https://palakkeni5.github.io/Weather-App/)

This was app created in React using [create-react-app](https://create-react-app.dev/).

The app uses the following libraries
  1.  [Axios](https://www.npmjs.com/package/axios) for consuming REST API 
  2.  Weather data used from Open Weather API : [Current Weather Data](https://openweathermap.org/current) and [3-hour Forecast 5 days](https://openweathermap.org/forecast5)
  3.  Location data used from 2 sources : Internal Javascript browser data and map data from [React Leaflet](https://react-leaflet.js.org/)
  4.  [Ant Design](https://ant.design/components/overview/) is used for the app theme 
  5.  [Recharts.js](https://recharts.org/en-US/examples) is used for Graphs in the app.
  6.  [gh-pages](https://github.com/gitname/react-gh-pages)  is used to deploy the app.


## Runnning this app locally
1.  Clone the app
2.  Create a .env file in the base of the folder
3.  Create an account at [Open Weather API](https://home.openweathermap.org/users/sign_in)
4.  edit .env file :  REACT_APP_WEATHER_API_KEY=YOUR_API_KEY
5.  run `npm  start` to run the project locally.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


