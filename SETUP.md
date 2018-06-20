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
# Redirect all requests to SSL
<IfModule mod_rewrite.c>
 RewriteEngine On
 RewriteCond %{HTTPS} !=on
 RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R=301,L]
</IfModule>

<VirtualHost *:80>
  # General
  ServerAdmin contact@nineteen05.com
  # DocumentRoot /var/www/html/build
  ServerName docs.freshvine.co
  ServerAlias www.docs.freshvine.co
  Options -Indexes
  Redirect "/" "https://docs.freshvine.co/"

  # Logging
  ErrorLog logs/freshvine.co-error_log
  CustomLog logs/freshvine.co-access_log common
</VirtualHost>

<VirtualHost *:443>
  SSLEngine on
  SSLCertificateFile /etc/letsencrypt/live/docs.freshvine.co/cert.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/docs.freshvine.co/privkey.pem
  SSLCertificateChainFile /etc/letsencrypt/live/docs.freshvine.co/chain.pem
  SSLProtocol All -SSLv2 -SSLv3
  SSLHonorCipherOrder on
  SSLCipherSuite "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA !RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS"


  ServerAdmin contact@nineteen05.com
  ServerName docs.freshvine.co
  # ServerAlias docs.freshvine.co

  ProxyPreserveHost On

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

If you continue to have issues, in particular with `contextify` not working, you should reinstall npm using the following command.

    sudo npm install -g npm

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
	
	
## Using Let's Encrypt for SSL Certificates

[Let's Encrypt](https://certbot.eff.org/) offers free 90 day SSL certificates. These are not secure as the ones we purchase since those have a level of verification (that we are actually Fresh Vine) whereas these only verify that you control the domain.

The EFF provides a great little bot to do the registration for certificates. To install it do the following (we did it in `/var/www/`).

	wget https://dl.eff.org/certbot-auto
	chmod a+x certbot-auto

Now - while the node server and apache are running - you can execute the following and it will get certificates.

	cd /var/www/
	sudo ./certbot-auto certonly --webroot -w /var/www/html/build -d docs.freshvine.co

### Renewing those Certs 
That is great but these only last 90 days. So we need to [automate the renewal process](https://certbot.eff.org/docs/using.html#renewing-certificates). Here comes cron

	sudo crontab -l		# This will show you want jobs are scheduled for root

	sudo crontab -e		# Allow you to add & edit jobs

Once in the crontab editor you can add the following job. The renew action will only renew when needed, and the `deloy-hook` will execute the following script whenever a certificate is updated.
	
	34	3,15	*	*	*	/var/www/certbot-auto renew --deploy-hook "/sbin/service httpd restart"
