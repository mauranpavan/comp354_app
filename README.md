# Team Web Interface - Workout Statistic Visualizer (WSV)

## Setup

1. Install Node.js LTS.
2. Open a terminal.
3. Clone repository in a folder. 
4. Go into project folder, make sure you've checked out this branch (team11-main).
5. Run ```npm install```. You may need to run it in each folder (client and server).

## Run

1. Open a terminal.
2. For the backend, go to /server folder.
3. Run ```npm run dev``` for development (with nodemon), ```npm run start``` to run normally.
4. For the front end, go to /client folder in another terminal.
5. Run ```npm run start```. This should pull up your default browser on localhost:3000.
<hr >

## Integration Video


https://user-images.githubusercontent.com/60101999/196007581-c5efa6d5-f6bf-4030-9630-38a7401e3e1a.mp4



## Team 9 - Overall Statistics

Here is a diagram to showcase the approximate flow between teams at the current state.

<img
  src="web_interface\data\images\diagram1.PNG"
  title="Diagram Part 1"
  style="display: inline-block; margin: 0 auto; max-width: 300px">

<img
  src="web_interface\data\images\diagram2.PNG"
  title="Diagram Part 2"
  style="display: inline-block; margin: 0 auto; max-width: 300px">






The formula for Simple Moving Average is written as follows:

SMA = (A1 + A2 + ……….An) / n
Where:

A is the average in period n
n is the number of periods
