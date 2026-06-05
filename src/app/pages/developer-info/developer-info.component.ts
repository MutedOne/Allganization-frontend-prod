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
    title: 'Full-Stack Software Developer',
    email: 'stephenrabor@gmail.com',
    phone: '+63 927 731 4664',
    linkedin: 'https://www.linkedin.com/in/stephen-rabor-73827a295/',
    summary: 'Full-Stack Software Developer with over 3 years of commercial experience engineering web applications across frontend (Angular) and backend (ExpressJS, ASP.NET, PHP) architectures. Experienced in executing structural codebase migrations, building custom REST APIs, and automating operational data flows. Backed by solid execution in handling cloud deployments and resolving runtime architectural constraints.',
    projects: [
      {
        title: 'Allganization',
        description: 'Enterprise Employee Services Platform (Self-Directed Portfolio System). Designed and built a multi-module platform consolidating functional patterns derived from common corporate workflow bottlenecks. Developed isolated full-stack system modules for hardware asset management, multi-tier approvals, and transactional processing. Programmed the application\'s backend architecture and REST API routes utilizing ExpressJS and MySQL. Implemented custom system security layers covering token authentication, role-based authorization rules, and structural data validation. Deployed and managed the production instance on cPanel shared hosting nodes under regional resource allocations.',
        website: 'https://allganization.com',
        github: '(Hidden repo)',
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
      frontend: ['Angular (Upgrades v8 to v17)', 'ReactJS', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
      backend: ['ExpressJS', 'Node.js', 'ASP.NET Core', 'PHP', 'RESTful API Design', 'APIGEE Gateway'],
      cloud: ['Azure', 'CI/CD Pipelines', 'Docker (Basic Configuration)', 'cPanel Shared Hosting'],
      database: ['MySQL', 'PostgreSQL', 'Oracle Server (Configuration/Triage)', 'Git', 'Google Apps Script', 'OpenAI API', 'Unit Testing']
    },
    experience: [
      {
        title: 'Software Developer',
        dates: 'September 2024 – April 2026',
        company: 'Alliance Software Inc.',
        responsibilities: [
          'Programmed frontend features and components for corporate web applications using Angular and TypeScript.',
          'Managed structural codebase upgrades for aging platforms, migrating core architectures from Angular 8 up to Angular 17.',
          'Identified and debugged functional regressions and memory anomalies within active production codebases.',
          'Integrated business data routes and internal service layers through APIGEE API Gateway configurations.',
          'Maintained client deployment baselines on Azure infrastructures via structured CI/CD delivery pipelines (specifically for the Cebu Pacific account).',
          'Wrote automated unit test suites in Jasmine to secure core regression-free logic paths before release verification.',
          'Participated in routine Agile ceremonies including daily stand-ups, sprint mapping, and deployment handoffs.'
        ]
      },
      {
        title: 'Full-Stack Developer (Contract)',
        dates: 'March 2024 – July 2024',
        company: 'Search Leads Agency',
        responsibilities: [
          'Built custom internal CRM features, data webhook hooks, and operational processing mechanisms.',
          'Programmed automation logic inside Google Apps Script, using OpenAI GPT models to extract data fields and drop manual tasks.',
          'Participated in technical scoping, staging QA verifications, and cross-browser visual checks.'
        ]
      },
      {
        title: 'Software Developer',
        dates: 'April 2021 – March 2023',
        company: 'Delsan Business Innovations Corporation',
        responsibilities: [
          'Built and modified customized client-specific corporate database software platforms using ASP.NET and PHP.',
          'Analyzed legacy customer codebases to pinpoint performance bugs and patch logical gaps.',
          'Wrote application unit tests, performed local system testing, and generated diagnostic bug documentation.',
          'Assisted engineering teams with platform configurations, initial site setups, and general server maintenance support.'
        ]
      },
      {
        title: 'Technical Support Specialist',
        dates: 'June 2018 – April 2019',
        company: 'Azpired Inc.',
        responsibilities: [
          'Triaged incoming technical infrastructure tickets and user connection challenges over telephone, email, and live text chats.',
          'Assisted database teams with basic Oracle server configuration verifications and structural endpoint isolation.'
        ]
      }
    ],
    education: {
      degree: 'Bachelor of Science in Information Technology (BSIT)',
      batch: 'Batch 2018',
      school: 'Cebu Institute of Technology'
    }
  };
}