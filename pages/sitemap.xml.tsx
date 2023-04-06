import { BlogEntry, Camper } from '../shared/types';
import { getBlogCollection, getCamperCollection } from '../utils/db/firebase';

const EXTERNAL_DATA_URL = `${process.env.PAGE_URL}/kampery`;
const PAGE_URL = process.env.PAGE_URL;

function generateSiteMap(campers: Camper[], bloglist: BlogEntry[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${PAGE_URL}</loc>
     </url>
     <url>
       <loc>${PAGE_URL}/polityka-prywatnosci</loc>
     </url>
     <url>
        <loc>${PAGE_URL}/kampery</loc>
     </url>
     <url>
        <loc>${PAGE_URL}/warunki-wynajmu</loc>
     </url>
     <url>
        <loc>${PAGE_URL}/kontakt</loc>
     </url>     
     ${campers
       .map(({ urlSlug }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${urlSlug}`}</loc>
       </url>
     `;
       })
       .join('')}
    ${bloglist
      .map(({ urlSlug }) => {
        return `<url>
        <loc>${`${PAGE_URL}/blog/${urlSlug}`}</loc>
      </url>`;
      })
      .join('')}
    ${Array.from({ length: Math.ceil(bloglist.length / 12) }, (_, i) => {
      return `<url>
          <loc>${`${PAGE_URL}/blog/strona/${i + 1}`}</loc>
      </url>`;
    }).join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: any) {
  // We make an API call to gather the URLs for our site
  const campersList = await getCamperCollection();

  // Blog list
  const blogList = await getBlogCollection();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(campersList, blogList);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
