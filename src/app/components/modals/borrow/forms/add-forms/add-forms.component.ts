import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { catchError, of } from 'rxjs';
import { FormsService } from 'src/app/services/admin/borrow/forms.service';
import { addForm } from 'src/app/store/admin/borrow/form/AddForm/addform.actions';
import { MatFileUploadModule } from 'mat-file-upload';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { PdfComponent } from '../pdf/pdf.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
@Component({
  selector: 'app-add-forms',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatFileUploadModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './add-forms.component.html',
  styleUrl: './add-forms.component.scss',
})
export class AddFormsComponent {
  formsForm!: FormGroup;
  pdfUrl: SafeResourceUrl | null = '';
  storeService = inject(Store);
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
  ) { }
  readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    this.validate();
  }
  validate() {
    this.formsForm = this.fb.group({
      fname: ['tes', Validators.required],
      fdescription: ['test', Validators.required],
      fapprovers: [2, [Validators.required, Validators.pattern('^[0-9]*$')]],
      placedSignature: [null, Validators.required],
      file: [null, Validators.required],
    });
  }
  isRequiredFieldsValid(): boolean {
    const form = this.formsForm;
    const fname = form.get('fname');
    const fdescription = form.get('fdescription');
    const fapprovers = form.get('fapprovers');

    return !(fdescription?.valid && fapprovers?.valid && fname?.valid);
  }

  openPDF() {
    const dialogRef = this.dialog.open(PdfComponent, {
      data: this.formsForm.value,
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      if (this.formsForm.value.fapprovers == result.signatures.length - 1) {
        await this.modifyPdf(result.signatures);
      }
    });
  }
  onSubmit() {
    console.log(this.formsForm.value);
    if (this.formsForm.valid) {
      const formData = new FormData();
      const formControls = this.formsForm.controls;
      Object.keys(formControls).forEach((key) => {
        const value = formControls[key].value;

        // Handle null or undefined values gracefully
        if (value !== null && value !== undefined) {
          // If the value is a File (like your 'file' or 'placedSignature' fields)
          // or a standard string/number, FormData.append handles it automatically.
          formData.append(key, value);
        }
      });
      console.log('submit', formData);
      this.storeService.dispatch(addForm(formData));
    }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.formsForm.patchValue({
        file: input.files[0],
      });
      console.log('Form Control Value:', this.formsForm.get('file')?.value);
    }
  }
  async modifyPdf(signatures: any) {
    const myFile = this.formsForm.get('file')?.value;
    const existingPdfBytes = await myFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();
    const collectedSignatures = signatures;
    const placedSignatures: any = [];
    collectedSignatures.forEach((signature: any) => {
      const refinedCoordinates = {
        x: signature.x * (height / signature.pdfHeight),
        y: height - signature.y * (height / signature.pdfHeight) - 5,
      };
      placedSignatures.push(refinedCoordinates);
      firstPage.drawText(`${signature.name}`, {
        x: refinedCoordinates.x,
        y: refinedCoordinates.y,
        color: rgb(0.95, 0.1, 0.1),
        size: 12,
        font: helveticaFont,
      });
    });
    this.formsForm.patchValue({
      placedSignature: JSON.stringify(placedSignatures),
    });
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const unsafeUrl = URL.createObjectURL(blob);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
}
