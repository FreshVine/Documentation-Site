---
title: HTTP Status Codes 
template: reference.hbs
columns: two
order: 4
---
# API HTTP Response Status Codes  

The status code responses are explicitly set. Pay your response code and ([wikipedia](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes)) you can easily understand the outcome of your requests.  
  
The HTTP Status Codes utilized by the Fresh Vine API listed below. Each also has a simple description of when you can expect to encounter them in the wild. It can be helpful to listen for response codes to help determine if your request correctly processed.  
  
  
## 2XX - Success
### 200: OK  
Everything has gone as expected. This is the default status and should be expected with every get request.  

### 201: Created  
Creation of new item successful. See the response data to learn more about the new content.  
 
### 204: No Content  
Removal of content was successful: The response you will receive upon the successful removal of an item or data by your request.  

### 3XX - Redirection

### 304: Not Modified
There have been no changes to the resource since your last request of it.


## 4XX - Client Error

### 400: Bad Request  
The request was invalid. An accompanying error message will explain why.  

### 401: Unauthorized  
Authentication credentials are missing/incorrect. You're attempting to access the API without supplying the required token.  

### 402: Payment Required  
Account you are connected to is overdue on their subscription payment.  

### 403: Forbidden  
Attempting to access a resource outside of your authenticated scope. This can happen after authentication if the user account has their permissions altered.  

### 404: Not Found  
Resource item/s that you are requesting do not exist.  

### 405: Method Not Allowed  
The request method is not among the available for the request.  
*Example:* fetching a person with a POST request.  

### 406: Not Acceptable  
Required criteria is not present to finish processing a request.  

### 429: Too Many Requests  
You've exceeded the number of requests you are allowed to make during a given time period.  


## 5XX - Server Error

These errors will likely not return content in a format that is usable. You should ensure that however you are making your requests that you escape out on all 500 level server errors.  

### 500: Internal Server Error  
Something is broken, really bad. Let us know so that we can bring things back online.  

### 502: Bad Gateway  
Fresh Vine is current offline for upgrading or scheduled downtime.  

### 503: Service Temporarily Unavailable  
Fresh Vine is online but far to popular at the moment. Try again later.  