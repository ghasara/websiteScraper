// index.js
import scrape from 'website-scraper';
import PuppeteerPlugin from 'website-scraper-puppeteer';
import { resolve } from 'path'; 

scrape({
    urls: ['https://slashbox.com/'],
    directory: resolve('/Users/akashchikara/personal/js_script', 'slashbox'),
    plugins: [ 
        new PuppeteerPlugin({
            launchOptions: { 
                headless: true
            },
            scrollToBottom: {
                timeout: 10000, 
                viewportN: 10 
            }
        })
    ]
});