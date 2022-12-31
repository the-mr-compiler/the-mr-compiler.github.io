import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  name = '';
  email = '';
  message = '';
  showAlert = false;
  showError = false;
  constructor() {}

  ngOnInit(): void {}

  submitForm(e: Event) {
    e.preventDefault();
    if (
      this.name.length === 0 ||
      this.email.length === 0 ||
      this.message.length === 0
    ) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
      return;
    }
    if (localStorage.getItem('messageSent') === 'true') {
      {
        let conf = confirm(
          'You have already sent a message. Are you sure you want to send another one?'
        );
        if (conf === false) {
          return;
        }
      }
    }
    fetch(
      'https://send.pageclip.co/YErmaH3zTJayqaWiSxm2iqhAfLAZvO2w/contact-form',
      {
        method: 'POST',
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          message: this.message,
        }),
      }
    )
      .then((response) => {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      })
      .catch((error) => {});
    localStorage.setItem('messageSent', 'true');
  }
  nameChange(e: Event) {
    this.name = (e.target as HTMLInputElement).value;
  }
  emailChange(e: Event) {
    this.email = (e.target as HTMLInputElement).value;
  }
  messageChange(e: Event) {
    this.message = (e.target as HTMLInputElement).value;
  }
}
