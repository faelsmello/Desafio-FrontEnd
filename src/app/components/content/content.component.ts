import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  leadForm: FormGroup
  submitted = false
  valid = false

  arrMoney = ['<= R$5.000', '>= R$5.001 e <= R$30.000', '>= R$30.001 e <= R$100.000', '>= R$100.001 e <= R$500.000', '>= R$500.001', 'Não se Aplica']
  dropdown = false
  modelMoney = null

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.leadForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      url: ['', Validators.required],
      company: ['', Validators.required],
      money: ['', Validators.required]
    })

    const setActive = (element, active) => {
      const formField = element.parentNode.parentNode
      if (active) {
        formField.classList.add('form-field--is-active')
      } else {
        formField.classList.remove('form-field--is-active')
        element.value === '' ?
          formField.classList.remove('form-field--is-filled') :
          formField.classList.add('form-field--is-filled')
      }
    }

    [].forEach.call(
      document.querySelectorAll('.form-field__input'),
      (element) => {
        element.onblur = () => {
          setActive(element, false)
        }
        element.onfocus = () => {
          setActive(element, true)
        }
      }
    )
  }

  get statusFields() { return this.leadForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.leadForm.invalid) {
      return;
    } else {
      document.getElementsByClassName('form-field__button')[0].classList.add('fadeOutIn')
      setTimeout(() => {
        this.valid = true
        let elements = document.querySelectorAll('p');
        elements.forEach((el) => {
          console.log(el.classList)
          el.classList.add('fadeIn')
        })
      }, 500)
    }
  }
}
