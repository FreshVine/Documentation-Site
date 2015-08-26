---
title: Approach: Device Flow 
template: reference.hbs
columns: three
order: 2
---
# Auth Approach: Device Flow  

This approach is best used when your application cannot use the oAuth2 dialog approach, or does not allow for the easy entry of a user generated key. This will likely be due to these two issues:

* **Cross Site Scripting (XSS):**  
Same origin policy should block access to the content of the dialog window when not able to use a redirect URI.

* **User Input Restrictions:**  
Text input may be difficult for the user. In this case it may be easier for the user to use their browser to enter a code, then to do it in app.
  
  
## Authentication Flow

### Step 1: Request Device Code<a name="step1"></a>  
If you do not have a valid tokens you need to start the process by requesting a device code. The only 1 is required `client_id`:  
  
* **FVappid**  
*Required* This is your application id.  
* **FVsecret**  
*Required* Generated when your application was setup.  
* **scope**  
*Optional* Comma seperated list of your scope values. When not set your device code will generate with the default scope set for your app.  
* **state**  
*Optional* Customized state that will persist through initial tokenization.  
  
The `grant_type` is assumed based on the request URI to be `device_code` and any set value will be ignored.

#### Request  
Must be a POST request. Variables must be in the URI or as POST values.  
  
If you prefer your response to be in XML then add that extension to the URI.  

```http
POST
https://api.freshvine.co/auth/oauth/device/code?
    &FVappid=YOUR_APP_ID
    &FVsecret=YOUR_APP_SECRET
    &scope=COMMA_SEPERATE_LIST_OF_SCOPE
    &state=PERSISTS_THROUGH_INITIAL_TOKENIZATION


POST
https://api.freshvine.co/auth/key/device/code?
    &FVappid=YOUR_APP_ID
    &FVsecret=YOUR_APP_SECRET
    &scope=COMMA_SEPERATE_LIST_OF_SCOPE
    &state=PERSISTS_THROUGH_INITIAL_TOKENIZATION
```
  
#### API Response    

* `device_code`  
Users to poll for authenication in step 4. Case Sensitive.
* `user_code`  
Displayed to user in step 2. Numeric value.
* `verification_url`  
Not used with Fresh Vine (each account has it's own subdomain).
* `expires_in`  
Number of seconds before the device_code expires
* `interval`  
The fastest in seconds you are allowed to poll for state changes on your device_code
* `state`  
Provided as a reminder of the state supplied during your request.

```json
{
  "device_code": "f3e3d0b6b626182f7f03892a6a9bf9a6",
  "user_code": "432324",
  "verification_url": "",
  "expires_in": SECONDS_CODES_ARE_VALID,
  "interval": MAX_POLLING_INTERVAL_IN_SECONDS,
  "state": "PERSISTS_TO_TOKENIZATION"
}
```

### Step 2: Display Code to User & Authorizes your App<a name="step2"></a>  

Once the response is received it is time to display the `user_code`. While the user is entering the code, you will need to begin polling for a response  - [see step 4](#step4).  
  
Here is an example message to display.


Authorize APP_NAME
Enter the code into Fresh Vine
432 324

  
### Step 3: User enters code into Fresh Vine<a name="step3"></a>  
This step is for the user while you poll.  The user must:  

1. Log into their Fresh Vine account  
1. Clicking on the **Enter Application Code** button  
1. Choose to grant your application permission.  
  
The polling response will let you know when the status of your device_code is altered.  

### Step 4: Polling for App Authentication<a name="step4"></a>
This is the phase when you will be checking for changes to your `device_code` based on the activity the user is performing. In the initial code request - [see step 1](#step1) - you were given an `interval` that represents the number of seconds between polling requests.  
  
Checking for changes to your device code will let your application understand what is happening and how to proceed.  

#### Request Fields:
  
* **FVappid**  
*Required* This is your application id.  
* **device_code**  
*Required* Your device code fro this request. Supplied to you during the code request in [step 1](#step1)
  
The `grant_type` is assumed based on the request URI to be `device_token` and any set value will be ignored.

#### Request  
Must be a POST request. Variables must be in the URI or as POST values.

```http
POST
https://api.freshvine.co/auth/oauth/device/polling?
    &FVappid=YOUR_DEVICE_CODE_APP_ID
    &FVsecret=YOUR_APP_SECRET
    &device_code=YOUR_DEVICE_CODE


POST
https://api.freshvine.co/auth/key/device/polling?
    &FVappid=YOUR_DEVICE_CODE_APP_ID
    &FVsecret=YOUR_APP_SECRET
    &device_code=YOUR_DEVICE_CODE
```
  
#### Responses  
There are 6 possible responses. Each details the current state of the authenitcation process. All responses receive a response code of 400, except for Accepted (which is 200).

##### Authorization Pending  
Used has not yet processed the code. Continue to poll until there is a change.

```json
{
  "error": "auth_pending",
  "message": "Waiting on the user"
}
```

##### Authorization Slow Down  
Your polling requests are being received more frequently then the interval allows.  
  
If you don't slow down you're application may suspended pending review.

```json
{
  "error": "slow_down",
  "message": "Wow, you're excited. Slow down, please."
}
```

##### Authorization Expired  
The code has expired before the user was able to authenticate the app.  
  
The `device_code` and `user_code` are no longer active.  
  
**Best Practice:**  
Ideally you would not continue to generate new tokens, unless there is no user input with your app. Inform the user that the code has expired, and allow the user to request a new code. We suggest that you request a new device code - [see step 1](#step1).  


```json
{
  "error": "auth_expired",
  "message": "Your `device_code` has expired"
}
```

##### Authorization Rejected  
User rejected your application.  
  
The `device_code` and `user_code` are no longer active.  

```json
{
  "error": "auth_rejected",
  "message": "User has rejected your application"
}
```

##### Authorization Used  
The code has already been used and is no longer valid. This occurs for 2 reasons:

* It was already processed and tokenized.
* It was Rejected or Expired. And that response was previously sent.
  
The `device_code` and `user_code` are no longer active.

```json
{
  "error": "invalid",
  "message": "The `device_code` is no longer valid"
}
```

##### Authorization Accepted  
The user has entered the code, and authorized the application. This response will include your initial tokenization or keys.  
  
The `device_code` and `user_code` are no longer active.

**oAuth response**

```json
{
  "access_token": "1110ca16790e5098712ad9df1fe65553",
  "refresh_token": "a34d0f741ee3436ed9e4e86a3e6dfbb3",
  "expires_in": #### - seconds until access expires,
  "scope": "Scope Granted, For, Your, Token",
  "state": "Persisted Since Code Request"
}
```

**Key**

```json
{
  "access_key": "1110ca16790e5098712ad9df1fe65553",
  "scope": "Scope Granted, For, Your, Token",
  "state": "Persisted Since Code Request"
}
```

### Step 5: Make Requests of Fresh Vine API<a name="step5"></a>
Once you're device_code has been tokenized you are free to use the API to make your requests. Ensure that you manage your tokens correctly. If you're tokens are ever both expired, or rejected you will need to re-authenicate. For those of you using a key - this is not an issue for you. 

## freshvine-api.js  

If you are interested in how you might go about implementing a device flow check out our public project freshvine-api.js. Not only does it have a javascript based approach to using the API, but also has built in device flow support.