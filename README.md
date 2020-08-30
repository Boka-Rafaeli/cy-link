# cy-link

```
"cypress:chrome": "cypress run --browser chrome"
"cypress:open": "cypress open"
"cypress:verify": "cypress verify"
"cypress:run": "cypress run"
```

```
npm run -s cypress:run -- -e username=${{ secrets.TESTUSERNAME }},password=${{ secrets.TESTPASSWORD }}
```


```
docker build -t login-e2e-cypress .
docker run -it login-e2e-cypress -- -e username=$TESTUSERNAME,password=$TESTPASSWORD
```
