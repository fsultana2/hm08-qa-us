# Sprint 8 project
# project name: hm08-qa-us
# Project description:
    - Setting the Address
        Ensure that the user can set the pick-up and drop-off addresses.
    - Selecting the Supportive Plan
        Verify that the user can select the Supportive Plan option.
    - Filling in the Phone Number
        Check that the user can enter a valid phone number.
    - Adding a Credit Card
        Test the process of adding a credit card.
        Note: The "link" button becomes active only after the CVV field loses focus. Simulate the user pressing TAB                or 
        clicking elsewhere on the screen to change focus.
    - Writing a Message for the Driver
        Confirm that the user can write and submit a message for the driver.
    - Ordering a Blanket and Handkerchiefs
        Ensure that the user can order a blanket and handkerchiefs.
        Note: Use two selectors—one to click and one to verify that the state changed.
    - Ordering 2 Ice Creams
        Verify that the user can successfully order two ice creams.
    - Car Search Modal
        Check that the car search modal appears after placing the order.
    - Waiting for the Driver Info to Appear in the Modal 
        Optionally, check that the driver's information appears in the modal. This step is more challenging and     
        provides good 
        ractice for tackling complex tasks.

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
            - Confirm the detected project path: Yes
            - Type of testing: E2E Testing - of Web or Mobile Applications
            - Automation backend location: On my local machine
            - Environment to automate: Web - web applications in the browser
            - Browser to start with: Firefox
            - Framework to use: Mocha (https://mochajs.org/)
            - Use a compiler: No
            - Autogenerate test files: No
            - Reporter to use: spec
            - Add a plugin to the test setup: wait-for
            - Include Visual Testing: No
            - add a service to the test setup: firefox-profile and intercept
            - Run npm install: Yes
            - Open wdio.conf.js in the root directory.

# Update specs to:
    javascript
    specs: [
        './test/specs/**/*.js',
    ],


# Update baseUrl with your testing environment URL:
    javascript
    baseUrl: https://cnt-09649fec-85e0-4aa1-9c54-594b3f04feae.containerhub.tripleten-services.com

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
# Constants and Dependencies
    javascript

    const page = require('../../page');
    const helper = require('../../helper');

    const fromAddress = 'East 2nd Street, 601';
    const toAddress = '1300 1st St';
    const cardNumber = '4111111111111111';
    const cvvCode = '123'; // Corrected CVV length
    const message = 'Please be on time';
    const iceCreamCount = 2;

    - page and helper modules contain functions to interact with the page elements and perform actions.
    - Constants are defined for reusable data like addresses, card details, message, and ice cream count.
# Test Cases
    1. Writing an Address
    javascript
        it('should write an address', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await expect(await $(page.fromField)).toHaveValue(fromAddress);
        await expect(await $(page.toField)).toHaveValue(toAddress);
        });
        
        - Navigates to the home page.
        - Fills the pick-up and drop-off addresses.
        - Verifies that the addresses are correctly entered.

    2. Selecting Supportive Plan
    javascript
        it('Should select supportive plan', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.selectSupportivePlan();
        await expect(await $(page.supportiveButton)).toHaveElementClass("active");
        });
        
        - Fills addresses and calls a taxi.
        - Selects the supportive plan and verifies that it is selected.

    3. Filling Phone Number
    javascript 
        it('should fill phone number', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        });
        
        - Fills addresses and calls a taxi.
        - Submits a phone number and verifies its existence.

    4. Adding a Credit Card
    javascript
        it('should add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.addCard(cardNumber, cvvCode);
        const cardRow = await $(page.cardRow);
        await cardRow.waitForDisplayed();
        await expect(cardRow).toBeDisplayed();
        });
        
        - Adds a credit card and verifies that the card row is displayed.

    5. Writing a Message to the Driver
    javascript
        it('should write a message to the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.fillMessageToTheDriver(message);
        const messageToTheDriverField = await $(page.messageToTheDriverField);
        await messageToTheDriverField.waitForDisplayed();
        await expect(await messageToTheDriverField.getValue()).toBe(message);
        });
        
        - Fills addresses, calls a taxi, writes a message to the driver, and verifies the message.

    6. Ordering a Blanket and Handkerchiefs
    javascript
        it('should select a blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.selectSupportivePlan();
        await page.selectBlanketsAndHandkerchief();
        await expect(await page.isBlanketAndHandkerchiefsSwitchInputChecked()).toBe(true);
        });
        
        - Selects the supportive plan, orders a blanket and handkerchiefs, and verifies the selection.

    7. Ordering Two Ice Creams
    javascript
        it('should add two ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.addIceCream(iceCreamCount);
        await expect(await page.getIceCreamCount()).toBe(iceCreamCount);
        });
        
        - Orders two ice creams and verifies the count.

    8. Car Search Modal Appearance
    javascript
        it('car search modal should appear', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.addCard(cardNumber, cvvCode);
        await page.closeCardModal();
        await page.fillMessageToTheDriver(message);
        await page.selectBlanketsAndHandkerchief();
        await page.addIceCream(iceCreamCount);
        await page.clickOrderButton();
        const orderBody = await $(page.orderBody);
        await orderBody.waitForDisplayed();
        await expect(orderBody).toBeDisplayed();
        });
        
        - Completes the order process and verifies the appearance of the car search modal.

    9. Driver Info Appearance
    javascript
        it('driver info should appear', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.selectSupportivePlan();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.addCard(cardNumber, cvvCode);
        await page.closeCardModal();
        await page.fillMessageToTheDriver(message);
        await page.addIceCream(iceCreamCount);
        await page.clickOrderButton();
        const orderBody = await $(page.orderBody);
        await orderBody.waitForDisplayed();
        await browser.pause(40000);
        const theDriverWillArriveLabel = await $(page.theDriverWillArriveLabel);
        await theDriverWillArriveLabel.waitForDisplayed();
        await expect(theDriverWillArriveLabel).toBeDisplayed();
        });
        
        - Completes the order process and verifies that the driver’s info appears in the modal after some   time.

