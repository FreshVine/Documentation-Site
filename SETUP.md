# Setting up a Server
  
This is pretty straight forward. You need to get Node.JS installed along with apache. We'll use a very simple virtiual hosts configuration for delivering the MetalSmith content. This will also allow us to setup the needed SSL Certificates.  
  
## Installation of Node and Dependancies

To host this documentation locally, you'll need Node.js and npm: The enablerepor piece is critical here since the amazone AMIs don't have it in their responsitories. GIT is also required.  The curl portion adds teh nodesource to the rpm for the install/update of nodejs/npm.
  
	sudo yum install git
	sudo su -
	curl --silent --location https://rpm.nodesource.com/setup | bash -
	yum install -y nodejs
	logout
	sudo npm install forever -g
  
  
## Installation of Apache

The assumption is that you either have a server running apache already, or are able to get apache setup with virtual hosts and ssl using other resources. Below are sample configurations for teh virtual host configuration used with 

### Configuring Virtual hosts
The virtual host will do two things for us.
  1.  It will redirect all non encrypted traffic to the encrypted site.  
  1.  It will use a proxy pass through to showcase the metalsmith site via HTTPS.  

  
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


## Starting up the Node server

When in testing/development you are likely running `npm start` to get node off to the races. Yet this requires the current process in the CLI to not be stopped. Instead we will use the node module [forever](https://github.com/foreverjs/forever) which we installed above.  


	forever start -l fv-docs-forever.log -e fv-docs-err.log -a scripts/server.js
	forever list

If/When you need to stop the server or restart it.

	forever restartall