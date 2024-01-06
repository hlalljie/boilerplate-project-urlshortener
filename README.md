# URL Shortener Microservice
Provides a code for a shortenend version of any URL provided.

## Usage
Add to your application to allow users to create a shorter version of any valid url and store the current urls in your database.
### Usage Steps
1. Users enter a url on the home page and click "POST URL"
2. Users are redirected to a page where they recieve the short_url. They will need to save the value inside the quotes after short_url.
3. To access the webpage they orginally entered they can enter `<your website url>/api/shorturl/<the short_url saved from before>` which will redirect them to the saved webpage.


## Installation

1. To setup and run the program you will first need to clone this repository.

2. Once cloned you will need to run `npm install` to install all the necessary modules. You may need admin access for this step.

3. After installing you will need to connect an Atlas Database. You can follow the instructions here to setup an account and/or a cluster for use in this program:
[freeCodeCamp Getting Started with Mongo DB Atlas Guide](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)

4. Inside the project directory, create a .env file with containing one line `MONGO_URI=<your connection string with your user password entered from Atlas>` Make sure to replace everything inside the traingle brackets and teh traingle brackets with your Cluster's connection string from Atlas

5. From your project directory run `npm start` and the project will run on port 3000. If you would like it to run on another port you can also create another line in your .env file containing `PORT=<new port to run on>`
