const fetch = require('node-fetch');

async function k() {
  const promises = [];
  for (let i = 1; i < 100; i++) {
    promises.push(
      fetch(`https://news.blizzard.com/en-us/blog/list?pageNum=${i}&pageSize=30&community=heroes-of-the-storm`)
        .then(d => d.json())
        .catch(e => {
          throw new Error(e);
        })
    );
  }
  return await Promise.all(promises);
}

k()
  .then(a => {
    a.forEach(b => {
      console.log(b.pageNum);
    });
  })
  .catch(console.error);
// console.log(k().then()));
