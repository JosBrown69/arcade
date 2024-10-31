# **Johnny's Arcade**

_This is a video game-based app with challenges and user interaction, similar to a virtual arcade room where the focus isn't just on the game itself, but also on competing and challenging other players. The purpose is to entertain and provide users with incentives to keep playing, such as trophies and clan interactions, allowing them to share and compete with others._

## Distinctiveness and Complexity

My project is distinct from the previous ones because it is a virtual game room. While there is some interaction between users, the main focus is on the games, challenging friends and other users, and comparing achievements. This is why the games are fully integrated into the app interface, making them fun and engaging. Additionally, users are not required to log in to play some games, but doing so enriches the overall user experience.
The project is more complex than the previous ones due to the use of _through_ to define more complex relationships in Django models. It also incorporates Django libraries like DRF (Django Rest Framework) to manage HTTP requests, serialize information using serializers, and handle authentication permissions and classes. Additionally, it utilizes Simple JWT for a custom authentication method and corsheaders to simplify HTTP requests.
For the front-end part, I used the React library and tools like react-hook-form, react-router-dom, and jwt-decode to simplify difficult or tedious tasks. I also utilized Axios and async/await instead of .then to manage HTTP requests more easily, centralizing all functions in a single file for reuse. Additionally, I employed contexts for data shared across multiple pages or components, avoiding the need to pass multiple function arguments or engage in prop drilling for more efficient code, also including chakra ui for styled components.
The game coding part was also more difficult and complex because making a game run requires a strong foundation in OOP (Object-Oriented Programming), including concepts like classes, constructors, and object pooling. It also necessitates a degree of logic to ensure the code functions as intended, avoiding performance-related issues or bugs.

---

## How to run

**1. clone repositorie and navigate to project directory**

**2. Activate the virtual environment:**

`source virtual/bin/activate`

**3. Install the required Python dependencies:**

`pip install -r requirements.txt`

**4. Apply migrations to set up the database:**

`python manage.py migrate`

**5. Run the Django development server:**

`python manage.py runserver`

**6. Open another terminal window and navigate to the frontend directory:**

`cd arcade_front`

**7. Install the frontend dependencies:**

`npm install`

**8. Start the frontend development server:**

`npm run dev`



---

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

### assets 
Containst game images

### classes

- **Background.jsx**: Defines the Background class, including its constructor and methods for managing background functionality.

- **Collisions.jsx**: Function to validate if the Player class is colliding with an object.

- **Game.jsx**: Contains the logic of the game in a last class to put everything together

- **GameMain.js**: Contains the game component and the logic to interact with the rest of the interface aand making the required API calls if needed.

- **JuegoGratis**: Shows the game in the main menu without requiring authentication, doesn't interact with the rest of the app. 

- **Obstacles.jsx**: Defines obstacle class and behavior.

- **Player.jsx**: Defines Player class controls and behavior.

- **ScoreBoard.jsx**: Defines and draw the score board.

- **TouchInput.jsx**: Touch controls for mobile compatibility.

### SuperJump
Contains second game log in required

### assets
Contains game images

### classes

- **Background.jsx**: Defines the Background class setting background image.

- **Enemy.jsx**: Creates enemy class and its functionality.

- **Game.jsx**: Main game logic.

- **Ground.jsx**: Initial main platform to avoid instant losing.

- **Platform.jsx**: Platform class and logic.

- **Player.jsx**: Player class logic and controls.

- **ScoreBoard.jsx**: Creates score board to display on screen and manage point data

- **TouchInput.jsx**: Manage controls for mobile screens.

- **Utils.jsx**: Contains functions for enemy and platform detection.

- **SuperJumpMain.jsx**: Main component to manage functions, API calls, interface rendering and interactions.

### Pages

- **Clan.jsx**: contains all the clan interaction, members, posts with scrolldown, post textarea, join and leave buttons.

- **ClanCreate.jsx**: Special form to create a clan, making you the first member, the owner and not allowing you to leave.

- **Clanes.jsx**: All the existing clanes list with member number and owner name, also here is the "create clan button".

- **Following.jsx**: Page show all the users you already follow.

- **GamaPage.jsx**: Page to switch beetween games based on params id.

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