const puppeteer = require('puppeteer');

(async () => {
    async function connectBrowser() {
        const browserURL = 'http://127.0.0.1:42069';
        const browser = await puppeteer.connect({ browserURL });
        const pages = await browser.pages();
        const page = pages[0];
        return { page, pages, browser };
    }

    const { page } = await connectBrowser();

    const text = await page.evaluate(() => {
        let x = document.querySelectorAll("#game > div.container > div.zone > div.place-wrapper > div span");
        let arr = [];
        for (let i = 0; i < x.length; i++) {
            arr.push(x[i].innerText);
        }
        return arr;
    });

    textToType = text.join(' ');
    console.log(textToType);

    await page.waitForFunction('document.querySelector("#game > div:nth-child(2) > div").innerText == "false"');
    await page.type('#game > div.container > div.zone > div.interface-wrapper > div:nth-child(1) > input[type=text]', textToType + " ");
})()