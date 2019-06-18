# Foodie

Foodie is an app that let's the user put some ingredients and receive some recipe suggestions.

### Project Info

Main objective of this project was to have single base code base for the IOS and Android with logic and view seperated

#### Project Structure
```

    /android                - React native android source code
    /app                    - React native specific code
	  /api		                - API module class.
    /components             - react native components
    /config		              - Universal styles,images,metrics
    /feature                - Config File
    /lib                    - Lib helper file   
    /navigation             - All navigation related including helpers functions and navigation
    /store                  - store config
    /App.js                 - App Root component    
    /assets                 - contains image and fonts
    /ios                    - React native ios source code

```

This project is configured with redux, redux saga and redux persist. Latest version of react-navigation with NavigationService instead of Redux Integration. This Type based Architecture scales smoothly based on this application




#### Architecture Flow
<img src="./assets/Foodie.png"  />


#### Project Requirement
* Front-End: react-native: 0.59.9 / react-native-cli: 2.0.1
* Backend : JSON
* Database : Firestore Database



### Instruction to run FOODIE in devices/Emulator

#### 1.1 Enable Debugging over USB
To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to Settings → About phone and then tapping the Build number row at the bottom seven times. You can then go back to Settings → Developer options to enable "USB debugging".

#### 1.2 Enable Debugging over Emulator
To enable debugging on your emulator, you need to go Android Studio to create virtual device
(Android Studio > Tools > Android > AVD Manager > Create Virtual Device…)

You may choose Nexus 5X API 23 and once you have created the API

#### 2. Plug in your device via USB

```
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

#### 3. Run your app
type the following in your command prompt to install and launched at your app at device.

```
$ react-native run-android
```
