import { Component, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class ContactPage implements AfterViewInit {

  showSuccess = false;

  ngAfterViewInit() {
    // Animate cards on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.animate-card').forEach(card => {
      observer.observe(card);
    });
  }

  submitForm() {
    // Trigger success popup
    this.showSuccess = true;
    setTimeout(() => this.showSuccess = false, 2000);
  }
}
