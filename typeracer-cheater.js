const puppeteer = require('puppeteer');

(async () => {
    async function connectBrowser() {
        const browserURL = 'http://127.0.0.1:42069';
        const browser = await puppeteer.connect({ browserURL });
        const pages = await browser.pages();
        const page = pages[0];
        return { page, pages, browser };
    }

    const { page, browser } = await connectBrowser();
    await page.goto('https://play.typeracer.com/', { waitUntil: 'load' });

    await page.waitForSelector('#gwt-uid-1 > a');

    await page.click('#gwt-uid-1 > a');

    textToType = await page.$eval('#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td', (el) => el.innerText);

    console.log(textToType);

    await page.waitForSelector('[title="Time remaining"]', { visible: true });

    await page.type('#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > input', textToType, { delay: 20 });
})()