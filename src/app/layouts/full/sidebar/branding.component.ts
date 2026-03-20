import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  imports: [RouterModule],
  template: `
    <div class="branding">
      <a [routerLink]="['/']">
        <div class="logo">
          <div class="mark" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>ALLGANIZATION</span>
        </div>
      </a>
    </div>
  `,
  styles: `
   .branding {
      display: flex;
      align-items: center;
      justify-content:center;
     
    }

    .branding a {
      text-decoration: none;
      color: inherit;
    }

    .logo {
      display: flex;
      align-items: center;
      font-family: "Poppins", sans-serif;
      font-weight: 700;
      font-size: 1rem;
      color: #222;
      letter-spacing: 2px;
      gap: 10px;
    }
.logo .mark {
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* central hub */
.logo .mark::before {
  content: "";
  width: 14px;
  height: 14px;
  background: #007bff;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.6);
}

/* orbit ring */
.logo .mark::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px dashed #007bff30;
}

/* surrounding nodes */
.logo .mark span {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #007bff;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0,123,255,0.4);
}

.logo .mark span:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
.logo .mark span:nth-child(2) { right: 0; top: 50%; transform: translateY(-50%); }
.logo .mark span:nth-child(3) { bottom: 0; left: 50%; transform: translateX(-50%); }
.logo .mark span:nth-child(4) { left: 0; top: 50%; transform: translateY(-50%); }

  `,
})
export class BrandingComponent {
  constructor() {}
}
