const { addonBuilder } = require("stremio-addon-sdk");
const { BitTorrent } = require("bittorrent");

// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md
const manifest = {
  "id": "community.downloadbutton",
  "version": "0.0.1",
  "catalogs": [],
  "resources": [
    "stream"
  ],
  "types": [],
  "name": "downloadbutton",
  "description": "hopefully a download button for stremio links"
};
const builder = new addonBuilder(manifest);

builder.defineStreamHandler(({ type, id }) => {
  console.log("request for streams: " + type + " " + id);
  // Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md
  // return no streams
  return Promise.resolve({ streams: [] });
});

builder.defineDownloadHandler(({ stream }) => {
  const torrent = new BitTorrent({ url: stream.url });
  torrent.on("downloaded", () => {
    console.log("torrent downloaded");
  });

  torrent.start();
});

module.exports = builder.getInterface();
