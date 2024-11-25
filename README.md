# Generic Recipe-Platform-II

# Instructions:

- Enter username on homepage to be able to access the posts page.
- Like a message by pressing like button. (TODO limit likes to 1 for each message by each user)
- Delete message by pressing delete button.
- Username must have at least 3 characters and a max of 20.
- Content of the review must have a max character length of 3000.
- Title of post must have a max character length of 50.
- Comments must have a max character length of 255.

# Reflection:

Requirements achieved:

- Display all posts on the page, with an option to sort them in ascending or descending order.
- Create a SQL schema for a posts table and a comments table, with the comments being connected to the posts table with a foreign key.
- Create a delete button on posts that allows users to delete the post from the database.
- Create a form which saves comments to a dedicated comments table, with the comments being connected to the posts table with a foreign key.
- Allow users to comment on individual posts in their dynamic routes.
- Add a redirect when a user creates a post to redirect them to the posts page.

Stretch goals implemented:

- form validation (client-side).
- Author verification before post deletion.
- Add like, edit and delete functionality on comments.
- Add the ability for authors to edit their posts. (TODO pre-fill the form with the current content)
