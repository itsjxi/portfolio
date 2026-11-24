// Years since the first full-time role. Updates itself every August.
export function yearsSince(startDate = '2021-08-01') {
  const start = new Date(startDate);
  const today = new Date();
  let years = today.getFullYear() - start.getFullYear();
  const anniversary = new Date(today.getFullYear(), start.getMonth(), start.getDate());
  if (today < anniversary) years--;
  return years;
}

export const PERSON = {
  name: 'Jugal Rajput',
  role: 'Frontend engineer',
  company: 'WebEngage',
  location: 'India',
  email: 'jugalrajput10@gmail.com',
  github: 'https://github.com/itsjxi',
  linkedin: 'https://www.linkedin.com/in/jugal-rajput-39bbbb144/',
  resume: '/Jugal_Rajput_Resume.pdf',
};

export const PROJECTS = [
  {
    id: 'data-grid',
    title: 'Vanilla Data Grid',
    kind: 'Open-source component',
    summary:
      'A dependency-free TypeScript data grid that sorts and searches a million rows without freezing the page.',
    image: '/work/data-grid.webp',
    alt: 'Vanilla Data Grid showing 1,000,000 rows filtered to "engineer", sorted by salary, with three rows selected.',
    url: 'vanilla-data-grid.netlify.app',
    demo: 'https://vanilla-data-grid.netlify.app/',
    github: 'https://github.com/itsjxi/vanilla-data-grid',
    tint: '#E8EEFF',
    ink: '#2F55D4',
    stats: [
      { value: '6.6 ms', label: 'search across 1M rows' },
      { value: '~30', label: 'row elements in the DOM' },
      { value: '0', label: 'axe violations' },
    ],
    points: [
      'Sorting and search run in a Web Worker on dictionary-encoded columns, so typing never blocks a frame.',
      'Virtual scrolling recycles ~30 rows and compresses the scrollbar past the browser height cap.',
      'Follows the WAI-ARIA grid pattern: full keyboard support, live announcements, selection that survives sorting.',
    ],
    stack: 'TypeScript, Web Workers, Vitest',
  },
  {
    id: 'scratch',
    title: 'Scratch Visual Editor',
    kind: 'Visual programming tool',
    summary:
      'A block-based editor in the style of Scratch: drag blocks into scripts, press Run, and watch sprites move, talk and collide.',
    image: '/work/scratch-editor.webp',
    alt: 'Scratch Visual Editor running a script: the active stack glows and the cat says "Watch this!"',
    url: 'scratchanimation.netlify.app',
    demo: 'https://scratchanimation.netlify.app/',
    github: 'https://github.com/itsjxi/scratch-visual-editor',
    tint: '#FFF3D6',
    ink: '#9A6A00',
    stats: [
      { value: '17', label: 'blocks with Scratch rules' },
      { value: '43', label: 'unit and end-to-end tests' },
      { value: '100%', label: 'of edits undoable' },
    ],
    points: [
      'A generator-based interpreter runs scripts side by side, one step per frame, so a runaway loop can’t freeze the tab.',
      'The program is an immutable tree: undo is a stack of snapshots, and unchanged blocks skip re-rendering.',
      'Pointer-event drag and drop works with mouse, touch and pen, and every action has a keyboard equivalent.',
    ],
    stack: 'React 18, TypeScript, Playwright',
  },
  {
    id: 'focusspace',
    title: 'FocusSpace',
    kind: 'Full-stack productivity app',
    summary:
      'A multi-user app for planning the day, running focus sessions, tracking habits and reviewing the week.',
    image: '/work/focusspace.webp',
    alt: 'FocusSpace dashboard with weight, discipline, streak and deep-work cards above three 30-day trend charts.',
    url: 'focusspace-personal-productivity.netlify.app',
    demo: 'https://focusspace-personal-productivity.netlify.app/',
    github: 'https://github.com/itsjxi/focusspace',
    tint: '#E6F0FF',
    ink: '#2563EB',
    stats: [
      { value: '10', label: 'product modules' },
      { value: '1 click', label: 'private demo account' },
      { value: '32', label: 'API tests' },
    ],
    points: [
      'Sign-up and sign-in with hashed passwords, httpOnly session cookies, login lockout and CSRF checks.',
      'Each visitor can open a disposable demo account filled with 45 days of realistic history.',
      'Charts read from a server-side aggregation endpoint, so the client never downloads raw history.',
    ],
    stack: 'React 19, FastAPI, SQLite',
  },
  {
    id: 'kinetic',
    title: 'Kinetic',
    kind: 'Music app on the Spotify API',
    summary:
      'Sign in with Spotify to browse your own playlists, liked songs and top artists, or try it instantly in demo mode.',
    image: '/work/kinetic.webp',
    alt: 'Kinetic home screen with recommendations, top artists, top albums and recent playlists.',
    url: 'kinetic-music-vibe.netlify.app',
    demo: 'https://kinetic-music-vibe.netlify.app/',
    github: 'https://github.com/itsjxi/vibe-music',
    tint: '#FFE9E0',
    ink: '#D9430F',
    stats: [
      { value: 'PKCE', label: 'OAuth in the browser' },
      { value: '0', label: 'backend servers' },
      { value: '2', label: 'data sources, one hook' },
    ],
    points: [
      'OAuth 2.0 with PKCE entirely in the browser, with token refresh shared across concurrent requests.',
      'One hook serves either the user’s Spotify library or demo data in the same shape, so pages never branch.',
      'Library sections load independently, so one failing endpoint leaves a gap instead of an error screen.',
    ],
    stack: 'React, Redux Toolkit, Spotify Web API',
  },
];

