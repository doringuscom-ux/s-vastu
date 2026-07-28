import https from 'https';

https.get('https://www.youtube.com/@Svastusolution', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Try multiple regex patterns to find the channel ID
    const match = data.match(/"channelId":"(UC[^"]+)"/) || 
                  data.match(/"browseId":"(UC[^"]+)"/) ||
                  data.match(/<meta itemprop="identifier" content="(UC[^"]+)">/);
    if (match) {
      console.log('FOUND_CHANNEL_ID:', match[1]);
    } else {
      console.log('Channel ID not found in HTML source');
    }
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
