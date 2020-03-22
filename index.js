/* eslint-disable require-jsdoc */
const fs = require("fs")
const path = require("path")

module.exports = function TeraGuideGuides(mod) {

    const teraGuide = mod.manager.get('tera-guide');
    if (!teraGuide) return mod.error('Dependency mod tera-guide not found.')
    
    const guidesDir = path.join(teraGuide.rootFolder, 'guides/');
    
    let guides;    
    fs.readdir(guidesDir, (err, files) => {
        if (err) return console.log('Unable to scan directory: ' + err);
        guides = files.filter((x) => x.match(/\d+\.js/));
    });
    
    fs.readdir(__dirname, (err, files) => {
        if (err) return console.log('Unable to scan directory: ' + err);
    
        files.filter((x) => x.match(/\d+\.js/)).forEach((file) => {
            
            const nFile = path.join(__dirname, file);
            const nTime = fs.statSync(nFile).mtime;
            const oFile = path.join(guidesDir, file);
    
            if (guides.includes(file)) {
                const oTime = fs.statSync(oFile).mtime;
    
                if(nTime > oTime) {
                    fs.copyFile(nFile, oFile, (err) => {
                        if (err) throw err;
                        console.log(`Updated guide ${file} was copied over ${oFile}`);
                    });
    
                }
            } else {
                fs.copyFile(nFile, oFile, (err) => {
                    if (err) throw err;
                    console.log(`New guide ${file} added to ${oFile}`);
                });
            }
        });
    });
};
