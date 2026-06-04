import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-developer-info',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatChipsModule],
  templateUrl: './developer-info.component.html',
  styleUrls: ['./developer-info.component.scss']
})
export class DeveloperInfoComponent {
  developer = {
    name: 'Stephen Rabor',
    title: 'Software Developer',
    email: 'stephenrabor@gmail.com',
    phone: '+639277314664',
    linkedin: 'https://www.linkedin.com/in/stephen-rabor-73827a295/',
    summary: 'Experienced in building internal and template driven web applications with a focus on performance, maintainability, real‑time, data handling, scalability, and web security. Skilled in debugging, unit testing, and implementing new features in fast‑paced environments. I also have grown expertise in prompt engineering for AI‑driven interfaces.',
    projects: [
      {
        title: 'Allganization',
        description: 'Developed an in-house system that provides employee services such as asset borrowing, monitoring, and customer transaction management within a unified codebase.',
        website: 'https://allganization.com',
        github: ' (Hidden repo)',
        dates: '2025 - Present'
      },
      {
        title: 'S2',
        description: 'A web-based application designed to monitor, organize, and track projects and project-related issues within an organization. The system allows users to create and manage projects, record support or development tickets, monitor issue progress, and track quality assurance (QA) statuses throughout the project lifecycle.',
        website: null,
        github: '(Hidden repo)',
        dates: '2023 - 2024'
      },
      {
        title: 'CRUD',
        description: 'Built a web-based CRUD application as part of my early software development journey, focusing on core application architecture, database operations, and user management.',
        website: null,
        github: '(No repo)',
        dates: '2019 - 2021'
      },
    ],
    skills: {
      backend: ['ExpressJS', 'ASP.net', 'PHP'],
      frontend: ['Angular', 'ReactJS'],
      database: ['MYSQL', 'POSTGRESQL']
    },
    experience: [
      {
        title: 'Software Developer',
        dates: 'September 2024 – April 5, 2026',
        company: 'Alliance Software Inc.',
        responsibilities: [
          'Attend a sprint ceremony.',
          'Angular Upgrade.',
          'Bug fix, enhance and implement new features in the system.',
          'Unit test.',
          'Attend deployment in the system.',
          'Work with API integration via APIGEE.'
        ]
      },
      {
        title: 'Fullstack Developer',
        dates: 'March 2024 – July 2024',
        company: 'Search Leads Agency (Freelance with Contract)',
        responsibilities: [
          'Attend a sprint ceremony.',
          'Work with Google Apps Script to Integrate OPENAI api.',
          'Bug fix, enhance and implement new features in the system.',
          'Unit test.',
        ]
      },
      {
        title: 'Software Developer',
        dates: 'April 2021 – March 2023',
        company: 'Delsan Business Innovations Corporation',
        responsibilities: [
          'Template-based application configured by specific organization.',
          'Response to email, chat, calls from the stakeholders.',
          'Bug fix, enhance and implement new features in the system.',
          'Unit test.',
          'Attend deployment in the system.'
        ]
      },
      {
        title: 'Technical Support',
        dates: 'June 2,2018 to April 2019',
        company: 'Azpired Inc.',
        responsibilities: [
          'Take inbound and outbound call.',
          'Response to email and chat .',
          'Bug fix, enhance and implement new features in the system.'
        ]
      }
    ]
  };
}