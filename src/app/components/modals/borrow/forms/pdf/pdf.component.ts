import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-pdf',
  imports: [MatCardModule, PdfJsViewerModule],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.scss',
})
export class PdfComponent implements AfterViewInit, OnInit {
  coords: { x: number; y: number } | null = null;

  constructor(
    private dialogRef: MatDialogRef<PdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
  ) { }
  totalSignatures: number = this.data.fapprovers;
  pdfUrl!: string;
  countSignature: string[] = [];

  ngOnInit(): void {
    this.pdfUrl = this.data.file;
    console.log(this.data.file);
  }
  ngAfterViewInit() {
    this.attachPdfClickListener();
  }

  promptCount(coordinates: any) {
    let prompt = '';
    if (this.countSignature.length <= this.totalSignatures) {
      console.log(prompt.length, 'should come here');
      if (this.countSignature.length == 0) {
        coordinates.name = 'Requestor Signed';
        prompt = 'Place requestor details here?';
      } else if (this.countSignature.length == 1) {
        coordinates.name = 'Fst Signed';
        prompt = 'Place 1st approver details here?';
      } else if (this.countSignature.length == 2) {
        coordinates.name = '2nd Signed';
        prompt = 'Place 2nd approver details here?';
      } else if (this.countSignature.length == 3) {
        coordinates.name = '3rd Signed';
        prompt = 'Place 3rd approver details here?';
      }
      if (confirm(prompt)) {
        this.countSignature.push(coordinates);
      }
    } else {
      this.dialogRef.close({ signatures: this.countSignature });
    }
  }

  attachPdfClickListener() {
    // pdf.js loads async – wait for it
    const interval = setInterval(() => {
      const iframe = document.querySelector(
        'ng2-pdfjs-viewer iframe',
      ) as HTMLIFrameElement;

      if (iframe?.contentWindow?.document) {
        clearInterval(interval);
        this.listenForClicks(iframe);
      }
    }, 300);
  }
  listenForClicks(iframe: HTMLIFrameElement) {
    const doc = iframe.contentWindow!.document;

    doc.addEventListener('click', (event: MouseEvent) => {
      this.handlePdfClick(event, iframe);
    });
  }
  handlePdfClick(event: MouseEvent, iframe: HTMLIFrameElement) {
    const target = event.target as HTMLElement;

    const pageEl = target.closest('.page') as HTMLElement;
    if (!pageEl) return;

    const canvas = pageEl.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();

    // click relative to canvas only (ignores gray viewer padding)
    const xPx = event.clientX - canvasRect.left;
    const yPx = event.clientY - canvasRect.top;

    const win = iframe.contentWindow as any;
    const viewer = win.PDFViewerApplication?.pdfViewer;

    const scale = viewer?.currentScale || 1;

    const pageNumber = Number(pageEl.getAttribute('data-page-number'));
    const pageView = viewer?.getPageView(pageNumber - 1);

    // REAL PDF size (not affected by viewer padding)
    const pdfWidth = pageView.viewport.width / scale;
    const pdfHeight = pageView.viewport.height / scale;

    const xPdf = xPx / scale;
    const yPdf = yPx / scale;

    const coordinates = {
      page: pageNumber,
      x: xPdf,
      y: yPdf,
      pdfWidth,
      pdfHeight,
    };

    console.log(coordinates);
    this.promptCount(coordinates);
  }
}
