# Foodie

Foodie is an app that let's the user put some ingredients and receive some recipe suggestions.

### Project Info

Main objective of this project was to have single base code base for the IOS and Android with logic and view seperated 

#### Project Structure 
```
    /android                - React native android source code
    
    /app                    - React native specific code
        /base_components    - reusable react native components
        /components         - react native components
        /screens            - connected to store components
        /App.js             - App Root component
        /router.js          - route config
        
    /assets                 - contains image and fonts
    /ios                    - React native ios source code
    
    /src
        /actions            - all redux actions
        /constants          - colors and Assets
        /reducers           - all reducers
        /sagas              - all redux sagas  
        /service            - API methods
        /store              - store config
        /utils              - some utility functions

    /web                    - react js web specific code
        /screens            - connected to store components
        /components         - react components
        /base_components    - reusable react components
        /App.js             - App Root component
        /routes.js          - route config
    /webpack                - webpack config
    
```


#### Architecture Flow 
<img src="./assets/Foodie.png"  />


#### Project Requirement 
** Front-End: react-native: 0.59.9 / react-native-cli: 2.0.1
** Backend : JSON 
** Database : Firestore Database

#### User login 
username: test
Password: 1234
