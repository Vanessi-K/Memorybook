# Memorybook

## Project objective

Memorybook, is a way to manage your photos in an online photobook. A Memorybook can be created and edited. A Memorybook can consist of different groups.
To each Memorybook and group, images can be uploaded and a descriptioin may be written.

## Starting the project

Two things need to be started the vue-Frontend and the express-Backend.

### VUE3-Frontend
```
cd client/memorybook-frontend
npm run dev
```

For the productive system it should be started with:
```
npm run build
```

### express-Backend
```
cd server
node app.js
```

## Project State

In the final prototype, a user can register themself and log in. Registering is only possible if the email address has not been previously used. This is to prohibit multiple users for a single email. The user will receive error messages, during login, if the email address has not yet been used to create an account or if the password is incorrect.

After a user is logged in, they are on their personal-main page, where they can see a preview of all their memory-/photobooks. They also can click a button to create a new memorybook. When creating a memorybook a user can enter:
- title
- description
- start date
- end date
- is a favourite
- select a cover image
- upload images

None of these parameters is required, to opt for easy customizability by the user.

In a memorybook, a user can create multiple groups (and delete them if they don't need them). for a group following can be set:

- title
- description
- images

When wanting to upload images the user is redirected to their page, where the images are uploaded. As soon as they are uploaded a axios-call fetches all images to display them (<- AJAX implementation).

Everything a user can do when creating a book, he also can do when editing a book. The editing can be reached, by clicking on a memorybook on the main page. And when viewing the entry clicking on the edit button. In addition to saving a memorybook, it is also possible to delete it.

During viewing a memorybook all data that has been entered by the user will be displayed. The page has been made responsive (flexboxes), so that it also can be used on a mobile.

### What does not work
Since this is a first draft not every element is working. Elements that are not working are:

- The "Select favourites"-button on the /me-page
- The "Share Memory"-button on the /me/create and /me/edit-page
 
