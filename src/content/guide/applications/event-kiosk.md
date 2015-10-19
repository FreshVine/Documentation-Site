---
title: Event Kiosk
columns: two
template: guide.hbs
order: 5
---

# Fresh Vine {{title}}


## Quick Start with the Kiosk

We recommend the GK420d model Zebra printer. There is a link to it on the Event Kiosk Page (though you don't need to purchase it from Label Value).  


### Setting up the Event Kiosk App  

After you've installed the app the screen will prompt you with a 6 digit code. Even if that window goes away the code will still work for 5 minutes. Enter it into your Fresh Vine account. You do this from the My Apps page (click on the user menu on the top right, then My Apps). On this page you click the 'Enter Code' button. Approve the Kiosk and you're data will start syncing in a few seconds.  
  
### Enabling the Kiosk  

You'll notice that every event, service, and service template page has an Event Kiosk settings box. Simply click the enable button and you're event/service will show up on the kiosk. You can further configure the appearance and some of the basic functionality from that settings box.  

### Connecting the Printer

Ensure you are using a printer that supports one of our supported label sizes. We have a Dymo and Zebra printer label that was support. Before you open the Event Kiosk App settings make sure you note the Admin Code on your [Event Kiosk]() page (in the purple box). The default code is 1905.  
  
Make sure that you install the drivers for your printer from the Manufacturer - not the ones that automatically are found by Microsoft or Apple (this has been known to cause the labels to print weird).  
  
In the application you click on the gear icon on the bottom left. Enter the Admin Code, and then click on the 'Change' button next to the Label & Printer section. We've gone to great lengths to make the setup easier for you, all you need to do is select your printer and the label size. You should be able to print a 'Test' label that will include 2 thin borders, or a sample pack of each available label.  
  
### Event Kiosk Function  

General - Allows anyone to use the kiosk to attend your event

Ticketed - Only allows those who already have a ticket to attend your event

Service and Groups - Allows anyone to use the kiosk to attend a Service, or any meeting groups

Only Groups - Allows anyone to use a kiosk to attend any groups meeting during a service.


### Splash Background Image  

You should ensure that your image is the correct size for your kiosks. It should be the same resolution as the device screen (minus the 43 pixel height of the bottom bar). The Kiosk will ensure that there is no background color showing. It will clip the either the top/bottom or left/right sides to fill the window.  

## Printing Labels


### Testing your Printer
![Label Config](/assets/images/event-kiosk/label_config.jpg)

### Windows Label Setup
  
Configuring the Label Printer in Windows:  
1.  Open the Control Panel  
1.  Located in your Program Files menu at Accessories -> System Tools ->Control Panel  
1.  Under the Hardware and Sound heading click on Printer  
1.  Right click on your label printer and select Properties  
	[If your label printer is not listed here, please install your printer]  
1.  On the bottom of the ‘General’ tab click the button labeled ‘Printing Preferences...’  
1.  On the lower right hand portion of this new window click the button labeled ‘Advanced...’  
1.  This new window shows you the default settings for the printer. Set the Paper/Output -> Paper Size  
      Dymo printers select: 30323 Shipping
      Zebra printers select: 4.00x2.00”
1.  Click ‘OK’ on each of the three windows to save your changes, and close the printer preferences and control panel. Your printer should now correctly set for printer paper size.

### Mac Label Setup  

The reason that it is more difficult to get configured on a Mac is because of how the operating system handles default printer settings (instead of setting defaults by printer, it sets a default print and a default paper size). Here is one way that you should be able to work around this issue.  

Each user on a Mac has their own settings. By creating a new user on the Mac for Check In, you can set the settings how they need to be for the printing and it should work as expected. Before we get into the steps for setting this up please ensure you are running the latest drivers for your printer. The ones included on your mac are likely out of date and could cause issues. [Dymo User Guide](http://www.dymo.com/en-US/dymo-user-guides) At time of writing the "DYMO Label Software v8.5.1 Mac" is the most recent.  

1. Create a new user profile from your mac's System Preferences. I used the name 'Check In' and didn't set a password so that it would be accessible to anyone. Once this account is setup switch over to it.

1. Create a Custom Paper size:
	- Open TextEdit (or any other program that will let you print)
	- "File -> Page Setup"
	- Select "Manage Custom Sizes" from the Page Size drop down
	- Add a new custom size using the key below.
	- Rename the custom size by double clicking on the default name. Set it to "Check-In Label" or something equally obvious.

    Dymo  
	Width: 2.13 | Height 3.97  
	Margins are Top: 0.23 | Left: 0.06 | Right: 0.04 | Bottom: 0.06

	Zebra  
	Width: 2 | Height 4  
	Margins are Top: 0 | Left: 0 | Right: 0 | Bottom: 0  

1. Open the system preferences and pull up the 'Print & Scan' window. At the bottom of the window there are default printer and default paper size options. Set the default printer to your label printer. Set the paper size to your label size we created in step 2.


1. Open the Check-In Application and navigate to the settings page. Put in your access code and click on the Set button next to the printer title. Choose your printer and select Landscape (the exception being those using a Zebra printer on windows who should choose Portrait).

1. **[Optional]** Since you've created a user account just for Check-In you can have the Check-In Application load automatically when that user logs in. Open System Preferences again, click on Users & Groups. Choose the Check In user from the left, and on the right half of the window you'll see two tabs - one of which says 'Login Items'. Choose the Login Items and then you'll notice you can add applications to this list. Simply click the plus icon, navigate to where you installed the Fresh Vine Check-In App (most likely in the applications folder) and set it to open when the user logs in. Now, come time for checkin, all someone would need to do is choose the check-in user and everything will open up automatically.

Test it, and ensure that it is all working correctly.