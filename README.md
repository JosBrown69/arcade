# **Johnny's Arcade**

_This is a video game-based app with challenges and user interaction, similar to a virtual arcade room where the focus isn't just on the game itself, but also on competing and challenging other players. The purpose is to entertain and provide users with incentives to keep playing, such as trophies and clan interactions, allowing them to share and compete with others._

The project consists of four main folders and some files necessary for the correct functioning of the project:

## **arcade_api**
This folder contains most of the Django project, including Django-related folders and files like migrations and the `__init__.py` file, as well as custom files I created, such as:

- **admin.py**: Registers every model to access them from the Django admin panel, allowing for easy access, creation, and modification of database elements.

- **models.py**: Contains several models, both individual and related to each other, for every database element required for the correct functioning of the app, such as user interactions and app-specific data.

- **serializers.py**: Since I’m using DRF (Django Rest Framework), this file contains serializers that validate and transform data from Django models into JSON format for sending, reading, receiving, and saving data to the main database.

- **urls.py**: Registers every URL associated with a Django view, generating the API endpoints for every function related to the database and allowing frontend access to the database data.

- **views.py**: Manages HTTP requests, defining how data is retrieved or processed, handling permissions, and linking models with each view to ensure appropriate data access and manipulation.

## **arcade_front**
This folder contains the front end part of the project, including all the interfaze, the user experience and interaction with the DRF API, such as:

### API

- **api.js**:  This file utilizes the Axios library to manage HTTP requests, facilitating communication with the DRF back-end. It also handles headers and authorization for secure data transmission.

### Components 

- **Buttons.jsx**: Reusable component for pair of buttons example "create/delete"

- **ClanesList.jsx**: Shows list of clanes with individual link to every clan using id

- **ClanJoin.jsx**: Validates if the logged-in user is a clan member, displaying the appropriate join/leave button and making the corresponding HTTP request to save or delete data from the database.

- **ClanMemberList.jsx**: Shows the clan member list and validates if the user clicks on their own name to redirect to the profile page.

- **ClanPostForm.jsx**: Validates if the logged-in user is a clan member, displaying the text area to write something to share with other users.

- **ClanPostList.jsx**: Validates if the logged-in user is a clan member, shows every post made by clan members, and validates if the user clicks on their own name to redirect to the profile page.

- **FollowButton.jsx**: On a user's page, it validates if the logged-in user is following and displays the follow/unfollow button, making the corresponding HTTP request each time.

- **FollowCount.jsx**: Shows the count of following and followers for the user page being displayed.

- **FollowingList.jsx**: Displays the list of users followed by the logged-in user on the Following page.

- **NavigationBar.jsx**: Displays the elements in the navigation bar, validating if the user is authenticated to show the appropriate routes in any case.

- **PasswordInput.jsx**: The input with the type "password" stylized and letting you show or hidde the password content.

- **ProtectedRoute.jsx**: This component protects routes from unauthorized users by redirecting them to the login page.

- **Trophie.jsx**: Displays a selected trophie and shows the style based on its properties like the metal.

- **TrophieMiniatura.jsx**: Displays the trophie in a different way to show in other parts of the interface.

- **TrophieList.jsx**: Displays the trophie list as miniatures.

- **UserClanes.jsx**: Displays the clanes the user is a member.

- **UserForm.jsx**: Validates whether it is a new user registration or a login page, checking the form data to indicate if the user already exists or if the username or password is incorrect during login.

- **UserTrophies**: Shows the list of trophies the user already won.

### Context

- **AuthContext.jsx**: Creates a React context to manage user data obtained from the JWT, handling authorization and token refresh.

- **ClanContext.jsx**: Retrieves Clan info to avoid prop drilling.

- **TrophieContext.jsx**: Retrieves Trophy info to avoid prop drilling.

### Games
The folder contains the code for all the games in the app, including their assets and the necessary code to make them work, as well as the corresponding React components to render them in the app.

### PoliceChase
Contains the first game available with or without login in.

- **Background.jsx**: Defines the Background class, including its constructor and methods for managing background functionality.

- **Collisions.jsx**: Function to validate if the Player class is colliding with an object.

- **Game.jsx**: Contains the main game class, including the overall game structure, the MainGame component, the game loop, and the canvas rendering.

- **Obstacles.jsx**: Defines obstacle class and behavior.

- **Player.jsx**: Defines Player class controls and behavior.

- **ScoreBoard.jsx**: Defines and draw the score board.

- **TouchInput.jsx**: Touch controls for mobile compatibility.

### Pages

- **Clan.jsx**: contains all the clan interaction, members, posts with scrolldown, post textarea, join and leave buttons.

- **ClanCreate.jsx**: Special form to create a clan, making you the first member, the owner and not allowing you to leave.

- **Clanes.jsx**: All the existing clanes list with member number and owner name, also here is the "create clan button".

- **Following.jsx**: Page show all the users you already follow.

- **Home.jsx**: Shows tha main page with the games.

- **Login.jsx**: Log in form and validation.

- **NotFound.jsx**: Default route to not registered urls.

- **Profile.jsx**: Personal profile page.

- **Register.jsx**: New user register form and validation.

- **Trophies.jsx**: Shows all available trophies and the game.

- **User.jsx**: Other users information page.

### Styles
this folder contains all the CSS for every page in the project.

**App.jsx**: Contains all routes of the project, including the protected ones, the context providers and the log out function.

**Constants.js**: Access and refresh tokens variables.

**index.css**: Main css styles for all project.

**main.jsx**: Main component and ui provider.

project also contains vite and react files for correct functioning like package.json for version management

## crud_api
Contains main settings for the Django project and adds app url's

- **setting.py**: Add settings for django libraries like simple JWT, corsheaders, core_api, and the main app.

## virtual
Contains virtual enviroment

**db.sqlite3**: actuall database

**manage.py**: main Django file to start back-end app

**requirements.txt**: All python packages required to make app work

**test.rest**: basic api test for some endpoints