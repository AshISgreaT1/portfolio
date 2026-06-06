import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

import { experiences, profile, projects, skillCategories, skills } from '../src/data/portfolio.js';

const rootDir = path.resolve(process.cwd());
const publicDir = path.join(rootDir, 'public');
const outputPdf = path.join(publicDir, 'resume.pdf');
const tempHtml = path.join(os.tmpdir(), 'ayush-hada-resume.html');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function renderSkillGroup(group) {
  return `
    <div class="skill-group">
      <div class="skill-title">${escapeHtml(group.category)}</div>
      <div class="skill-body">${escapeHtml(group.description)}</div>
      <div class="chips">
        ${group.skills.map((skill) => `<span class="chip">${escapeHtml(skill)}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderProject(project) {
  return `
    <div class="project">
      <div class="project-head">
        <div>
          <div class="eyebrow">${escapeHtml(project.category)}</div>
          <h3>${escapeHtml(project.title)}</h3>
        </div>
        <div class="project-tags">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      </div>
      <p>${escapeHtml(project.description)}</p>
      <div class="project-foot">
        <span>${escapeHtml(project.github.replace(/^https?:\/\//, ''))}</span>
        ${project.demo ? `<span>${escapeHtml(project.demo.replace(/^https?:\/\//, ''))}</span>` : ''}
      </div>
    </div>
  `;
}

function renderExperience(item) {
  return `
    <div class="experience">
      <div class="experience-head">
        <div>
          <div class="eyebrow">${escapeHtml(item.date)}</div>
          <h3>${escapeHtml(item.role)}</h3>
        </div>
        <div class="experience-meta">${escapeHtml(item.company)} | ${escapeHtml(item.type)}</div>
      </div>
      <ul>${renderList(item.points)}</ul>
    </div>
  `;
}

const summary = profile.tagline;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(profile.name)} Resume</title>
    <style>
      @page {
        size: Letter;
        margin: 0.48in;
      }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        color: #0f172a;
        font-family: "Segoe UI", Arial, sans-serif;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      body {
        font-size: 10.5pt;
        line-height: 1.4;
      }
      .page {
        position: relative;
      }
      .topbar {
        height: 8px;
        background: linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899);
        border-radius: 999px;
        margin-bottom: 18px;
      }
      .header {
        display: grid;
        grid-template-columns: 1.4fr 0.9fr;
        gap: 16px;
        align-items: start;
        margin-bottom: 18px;
      }
      .name {
        margin: 0;
        font-size: 24pt;
        line-height: 1;
        letter-spacing: -0.03em;
        color: #0f172a;
      }
      .role {
        margin: 6px 0 10px;
        font-size: 11pt;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #0f766e;
      }
      .summary {
        margin: 0;
        color: #334155;
      }
      .contact {
        display: grid;
        gap: 8px;
        justify-items: end;
        text-align: right;
        color: #334155;
        font-size: 9.5pt;
      }
      .contact div {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .contact span:first-child {
        min-width: 72px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #64748b;
      }
      .main {
        display: grid;
        grid-template-columns: 0.92fr 1.08fr;
        gap: 18px;
      }
      .column {
        min-width: 0;
      }
      .section {
        margin-bottom: 16px;
        break-inside: avoid;
      }
      .section-title {
        margin: 0 0 8px;
        font-size: 10pt;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #0f766e;
      }
      .card {
        border: 1px solid #dbe4ee;
        border-radius: 14px;
        padding: 12px 14px;
        background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
        break-inside: avoid;
      }
      .summary-card {
        border-left: 4px solid #06b6d4;
      }
      .skill-group {
        margin-bottom: 10px;
      }
      .skill-title {
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 4px;
      }
      .skill-body {
        color: #475569;
        margin-bottom: 8px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        border: 1px solid #cbd5e1;
        border-radius: 999px;
        padding: 4px 9px;
        font-size: 9pt;
        background: #ffffff;
        color: #334155;
      }
      .experience, .project {
        border: 1px solid #dbe4ee;
        border-radius: 14px;
        padding: 12px 14px;
        background: #ffffff;
        margin-bottom: 10px;
        break-inside: avoid;
      }
      .experience-head, .project-head, .project-foot {
        display: flex;
        justify-content: space-between;
        gap: 10px;
      }
      .experience h3, .project h3 {
        margin: 2px 0 0;
        font-size: 12pt;
        color: #0f172a;
      }
      .experience-meta, .project-foot, .project p, .experience li {
        color: #475569;
      }
      .eyebrow {
        font-size: 8.5pt;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #0f766e;
      }
      .experience ul {
        margin: 10px 0 0;
        padding-left: 18px;
      }
      .experience li {
        margin-bottom: 5px;
      }
      .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        justify-content: flex-end;
      }
      .project-tags span {
        border-radius: 999px;
        padding: 4px 8px;
        background: #f1f5f9;
        color: #334155;
        font-size: 8.5pt;
      }
      .project p {
        margin: 10px 0 8px;
      }
      .project-foot {
        font-size: 8.5pt;
        border-top: 1px solid #e2e8f0;
        padding-top: 8px;
      }
      .footer-note {
        margin-top: 12px;
        font-size: 8.5pt;
        color: #64748b;
      }
      .stacked {
        display: grid;
        gap: 6px;
      }
      .muted {
        color: #475569;
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="topbar"></div>
      <div class="header">
        <div>
          <h1 class="name">${escapeHtml(profile.name)}</h1>
          <div class="role">${escapeHtml(profile.role)}</div>
          <p class="summary">${escapeHtml(summary)}</p>
        </div>
        <div class="contact">
          <div><span>Email</span><span>${escapeHtml(profile.email)}</span></div>
          <div><span>Location</span><span>${escapeHtml(profile.location)}</span></div>
          <div><span>GitHub</span><span>${escapeHtml(profile.socials.github.replace(/^https?:\/\//, ''))}</span></div>
          <div><span>LinkedIn</span><span>${escapeHtml(profile.socials.linkedin.replace(/^https?:\/\//, ''))}</span></div>
        </div>
      </div>

      <div class="main">
        <div class="column">
          <div class="section">
            <div class="section-title">Core Stack</div>
            <div class="card">
              ${skillCategories.map(renderSkillGroup).join('')}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Education</div>
            <div class="card stacked">
              <div><strong>${escapeHtml(profile.college.shortName)}</strong></div>
              <div class="muted">${escapeHtml(profile.college.name)}</div>
              <div class="muted">${escapeHtml(profile.college.details)}</div>
              <div class="muted">${escapeHtml(profile.hometown)} to ${escapeHtml(profile.location)}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Skills Snapshot</div>
            <div class="card">
              <div class="chips">
                ${skills.map((skill) => `<span class="chip">${escapeHtml(skill)}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="section">
            <div class="section-title">Experience</div>
            ${experiences.map(renderExperience).join('')}
          </div>

          <div class="section">
            <div class="section-title">Selected Projects</div>
            ${projects.map(renderProject).join('')}
          </div>

          <div class="section">
            <div class="section-title">Focus Areas</div>
            <div class="card">
              <div class="muted">
                Full stack application development, API integration, responsive UI systems, dashboard workflows,
                AI-assisted tooling, and practical product engineering.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-note">
        Portfolio and resume updated for a full stack developer positioning.
      </div>
    </div>
  </body>
</html>`;

await mkdir(publicDir, { recursive: true });
await writeFile(tempHtml, html, 'utf8');

const printArgs = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--allow-file-access-from-files',
  '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=1200',
  `--print-to-pdf=${outputPdf}`,
  '--print-to-pdf-no-header',
  pathToFileURL(tempHtml).href
];

const result = spawnSync(chromePath, printArgs, { stdio: 'pipe', encoding: 'utf8' });

if (result.error) {
  throw result.error;
}

if (result.status !== 0) {
  throw new Error(
    `Chrome PDF generation failed with exit code ${result.status}\n${result.stderr || result.stdout || ''}`
  );
}

await rm(tempHtml, { force: true });
console.log(`Wrote ${outputPdf}`);
