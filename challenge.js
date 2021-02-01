const fetch = require('node-fetch');
const credentials = require('./resources/credentials.json');
const formd = require('form-data');
const fs = require('fs');
const FileSaver = require('file-saver');
const FileReader = require('filereader');
const blob = require('blob');
const Window = require('window');
const JSZip = require("jszip");


const window = new Window();
const fileReader = new window.FileReader()
const zip = new JSZip();

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
          body: JSON.stringify({
              "refreshToken": "eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJhNTM5NjM4NS0zNmU1LTRiZjItYWNhYS0zNTE1MTNlYTFhOGUiLCJleHAiOjE2MTIyNDQwMjUsIm5iZiI6MCwiaWF0IjoxNjEyMjIyNDI1LCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsInN1YiI6ImY3NWMyM2RlLTIyMDktNDBmZC1hYzFiLTVjOWYzMGY4ZDBiYyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6ImJmYjgwMGY5LWJhYzAtNDBiNC1hMjAyLTg0Y2UxYzI2NWY4ZCIsImNsaWVudF9zZXNzaW9uIjoiNWVkZWQ1NWQtMTI5NS00NGFkLTg0ZGUtZjUyM2ZjNWVhMjBlIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX19.Xk0X11Qy_IZPH9j0vtuM8tmy00vQkiTmBGmrh-7N0yiT8d_yQ8UUOHcPenfxyL-hKDG7GeEEOkso__lc0EZ-WWSt7CS3eEBlKXXpTVNtsFVncaIVrY9hgJgivbHh8lFN-A-P343kLyVpw2PuxrjNJc9Y_VAu_6P3S8d2Y0PQPZE"
          })
    }) 
    .then(response => {response.json()})
    .then(response => {
        console.log("from auth", response)
      })
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

function projectDetails(){

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
    let token = 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIzMGU5NTU0Zi1mOTQ5LTQzOTctYTU2Zi1jMTNhOGFhNDg2NjAiLCJleHAiOjE2MTIyMjE5NTEsIm5iZiI6MCwiaWF0IjoxNjEyMjIxNDcxLCJpc3MiOiJodHRwczovL3Nzby5zbWFydGxpbmcuY29tL2F1dGgvcmVhbG1zL1NtYXJ0bGluZyIsImF1ZCI6ImF1dGhlbnRpY2F0aW9uLXNlcnZpY2UiLCJzdWIiOiJmNzVjMjNkZS0yMjA5LTQwZmQtYWMxYi01YzlmMzBmOGQwYmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwic2Vzc2lvbl9zdGF0ZSI6ImVjNDE3ZTk0LTRlYWYtNDI5NS1hOTQyLTVlMjIzYWM5ODg2ZCIsImNsaWVudF9zZXNzaW9uIjoiNTU5NDFlMGYtZjg5YS00MmZlLTkyNDgtNGZlYmM1MWZlODM3IiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfQVBJX1VTRVIiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInVpZCI6Ijc0ODU5OTdjYzJmYyIsIm5hbWUiOiJNYWxjb2xtIFN0YXNvIFBSRSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSIsImdpdmVuX25hbWUiOiJBUEkgVXNlciIsImZhbWlseV9uYW1lIjoiTWFsY29sbSBTdGFzbyBQUkUiLCJlbWFpbCI6ImFwaVVzZXIrcHJvamVjdCthM2M3NTlkZTdAc21hcnRsaW5nLmNvbSJ9.c-inb_YqHu1uxflIVatZXNzns1NmyBZN7l36AgAbNGSjcLLus4MAyCfMyD4exWz0ipr7fTjp9CsMXNH_1H_Y3Ipp-kSGTiurIeffOVgqLU-z-5CTq7gLhg3oLhI4IVz_Az9RuT6w0W-s2CWZf6-9Wv5ebuimoKjvlU9oJg_Hpb4'
    fetch(`https://api.smartling.com/files-api/v2/projects/${credentials.projectId}/locales/all/file/zip?fileUri=./resources/localizable.strings`, {
        headers:{
            "Authorization": `Bearer ${token}`,
            "Accept": 'application/octet-stream',
            "content-type": "application/octet-stream"
        }
    })
    .then(response => response.blob())
    .then(response => {



        // Tried the below methods and a few others but they did not recognize the reponse as a blob.  I tried changing the response to an ArrayBuffer as well but it was not recognized.

        // ZIP
        // zip.file("translate.zip", response)
        // console.log(response)    

        // FS
        //        fs.writeFile("translation.zip", response,(err) => {
        //     if (err) throw err;
        //     console.log("success");
        //   });       


        // FILE READER
        // let newurl = fileReader.readAsDataURL(response)
        // console.log(response, newurl)

        // URL
        // const newurl = URL.createObjectURL(response)
        // console.log(response.type)


    })       
    .catch(error => console.error(error))
}


// contextUid: '30165a0b-bacd-4014-bcb4-e01bd85b2b1c'

// matchId: '2db8c910-7ee9-4dda-aac6-da9f562bc686'

refresh()