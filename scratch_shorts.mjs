import https from 'https';

https.get('https://www.youtube.com/@Svastusolution/shorts', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      // Find the ytInitialData script tag
      const match = data.match(/var ytInitialData = (\{.*?\});<\/script>/);
      if (match) {
        const jsonData = JSON.parse(match[1]);
        // Extract shorts. The path is deeply nested. Let's just regex the videoIds from the raw data string for shorts
        // YouTube short URLs contain /shorts/ID. But in the data, it's just videoId.
        // Let's just find all instances of "videoId":"xxxx" where it's part of a Shorts item.
        const videoIdMatches = [...data.matchAll(/"videoId":"([^"]{11})"/g)].map(m => m[1]);
        // Let's filter unique ones
        const uniqueIds = [...new Set(videoIdMatches)];
        console.log('Found Shorts IDs:', uniqueIds.slice(0, 15));
      } else {
        console.log('ytInitialData not found');
      }
    } catch (e) {
      console.log('Error parsing:', e);
    }
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
