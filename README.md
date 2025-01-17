# Form Builder Application
Form Builder Application is a full-stack project for creating custom forms, managing fields, and collecting submissions. It supports multiple field types, file uploads, and secure data handling with MySQL and MongoDB Atlas.

## Installation
Follow the steps below to set up the project:

### Backend
``` bash
cd backend
npm install
```
Set up the environment variables by creating a .env file in the backend directory:

``` env
PORT=5000
JWT_SECRET=your_jwt_secret
MYSQL_DB=formdb
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_HOST=localhost
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
```

Start the backend server:
``` bash
npm start
```

### Frontend
``` bash
cd frontend
npm install
npm start
```

## Usage

### Create Forms
Log in or sign up to create a form.
Add custom fields (String, Number, Text, or File/Image Upload) to the form.
Create forms using the fields.

### Public Form Submission
Access the form's public URL to fill out and submit.
File uploads are stored in MongoDB, while other data is saved in MySQL.



