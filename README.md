Create env from template: ```cp example.env .env``` (only once)    
Run: 
<li> poetry install </li>
<li> docker network create db55</li>
<li> docker run -d --name db54 -p 5432:5432 --network=db55 -e POSTGRES_PASSWORD=password postgres -d postgres </li>
<li> docker run -it --rm --network=db55 postgres psql -h db54 -U postgres </li>  
<li> create database sqlmodeldb;</li>
<li> \q</li>
<li> python3 create_database.py </li>
<li> uvicorn main:app --reload </li>
<li> npx create-react-app .</li>
[//]: # (<li> yarn add nuxt</li>)
[//]: # (<li> yarn add @nuxtjs/vuetify @nuxtjs/axios </li>)
<li> yarn add axios </li>
<li> yarn start </li>
</ul><br />
## TODO 
