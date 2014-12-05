whats-in-the-fridge
===================

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
