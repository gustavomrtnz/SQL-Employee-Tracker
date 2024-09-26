# SQL-Employee-Tracker

## USER STORY
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## USER INSTRUCTIONS


 - 1.Clone the repository:
    ```bash
    git clone git@github.com:gustavomrtnz/SQL-Employee-Tracker.git
    ```
 - 2.Install all dependencies by opening terminal and  running npm i which will include inquirer@8.2.4 as well as pg by running npm i pg and your credentials in .env byt runnign npm i dotenv
   ```bash
   npm i
   ```
   ```bash
   npm i pg
   ```
   ```bash
   npm i dotenv
   ```
 - 3.Open integrated terminal and start your database with PostgreSQL (download if needed)
 - 4. After downloading PostgreSQL create your database and install seeds values and the head over to the db folder on your terminal
   5. run
      ```bash
      psql -U postgres
      ```
      then enter your password credentials and then start your database with
      ```bash
      \i schema.sql
      ```
      insert your seeds
      ```bash
      \i seeds.sql
      ```
 - 4.After starting database and verifying credentials run [ node index ] in integrated terminal
   ```bash
   node index.js
   ```

 ## Challenges
 When building this application some challenges I faced were not properly connecting the seeds table in the schema.sql by not properly implementing the foreign keys. Another challenge I face was not running node index.js properly but then solved by calling the startinQuestion() function to start my prompt. And the last challenge was not keeping my db.query conssistent and was not getting the information properly from the server.

 ## Solutions
For my first solution I was not calling the FOREIGN KEY in the tables in schema.sql to connect all the different tables together. 
For my second solution I needed to call my starting prompt to export the questions for the user at the bottom of my cose.
And for the thirs solution I had pool.query and db.query and not keeping my code conssistent which was causing my prompt to not be able to connect to the database.

