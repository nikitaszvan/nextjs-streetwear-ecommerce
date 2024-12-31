// app/api/fetch-images/route.ts
import { NextResponse } from 'next/server';
import puppeteer, { Browser } from 'puppeteer';

export async function GET(req: Request) {
    let browser: Browser | null = null; 

  try {
    const {search} = new URL(req.url);
    const baseUrl = `https://api.lummi.ai/s/photo/${search.slice(1)}`;

    console.log(baseUrl);
    
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    if (!browser) {
      throw new Error('Failed to launch browser');
    }

    const fetchPromise = async () => {
      const page = await browser!.newPage();
      try {
        await page.goto(baseUrl, { waitUntil: 'networkidle0' });
        await page.waitForSelector('svg image');

        const imageUrls = await page.evaluate(() => {
          const svgImages = Array.from(document.querySelectorAll('svg image'));
          return svgImages
            .map(img => img.getAttribute('href'))
            .filter((url): url is string => url !== null);
        });

        return imageUrls;
      } finally {
        await page.close();
      }
    };

    const imageUrls = await fetchPromise();
    
    const uniqueUrls = [...new Set(imageUrls)];

    console.log(imageUrls);

    return NextResponse.json({ images: uniqueUrls });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// export async function GET(req: Request) {
//   let browser: Browser | null = null;

//   try {
//     const baseParams = [
//       '%20urban%20coats%20man?people=1&reframe=0.667++&luminance=lt0.33',
//       '%20urban%20sweater%20man',
//       '%20urban%20pants%20man',
//       '%20urban%20watches',
//     ];
    
//     browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });

//     if (!browser) {
//       throw new Error('Failed to launch browser');
//     }

//     const promises = baseParams.map(params => {
//       const url = `https://api.lummi.ai/s/photo/streetwear?${params}`;
//       return url;
//     });

//     const results = await Promise.all(promises);
//     console.log(results);
//     const uniqueUrls = [...new Set(results.flat())];

//     return NextResponse.json({ images: uniqueUrls });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch images' },
//       { status: 500 }
//     );
//   } finally {
//     if (browser) {
//       await browser.close();
//     }
//   }
// }