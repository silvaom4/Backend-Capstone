# Welcome to the iSummarize Backend Repository 


## This repository will how you all the commands to run the backend portion of the application


iSummarize is an application that allows users to summarize documents or portions of texts into easy to read detailed notes

Features of the application include:
 
 * Document Summary: Summarize your content by drag and drop or copy and pasting.
 * Chatbot Assistant: Any questions? Ask our AI chatbot.
 * Discussion Forum: See what others are saying, leave a comment, create a post.
 * Login: Create your own account and make the appliation personal.

## iSummarize API Documentation
- https://docs.google.com/document/d/118tNi2m47TV0-pOvJW8IhsiWY7RWMdl2QxsvDF1S2zI/edit#heading=h.qau6ebrkjjgy
- This outlines our endpoints and functionality of the API used.

 ## Installing the Project 
    
- You must have the latest version of Node.
- Clone the repository 
- cd into the repository and run 'npm i

```bash
npm i
```
- '.env' - this application runs with an API Key from open ai
    - https://platform.openai.com/docs/overview
    - Here you can create a key - once you have this key in the folder, apply the following format to the .env file
    - API_KEY=your_key_here
## Running the test 
-In your terminal
- Run the test before you start the server 
    ```bash
    npm run test:watch
    ```
- Then hit 'a' to run all tests
- The tests will not work if the API Key is missing 

## USAGE 

- Once you have installed everything - start the application with the command
    - 'npm start' - the port is located on port 4000
    ```bash
    npm start
    ```

Now you are all set - Enjoy!

