# EpicBnB

__Live Site__ : https://airbnb-alex-castillo.herokuapp.com/

My site is EpicBnb. This site is intended to allow hosts to get their locations out into a viewable space, where users are then able to go and find them.
It is also a space to share those experiences as reviews so that users may get an idea of what they will be going into.

## Technologies
For this site I used react and redux to handle the frontend. The backend was carried by sequelize and sql. They were connected with the thunk middleware to 
communicate between the front and backend of the site.

## Features

The site currently is able to handle the spot and review features. With those features you are able to create, read, update, and delete reviews or spots.
Valid users can create spots as well as add reviews to spots they do not own and have not already left a review on.
Users can edit the information on their spots or reviews after they have created them.
Users can see spots and reviews for spots whether they are authorized or not.
Authorized owners can delete spots and reviews.

![epicbnb](https://user-images.githubusercontent.com/108693776/203000797-119ef938-fdc4-4c93-900a-30cd09ecf869.PNG)

## Future

The planned features in the future are bookings and search functionality.

### Booking

In order for any of these spots to matter users must be able to place bookings in order to stay at these spots that are being created.
Users are only going to be able to stay at locations during times that are not already booked. They will be able to change their booking and also cancel it.

### Spots Search

In order to make the site a litte more useful spot searching is very important. Users should be able to search for locations so that they can find a spot
that best suits their needs.

## Setting Up

In order to set up this repo to use it, you must run npm install to install the dependencies. After this the database will need to be filled out after you create a 
.env file. You will need to migrate and seed all the data to have a base case of data to work with. After that is added you just have to run the backend and frontend
servers.

## Contact me

email: agcast01@gmail.com