export const MORE_PROJECTS = [
  {
    title: 'QuickKart',
    desc: 'A quick-commerce grocery store in vanilla JavaScript (MVC) with undoable cart edits and stock-limit hints.',
    github: 'https://github.com/itsjxi/quickkart',
  },
  {
    title: 'ChillFlix',
    desc: 'A movie discovery app with TanStack Query prefetching, fuzzy ⌘K search and taste-based recommendations.',
    github: 'https://github.com/itsjxi/chillflix',
  },
];

export const EXPERIENCE = [
  {
    company: 'WebEngage',
    role: 'Software Engineer, Frontend',
    period: 'Mar 2024 – now',
    summary:
      'Frontend for a customer-engagement and marketing-automation platform: messaging channels first, and since mid-2025 the AI features.',
    work: [
      { title: 'AI image studio', desc: 'Built from scratch: generate, edit, crop and add text on one canvas, with full undo history.', metric: '70% faster content creation' },
      { title: 'AI content agents', desc: 'Chat agents that write WhatsApp, RCS, push, SMS and email content straight into each editor.', metric: '5 channels, one flow' },
      { title: 'Shared AI chat component', desc: 'One chat panel with clarifications, credits and feedback, maintained and improved for every agent.', metric: 'Used by 5 AI agents' },
      { title: 'Customer-insights module', desc: 'Main frontend developer: personas, attributes, dashboards and playbooks.', metric: 'Shipped in 3 months' },
    ],
    more: [
      { title: 'AI images in every editor', desc: 'The image studio embedded in email, in-app, on-site, push, web push, WhatsApp and RCS.', metric: '7 message editors' },
      { title: 'WhatsApp template builder', desc: 'Mixed buttons and multi-card carousels with a live phone preview.', metric: '50% fewer setup steps' },
      { title: 'Template approval workflow', desc: 'Create, validate, submit and track WhatsApp templates without leaving the product.', metric: '35% fewer rejections' },
      { title: 'Personalisation token picker', desc: 'Fallbacks, catalogs and custom entities that always generate valid syntax.', metric: '30% less human error' },
      { title: 'Ad audience export', desc: 'Customer segments sent to TikTok and LinkedIn through one reusable export flow.', metric: '2 ad platforms' },
      { title: 'Campaign analytics', desc: 'Per-button clicks, delivery-delay charts and funnel insights inside each campaign.' },
    ],
    stack: 'React, JavaScript, Redux, react-konva, Highcharts, Ant Design, BeeFree SDK',
  },
  {
    company: 'Alendei Platforms Pvt. Ltd.',
    role: 'Software Engineer, API Integration Specialist',
    period: 'Nov 2023 – Feb 2024',
    summary:
      'Turned client requirements into WhatsApp and email campaign flows, and fixed the integrations behind them.',
    work: [
      { title: 'Campaign flows', desc: 'Triggers, conditions and messaging logic configured for several client accounts.' },
      { title: 'Email templates', desc: 'Responsive HTML emails that render consistently across mail clients.' },
    ],
    stack: 'REST APIs, WhatsApp Business API, HTML email',
  },
  {
    company: 'Aarti Industries',
    role: 'Engineer',
    period: 'Sep 2021 – Oct 2023',
    summary:
      'Built internal tools for a manufacturing business: inventory, procurement and warehouse operations.',
    work: [
      { title: 'Inventory workflows', desc: 'Inventory and material-issuance workflows moved from paper and spreadsheets into React.', metric: '30% more efficient' },
      { title: 'Negotiation dashboard', desc: 'Pricing data in front of buyers during vendor negotiations.', metric: '~20% cost reduction' },
    ],
    stack: 'React, JavaScript, Chart.js',
  },
];

