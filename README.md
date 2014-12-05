whats-in-the-fridge
===================
Download
``` 
git clone https://github.com/timcolonel/whats-in-the-frige/
cd whats-in-the-frige
```

Setup:

```
bundle install
figaro install
```

Put database username and password in config/application.yml

```
//For sqlite put:
DB_ADAPTER: sqlite3
DB_USERNAME: root
DB_PASSWORD:
```

Then create the database:
```
rake db:create
rake db:migrate
```
