# Sprint 8 project
# project name: hm08-qa-us
# Project description:
Setting the Address
Ensure that the user can set the pick-up and drop-off addresses.
Selecting the Supportive Plan
Verify that the user can select the Supportive Plan option.
Filling in the Phone Number
Check that the user can enter a valid phone number.
Adding a Credit Card
Test the process of adding a credit card.
Note: The "link" button becomes active only after the CVV field loses focus. Simulate the user pressing TAB or clicking elsewhere on the screen to change focus.
Writing a Message for the Driver
Confirm that the user can write and submit a message for the driver.
Ordering a Blanket and Handkerchiefs
Ensure that the user can order a blanket and handkerchiefs.
Note: Use two selectors—one to click and one to verify that the state changed.
Ordering 2 Ice Creams
Verify that the user can successfully order two ice creams.
Car Search Modal
Check that the car search modal appears after placing the order.
Waiting for the Driver Info to Appear in the Modal (Optional)
Optionally, check that the driver's information appears in the modal. This step is more challenging and provides good practice for tackling complex tasks.
The tests are implemented using Node.js and WebDriverIO and are located in the createAnOrder.e2e.js file within the test/specs folder.


# Linking GitHub Account and Setting Up Local Repository
To begin working on Project 7, follow these steps to link your GitHub account and clone the repository to your local computer.
    Step 1: Link Your GitHub Account
   	Navigate to the Project 7 description page on TripleTen.
  	 Click the "Link GitHub account" button in the the top of the page.
  Step 2: Clone the Repository Locally
   	Open  Terminal (On macOS  use the terminal application.)
   	Create a Directory for Projects_
      	 Navigate to the home directory:  
       	cd ~
  Step 3:Create a new directory named projects and navigate into it:
      	 mkdir projects
       	cd projects

Step 4: Clone the Repository:
   	For SSH authentication users, enter the following command, replacing username with     GitHub username:

git@github.com:fsultana2/hm08-qa-us.git
Or, For HTTPS authentication users,:
https://github.com/fsultana2/hm08-qa-us.git

Step 5: Navigate into your project directory:
   cd hm08-qa-us.

Step 6: Install the necessary dependencies:
   npm install


# Running the Tests
    To run the tests, follow these steps:
    Open Terminal and navigate to the project directory.
    Initialize npm by running:

        npm init --yes


# Run the Urban Routes testing environment
 copy the URL, and update the baseUrl variable in wdio.conf.js.
    npm run wdio

# Known Issues
    Some users may encounter an error related to chromedriver. To execute   
    the tests with Firefox, follow these steps:
    Open Terminal and navigate to the root directory of the project.
    Install the latest version of WebdriverIO by running:

        npm init wdio@latest
    Answer the Terminal prompts as follows:
        Confirm the detected project path: Yes
        Type of testing: E2E Testing - of Web or Mobile Applications
        Automation backend location: On my local machine
        Environment to automate: Web - web applications in the browser
        Browser to start with: Firefox
        Framework to use: Mocha (https://mochajs.org/)
        Use a compiler: No
        Autogenerate test files: No
        Reporter to use: spec
        Add a plugin to the test setup: wait-for
        Include Visual Testing: No
        add a service to the test setup: firefox-profile and intercept
        Run npm install: Yes
        Open wdio.conf.js in the root directory.

# Update specs to:
    javascript
    specs: [
        './test/specs/**/*.js',
    ],


# Update baseUrl with your testing environment URL:
    javascript
    baseUrl: https://cnt-09649fec-85e0-4aa1-9c54-5        94b3f04feae.containerhub.tripleten-services.com

# Update services to include intercept:
    javascript

    services: [
       'chromedriver',
       //'geckodriver',
       'intercept',
    ],

# Add maxInstances and acceptInsecureCerts to capabilities:
    javascript
    code
        capabilities: [
       {
       maxInstances: 5,
       browserName: 'chrome',
       acceptInsecureCerts: true,
       'goog:chromeOptions': {
          // args: ['headless', 'disable-gpu']
       
**Save wdio.conf.js.

# Fixing Mixed Spaces and Tabs
    Ensure all lines in your project start with tabs, not spaces, to avoid  the no-mixed-spaces-and-tab error.