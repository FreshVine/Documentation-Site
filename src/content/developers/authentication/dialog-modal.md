---
title: Approach - Dialog Modal 
template: reference.hbs
columns: three
order: 3
---
# Auth Approach: Dialog Modal  

Dialog Modals (generally used with oAuth) is a obiquitious approach to API authenticaion. We have a complete oAuth/dialog workflow that you can use with your application. This approach does not require the user to leave your platform to enter data into Fresh Vine or generate a key - instead it relies on a modal window that you can often integrate into your application.  
  
**Ease of use for the User**  
Many of the Fresh Vine users would not describe themselves as very comfortable with technology. Because of this, if you are building a service or tool you hope to see wide adaptation for - dialog modals are the way to go. It allows the user to simply enter their credentials and grant you access. No copy/pasting, or sending keys around.  
  
**Clear definition of Permisions Used**  
Fresh Vine covers a lot of ground and users have access to different parts of the software. Using the dialog modal approach allows users to see what permissions your application requires - and clearly shows that what permissions they might be lacking.  
  
  
## Authentication Flow

### Step 1) Launch the Modal
If you do not have a valid tokens you need to start the process by requesting a device code. The only 1 is required `client_id`:  
  
* **client_id**  
*Required* This is your application id.  
* **scope**  
*Optional* Comma seperated list of your scope values. When not set your device code will generate with the default scope set for your app.  
* **state**  
*Optional* Customized state that will persist through initial tokenization.  
  
The `grant_type` is assumed based on the request URI to be `device_code` and any set value will be ignored.

```http
https://api.freshvine.co/1/auth/oauth/authorize?client_id=34987&response_type=code&redirect_uri=https%3A%2F%2Fapigee.com%2Foauth_callback%2Ffreshvine%2Foauth2CodeCallback
POST
https://api.freshvine.co/auth/oauth/authorize?
    &client_id=YOUR_APP_ID
    &response_type=COMMA_SEPERATE_LIST_OF_SCOPE
    &redirect_uri=PERSISTS_THROUGH_INITIAL_TOKENIZATION
```
---