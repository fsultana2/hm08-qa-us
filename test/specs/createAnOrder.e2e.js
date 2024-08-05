const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => 
{
    const fromAddress = 'East 2nd Street, 601';
    const toAddress = '1300 1st St';
    const cardNumber = '4111111111111111';
    const cvvCode = '123'; // Corrected CVV length
    const message = 'Please be on time';
    const iceCreamCount = 2;
    it('should write an address', async () => 
    {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
    });
    
    it('Should select supportive plan', async () =>
    {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.selectSupportivePlan();
        /*if (!(await page.isSupportivePlanSelected())) {
            await page.selectSupportivePlan();
        }
        await expect(await page.isSupportivePlanSelected()).toBe(true);*/
    });


    it('should fill phone number', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        console.log('Filling in the phone number');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });

    it('should add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();

        console.log('Adding a credit card');
        await page.addCard(cardNumber, cvvCode);
        //await page.closeCardModal();

        const cardRow = await $(page.cardRow);
        await cardRow.waitForDisplayed();

        await expect(cardRow).toBeDisplayed();
    });

    it('should write a message to the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();

        console.log('Writing a message to the driver');
        await page.fillMessageToTheDriver(message);

        const messageToTheDriverField = await $(page.messageToTheDriverField);
        await messageToTheDriverField.waitForDisplayed();

        await expect(await messageToTheDriverField.getValue()).toBe(message);
    });

    it('should select a blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.selectSupportivePlan();
        await page.selectBlanketsAndHandkerchief();
           /* console.log('Ordering a Blanket and handkerchiefs');
        if (!(await page.isBlanketAndHandkerchiefsSwitchInputChecked())) {
            await page.selectBlanketsAndHandkerchief();
        }*/
        await expect(await page.isBlanketAndHandkerchiefsSwitchInputChecked()).toBe(true);

  
    });

    it('should add two ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.addIceCream(iceCreamCount);

        await expect(await page.getIceCreamCount()).toBe(iceCreamCount);
        //await page.selectSupportivePlan();
        //await expect(await page.getIceCreamCount()).toBe(iceCreamCount);

        /*if (!(await page.isSupportivePlanSelected())) {
            await page.selectSupportivePlan();
        }

        console.log('Ordering 2 Ice creams');
        if (await page.getIceCreamCount() === 0) {
            await page.addIceCream(iceCreamCount);
        }*/

       /* await expect(await page.getIceCreamCount()).toBe(iceCreamCount);*/
    });

    it('car search modal should appear', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        //await page.selectSupportivePlan();


        /*if (!(await page.isSupportivePlanSelected())) {
            await page.selectSupportivePlan();
        }*/

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



       /* if (!(await page.isBlanketAndHandkerchiefsSwitchInputChecked())) {
            await page.selectBlanketsAndHandkerchief();
        }

        if (await page.getIceCreamCount() === 0) {
            await page.addIceCream(iceCreamCount);
        }

        console.log('Clicking order button');
        await page.clickOrderButton();*/

        
    });
    /*it('driver info should appear', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.fillMessageToTheDriver(message);
        await page.clickOrderButton();
        /*console.log("Order button clicked");

// All actions completed, now check orderBody
const orderBody = await $(page.orderBody);
console.log("Checking if orderBody is displayed...");
await orderBody.waitForDisplayed({ timeout: 30000 });
console.log("OrderBody is displayed");
        await theDriverWillArriveLabel.waitForDisplayed();
        await expect(theDriverWillArriveLabel).toBeDisplayed();*/
   // })

 
//})
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
    //await page.selectBlanketsAndHandkerchief();
    await page.addIceCream(iceCreamCount);
    await page.clickOrderButton();
    const orderBody = await $(page.orderBody);
    await orderBody.waitForDisplayed();
    const orderHeaderTime = await $(page.orderHeaderTime);
    await orderHeaderTime.waitForDisplayed();
    const waitingTimeText = await orderHeaderTime.getText();
    const waitingTimeTextArray = waitingTimeText.split(':');
    const waitingTimeMinutes = Number(waitingTimeTextArray[0]);
    const waitingTimeSeconds = Number(waitingTimeTextArray[1]);
    const totalWaitingTimeMilliseconds = (waitingTimeMinutes * 60 + waitingTimeSeconds) * 1000;
    await orderHeaderTime.waitUntil(async function () {
        return (await this.getText()) === "00:01";
    }, { timeout: totalWaitingTimeMilliseconds });
    const theDriverWillArriveLabel = await $(page.theDriverWillArriveLabel);
    await theDriverWillArriveLabel.waitForDisplayed();
    await expect(theDriverWillArriveLabel).toBeDisplayed();
});
});
