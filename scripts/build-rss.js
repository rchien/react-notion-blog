import fs from 'fs'
import RSS from 'rss'
import getAllPosts from "../utils/notionApiClient";

const feed = new RSS({
  title: 'Blog – 2x7 Dev',
  site_url: 'https://www.richardchien.com/blog',
  feed_url: 'https://www.richardchien.com/feed.xml',
})

getAllPosts().forEach(({ link, module: { meta } }) => {
  feed.item({
    title: meta.title,
    guid: link,
    url: `https://www.richardchien.com/blog${link}`,
    date: meta.date,
    description: meta.description,
    custom_elements: [].concat(
      meta.authors.map((author) => ({ author: [{ name: author.name }] }))
    ),
  });
});

fs.writeFileSync('./out/feed.xml', feed.xml({ indent: true }))
