---
title: Using a Key
template: reference.hbs
columns: three
order: 6
---
Every key is connected to three things; your application, a Fresh Vine customer (organization), and a Fresh Vine user. 

Using a key is involves including three pieces of information when making a request.  

*   **Key** as *FVkey* - the key for their account and data  
*   **Application ID** as *FVappid* - sometimes refered to as a client_id  
*   **Application Secret** as *FVsecret* - generated when your account was created. Only needed for authentication.  
  
These components must be supplied for every request made.  


## Making a Request
It only requires 2 pieces of information to authenticate your application. Your application ID, and the key. This allows use to verify that your key is only being used by your application.


```http
GET
http://api.freshvine.co/users/me?
	FVkey=USER_GENERATED_KEY
    &FVappid=YOUR_DEVICE_CODE_APP_ID
```