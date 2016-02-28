---
title: Payments
order: 10
columns: two
template: guide.hbs
---

# {{title}} Module  
The payments module allows you to accept and manage payments through Fresh Vine. In order to make use of the payments module you must setup an account with an integrated provider, and then connect your account with that provider.  
  
## Choosing a Payment Provider  
We do not have the ability to process payments on your behalf. To focus on providing the best membership software the decision was made to rely on third party providers for this service. Once integrated your community and seamlessly utilize their payment and donation features within Fresh Vine. All sensitive data is stored and left with your selected provider. Fresh Vine keeps a sanitized form of the data, nothing more than you would find on a receipt from your local coffee shop.  
  
All of our partners have an emphasis on processing payments for nonprofits. But each provider has a different fee structure, and offers different services. This allows you to find the right fee structure and mix of services for the way your nonprofit works. Some of them are 100% focused on online transactions. While others have a selection of real world hardware for accepting payments and donations. We want to make sure that all of our customers can find a great provider to partner with you.
  
Every integration with Fresh Vine will give you the same experience inside of Fresh Vine. In order to become a partner they must be able to functionally allow the complete integration with Fresh Vine. So let us focus on maintaining and improving your payment experience in Fresh Vine. You keep your eyes and efforts on your mission.  
  
## Connecting Fresh Vine and your Provider  
This process has been streamlined to ensure it is as simple as possible to get your Fresh Vine account connected to your Payment Provider.  
  
1.  Navigate to the Payment Provider page: Admin -> Payments -> Providers.  
1.  Find your Payment Provider, and click on its **'Connect'** button. This will open a window to connect.  
1.  If you don't already have your credentials locate them by clicking *'Get your Credentials'*  
1.  Enter your credentials into the form.  
    *  **Earliest Transaction Date**: Defaults to 5 years ago, allows you to exclude transactions before this date. Useful if you have previously manually entered contributions.  
	*  **Online Donation Method**: Which giving method will all contributions be entered with.  
1.  Once the form is filled out click the **'Add Provider & Sync'** button.  
    This will verify that your credentials are correct, and then perform an initial synchronization of data from your provider. Depending on the amount of data you currently have with your provider this sync might take a couple minutes.  
1.  The next step you'll need to map some data between your Provider and Fresh Vine. This is to ensure that data is correctly imported into Fresh Vine. Any unmapped profiles will keep Fresh Vine from importing transactions, and payment methods.
	*  **Map Profiles**: Allows you to connect the donor profiles from your provider with profiles in Fresh Vine.  
	*  **Map Giving Funds**: Same as the mapping the profiles, but with funds.
  
## Synchronizing your Data  
Once a day your account will automatically synchronize data between your Provider and Fresh Vine. You can sync the data more frequently from the Payments Dashboard by clicking on the sync button.  

### Daily Sync
Once a day your information is synchronized automatically from your Provider. If any transactions are imported you will receive a notification with a  link to view those transactions. If there are any new Donor Profiles, or Funds that require your attention to map you will also receive notifications for those. Once everything is mapped the next sync will bring in data related to those new additions.  
  
### Manual Sync
From time to time you might need to synchronize the data before the next automatic cycle. You can do this from the Payments Dashboard. Just click on the green **Sync** button and let it run. Depending on the number of donors and transactions it may take anywhere from 15 seconds to several minutes. The page will reload when the process is complete.  
  
### Data Processed with each Sync
When the synchronization is run it will step through each of the following steps. 

*  **Payment Sources**: Store the available sources: ACH (Savings & Checking), American Express, Discover, Master Card, and Visa.  
*  **Payment Frequencies**: What are the intervals for Recurring Payments
*  **Donor Profiles**: Profiles on file with your Provider
*  **Funds**: Fund designations on file with your provider
*  **Payment Methods**: The active payment methods for each mapped donor profile.
*  **Recurring and Future Payments**: 
*  **Transaction History**: After your initial sync Fresh Vine will import all new transactions daily, and look for changes to transactions from the previous 6 weeks.
  
  
## Disconnecting your Provider  
Once disconnected from a provider Fresh Vine is unable synchronize. All of the stored credentials will be cleared out.
  
1.  Navigate to the Payment Provider page: Admin -> Payments -> Providers.  
1.  At the top of the page you'll see the provider your account is currently connected to.  
1.  Click on the **'Disconnect'** button beneath the provider.  


