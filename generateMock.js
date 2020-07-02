'use strict';

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is the name of your json file? ', function (file) {
    // copy mock data to the page-grid model ts file
    fs.readFile(`public/data/${file}.json`, (err, data) => {
        if (err) throw err;
        const jsonPayload = JSON.parse(data);
        const arr = Object.getOwnPropertyNames(jsonPayload.payload[0]).reverse();
        //console.log(jsonPayload.payload[0]);
        //console.log(arr);

        const dataFileToWriteTo = fs.readFileSync(`src/app/models/${file}.ts`).toString().split('\n');
        arr.forEach((value) => dataFileToWriteTo.splice(8, 0, `\t${value}: ${typeof value};\r`));
        const text = dataFileToWriteTo.join('\n');

        fs.writeFile(`src/app/models/${file}.ts`, text, function (err) {
            if (err) return console.log(err);
        });
    });
    console.log(`updated src/app/models/${file}.ts`);

    // copy mock data to the page-grid container tsx file
    fs.readFile(`public/data/${file}.json`, (err, data) => {
        if (err) throw err;
        const jsonPayload = JSON.parse(data);
        const arr = Object.getOwnPropertyNames(jsonPayload.payload[0]).reverse();
        //console.log(jsonPayload.payload[0]);
        //console.log(arr);

        const dataFileToWriteTo = fs.readFileSync(`src/app/models/${file}.ts`).toString().split('\n');
        arr.forEach((value) => {
            // adding space between strings
            const result = value.replace(/([A-Z])/g, ' $1');
            // converting first character to uppercase and join it to the final string
            const final = result.charAt(0).toUpperCase() + result.slice(1);
            dataFileToWriteTo.splice(4, 0, `\t{ field: '${value}', headerName: '${final}'},\r`);
        });
        const text = dataFileToWriteTo.join('\n');

        fs.writeFile(`src/app/models/${file}.ts`, text, function (err) {
            if (err) return console.log(err);
        });
    });
    console.log(`updated src/app/models/${file}.ts`);

    // remove whitespace and hyphens from file name and make pascal case, example 'my page' or 'my-page' turns into 'MyPage' or 'page' turns into 'Page'
    // const fileNameTitleCase = file
    //     .replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    //         return g1.toUpperCase() + g2.toLowerCase();
    //     })
    //     .replace(/-|\s/g, '');

    // const dataConfigLocalFile = fs.readFileSync(`src/assets/config-local.json`).toString().split('\n');
    // const dataConfigFile = fs.readFileSync(`src/assets/config.json`).toString().split('\n');

    // dataConfigLocalFile.splice(10, 0, `\t\t\t"get${fileNameTitleCase}$": { "localMockData": true },\r`);
    // const dataConfigLocalFileText = dataConfigLocalFile.join('\n');

    // dataConfigFile.splice(10, 0, `\t\t\t"get${fileNameTitleCase}$": { "localMockData": true },\r`);
    // const dataConfigFileText = dataConfigFile.join('\n');

    // fs.writeFile(`src/assets/config-local.json`, dataConfigLocalFileText, function (err) {
    //     if (err) return console.log(err);
    // });
    // console.log(`updated src/assets/config-local.json`);

    // fs.writeFile(`src/assets/config.json`, dataConfigFileText, function (err) {
    //     if (err) return console.log(err);
    // });
    // console.log(`updated src/assets/config.json`);

    rl.close();
});