export const TOOLKIT = [
  { group: 'Build', items: ['React', 'JavaScript', 'TypeScript', 'HTML & CSS', 'Tailwind CSS', 'Ant Design'] },
  { group: 'State & data', items: ['Redux Toolkit', 'TanStack Query', 'Context API', 'REST APIs', 'Nunjucks'] },
  { group: 'Performance', items: ['Virtualisation', 'Web Workers', 'Code splitting', 'Canvas & Konva'] },
  { group: 'Quality', items: ['Vitest', 'Testing Library', 'Playwright', 'axe-core', 'GitHub Actions'] },
  { group: 'Design', items: ['Figma', 'Design systems', 'Accessible patterns', 'Highcharts'] },
];

// Work outside the frontend: what has shipped in a project, and what is still being learned.
export const BEYOND = {
  shipped: [
    {
      title: 'Python and FastAPI',
      project: 'FocusSpace API',
      href: '#focusspace',
      desc: 'Sign-up and sessions with hashed passwords, per-user data, aggregation endpoints for charts, and a one-click demo sandbox.',
      tools: 'FastAPI, Pydantic, SQLite, pytest',
    },
    {
      title: 'Scraping and data extraction',
      project: 'Brand Guidelines Extractor',
      href: 'https://github.com/itsjxi/brand-guidelines-extractor',
      desc: 'Pulls colours, fonts, logos and social links from any website into a local database, with SSRF-safe fetching.',
      tools: 'Requests, BeautifulSoup, SQLAlchemy',
    },
    {
      title: 'Testing and CI',
      project: 'Across all four projects',
      href: '#work',
      desc: 'Unit, API and end-to-end tests in every project, CI on GitHub Actions, and accessibility checks in the browser tests.',
      tools: 'pytest, Vitest, Playwright, GitHub Actions',
    },
  ],
  // A path: each step builds on the one before.
  learning: [
    { name: 'Python', note: 'Core language, OOP and FastAPI services, from a practice workspace to the FocusSpace API.' },
    { name: 'SQL', note: 'Joins, indexes and migrations, while moving FocusSpace from SQLite to PostgreSQL.' },
    {
      name: 'AI engineering',
      note: 'The backend side of the agents I build interfaces for.',
      tags: ['Tool calling', 'RAG', 'Evals'],
    },
  ],
};
