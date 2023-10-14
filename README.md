# Commerce
Front-end for an email client that makes API calls to send and receive emails.


## Video review: https://www.youtube.com/watch?v=Q5ZR2Hua-0I


## Getting started
<pre>
$ pip install -r requirements.txt
$ python manage.py runserver
<kbd>Ctrl</kbd>+<kbd>C</kbd> - to shut down the server. 
</pre> 

## Content
1. [Models](#Models)
    1. [User](#User)
    2. [Email](#Email)
2. [Send mail](#Send-mail)
3. [Mailbox](#Mailbox)
4. [View email](#View-email)
5. [Archive and unarchive](#Archive-and-unarchive)
6. [Reply](#Reply) 

## **Models**

Here you will find a description of the models that are used.

## User

This model contains the **username**, his **email** and **hashed password**.
Used for registering, logging in, sending mails and reading them.

## Email

This model contains the **user** recipient, **sender**, **recipients**, **subject** and **body** of the letter, **timestamp** and status, whether the message was **read* and whether it was **archived**
Used to work with emails.

## **Send mail**

When user submits the email composition form, JavaScript code send the email.


## **Mailbox**

When a user visits their Inbox, Sent mailbox, or Archive, loading the appropriate mailbox.

## **View email**

When user clicks on an email, the user is taken to a view where they see the content of that email.

## **Archive and unarchive**

Allow users to archive and unarchive emails that they have received.

## **Reply**

Allow users to reply to an email.

## **Django Admin Interface**

To create a superuser account that can access Django’s admin interface:
<pre>$ python manage.py createsuperuser </pre>
Site superuser able to view, add, edit, and delete any listings, comments, and bids made on the site.
To open superuser's console:
<pre>http://127.0.0.1:8000/admin/</pre>
