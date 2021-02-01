const fetch = require('node-fetch');
const credentials = require('./resources/credentials.json');
const formd = require('form-data');
const fs = require('fs');
const FileSaver = require('file-saver');
const Blob = require('blob');
// const URL = require('url');
const FileReader = require('filereader');
const blob = require('blob');
const express = require('express');
const app = express();
const Window = require('window');

// const div = window.document.createElement('div');
const window = new Window();
let fileReader = new window.FileReader()
const JSZip = require("jszip");
const zip = new JSZip();
const { response } = require('express');
const { Z_PARTIAL_FLUSH } = require('zlib');

// const { url } = require('inspector');
// const { stringify } = require('querystring');
// const { finished } = require('form-data');

let form_data = new formd();


form_data.append("file", fs.createReadStream("./resources/localizable.strings"));
form_data.append("fileUri", "./resources/localizable.strings");
form_data.append("fileType", "ios");  


let form_data_image = new formd();

form_data_image .append("content", fs.createReadStream("./resources/context.png"));

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
    
    
function uploadImage() {
    let token ='eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJhYTZkODBiNC1mOWM5LTQ5NTgtYmE4MC04MmUxYzk1NWY4OGIiLCJleHAiOjE2MTIxMzE2ODMsIm5iZiI6MCwiaWF0IjoxNjEyMTMxMjAzLCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsImF1ZCI6ImF1dGhlbnRpY2F0aW9uLXNlcnZpY2UiLCJzdWIiOiJmNzVjMjNkZS0yMjA5LTQwZmQtYWMxYi01YzlmMzBmOGQwYmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6ImFjN2VjZWI5LTk3MjktNDIxMy1hMjlhLTZmZmNlNWMzZjhkOCIsImNsaWVudF9zZXNzaW9uIjoiNzUxMzQ0NWItOTM0NC00ZjE5LTlhNTctOTVhZTRmMmI2NmFmIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInVpZCI6Ijc0ODU5OTdjYzJmYyIsIm5hbWUiOiJNYWxjb2xtIFN0YXNvIFBSRSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSIsImdpdmVuX25hbWUiOiJBUEkgVXNlciIsImZhbWlseV9uYW1lIjoiTWFsY29sbSBTdGFzbyBQUkUiLCJlbWFpbCI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSJ9.R6aTlwr9dw6LJpOxrB0YH111_9gNDFn3Teqg2ENJPJoAt0pYSce4Wr6xJGIsxEQ3vvix9GeAJoZoqJRPxHGFDcpEKCuT2q7pVM7S_kT6HBYbkn4j5iSb9nNERfOdTZyAUCx8WvJ12Y-nSGlDzfaK3aWKm6NXm3FSfiOMmsDggQw'
    fetch(`https://api.smartling.com/context-api/v2/projects/${credentials.projectId}/contexts`, {
        method: 'POST',
        headers:{
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
            'accepts': 'application/json',
        },
        body: form_data_image 
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(response => console.log("from image Upload", response))

}

function contextMatching() {
    let token = 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIxMDI2NGQxNi0wNzNlLTQ2NTAtODkxZS1iZWZiN2JmNDZjZjciLCJleHAiOjE2MTIxNDU1MTQsIm5iZiI6MCwiaWF0IjoxNjEyMTQ1MDM0LCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsImF1ZCI6ImF1dGhlbnRpY2F0aW9uLXNlcnZpY2UiLCJzdWIiOiJmNzVjMjNkZS0yMjA5LTQwZmQtYWMxYi01YzlmMzBmOGQwYmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6IjRiOGFkNzIzLTM4OTUtNDliMS1iNjM0LWY3YmU5MjM1NjkzNCIsImNsaWVudF9zZXNzaW9uIjoiMTAzYmIxZTEtNDNiOS00ZjUwLWE3ZjgtNzA5ZDNiOWU1NmU0IiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInVpZCI6Ijc0ODU5OTdjYzJmYyIsIm5hbWUiOiJNYWxjb2xtIFN0YXNvIFBSRSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSIsImdpdmVuX25hbWUiOiJBUEkgVXNlciIsImZhbWlseV9uYW1lIjoiTWFsY29sbSBTdGFzbyBQUkUiLCJlbWFpbCI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSJ9.H_Ebxx4Ez-RwDjKvRNc41KcaVmBc9azyTt93jyE0aqWHAKqd4zIturiGmz6CEhA1j6KDpjSf0xFirRI31Eokj6qcasIwZpGiPGOS_3rEvI1Ng5vPAL9KrgI507xIWLnYqs3M0iF9YXCSe4NNLGdefjVLV8TziEUo8iUwrjLAS7Q'
    let contextUid = '30165a0b-bacd-4014-bcb4-e01bd85b2b1c'
    fetch(`https://api.smartling.com/context-api/v2/projects/${credentials.projectId}/contexts/${contextUid}/match/async`, {
        method: 'POST',
        headers:{
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
            'accepts': 'application/json',
        },
        body: JSON.stringify({
            'contentFileUri': "./resources/localizable.strings"
        })
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(response => console.log("from context matching", response))   
    
}

// const fileStream = fs.createWriteStream("translate.zip")
 

function projectDetails(){
    let token = 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI5Y2ZhNmY1ZC0xNGRlLTQ0YjEtYmY5YS1kNzkyYWI0YTBlZmYiLCJleHAiOjE2MTIyMTMzMjAsIm5iZiI6MCwiaWF0IjoxNjEyMjEyODQwLCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsImF1ZCI6ImF1dGhlbnRpY2F0aW9uLXNlcnZpY2UiLCJzdWIiOiJmNzVjMjNkZS0yMjA5LTQwZmQtYWMxYi01YzlmMzBmOGQwYmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6ImRiNGJkMzFkLWUwMjgtNDA3Mi1iYjlmLWE4NTJkZTU3MzZjOCIsImNsaWVudF9zZXNzaW9uIjoiNmU0ZTk4OWMtYzcxYy00NzAwLTgzNTQtNjgzMWE3NTFkZWIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInVpZCI6Ijc0ODU5OTdjYzJmYyIsIm5hbWUiOiJNYWxjb2xtIFN0YXNvIFBSRSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSIsImdpdmVuX25hbWUiOiJBUEkgVXNlciIsImZhbWlseV9uYW1lIjoiTWFsY29sbSBTdGFzbyBQUkUiLCJlbWFpbCI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSJ9.gcESJFavQ4B2GdXHynNM0Ub_AWfkPaJvu3yOQmzPXmCt1-ayiLbNZameY2g_Kn6UyfnbToT9kN536qb4zhoJk_wSaPXnlnvabAbHl4qG2NJCQvIm5Kg_B4WPwl1lNr13FkRarCcT1ny6rthJ74UuFA7BOwCwwy6v5fRTa3WhTUs'
    fetch(`https://api.smartling.com/projects-api/v2/projects/${credentials.projectId}`, {
        headers:{
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
            'accepts': 'application/json',
        },
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(response => console.log(response.data))   

}

function listLocales(){
    let token = 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJkNDhjNDRmNi1mNWZlLTQ3ZWMtYWFmOC1lODhkNDQ4MzQ5ZTQiLCJleHAiOjE2MTIyMTI5NjMsIm5iZiI6MCwiaWF0IjoxNjEyMjEyNDgzLCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsImF1ZCI6ImF1dGhlbnRpY2F0aW9uLXNlcnZpY2UiLCJzdWIiOiJmNzVjMjNkZS0yMjA5LTQwZmQtYWMxYi01YzlmMzBmOGQwYmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6ImRlMDU3OWNhLTgyZDgtNGRkZC1hY2QxLTQyY2MxMzI2MTc4NSIsImNsaWVudF9zZXNzaW9uIjoiMDVmZDYzOWQtYmZmYS00ZTRlLWI5MWYtOGU0M2YxYzJkZmE2IiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInVpZCI6Ijc0ODU5OTdjYzJmYyIsIm5hbWUiOiJNYWxjb2xtIFN0YXNvIFBSRSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSIsImdpdmVuX25hbWUiOiJBUEkgVXNlciIsImZhbWlseV9uYW1lIjoiTWFsY29sbSBTdGFzbyBQUkUiLCJlbWFpbCI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSJ9.NZ9XixWImFVZxoDzzeIC6MyaO3R-vxefsbjeol9A_PuRJPEls8XhDXH2nS7v4IygQjC7-1izd_08TNdqld5bxYuSAq-IKOgLIqwvg04zJyZMtbPLpB5FvvwxVZGjlmZ0hC2jwbHHbKfnPBYkNsaN1XXteaubQNqinSGTvJN5P3g'
    fetch(`https://api.smartling.com/locales-api/v2/dictionary/locales`, {
        headers:{
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
            'accepts': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => console.log(response))   

}

function str2bytes (str) {
    var bytes = new Uint8Array(str.length);
    for (var i=0; i<str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

function downloadFile() {
    let token = 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJkMmVkZTczZS1hMmNhLTRhYzMtYWQ4Ni0yMjYyYmRiZDk4YzAiLCJleHAiOjE2MTIyMTkyMzQsIm5iZiI6MCwiaWF0IjoxNjEyMjE4NzU0LCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsImF1ZCI6ImF1dGhlbnRpY2F0aW9uLXNlcnZpY2UiLCJzdWIiOiJmNzVjMjNkZS0yMjA5LTQwZmQtYWMxYi01YzlmMzBmOGQwYmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6ImM2NmQxOWMxLTI5YjctNDZjMC1hMzhmLTQwOGRjMGM0NjM1ZiIsImNsaWVudF9zZXNzaW9uIjoiZDMwZWMyNjItNjY4YS00NjE5LTk5MDItZjU5YTYwMzJjODFjIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInVpZCI6Ijc0ODU5OTdjYzJmYyIsIm5hbWUiOiJNYWxjb2xtIFN0YXNvIFBSRSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSIsImdpdmVuX25hbWUiOiJBUEkgVXNlciIsImZhbWlseV9uYW1lIjoiTWFsY29sbSBTdGFzbyBQUkUiLCJlbWFpbCI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSJ9.C9IyEtUK7dTdFdpxge4_-1GqCz5DxaRGdgfKz7RQEv5xXhrrZcE2Cq67lH_OUIw-eF2Rgd9eYTQww_hlVTAlh2LG6mrj-P60V_G28tkKPHTRUoqHXpHvqJZ1S1T_Zll0rXpplC_buYWaupYq6ITmLgQAolaxyfaklBduapTwSLY'
    fetch(`https://api.smartling.com/files-api/v2/projects/${credentials.projectId}/locales/all/file/zip?fileUri=./resources/localizable.strings`, {
        headers:{
            "Authorization": `Bearer ${token}`,
            "Accept": 'application/zip',
        }
    })
    .then(response => response.blob())
    .then(response => {
        zip.file("translate.zip", response)

    //    fs.writeFile("translation.zip", response,(err) => {
    //     if (err) throw err;
    //     console.log("success");
    //   });
        // let blob = new Blob ([new Uint8Array(response)])
        // console.log(blob)


    })
      
        // fs.createReadStream(response);
     

        // let newurl = fileReader.readAsDataURL(response)
        // console.log(response.type, objecturl)
        // 
        // console.log(newurl)
        // fs.createReadStream(newurl)
        // fileReader.readAsBinaryString(response)
        // readAsBinaryString()
        // console.log(response.constructor.name === 'Blob')
    //   let saveFile =  fs.createReadStream(response)
        
      

        // response.arrayBuffer().then(response => fs.readFileSync(response))
        // console.log(response)
        // fs.createReadStream(response)
        // const newurl = URL.createObjectURL(response)
        // console.log(response.type)
       
            // let url = URL.createObjectURL(response)
            // console.log(url)
            // response.arrayBuffer().then(response => console.log(response))
       
    .catch(error => console.error(error))
}

function handleData() {
   console.log(downloadFile())
}

// handleData()

downloadFile()

// accessToken: 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJlNGEyNDEwZC00NTFmLTQ3ZDEtYmQyNy03NDE3MmU2ZGI4ZDMiLCJleHAiOjE2MTIxNDk5MjgsIm5iZiI6MCwiaWF0IjoxNjEyMTQ5NDQ4LCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsImF1ZCI6ImF1dGhlbnRpY2F0aW9uLXNlcnZpY2UiLCJzdWIiOiJmNzVjMjNkZS0yMjA5LTQwZmQtYWMxYi01YzlmMzBmOGQwYmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6IjM2ZTRkOGVlLTdkZmEtNDE3OC1iMTExLTE2ZmNkODQ5MGVhNyIsImNsaWVudF9zZXNzaW9uIjoiYzQ5ODRlYjYtMjNlZC00MzhhLWIyZGMtMDg1ZTc4M2MxNGI0IiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInVpZCI6Ijc0ODU5OTdjYzJmYyIsIm5hbWUiOiJNYWxjb2xtIFN0YXNvIFBSRSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSIsImdpdmVuX25hbWUiOiJBUEkgVXNlciIsImZhbWlseV9uYW1lIjoiTWFsY29sbSBTdGFzbyBQUkUiLCJlbWFpbCI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSJ9.iOmfLiV2yf1MsstpCn2Dh5ELFEwqYHMYWlDyjBMotPU4W0pTPgwHSJhZY8mFHRkWXw6xjY9QHqVutCwBDIMuMCbk4FLvRPEuMk5u5GQZmEPlIiDsInyoOIwF9SBZABEz-Jhufltjn9sb-Fx52Iq35JAKjYVteuInI1caHqkjRNs'
// refreshToken: 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJiZDhjNzE0Mi04ZDJlLTQ1ODYtOWIxZC1mNTM5NmZiZGY4MDciLCJleHAiOjE2MTIxNDYzMjQsIm5iZiI6MCwiaWF0IjoxNjEyMTI0NzI0LCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsInN1YiI6ImY3NWMyM2RlLTIyMDktNDBmZC1hYzFiLTVjOWYzMGY4ZDBiYyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6ImI3YTNhMjkwLTFiMTgtNDdkOS1hY2JmLTQ1YTVkZmNjOGYzOSIsImNsaWVudF9zZXNzaW9uIjoiNGEzMGI3OGQtZjRmMy00YTJhLWE3ZTMtYjI4ZmQ3Y2Q4YTY4IiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX19.dudHpR1mfV9XgCZiwJnhgBWq7BWTJMzRGnBegfaxl5VDwZVhUoCYXtQGKB8OElq2Olse9LU22wkmnwKCfXI4BdOmRvKAnCMpU2rc7QCg2O49kEj2CNraHuIxVHRUubq0f1X1uG9Q1i3NJo0aktC5_Flq6tF4JJp3VceI-HZ6ggM'





// contextUid: '30165a0b-bacd-4014-bcb4-e01bd85b2b1c'

// matchId: '2db8c910-7ee9-4dda-aac6-da9f562bc686'