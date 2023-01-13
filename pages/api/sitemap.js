const request =  require('/extra/request')
const constants = require('/constants')
const fs = require('fs')
const { getRequest } = request
const { APP_INFO } = constants

const defaultSitemapData = [ { url: APP_INFO.APP_URL, priority: 1 } ]

let fullSitemapData = [];

const fetchSitemapData = async (offset = 1) => {
    try {
        let requestUptoOffset = null
        const payload = { offset }
        const response = await getRequest('songSitemap', payload)
        const { total, limit, sitemapData } = response.data
        requestUptoOffset = Math.ceil(total / limit)
        fullSitemapData = [...fullSitemapData, ...sitemapData]
        if (offset > requestUptoOffset) {
            return Promise.resolve(fullSitemapData)
        }
        await fetchSitemapData(offset + 1)
    }
    catch (err) {
        console.log(err)
        return Promise.resolve(fullSitemapData)
    }
}

const generateSitemapXML = () => {
    let string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

    defaultSitemapData.forEach(item => {
        string += `    <url>
        <loc>${item.url}</loc>
        <priority>${item.priority}</priority>
    </url>`
    })

    fullSitemapData.reverse().forEach(item => {
        string += `    <url>
        <loc>${APP_INFO.APP_URL}song/${item.id}/${item.titleUrl}</loc>
        <priority>0.8</priority>
    </url>`;
    })
    string += `
</urlset>`
    return string;
}

export default async function handler(req, res) {
    fullSitemapData = []
    await fetchSitemapData()
    const xmlData = generateSitemapXML()
    try{
        fs.writeFileSync('public/sitemap.xml', xmlData)
        res.status(200).json({ status: true,
            data: { message: "Sitemap generated successfully" }
        });
    } catch(err){
        console.log(err)
        res.status(500).json({ status: true,
            error: { message: "Server error" }
        });
    }
}
