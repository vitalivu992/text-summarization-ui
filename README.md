## Deployment status
[![Netlify Status](https://api.netlify.com/api/v1/badges/3acaa2cf-42ed-4a1b-acf1-ff8f40c2dd86/deploy-status)](https://app.netlify.com/sites/semantic-similarity-search/deploys)

## Getting started

### 1. Install `rekit-studio`
```
npm install -g rekit rekit-studio
```

### 2. Start studio
```
rekit-studio -p 3333
```
then open http://localhost:3333 in your favorite browser.

### 3. Preview your work
Open in another console window:
```
# yarn install
yarn start
```

## Deployment

Make sure that every path successfully resolves to index.html and the client has full control over the routing logic

### nginx

create a conf file:
```
server {

        root build;
        index index.html;

        server_name ssearch.net;

        location / {
	  if (!-e $request_filename){
	    rewrite ^(.*)$ /index.html break;
	  }
        }
        listen 80;
        listen [::]:80;
}
```

### netlify

create a file `_redirects` with content:
```
/*   /index.html   200
```
for more details, see netlify's [tutorial](https://www.netlify.com/blog/2020/04/07/creating-better-more-predictable-redirect-rules-for-spas/)
