import puppeteer from 'puppeteer-core';

( async () => {
    try {
        const browser = await puppeteer.launch( {
            pipe: true,
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
            handleSIGTERM: false,
            handleSIGINT: false,
            handleSIGHUP: false,
            args: [ '--no-sandbox', '--disable-gpu',  '--mute-audio' ]
        } );

        const page = await browser.newPage();

        await page.goto( 'https://gov.pl', { waitUntil: 'domcontentloaded' } );

        const selector = await page.locator( '#Aktualnosci ul li .title' ).waitHandle();
        
        const title = await selector?.evaluate( el => el.textContent );

        console.log( 'Najnowszy artykuł: ', title )
        
        await browser.close();
    } catch( error ) {
        console.log( 'Error: ', error )
    }
} )();