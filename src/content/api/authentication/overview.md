---
title: Introduction
template: reference.hbs
columns: three
order: 1
---
# Authentication Overview  

The Fresh Vine API allows for 3 different approaches to authentication. Each has their own place, and once one is selected for your application it cannot be changed. If it comes to a point where you need a new approach you would need to create a new application.

## 3 Authentication Approaches  
There are three different approaches to authentication. It's best to choose the approach that best meets your needs. 
  
### Key  
Most developers perfer getting a single persistant key. Keys are the set it and forget it approach. You do not need to refresh keys like you do with the tokens. Every set of keys are attached to a specific user for a specific customer. It is not possible to get keys for a specific account without a user.  
  
There are 3 ways that keys stop working: user permissions/status change, application status/scope changed, or client account closed.  
  
**How to get your Key:**  
  
*	Device Code  
*	User Generated  
  
**How it Works**  
You include the generated Key and your app secret with all of your requests.  
  
### Tokens 
A tokenized approach to the API allows you to have users directly enter their credentials into your application through an oAuth modal, then receive tokens for your scope. This is the only approach that allows the user to sign in *within* your application. It also is a good approach for software that already has integrated with other services that are using tokens. This should allow you to simply drop the Fresh Vine api into your current service, without needing to build a new interface.  
  
**How to get your Tokens:**  
  
*	Device Code  
*	Dialog Modal  
  
**How it Works**  
When authorized you're given a device code. You then exchange that device code for an access token, and a refresh token. Each token is only valid for a defined period of time (access likely a few hours and the refresh token a few weeks).  Once your access token has expired, you can retreive a new set of tokens by using your refresh token.  
  
  
### Public  
There are a few public resources that you can access without a developer account, or have a user grant you privledges. These resources are restricted and read only.
  
**How to get access:**  
Don't need to do anything, just know the domain for the account you wish to access data from.  
  
**How it Works**  
You simply make a request of any public resource. Thats it.  

## Scope and Accessing Data  
  
When you setup your application you define the scope.   