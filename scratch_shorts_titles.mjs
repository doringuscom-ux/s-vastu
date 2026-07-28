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
        
        let items = [];
        
        // Let's try to recursively find 'videoId' and 'headline' or 'title'
        function findShorts(obj) {
          if (!obj) return;
          if (Array.isArray(obj)) {
            obj.forEach(findShorts);
          } else if (typeof obj === 'object') {
            if (obj.videoId && obj.headline && obj.headline.simpleText) {
              items.push({
                videoId: obj.videoId,
                title: obj.headline.simpleText
              });
            } else if (obj.videoId && obj.title && obj.title.accessibility && obj.title.accessibility.accessibilityData) {
               // sometimes title is stored differently
               // we can just extract whatever title we find
            }
            Object.values(obj).forEach(findShorts);
          }
        }
        
        findShorts(jsonData);
        
        // Deduplicate by videoId
        const unique = [];
        const seen = new Set();
        for (const item of items) {
          if (!seen.has(item.videoId)) {
            seen.add(item.videoId);
            unique.push(item);
          }
        }
        
        console.log('Extracted Shorts:', unique.slice(0, 5));
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
