const fs = require('fs');

const csv = fs.readFileSync('english_full.csv', 'utf8');

const lines = csv.split('\n').slice(1);

let structured = {
  books: [
    {
      name: "Guru Granth Sahib",
      content: {
        "1": {}
      }
    }
  ]
};

lines.forEach(line => {
  if (!line.trim()) return;

  const firstComma = line.indexOf(',');
  let id = line.substring(0, firstComma).trim();
  let text = line.substring(firstComma + 1).trim();

  // remove surrounding quotes
  text = text.replace(/^"|"$/g, '');

  // remove ||1|| style markers
  text = text.replace(/\|\|\d+\|\|/g, '');

  // clean quotes from id
  id = id.replace(/"/g, '');

  structured.books[0].content["1"][id] = text.trim();
});

fs.writeFileSync(
  'gurbani_english_full_clean.json',
  JSON.stringify(structured, null, 2)
);

console.log("Clean full Gurbani JSON created.");
