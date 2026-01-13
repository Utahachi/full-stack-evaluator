✅ Implementations
- Added an additional Get data using id number
- Added a put your task text box and add task button for users to use
- Implemented Edit Delete Save on the webpage for users

❌ What’s missing
- Lacked in better design on the frontend (since I've focused too much on learning REACT, Vite and Axios)
- Additional functionality of the backend that I couldn't think of during the time limit
- Better clean code? (I'm not really sure)

Test changes
- For POST /tasks syntax and PUT /tasks syntax
- Required ID: 1 for PUT /tasks syntax and DELETE /tasks syntax
    {
    "title": "Buy milk",
    "isDone": false,
    "userId": 1
    }
- Rest of fronend are functional at launch of npm run dev and dotnet run when accessing the localhost port