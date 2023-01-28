# Assesment_Backend
​
​
### Documentation:
​
The following project use a No SQL database in Moongo DB . The principal idea is that any user can create different favourite lists focus on their thoughts .
Every list have the name of the person who create the list. 
​
To run the program you need to write: 
​
## npm run dev 
​
After you will need a software similar to Postman to create users and favourite list. First, you need to create an user with the following endpoint:
​
 http://localhost:8080/api/users
​
Also, you need the following structure in the format JSON (method POST):
​
```
{
        "userName":"xxxxx",
        "email":"xxxxx",
        "password":"xxxxx"
    }
    
    
 ```
    
On the other hand, to generate the token in order to have accessibility to delete,create or update any list you need to log in. Use the following format in the Method
POST. 
​
```
URL:  http://localhost:8080/auth/local/login
​
{
    "email":"XXX",
    "password":"XXXX"
}
​
```
​
To create an event you will need to introduce the token  Authorization "Bearer Token" in the following URL :  http://localhost:8080/api/event
method POST
```
{
    "name":"Universal Century Fest",
    "date":"2023-03-14T12:00:00.000+00:00",
    "country":"Colombia",
    "city":"Medellin"
}
```
To create an favList you will need to introduce the token  Authorization "Bearer Token" in the following URL :  http://localhost:8080/api/fav
method POST
Also is created with an empty array and you can add and delete events from the array list from the router.patch('/:id', isAuthenticated, handleAddFav) and router.patch('/delete/:id', isAuthenticated, handleDeleteSingleFav);
```
{
    "name":"Collection",
    "title":"is not enough with a name?",
    "description":"collection about the red commet",
    "favoriteEvents":[],
}
```
​
createdBy needs the id of the logged in user . 
​
​
### Indicate which are the parts of the following url: 
​
https://backend.mega-app.com.co:8080/api/articles/search?docid=1020&hl=en#dayone
​
## Schema 
​
  - The scheme tells web servers which protocol to use when it accesses a page on your website.
​
![scheme](https://user-images.githubusercontent.com/79812118/211703173-05973314-2308-46a4-8f47-d698cfb25aae.jpg)
​
​
## Subdomain
​
  - A subdomain in a URL indicates which particular page of your website the web browser should serve up.
​
​
![subdomain](https://user-images.githubusercontent.com/79812118/211704333-05bee641-4884-4d7a-bc98-207b6b70cb23.jpg)
​
​
## Second level domain 
​
 - Your second-level domain (SLD) is the name of your website. It helps people know they’re visiting a certain brand’s site.
 
 
![second_level_domain](https://user-images.githubusercontent.com/79812118/211705781-c92309b9-cf00-4102-a6be-55e5a59e150e.jpg)
​
​
## Top level domain 
​
​
 - The top-level domain (TLD) specifies what type of entity your organization registers as on the internet.
For example, “.com” is intended for commercial entities. Similarly “.edu” is intended for academic institutions.
 
​
![top level domain](https://user-images.githubusercontent.com/79812118/211706164-e1c207fe-7960-473a-aa3a-27487faa7e2f.jpg)
​
## Port
​
  - The port  is focus on the channel where different servers will use. Browsers are required to connect to a particular port in order to access the resources on that server
  
​
​
![port](https://user-images.githubusercontent.com/79812118/211707358-0b1c4a99-6812-491b-8412-5ed1f5880838.jpg)
​
​
## The path 
​
​
  - The path shows which is the directory the server will have to request. However, paths are used to identify any route in the navigational structure of the website
​
​
​
![path](https://user-images.githubusercontent.com/79812118/211708060-afa98e3b-c654-4b04-a572-e8c3326024ef.jpg)
​
## The query 
​
  - " The question mark tell the browser that a query is being performed against a database where the data is stored." 
 
 
 ![the query](https://user-images.githubusercontent.com/79812118/211709509-65c25b58-90e7-44bd-9267-361099c817b3.jpg)
​
## The parameters
​
​
  - The parameters are the values that are being queried  while someone performs a search
​
![the parameters](https://user-images.githubusercontent.com/79812118/211709866-b171bd26-2b8f-4086-a5c0-fc31358cd432.jpg)
​
​
​
### Define what is a Web API, Restful and what are the statusCode 200-, 400-, 500-
​
## Web Api 
  - The ASP.NET Web API is an extensible framework for building HTTP based services that can be accessed in different applications on different platforms such as web, windows, mobile etc.
​
## Resfull Api
​
  - RESTful API is an interface that two computer systems use to exchange information securely over the internet. 
​
## status 200 (SUCCESSFUL RESPONSE)
​
  - Succeeded request deppeding of the method GET,POST, PATCH , PUT , DELETE 
​
## status 400 (CLIENT ERROR RESPONSE)
​
  - bad request: the server could not process the request because of any invalid data 
​
## status 500 (SERVER ERROR RESPONSE)
​
​
  - Internal server error : the server found and error that it  cannot handle
​
### When we talk about CRUD, what does it mean?
CRUD is the short form of Create, Read, Update, and Delete that are the key principles that API developers and programmers follow while constructing robust APIs. As per the industry’s standard, every API model is bound to follow all these four or a minimum of three principles during the execution. 
​