import fs from 'fs';

const fetchJSONData = () => {
    return JSON.parse(fs.readFileSync('./temp.json', 'utf8'));
} 

export default fetchJSONData;