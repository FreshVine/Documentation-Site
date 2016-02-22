# Setting up a Server
  
This is pretty straight forward. You need to get Node.JS installed along with apache. We'll use a very simple virtual hosts configuration for delivering the MetalSmith content. This will also allow us to setup the needed SSL Certificates.  
  
## Installation of Node and Dependancies

To host this documentation locally, you'll need Node.js and npm: The enablerepor piece is critical here since the amazone AMIs don't have it in their repositories. GIT is also required.  The curl portion adds the node source to the rpm for the install/update of nodejs/npm.
  
	sudo yum install git
	sudo su -
	curl --silent --location https://rpm.nodesource.com/setup | bash -
	yum install -y nodejs
	logout
	sudo npm install forever -g
  
  
## Installation of Apache

The assumption is that you either have a server running apache already, or are able to get apache setup with virtual hosts and ssl using other resources. Below are sample configurations for the virtual host configuration used with 

### Configuring Virtual hosts
The virtual host will do two things for us.
  1.  It will redirect all non encrypted traffic to the encrypted site.  
  1.  It will use a proxy pass through to showcase the metalsmith site via HTTPS.  

```
<VirtualHost *:80>
	ServerName docs.freshvine.co
	ServerAlias docs.freshvine.co
	Redirect "/" "https://docs.freshvine.co/"
</VirtualHost>

<VirtualHost *:443>
	SSLEngine on
	SSLCertificateFile /etc/certs/CERTIFICATE.crt
	SSLCertificateKeyFile /etc/certs/CERTIFICATE.key
	SSLCertificateChainFile /etc/certs/KEYCHAIN-FILE.ca.crt

	ServerAdmin contact@domain.com
	ServerName docs.freshvine.co
	ServerAlias docs.freshvine.co

	ProxyPreserveHost On
	ProxyRequests off

	<Proxy *>
		Order deny,allow
		Allow from all
	</Proxy>

	<Location />
		ProxyPass http://localhost:8080/
		ProxyPassReverse http://localhost:8080/
	</Location>
</VirtualHost>
```

## Installing other Libraries

Ideally you should be able to get all of the correct libraires and their dependancies setup using the following command. This needs to be executed in your base directory for the metalsmith project.

    npm install

If you run into errors with a particular library not being install then you can use a more manual approach below. The disadvantage here is that you might not install the correct version of these libraries. When you finish with the manual install you should run the `npm install` again to catch any issues.

### Manually install Libraries

    sudo npm install gulp -g
	npm install git://github.com/spark/metalsmith-markdown
    npm install metalsmith-templates
	npm install metalsmith-serve
	npm install metalsmith-move-up
	npm install metalsmith-less
	npm install metalsmith-ignore
	npm install metalsmith-permalinks
	npm install git://github.com/spark/metalsmith-collections#dynamic-collections
	npm install metalsmith-clean-css
	npm install metalsmith-define
	npm install metalsmith-gzip
	npm install metalsmith-paths
	npm install git://github.com/spark/metalsmith-register-partials
	npm install handlebars
	npm install git://github.com/brycekahle/metalsmith-register-helpers
	npm install metalsmith-redirect
	npm install metalsmith-copy
	npm install metalsmith-in-place
	npm install metalsmith-watch
	npm install readable-stream
	npm install git://github.com/spark/metalsmith-autotoc
	npm install git://github.com/spark/metalsmith-lunr
	npm install lunr
	npm install metalsmith-filemetadata
	npm install git://github.com/spark/metalsmith-simplewatch
	npm install metalsmith-if
	npm install minimatch
	npm install apidoc
	npm install lodash
	npm install git-rev
	npm install prettify
	npm install marked

## Starting up the Node server

When in testing/development you are likely running `npm start` to get node off to the races. Yet this requires the current process in the CLI to not be stopped. Instead we will use the node module [forever](https://github.com/foreverjs/forever) which we installed above.  


	forever start -l fv-docs-forever.log -e fv-docs-err.log -a scripts/server.js
	forever list

If/When you need to get a clean build and need to restart it you can use the line below. Will work from any directory.

	forever restartall
