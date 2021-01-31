const fetch = require('node-fetch');
const credentials = require('./resources/credentials.json');
const formd = require('form-data');
const fs = require('fs');

let form_data = new formd();


form_data.append("file", fs.createReadStream("./resources/localizable.strings"));
form_data.append("fileUri", "./resources/localizable.strings");
form_data.append("fileType", "ios");  

console.log(form_data)
function authentication() {
    fetch('https://api.smartling.com/auth-api/v2/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             'accepts': 'application/json',
          },
          body: JSON.stringify({
              "userIdentifier": credentials.userIdentifier,
              "userSecret": credentials.userSecret
          })
    })
    .then(response =>  response.json())
    .then(response => {
        console.log("from auth", response) 
      })
}

function refresh() {
    fetch('https://api.smartling.com/auth-api/v2/authenticate/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             'accepts': 'application/json',
          },
          body: {
              "refreshToken": 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJlNDMyNzE1Ni1lM2JkLTRhMzUtOWM2Ni0zOWQzZWRjMGM2NzciLCJleHAiOjE2MTE5NzIzMjgsIm5iZiI6MCwiaWF0IjoxNjExOTUwNzI4LCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsInN1YiI6ImY3NWMyM2RlLTIyMDktNDBmZC1hYzFiLTVjOWYzMGY4ZDBiYyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6IjIyZWM5MTdjLTI5OTMtNDRkOS05OWJkLTNiMTdhNTAzNGVkOSIsImNsaWVudF9zZXNzaW9uIjoiZWZjMzU1YjUtOTMzMS00YTYyLTkyODEtNzZlNjAxOTNiY2YwIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX19.kg1q6tz_YuHgINj79JYbtq6-vyhZiPYgj0jF-ndlV48QYYQ6yzNNBjAynPUowEbwy3bPhuHibE8R2yTN9Nw2PJFjIazH7O8141EnSUBRdYOrddiQOWGxSAFOGE47-2VkZz-Zs_810z2v3pZd_YI9wrgBg6vNslkZr3HFeMyysEs'
          }
    }) 
    .then(response => { if (response.code !== "SUCCESS"){
        console.log(response)
    }
    response.json()})
    .then(response => {
        console.log("from auth", response.data)
        
        // uploadFile(token);
      })
}

function tester() {
    console.log(strfile)
}

function uploadFile() {

    // console.log(form_data);
    let token = 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJiM2ZmZjMzNS0wNWE5LTQyMjMtOTBjOS0wOTY4NTFkNTk5ZDQiLCJleHAiOjE2MTIxMjcyODAsIm5iZiI6MCwiaWF0IjoxNjEyMTI2ODAwLCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsImF1ZCI6ImF1dGhlbnRpY2F0aW9uLXNlcnZpY2UiLCJzdWIiOiJmNzVjMjNkZS0yMjA5LTQwZmQtYWMxYi01YzlmMzBmOGQwYmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6IjIyYWE0YzM3LTU0MWYtNDVjZS1hYThlLWUzZDMyM2IxNzYyYSIsImNsaWVudF9zZXNzaW9uIjoiY2U4NWEzYWYtZDgzNS00ODRhLWExOWMtZjhiOTk3Y2ZhNzk1IiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInVpZCI6Ijc0ODU5OTdjYzJmYyIsIm5hbWUiOiJNYWxjb2xtIFN0YXNvIFBSRSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSIsImdpdmVuX25hbWUiOiJBUEkgVXNlciIsImZhbWlseV9uYW1lIjoiTWFsY29sbSBTdGFzbyBQUkUiLCJlbWFpbCI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSJ9.bECjSEitF_nml0_D-yPbl48C_gDVntd66ro2D0G2XHfONSztMbt6nOM3i8QwBWQLVPbSWxuEz3HAyibZklzq5Zbb_qEKHJAEPj159aXmBjRpwcXT14vyKj6B2Af8z024R5D0bEqcWpnVyA2tMjnEtdcIX9g93250SAcNtgzIEz8'
    fetch(`https://api.smartling.com/files-api/v2/projects/${credentials.projectId}/file`, {
        method: 'POST',
        headers:{
        
            "Authorization": `Bearer ${token}`,
        },
        body: form_data
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(response => console.log("from file Upload", response))
}
    
    


uploadFile()
// accessToken: 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJiM2ZmZjMzNS0wNWE5LTQyMjMtOTBjOS0wOTY4NTFkNTk5ZDQiLCJleHAiOjE2MTIxMjcyODAsIm5iZiI6MCwiaWF0IjoxNjEyMTI2ODAwLCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsImF1ZCI6ImF1dGhlbnRpY2F0aW9uLXNlcnZpY2UiLCJzdWIiOiJmNzVjMjNkZS0yMjA5LTQwZmQtYWMxYi01YzlmMzBmOGQwYmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6IjIyYWE0YzM3LTU0MWYtNDVjZS1hYThlLWUzZDMyM2IxNzYyYSIsImNsaWVudF9zZXNzaW9uIjoiY2U4NWEzYWYtZDgzNS00ODRhLWExOWMtZjhiOTk3Y2ZhNzk1IiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInVpZCI6Ijc0ODU5OTdjYzJmYyIsIm5hbWUiOiJNYWxjb2xtIFN0YXNvIFBSRSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSIsImdpdmVuX25hbWUiOiJBUEkgVXNlciIsImZhbWlseV9uYW1lIjoiTWFsY29sbSBTdGFzbyBQUkUiLCJlbWFpbCI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSJ9.bECjSEitF_nml0_D-yPbl48C_gDVntd66ro2D0G2XHfONSztMbt6nOM3i8QwBWQLVPbSWxuEz3HAyibZklzq5Zbb_qEKHJAEPj159aXmBjRpwcXT14vyKj6B2Af8z024R5D0bEqcWpnVyA2tMjnEtdcIX9g93250SAcNtgzIEz8'
// refreshToken: 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJiZDhjNzE0Mi04ZDJlLTQ1ODYtOWIxZC1mNTM5NmZiZGY4MDciLCJleHAiOjE2MTIxNDYzMjQsIm5iZiI6MCwiaWF0IjoxNjEyMTI0NzI0LCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsInN1YiI6ImY3NWMyM2RlLTIyMDktNDBmZC1hYzFiLTVjOWYzMGY4ZDBiYyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6ImI3YTNhMjkwLTFiMTgtNDdkOS1hY2JmLTQ1YTVkZmNjOGYzOSIsImNsaWVudF9zZXNzaW9uIjoiNGEzMGI3OGQtZjRmMy00YTJhLWE3ZTMtYjI4ZmQ3Y2Q4YTY4IiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX19.dudHpR1mfV9XgCZiwJnhgBWq7BWTJMzRGnBegfaxl5VDwZVhUoCYXtQGKB8OElq2Olse9LU22wkmnwKCfXI4BdOmRvKAnCMpU2rc7QCg2O49kEj2CNraHuIxVHRUubq0f1X1uG9Q1i3NJo0aktC5_Flq6tF4JJp3VceI-HZ6ggM'