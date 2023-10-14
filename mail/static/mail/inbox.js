document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  // Show the letters
  fetch('/emails/' + mailbox)
  .then(response => response.json())
  .then(emails => {
    // Print emails
    console.log(emails);
    // ... do something else with emails ...
    var parent = document.querySelector('#emails-view');
    emails.forEach(element => {

      if (element["read"] === true){
        parent.innerHTML += `<div class="letter read" data-id="${element["id"]}"> <h3>Time: ${element["timestamp"]}</h3> <h3>Subject: ${element["subject"]} </h3><h3>Sender: ${element["sender"]} </h3> </div>`;
      }
      else{
        parent.innerHTML += `<div class="letter unread" data-id="${element["id"]}"> <h3>Time: ${element["timestamp"]}</h3> <h3>Subject: ${element["subject"]} </h3> <h3>Sender: ${element["sender"]} </h3> </div>`;
      }
      
    });
    document.querySelectorAll('.letter').forEach(div => {
      div.onclick = function(){
        show_me(this.dataset.id, mailbox)
      };
    })
    })
  };

  function send(){
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
      recipients: document.querySelector('#compose-recipients').value,
      subject: document.querySelector('#compose-subject').value,
      body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result["error"]){
        alert(result["error"])
      }
      else{
        load_mailbox('sent')
      }
    })
  }

  function show_me(number, mailbox){
    fetch('/emails/' + number)
      .then(response => response.json())
      .then(email => {
    // Print email
        console.log(email);
        document.querySelector('#emails-view').style.display = 'block';
        document.querySelector('#compose-view').style.display = 'none';
        var parent = document.querySelector('#emails-view');
        parent.innerHTML = `<div>
                              <div class="form-group">When: <input disabled class="form-control" id="time" value="`+ email['timestamp'] +`"></div>
                              <div class="form-group">From: <input disabled class="form-control" id="sender" value="`+ email['sender'] +`"></div>
                              <div class="form-group">To: <input disabled class="form-control" value="`+ email["recipients"] +`"> </div>
                              <div class="form-group"> <input disabled class="form-control" id="subject" value="`+ email["subject"] +`"> </div> 
                              <textarea disabled class="form-control" id="body">` + email["body"] + `</textarea>
                              <br>
                              <div>`
        if (mailbox == 'inbox'){
          parent.innerHTML += `<div class='div-reply-button'> <button type="button" onclick="reply();" class="btn btn-primary">Reply</button> </div><div class='div-archive-button'><button type="button" class="btn btn-primary" onclick="archive(`+ email["id"] +`);">Archive</button></div></div>`
        }
        if (mailbox == 'archive'){
          parent.innerHTML += `<div class='div-reply-button'> <button type="button" onclick="reply();" class="btn btn-primary">Reply</button> </div><div class='div-archive-button'><button type="button" class="btn btn-secondary" onclick="unarchive(`+ email["id"] +`);">Unarchive</button></div></div>`
        }
        
    });
    fetch('/emails/' + number, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })
  }

  function archive(number){
    fetch('/emails/' + number, {
      method: 'PUT',
      body: JSON.stringify({
          archived: true
      })
    })
    .then(response => {
      console.log(response);
      load_mailbox('inbox');
    })
    }

  function unarchive(number){
    fetch('/emails/' + number, {
      method: 'PUT',
      body: JSON.stringify({
          archived: false
      })
    })
    .then(response => {
      console.log(response);
      load_mailbox('inbox');
    })
    }

  function reply(){
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#compose-recipients').value = document.querySelector('#sender').value;
    let subject = document.querySelector('#subject').value
    if (subject.indexOf('Re:') === 0){
      document.querySelector('#compose-subject').value = document.querySelector('#subject').value;
    }
    else{
      document.querySelector('#compose-subject').value = 'Re: ' + document.querySelector('#subject').value;
    }
    document.querySelector('#compose-body').value = 'On ' + document.querySelector('#time').value + ' ' + document.querySelector('#sender').value + ' wrote: ' + document.querySelector('#body').value;
  }


