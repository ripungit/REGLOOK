sudo systemctl stop cocktail && \
sudo systemctl disable cocktail && \
sudo rm -f /etc/systemd/system/cocktail.service && \
sudo systemctl daemon-reload && \
sudo rm -rf /opt/cocktail /etc/cocktail && \
echo "Cocktail Agent has been fully removed."



for gallery in cloudflare storage

The error "This policy is not valid" is likely happening because you are trying to paste two separate code blocks into the box. A CORS policy must be a single JSON array.

Please clear the entire text box in the Cloudflare Dashboard and paste only this specific block:

json
[
  {
    "AllowedOrigins": [
      "https://cockpit.reglook.com",
      "http://localhost:3000"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "HEAD"
    ],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
💡 Why this fixes it:
Single Root Array: You cannot have two [...] [...] blocks; they must be merged into one.
Removed OPTIONS: Standard CORS policies often reject OPTIONS in the AllowedMethods list because OPTIONS is the preflight method used to ask for permission; it's implicit once the policy is active.
Wildcard Headers: Using AllowedHeaders: ["*"] is the most robust way to handle the headers sent by the browser's 
fetch
 API.
No Empty Arrays: I removed ExposeHeaders: [] as some browsers/dashboards treat empty arrays as invalid schema.
Try saving this single block, and the "Failed to fetch" error in the Gallery should disappear immediately.