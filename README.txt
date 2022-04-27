//TO RUN
Set up DB through command line as demo'd during teams chat. copy and paste the SQL commands in create_database.sql straight to 
command line - the code will break if the table names are changed

Open powershell in VS code and run: -
cd api
npm start
^this connects the application to the database

Open ANOTHER powershell in VS code (+ icon in top right of powershell window) and run: -
cd client
npm start
^this connects the front end to localhost and should automatically start the website in your default browser

NOTES:
To get the application to connect to your version of postgresql youll need to go into the db.js file (in api folder) and change 
the password to your superuser password you made when you installed postresql