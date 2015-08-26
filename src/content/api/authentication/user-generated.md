---
title: Approach: User Generated Key 
template: reference.hbs
columns: three
order: 4
---
Users can generate a persistant key for your application to use. This is often the prefered approach for custom software, and plug-in development. The use simply logs into their account and generates a key that they can then send to you.  
  

## Generating the Key  
All the user needs to do is navigate to their 'My Apps' page and then click on the 'New Key' button. Once the key has been generated you have 10 days to register the key. This is the only time limitation placed on keys and is designed to keep keys that were lost from being used maliciously.  

## Register the Key  
This key is 95% ready to go, all you need to do is quickly register that key for your application.   


**Register the Key**  
This will verify your application id with your application secret. Then it will register the key to your application. The scope and state fields are optional. The scope will assume the scope setup with your application. State will simply persit through a successful registration.
```http
POST
http://api.freshvine.co/auth/key/register?
	FVkey=USER_GENERATED_KEY
    &FVappid=YOUR_DEVICE_CODE_APP_ID
    &FVsecret=YOUR_APP_SECRET
	$scope=REQUESTED_SCOPE
	&state=registering
```


**Registration Success**  
A successful registration will return a similar structured response.
```json
{
  "success": true,
  "message": "The key has been registered to your application"
  "scope": "Scope Granted, For, Your, Token",
  "state": "Persisted Since Code Request"
}
```

## Scope Limits  
The scope is not verified until your first request after registration. This is due to a limitation on how the fresh vine API is structured.  

## Possible Issues

