const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
}));

const form = document.getElementById('enquiry-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Website enquiry — ${data.get('service')}`;
  const body = [
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    `Service: ${data.get('service')}`,
    '',
    'Project details:',
    data.get('message')
  ].join('\n');
  // Store a local copy so a signed-in customer can review their own enquiry in the portal.
  const record = { id: `ENQ-${Date.now()}`, name: String(data.get('name')||'').trim(), email: String(data.get('email')||'').trim().toLowerCase(), phone: String(data.get('phone')||'').trim(), service: String(data.get('service')||''), subject, message: String(data.get('message')||''), submittedAt: new Date().toISOString(), status: 'Submitted' };
  try { const saved = JSON.parse(localStorage.getItem('sts_customer_enquiries') || '[]'); saved.push(record); localStorage.setItem('sts_customer_enquiries', JSON.stringify(saved)); } catch {}
  const mailto = `mailto:support@stselv.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const feedback = form.querySelector('.form-feedback');
  feedback.textContent = 'Your email app should open with the enquiry prepared. Please review it and press Send to contact STS.';
  window.location.href = mailto;
});


/* Smooth interactions adapted from the FreshMart reference experience. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Reveal sections and cards as they enter the viewport.
  const revealTargets = document.querySelectorAll(
    '.section-heading, .service-card, .about-visual, .about-copy, .stat, .process-grid article, .project-showcase, .careers-copy, .careers-panel, .contact-intro, .contact-form, .trust-inner > div'
  );
  if ('IntersectionObserver' in window && !reduceMotion) {
    document.documentElement.classList.add('reveal-ready');
    revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));
    // Toggle visibility both entering and leaving the viewport so the
    // pop-up-from-below animation replays on every visit while scrolling.
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(el => revealObserver.observe(el));
  }

  // Highlight the navigation item for the section currently in view.
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-28% 0px -62% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Small, accessible number count-up for the project statistics.
  const counters = document.querySelectorAll('.stat strong');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.counted) return;
        const raw = el.textContent.trim();
        const match = raw.match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/);
        if (!match) return;
        el.dataset.counted = 'true';
        const prefix = match[1], target = Number(match[2].replace(/,/g, '')), suffix = match[3];
        if (!target || target > 100000) return;
        const start = performance.now(), duration = 1050;
        const tick = now => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 4);
          el.textContent = prefix + Math.round(target * eased).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: .55 });
    counters.forEach(el => countObserver.observe(el));
  }

  // Close the mobile navigation on Escape.
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('open')) {
      nav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.setAttribute('aria-label', 'Open navigation');
      menuButton?.focus();
    }
  });
})();


// Use native browser navigation between pages for the quickest, most reliable transitions.
// Avoid delaying navigation with an artificial fade-out timer.

/* Careers search, role details, application form and HR helper. */
(() => {
 const list=document.getElementById('job-list'); if(!list) return;
 const defaultRoles=[
 {title:'ELV Systems Engineer',dept:'Engineering',level:'Mid level',location:'Muscat, Oman',type:'Full-time',skills:'ELV systems design commissioning fire alarm CCTV access control',desc:'Coordinate design, installation, testing and handover of integrated ELV systems.',requirements:'ELV project experience, drawings and submittals, commissioning and troubleshooting.'},
 {title:'Fire Alarm Technician',dept:'Engineering',level:'Entry level',location:'Muscat, Oman',type:'Full-time',skills:'fire alarm life safety maintenance testing',desc:'Install, inspect and maintain fire detection and life-safety systems.',requirements:'Technical diploma or relevant hands-on experience; safety-first mindset.'},
 {title:'CCTV & Access Control Engineer',dept:'Security',level:'Mid level',location:'Muscat, Oman',type:'Full-time',skills:'security CCTV access control IP cameras networking',desc:'Deliver reliable video surveillance, access control and security integrations.',requirements:'Knowledge of IP networking, camera configuration and access-control systems.'},
 {title:'BMS / Automation Engineer',dept:'Engineering',level:'Mid level',location:'Muscat, Oman',type:'Full-time',skills:'building management HVAC automation controls integration',desc:'Support building management integration, controls configuration and commissioning.',requirements:'Controls or electrical background and familiarity with BMS protocols.'},
 {title:'AV Systems Specialist',dept:'Engineering',level:'Entry level',location:'Muscat, Oman',type:'Full-time',skills:'audio visual meeting rooms displays sound video conferencing',desc:'Install and commission professional AV, meeting-room and public-address systems.',requirements:'AV installation experience, cable termination and customer communication.'},
 {title:'Cloud & IT Support Associate',dept:'Cloud',level:'Entry level',location:'Muscat, Oman',type:'Full-time',skills:'cloud IT support networking troubleshooting',desc:'Assist with infrastructure support, connectivity and technical service requests.',requirements:'IT diploma or equivalent knowledge of networks and troubleshooting.'},
 {title:'Graduate ELV Trainee',dept:'Engineering',level:'Internship',location:'Muscat, Oman',type:'Internship',skills:'graduate trainee electrical electronics IT learning',desc:'Learn site coordination, system documentation and testing alongside engineers.',requirements:'Recent graduate in electrical, electronics, IT or a related discipline.'},
 {title:'Project Coordinator',dept:'Business',level:'Mid level',location:'Muscat, Oman',type:'Full-time',skills:'project coordination planning documentation client communication',desc:'Coordinate project schedules, documentation, site access and team communication.',requirements:'Organized communicator with project administration or coordination experience.'}
 ];
 const ADMIN_DATA_KEY='sts_admin_workspace_v1';
 const readAdminData=()=>{try{return JSON.parse(localStorage.getItem(ADMIN_DATA_KEY)||'{}')}catch{return {}}};
 const fromAdminCareer=c=>({title:c.title||c.role,dept:c.department||c.category||'Engineering',level:c.level||c.experience||'Mid level',location:c.location||'Muscat, Oman',type:c.employmentType||'Full-time',skills:c.skills||'',desc:c.description||'',requirements:c.requirements||c.description||'Please review the role requirements with the recruitment team.',roleId:c.id,adminManaged:true});
 const savedCareers=readAdminData().careers;
 let roles=Array.isArray(savedCareers)?savedCareers.filter(c=>c.status==='Published').map(fromAdminCareer):defaultRoles;
 if(!roles.length && !Array.isArray(savedCareers)) roles=defaultRoles;
 const search=document.getElementById('job-search'), department=document.getElementById('job-department'), level=document.getElementById('job-level'), count=document.getElementById('role-count');
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function render(){const q=(search.value||'').toLowerCase().trim();const found=roles.filter(r=>(!department.value||r.dept===department.value)&&(!level.value||r.level===level.value)&&(!q||[r.title,r.dept,r.level,r.location,r.skills,r.desc].join(' ').toLowerCase().includes(q)));count.textContent=found.length;list.innerHTML=found.length?found.map((r)=>`<article class="job-card"><div><h3>${esc(r.title)}</h3><div class="job-meta"><span>${esc(r.dept)}</span><span>${esc(r.level)}</span><span>${esc(r.location)}</span><span>${esc(r.type)}</span></div><p>${esc(r.desc)}</p></div><button class="button button-primary apply-role" data-role="${esc(r.title)}" type="button">View &amp; apply ↗</button></article>`).join(''):'<div class="empty-results">No roles match those filters. Try another keyword or clear filters.</div>';list.querySelectorAll('.apply-role').forEach(b=>b.addEventListener('click',()=>{const role=roles.find(r=>r.title===b.dataset.role);if(role){window.location.href=`career-role.html?role=${encodeURIComponent(role.title)}`;}}));}
 function openApplication(role){if(!role)return;document.querySelector('.career-modal-backdrop')?.remove();const backdrop=document.createElement('div');backdrop.className='career-modal-backdrop';backdrop.innerHTML=`<section class="career-modal" role="dialog" aria-modal="true" aria-labelledby="apply-title"><button class="close-modal" type="button" aria-label="Close">✕</button><p class="eyebrow">APPLICATION • ${esc(role.dept)}</p><h2 id="apply-title">${esc(role.title)}</h2><div class="job-meta"><span>${esc(role.level)}</span><span>${esc(role.location)}</span><span>${esc(role.type)}</span></div><p>${esc(role.desc)}</p><p><b>What helps you succeed</b><br><span style="font-size:12px;color:#627783">${esc(role.requirements)}</span></p><form class="application-form" id="career-application"><input type="hidden" name="role" value="${esc(role.title)}"><label>Full name *<input name="name" required autocomplete="name"></label><label>Email address *<input type="email" name="email" required autocomplete="email"></label><label>Phone number<input name="phone" autocomplete="tel"></label><label>Resume (PDF or Word) *<input type="file" name="resume" accept=".pdf,.doc,.docx" required></label><label class="wide">A short note<textarea name="note" placeholder="Tell us about your experience or interest"></textarea></label><p class="application-note wide">Demo mode: your application is saved only in this browser. Connect a secure backend to receive applications centrally.</p><button class="button button-primary" type="submit">Submit application ↗</button></form></section>`;document.body.appendChild(backdrop);const close=()=>backdrop.remove();backdrop.querySelector('.close-modal').onclick=close;backdrop.addEventListener('click',e=>{if(e.target===backdrop)close()});backdrop.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;const fd=new FormData(f),file=f.elements.resume.files[0];const record={role:role.title,name:fd.get('name'),email:fd.get('email'),phone:fd.get('phone'),note:fd.get('note'),resumeName:file?.name||'',submittedAt:new Date().toISOString()};try{const all=JSON.parse(localStorage.getItem('stsCareerApplications')||'[]');all.push(record);localStorage.setItem('stsCareerApplications',JSON.stringify(all));}catch{}backdrop.querySelector('.career-modal').innerHTML=`<button class="close-modal" type="button" aria-label="Close">✕</button><p class="eyebrow">APPLICATION RECORDED</p><h2>Thank you, ${esc(record.name)}.</h2><p>Your demo application for <b>${esc(role.title)}</b> has been saved in this browser. It has not been sent to STS recruitment.</p><button class="button button-primary" type="button">Close</button>`;backdrop.querySelector('.close-modal').onclick=close;backdrop.querySelector('.button').onclick=close;});backdrop.querySelector('.close-modal').focus();}
 [search,department,level].forEach(el=>el?.addEventListener('input',render));document.getElementById('clear-filters')?.addEventListener('click',()=>{search.value='';department.value='';level.value='';render()});render();
 document.querySelectorAll('[data-open-chat]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.chat-panel')?.remove();const panel=document.createElement('div');panel.className='chat-panel';panel.innerHTML='<header>STS HR assistant <button type="button" aria-label="Close chat">✕</button></header><div class="chat-body"><p>Hello! I can help you explore the careers page.</p><button type="button" data-answer="Use the search bar and department/experience filters to find matching opportunities.">Find a role</button><button type="button" data-answer="Choose View & apply on a role, then complete the candidate form and attach a PDF or Word resume.">How do I apply?</button><button type="button" data-answer="This demo records applications only in this browser. A recruitment backend is needed to deliver them to HR.">Application status</button><p class="chat-answer" aria-live="polite"></p></div>';document.body.appendChild(panel);panel.querySelector('header button').onclick=()=>panel.remove();panel.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>panel.querySelector('.chat-answer').textContent=b.dataset.answer)}));
})();

/* Home-page reveal effects, active navigation and expandable showcase details. */
(() => {
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.main-nav a[href]').forEach(a => {
    const target = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
    if (target === current) a.setAttribute('aria-current', 'page');
  });
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Re-trigger reveal animations whenever an element re-enters view.
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((el, i) => { el.style.transitionDelay = `${Math.min((i % 3) * 80, 160)}ms`; observer.observe(el); });
  } else revealItems.forEach(el => el.classList.add('is-visible'));

  const details = {
    fire: {title:'Fire Detection & Fighting', tag:'LIFE SAFETY / 01', image:'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=85', desc:'Fire detection and alarm systems are an important part of a building’s life-safety plan. Depending on the project scope, STS can help coordinate suitable detection, alarm and notification equipment, installation, testing, commissioning, documentation and maintenance. Final system design and approvals should follow the applicable local codes and authority requirements.', items:['Fire detection and alarm systems','Emergency notification integration','Testing, commissioning and maintenance','Documentation and handover']},
    security: {title:'Security Systems', tag:'PROTECTION / 02', image:'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=85', desc:'A coordinated security solution helps teams monitor sites, manage entry and review incidents. Depending on the site requirements, systems may combine CCTV, video recording, access control and monitoring tools. Equipment selection, coverage and data handling should be planned around the building layout, operational needs and applicable privacy requirements.', items:['CCTV and video surveillance','Access control solutions','Monitoring and system integration','Service and maintenance support']},
    av: {title:'Audio Visual', tag:'CONNECTED SPACES / 03', image:'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85', desc:'Audio-visual systems make it easier to present information, hold meetings and share content across rooms. A solution can include displays, microphones, speakers, video-conferencing equipment and room controls. Planning should account for room size, acoustics, connectivity, accessibility and how people will use the space each day.', items:['Meeting-room and presentation systems','Displays and video collaboration','Sound and public-address systems','Commissioning and user handover']},
    bms: {title:'Building Management Systems', tag:'SMART BUILDINGS / 04', image:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85', desc:'Building management systems bring selected building services into a more coordinated monitoring and control environment. Depending on the site and compatible equipment, integration may help facilities teams review operating conditions, identify alerts and manage systems more consistently. The exact functions depend on the installed equipment and project requirements.', items:['Building controls and monitoring','System integration coordination','Operational visibility','Testing and handover support']},
    special: {title:'Specialist Solutions', tag:'CUSTOM INTEGRATION / 05', image:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85', desc:'Not every site fits a standard system package. Specialist solutions begin with understanding the building, users, existing equipment and project constraints. STS can help define the scope and coordinate appropriate low-voltage technologies, interfaces, testing and handover based on the agreed requirements.', items:['Requirement-led system planning','Specialist low-voltage systems','Cross-system coordination','Support based on project scope']},
    'project-office': {title:'Commercial Office Integration', tag:'PROJECT TYPE / 01', image:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85', desc:'Commercial offices often need several technology systems to work together without disrupting day-to-day operations. A typical integration plan considers the site layout, user needs, coordination with fit-out contractors, system interfaces, testing and handover. This page describes an illustrative project type, not a verified named STS installation.', items:['Integrated system planning','Coordination with fit-out teams','Testing and documentation','Client handover and support']},
    'project-building': {title:'Building Systems', tag:'PROJECT TYPE / 02', image:'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85', desc:'Building projects may involve coordinating life-safety, security and building-control systems with the wider construction programme. Clear scope definition, interface checks, installation coordination, commissioning and documentation help teams prepare systems for operation. This is an illustrative project category; replace it with approved project information before publishing it as a completed project.', items:['Life-safety and security coordination','Building controls integration','Site commissioning','Ongoing service options']},
    'project-av': {title:'Meeting & AV Spaces', tag:'PROJECT TYPE / 03', image:'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85', desc:'Meeting and collaboration spaces work best when audio, video and room controls are straightforward for the people using them. Planning may cover display placement, microphones, speakers, conferencing equipment, connectivity, configuration and user orientation. This is an illustrative project category, not a claim about a specific completed installation.', items:['Room use and user needs review','Audio and display planning','Installation and configuration','Testing and user orientation']}
  };
  window.STS_DETAILS = details;
  // Details now open as a dedicated page so the full content has room to breathe.
  document.querySelectorAll('[data-detail]').forEach(control => {
    control.addEventListener('click', event => {
      event.preventDefault();
      const key = control.dataset.detail;
      if (key && details[key]) window.location.href = `details.html?item=${encodeURIComponent(key)}`;
    });
  });
  const modal = document.getElementById('detail-modal');
  if (!modal) return;
  const title = document.getElementById('detail-title'), desc = document.getElementById('detail-description'), list = document.getElementById('detail-list'), close = modal.querySelector('.detail-close');
  const image = document.getElementById('detail-image'), imageTag = document.getElementById('detail-image-tag'), counter = document.getElementById('detail-counter');
  const keys = Object.keys(details); let activeIndex = 0, previousFocus = null;
  const render = key => {
    activeIndex = Math.max(0, keys.indexOf(key)); const data = details[keys[activeIndex]];
    title.textContent = data.title; desc.textContent = data.desc; image.src = data.image; image.alt = data.title; imageTag.textContent = data.tag;
    list.replaceChildren(...data.items.map(item => { const el = document.createElement('span'); el.textContent = item; return el; }));
    counter.textContent = `${String(activeIndex + 1).padStart(2,'0')} / ${String(keys.length).padStart(2,'0')}`;
    document.querySelector('.detail-modal-scroll')?.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  };
  const open = key => { if (!details[key]) return; previousFocus = document.activeElement; render(key); modal.hidden = false; document.body.style.overflow = 'hidden'; close.focus(); };
  const shut = () => { modal.hidden = true; document.body.style.overflow = ''; previousFocus?.focus(); };
  const move = delta => { const next = (activeIndex + delta + keys.length) % keys.length; render(keys[next]); };
  close.addEventListener('click', shut);
  modal.querySelector('#detail-prev').addEventListener('click', () => move(-1));
  modal.querySelector('#detail-next').addEventListener('click', () => move(1));
  modal.addEventListener('click', e => { if (e.target === modal) shut(); });
  document.addEventListener('keydown', e => { if (modal.hidden) return; if (e.key === 'Escape') shut(); if (e.key === 'ArrowRight') move(1); if (e.key === 'ArrowLeft') move(-1); });

})();


/* Full-width reading progress and accessible hero image carousel. */
(() => {
  const bar = document.getElementById('reading-progress-bar');
  let progressFrame = 0;
  const update = () => {
    if (!bar) return;
    if (progressFrame) cancelAnimationFrame(progressFrame);
    progressFrame = requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = Math.max(0, Math.max(doc.scrollHeight, document.body?.scrollHeight || 0) - window.innerHeight);
      const pct = max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0;
      bar.style.width = `${pct}%`;
      progressFrame = 0;
    });
  };
  update(); window.addEventListener('scroll', update, {passive:true}); window.addEventListener('resize', update);
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(document.body);
  const slides = [...document.querySelectorAll('.hero-slideshow .hero-slide')]; if (slides.length < 2) return;
  const dots = [...document.querySelectorAll('.hero-slide-dots button')]; let current = 0, timer = null;
  const show = i => { current = (i + slides.length) % slides.length; slides.forEach((el,n)=>el.classList.toggle('is-active',n===current)); dots.forEach((el,n)=>{el.classList.toggle('is-active',n===current);el.setAttribute('aria-pressed',String(n===current));}); };
  const stop = () => { if (timer) window.clearInterval(timer); timer = null; };
  const start = () => { stop(); if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = window.setInterval(()=>show(current+1),1500); };
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);start();}));
  document.querySelector('.hero-slide-prev')?.addEventListener('click',()=>{show(current-1);start();});
  document.querySelector('.hero-slide-next')?.addEventListener('click',()=>{show(current+1);start();});
  // Keep the slideshow moving automatically every 1.5 seconds, including while hovered.
  start();
})();


/* STS site assistant: contextual, guided visitor help without pretending to be a live AI service. */
(() => {
  if (document.querySelector('.sts-chat-launcher')) return;
  const launcher = document.createElement('button');
  launcher.className = 'sts-chat-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-expanded','false');
  launcher.setAttribute('aria-controls','sts-chat-panel');
  launcher.innerHTML = '<img class="sts-chat-robot" src="assets/sts-robot.png" alt=""><span class="sts-chat-sr-only">Ask STS assistant</span>';
  launcher.setAttribute('aria-label','Ask STS assistant');
  const panel = document.createElement('section');
  panel.className = 'sts-chat-panel'; panel.id = 'sts-chat-panel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','STS visitor assistant'); panel.setAttribute('aria-modal','false'); panel.hidden = true;
  panel.innerHTML = `
    <header class="sts-chat-header"><div class="sts-chat-avatar" aria-hidden="true">STS</div><div class="sts-chat-head-copy"><strong>STS Assistant</strong><span><i class="sts-chat-online"></i> Here to help you find the right solution</span></div><button class="sts-chat-close" type="button" aria-label="Close chat">×</button></header>
    <div class="sts-chat-context">SMART TECHNICAL SERVICES · VISITOR SUPPORT</div>
    <div class="sts-chat-messages" aria-live="polite" aria-relevant="additions text"></div>
    <div class="sts-chat-compose"><form class="sts-chat-form"><textarea class="sts-chat-input" rows="1" aria-label="Write your message" placeholder="Ask about services or your project…"></textarea><button class="sts-chat-send" type="submit" aria-label="Send message">↑</button></form><p class="sts-chat-disclaimer">Guided website assistant · For a confirmed quote, contact the STS team.</p></div>`;
  // Mount the assistant directly under <html>, outside transformed/reveal/overflow page wrappers.
  // This makes position:fixed follow the browser viewport, not the document's bottom.
  document.documentElement.append(launcher,panel);
  const messages = panel.querySelector('.sts-chat-messages');
  const form = panel.querySelector('.sts-chat-form');
  const input = panel.querySelector('.sts-chat-input');
  const close = panel.querySelector('.sts-chat-close');
  let greeted = false;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const scrollBottom = () => { messages.scrollTop = messages.scrollHeight; };
  const addMessage = (text, who='bot', links=[]) => {
    const item = document.createElement('div'); item.className = `sts-chat-message ${who==='user'?'is-user':'is-bot'}`;
    const bubble = document.createElement('div'); bubble.className = 'sts-chat-bubble'; bubble.textContent = text; item.append(bubble);
    if (links.length) { const row=document.createElement('div'); row.className='sts-chat-links'; links.forEach(link=>{const a=document.createElement('a');a.href=link.href;a.textContent=link.label;row.append(a);}); item.append(row); }
    const time=document.createElement('div'); time.className='sts-chat-time'; time.textContent=who==='user'?'You':'STS Assistant'; item.append(time); messages.append(item); scrollBottom(); return item;
  };
  const quickOptions = [
    ['Explore services','services'], ['Previous projects','projects'], ['Book a site survey','survey'], ['Contact STS','contact']
  ];
  const addQuickOptions = () => {
    const row=document.createElement('div'); row.className='sts-chat-quick';
    quickOptions.forEach(([label,intent])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>{row.remove();addMessage(label,'user');respond(intent);});row.append(b);});
    messages.append(row);scrollBottom();
  };
  const responses = {
    services: ['STS offers integrated low-voltage and building technology solutions, including fire detection and fighting, security and access control, audio-visual systems, building management, and specialist integrations. Tell us about your site and we can help direct your enquiry.', [{label:'View solutions ↗',href:'solutions.html'},{label:'Discuss requirements ↗',href:'contact.html'}]],
    projects: ['The website showcases example project types such as commercial office integration, building systems, and meeting or audio-visual spaces. The images are illustrative, not a verified list of completed STS projects. Contact the team for relevant project references.', [{label:'Explore projects ↗',href:'projects.html'},{label:'Contact STS ↗',href:'contact.html'}]],
    survey: ['A site survey is a useful first step to understand the premises, existing systems, constraints, and requirements. Use the Contact Us page to share your details and preferred timing. The STS team will need to confirm availability.', [{label:'Book a site survey ↗',href:'contact.html#enquiry-form'}]],
    contact: ['You can send an enquiry through the Contact Us page. Include the service you are interested in, your location, and a short description of the requirement so the team has useful context.', [{label:'Go to Contact Us ↗',href:'contact.html'}]],
    approach: ['STS describes its delivery approach in four stages: understand the site and requirements, design and coordinate the solution, deliver and test the systems, then provide support. The exact scope depends on the project.', [{label:'Our approach ↗',href:'approach.html'},{label:'Talk to STS ↗',href:'contact.html'}]],
    careers: ['For career opportunities, visit the Careers page to review roles and the application information. For recruitment questions, use the contact options provided on the site.', [{label:'Explore careers ↗',href:'careers.html'}]],
    greeting: ['Hello! I can help you explore STS services, understand the project examples, learn about our approach, or find the site-survey enquiry page. What would you like to know?', []],
    fallback: ['I can help with STS services, project examples, our delivery approach, careers, or site-survey enquiries. You can also contact the team for a project-specific answer.', [{label:'Contact STS ↗',href:'contact.html'}]]
  };
  function respond(intent) { const entry=responses[intent]||responses.fallback; addMessage(entry[0],'bot',entry[1]); addQuickOptions(); }
  function detect(text) {
    const t=text.toLowerCase();
    if (/\b(hi|hello|hey|good morning|good afternoon)\b/.test(t)) return 'greeting';
    if (/survey|site visit|visit my site|book.*visit|inspection/.test(t)) return 'survey';
    if (/career|job|vacanc|intern|resume|recruit/.test(t)) return 'careers';
    if (/project|portfolio|previous work|completed work|case stud/.test(t)) return 'projects';
    if (/approach|process|how.*work|installation|commission/.test(t)) return 'approach';
    if (/contact|email|phone|talk to|speak to|quote|quotation|price|cost|estimate/.test(t)) return 'contact';
    if (/service|fire|alarm|cctv|security|access control|audio|visual|av system|building management|bms|low voltage|solution/.test(t)) return 'services';
    return 'fallback';
  }
  function open() { panel.hidden=false; requestAnimationFrame(()=>panel.classList.add('is-open')); launcher.setAttribute('aria-expanded','true'); if(!greeted){greeted=true;respond('greeting');} setTimeout(()=>input.focus(),120); }
  function shut() { panel.classList.remove('is-open'); launcher.setAttribute('aria-expanded','false'); setTimeout(()=>{if(!panel.classList.contains('is-open'))panel.hidden=true;},220); launcher.focus(); }
  launcher.addEventListener('click',()=>panel.hidden?open():shut()); close.addEventListener('click',shut);
  form.addEventListener('submit',event=>{event.preventDefault();const value=input.value.trim();if(!value)return;addMessage(value,'user');input.value='';input.style.height='auto';respond(detect(value));});
  input.addEventListener('input',()=>{input.style.height='auto';input.style.height=Math.min(input.scrollHeight,90)+'px';});
  input.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();form.requestSubmit();}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden)shut();});
})();


/* Stable airport-board letter shuffle: preserve each headline line and its layout. */
(() => {
  const heading = document.querySelector('.sts-airport-headline, .home-hero-copy h1');
  if (!heading || heading.dataset.shuffleReady) return;
  heading.dataset.shuffleReady = 'true';
  const chars = [];
  const wrapText = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const fragment = document.createDocumentFragment();
      for (const char of node.nodeValue) {
        if (/\s/.test(char)) { fragment.appendChild(document.createTextNode(char)); continue; }
        const span = document.createElement('span');
        span.className = 'airport-char'; span.dataset.final = char; span.textContent = char;
        fragment.appendChild(span); chars.push(span);
      }
      node.replaceWith(fragment);
    } else if (node.nodeType === Node.ELEMENT_NODE) [...node.childNodes].forEach(wrapText);
  };
  [...heading.childNodes].forEach(wrapText);
  let run = 0;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-';
  const shuffle = () => {
    const thisRun = ++run;
    chars.forEach((span, index) => {
      const finalChar = span.dataset.final;
      const start = performance.now() + index * 9;
      const duration = 360 + (index % 7) * 24;
      const tick = () => {
        if (thisRun !== run) return;
        const elapsed = performance.now() - start;
        if (elapsed < 0) { requestAnimationFrame(tick); return; }
        if (elapsed >= duration) { span.textContent = finalChar; span.classList.remove('is-shuffling'); return; }
        span.classList.add('is-shuffling');
        span.textContent = alphabet[Math.floor(Math.random() * alphabet.length)];
        window.setTimeout(() => requestAnimationFrame(tick), 42);
      };
      requestAnimationFrame(tick);
    });
  };
  heading.addEventListener('mouseenter', shuffle);
  heading.addEventListener('focusin', shuffle);
  heading.setAttribute('tabindex','0');
  heading.setAttribute('aria-label','Intelligent systems. Safer spaces. Smarter futures. Hover to animate the headline.');
})();


/* Pop-up scroll transitions for interior pages only. Home page is intentionally excluded. */
(() => {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === 'index.html' || page === '' || !document.querySelector('main')) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('main section, main .job-card, main .career-path, main .process-grid > div, main .section-head, main .contact-form, main .contact-intro, main .solution-card, main .project-card, main .about-copy, main .about-visual');
  targets.forEach((el, i) => {
    if (el.closest('.career-modal-backdrop')) return;
    el.classList.add('interior-pop');
    el.style.setProperty('--pop-delay', `${(i % 4) * 65}ms`);
  });
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.classList.toggle('interior-pop-visible', entry.isIntersecting);
  }), {threshold: 0.08, rootMargin: '0px 0px -25px 0px'});
  targets.forEach(el => observer.observe(el));
})();

/* Dedicated careers role details and application page. */
(() => {
 const root = document.getElementById('career-role-detail');
 if (!root) return;
 const roles = [
 {title:'ELV Systems Engineer',dept:'Engineering',level:'Mid level',location:'Muscat, Oman',type:'Full-time',desc:'Coordinate design, installation, testing and handover of integrated ELV systems.',requirements:'ELV project experience, drawings and submittals, commissioning and troubleshooting.',responsibilities:['Coordinate ELV design, installation and commissioning activities.','Review drawings, submittals, testing records and handover documents.','Work with site teams and clients to resolve technical issues.'],skills:['ELV systems','CCTV and access control','Fire alarm systems','Testing and commissioning']},
 {title:'Fire Alarm Technician',dept:'Engineering',level:'Entry level',location:'Muscat, Oman',type:'Full-time',desc:'Install, inspect and maintain fire detection and life-safety systems.',requirements:'Technical diploma or relevant hands-on experience; safety-first mindset.',responsibilities:['Assist with installation and maintenance of fire detection equipment.','Perform inspections and basic system testing under approved procedures.','Record service findings and report faults to the supervisor.'],skills:['Fire detection','Life-safety systems','Safe site practices','Troubleshooting']},
 {title:'CCTV & Access Control Engineer',dept:'Security',level:'Mid level',location:'Muscat, Oman',type:'Full-time',desc:'Deliver reliable video surveillance, access control and security integrations.',requirements:'Knowledge of IP networking, camera configuration and access-control systems.',responsibilities:['Configure CCTV cameras, recording systems and access-control devices.','Support network connectivity, testing and system integration.','Prepare technical documentation and support client handover.'],skills:['IP networking','CCTV','Access control','System integration']},
 {title:'BMS / Automation Engineer',dept:'Engineering',level:'Mid level',location:'Muscat, Oman',type:'Full-time',desc:'Support building management integration, controls configuration and commissioning.',requirements:'Controls or electrical background and familiarity with BMS protocols.',responsibilities:['Assist with BMS configuration, integration and functional testing.','Coordinate controls interfaces with HVAC and other building systems.','Document test results and help troubleshoot system issues.'],skills:['Building automation','Controls','BMS protocols','Commissioning']},
 {title:'AV Systems Specialist',dept:'Engineering',level:'Entry level',location:'Muscat, Oman',type:'Full-time',desc:'Install and commission professional AV, meeting-room and public-address systems.',requirements:'AV installation experience, cable termination and customer communication.',responsibilities:['Install AV equipment, displays, speakers and meeting-room devices.','Support cable termination, configuration and commissioning.','Explain system operation to clients and document completed work.'],skills:['Audio visual','Video conferencing','Cable termination','Client support']},
 {title:'Cloud & IT Support Associate',dept:'Cloud',level:'Entry level',location:'Muscat, Oman',type:'Full-time',desc:'Assist with infrastructure support, connectivity and technical service requests.',requirements:'IT diploma or equivalent knowledge of networks and troubleshooting.',responsibilities:['Respond to service requests and assist with user support.','Troubleshoot basic network, endpoint and cloud-access issues.','Document incidents, resolutions and escalations.'],skills:['IT support','Networking','Troubleshooting','Cloud fundamentals']},
 {title:'Graduate ELV Trainee',dept:'Engineering',level:'Internship',location:'Muscat, Oman',type:'Internship',desc:'Learn site coordination, system documentation and testing alongside engineers.',requirements:'Recent graduate in electrical, electronics, IT or a related discipline.',responsibilities:['Support engineers with site checks and technical documentation.','Learn installation standards, testing steps and safe working practices.','Assist with maintaining project records and handover materials.'],skills:['Willingness to learn','Technical documentation','Teamwork','Electrical, electronics or IT basics']},
 {title:'Project Coordinator',dept:'Business',level:'Mid level',location:'Muscat, Oman',type:'Full-time',desc:'Coordinate project schedules, documentation, site access and team communication.',requirements:'Organized communicator with project administration or coordination experience.',responsibilities:['Track project schedules, actions, documentation and site access.','Coordinate updates between clients, suppliers and delivery teams.','Maintain clear records and flag risks or schedule changes.'],skills:['Planning','Communication','Documentation','Project coordination']}
 ];
 const adminCareerRoles=(()=>{try{const saved=JSON.parse(localStorage.getItem('sts_admin_workspace_v1')||'{}').careers;return Array.isArray(saved)?saved.filter(c=>c.status==='Published').map(c=>({title:c.title||c.role,dept:c.department||c.category||'Engineering',level:c.level||c.experience||'Mid level',location:c.location||'Muscat, Oman',type:c.employmentType||'Full-time',desc:c.description||'Learn more about this opportunity with Smart Technical Services.',requirements:c.requirements||c.description||'Review the responsibilities and discuss role-specific requirements with the recruitment team.',responsibilities:Array.isArray(c.responsibilities)?c.responsibilities:[c.description||'Contribute to the team and deliver the responsibilities associated with this role.','Collaborate with colleagues and stakeholders.','Follow company quality and safety procedures.'],skills:Array.isArray(c.skills)?c.skills:String(c.skills||'Communication, teamwork, role-specific technical skills').split(',').map(x=>x.trim()).filter(Boolean)})):[]}catch{return []}})();
 roles.splice(0,roles.length,...[...roles,...adminCareerRoles].filter((r,i,a)=>a.findIndex(x=>x.title===r.title)===i));
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const title=new URLSearchParams(location.search).get('role');
 const role=roles.find(r=>r.title===title);
 if(!role){root.innerHTML='<section class="section role-not-found"><p class="eyebrow">CAREERS AT STS</p><h1>Role not found</h1><p>Return to the careers page to choose an available role.</p><a class="button button-primary" href="careers.html#open-roles">Browse open roles ↗</a></section>';return;}
 root.innerHTML=`<section class="role-detail-hero"><a class="text-link" href="careers.html#open-roles">← Back to all roles</a><p class="eyebrow">CAREER OPPORTUNITY / ${esc(role.dept)}</p><h1>${esc(role.title)}</h1><p class="role-summary">${esc(role.desc)}</p><div class="job-meta"><span>${esc(role.level)}</span><span>${esc(role.location)}</span><span>${esc(role.type)}</span></div><a class="button button-primary" href="#apply-now">Apply for this role ↗</a></section><section class="section role-detail-grid"><article class="role-detail-content"><p class="eyebrow">THE ROLE</p><h2>What you'll work on</h2><ul>${role.responsibilities.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h2>Skills and experience</h2><p>${esc(role.requirements)}</p><div class="role-skill-list">${role.skills.map(x=>`<span>${esc(x)}</span>`).join('')}</div><div class="role-note"><strong>Before you apply</strong><p>This is a demonstration careers site. Role information is illustrative; confirm current vacancies and requirements with STS recruitment.</p></div></article><aside class="role-apply-card" id="apply-now"><p class="eyebrow">YOUR NEXT STEP</p><h2>Apply for this role</h2><p>Share your details and attach your resume. Required fields are marked with an asterisk.</p><form class="application-form sts-professional-application" id="career-role-application">
<input type="hidden" name="role" value="${esc(role.title)}">
<div class="sts-application-heading wide"><span class="sts-form-kicker">CANDIDATE APPLICATION</span><p>Complete the details below to prepare your application for <strong>${esc(role.title)}</strong>. Fields marked * are required.</p></div>
<div class="sts-form-section-title wide"><span>01</span><div><strong>Personal information</strong><small>How we can identify and contact you</small></div></div>
<label>Full name *<input name="name" required autocomplete="name" placeholder="Enter your full name" maxlength="100"></label>
<label>Email address *<input name="email" type="email" required autocomplete="email" placeholder="name@example.com" maxlength="150"></label>
<label>Phone number *<input name="phone" type="tel" required autocomplete="tel" placeholder="+968 9XXX XXXX" maxlength="30"></label>
<label>Current location<input name="location" autocomplete="address-level2" placeholder="City, country" maxlength="120"></label>
<div class="sts-form-section-title wide"><span>02</span><div><strong>Professional background</strong><small>Help us understand your experience</small></div></div>
<label>Years of experience<select name="experience"><option value="">Select experience</option><option>Student / Fresher</option><option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5–10 years</option><option>10+ years</option></select></label>
<label>Current or most recent job title<input name="currentTitle" placeholder="e.g. ELV Systems Engineer" maxlength="120"></label>
<label class="wide">Highest qualification<input name="qualification" placeholder="e.g. B.Tech, Diploma, B.Sc." maxlength="120"></label>
<div class="sts-form-section-title wide"><span>03</span><div><strong>Resume and supporting information</strong><small>Tell us what makes you a strong candidate</small></div></div>
<label class="wide sts-upload-field">Resume (PDF or Word) *<input name="resume" type="file" accept=".pdf,.doc,.docx" required><small>Accepted: PDF, DOC, DOCX. Maximum file size: 5 MB.</small></label>
<label class="wide">Cover letter / statement of interest<textarea name="note" rows="5" maxlength="2500" placeholder="Briefly introduce yourself, highlight relevant experience and explain why you are interested in this role."></textarea></label>
<label class="wide">Portfolio or LinkedIn URL<input name="portfolio" type="url" placeholder="https://www.linkedin.com/in/your-profile" maxlength="300"></label>
<label class="wide sts-consent"><input name="acknowledge" type="checkbox" required><span>I understand this prototype stores my application details in this browser for the admin team to review. *</span></label>
<p class="application-note wide">Prototype mode: application details and the resume filename are stored locally in this browser and appear in the admin Applications panel. The resume file itself is not uploaded. A secure backend is required for real recruitment submissions.</p>
<button class="button button-primary sts-application-submit wide" type="submit"><span>Submit application</span><span aria-hidden="true">↗</span></button>
<p class="application-feedback wide" role="status" aria-live="polite"></p></form></aside></section>`;
 const form=root.querySelector('#career-role-application');
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const fd=new FormData(form),file=form.elements.resume.files[0];if(file && file.size>5*1024*1024){form.querySelector('.application-feedback').textContent='Please choose a resume smaller than 5 MB.';return;}const record={id:'APP-'+Date.now(),role:role.title,name:fd.get('name'),email:fd.get('email'),phone:fd.get('phone'),location:fd.get('location'),experience:fd.get('experience'),currentTitle:fd.get('currentTitle'),qualification:fd.get('qualification'),portfolio:fd.get('portfolio'),note:fd.get('note'),resumeName:file?.name||'',submittedAt:new Date().toISOString(),status:'New',read:false};try{const all=JSON.parse(localStorage.getItem('stsCareerApplications')||'[]');all.unshift(record);localStorage.setItem('stsCareerApplications',JSON.stringify(all));localStorage.setItem('stsCareerApplicationsUpdatedAt',record.submittedAt);}catch{}form.innerHTML=`<p class="eyebrow">APPLICATION RECORDED</p><h2>Thank you, ${esc(record.name)}.</h2><p>Your application for <strong>${esc(role.title)}</strong> has been recorded in this browser. The admin dashboard will show a new application notification when opened in the same browser and origin.</p><a class="button button-primary" href="careers.html#open-roles">Back to careers ↗</a>`;});
})();

/* Accessible back-to-top control, visually paired with the floating Ask STS assistant. */
(() => {
  if (document.querySelector('.sts-back-top')) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sts-back-top';
  button.setAttribute('aria-label', 'Back to top');
  button.title = 'Back to top';
  button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.documentElement.append(button);
  const update = () => button.classList.toggle('is-visible', window.scrollY > 420);
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('pageshow', update);
  update();
  button.addEventListener('click', () => window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
})();


/* Preselect service when a visitor arrives from a solution detail page. */
(() => {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('service');
  const select = document.querySelector('.contact-form select[name="service"]');
  if (!requested || !select) return;
  const normal = value => value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = normal(requested);
  const option = Array.from(select.options).find(o => {
    const label = normal(o.textContent);
    return label === target || target.includes(label) || label.includes(target) ||
      (target.includes('security') && label.includes('security')) ||
      (target.includes('audio') && label.includes('audio')) ||
      (target.includes('fire') && label.includes('fire')) ||
      (target.includes('buildingmanagement') && label.includes('buildingmanagement')) ||
      (target.includes('special') && label.includes('special'));
  });
  if (option) select.value = option.value || option.textContent;
})();


/* Public-facing project/career publishing bridge for the local demo workspace.
   Admin and public pages must run on the same origin for localStorage to be shared. */
(() => {
 const KEY='sts_admin_workspace_v1';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let data={}; try{data=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{}
 const projectSection=document.querySelector('.projects-section');
 if(projectSection && Array.isArray(data.projects)){
   let published=projectSection.querySelector('#admin-published-projects');
   if(!published){published=document.createElement('div');published.id='admin-published-projects';published.className='admin-published-projects';projectSection.appendChild(published)}
   const items=data.projects.filter(p=>p.status==='Completed'||p.status==='In Progress');
   published.innerHTML=items.length?`<div class="section-head"><div><p class="eyebrow">PROJECT PORTFOLIO</p><h2>Projects &amp; delivery</h2><p class="section-note">Project updates published by the STS team.</p></div></div><div class="card-grid three">${items.map(p=>`<article class="project-card"><div class="project-card-body"><p class="eyebrow">${esc(p.category||'STS PROJECT')}</p><h3>${esc(p.name)}</h3><p>${esc(p.description||'')}</p><div class="job-meta"><span>${esc(p.client||'STS')}</span><span>${esc(p.status)}</span></div></div></article>`).join('')}</div>`:'';
 }
})();


/* Full-background homepage slideshow with corner arrows and centered pagination. */
(() => {
  const root = document.querySelector('.home-hero-background');
  const slides = Array.from(document.querySelectorAll('.hero-background-slideshow .hero-bg-slide'));
  if (!root || slides.length < 2) return;
  const dots = Array.from(root.querySelectorAll('.hero-bg-dots button'));
  let active = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
  let timer = null;
  const show = (index) => {
    slides[active].classList.remove('is-active');
    dots[active]?.classList.remove('is-active');
    active = (index + slides.length) % slides.length;
    slides[active].classList.add('is-active');
    dots[active]?.classList.add('is-active');
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === active)));
  };
  const start = () => { window.clearInterval(timer); if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = window.setInterval(() => show(active + 1), 3000); };
  root.querySelector('.hero-bg-prev')?.addEventListener('click', () => { show(active - 1); start(); });
  root.querySelector('.hero-bg-next')?.addEventListener('click', () => { show(active + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
  show(active); start();
})();

/* Accessible site-wide search for public page headers. */
(() => {
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.site-search-toggle');
  if (!header || !toggle || header.querySelector('.site-search-panel')) return;
  const panel = document.createElement('div');
  panel.className = 'site-search-panel';
  panel.hidden = true;
  panel.innerHTML = '<form class="site-search-form" role="search"><input class="site-search-input" type="search" name="q" placeholder="Search STS pages…" aria-label="Search STS pages" autocomplete="off" required><button class="site-search-submit" type="submit">Search</button></form><p class="site-search-hint">Search services, projects, careers, contact details and more.</p>';
  header.appendChild(panel);
  const input = panel.querySelector('input');
  const pageTargets = [
    {file:'index.html', words:['home','overview','sts','smart technical services']},
    {file:'solutions.html', words:['solution','service','fire','security','cctv','access control','av','audio','visual','bms','building management','network','elv','maintenance']},
    {file:'about.html', words:['about','company','team','mission','vision','who we are']},
    {file:'projects.html', words:['project','portfolio','work','completed','case study']},
    {file:'approach.html', words:['approach','process','method','delivery','design','installation','commissioning']},
    {file:'careers.html', words:['career','job','jobs','vacancy','vacancies','hiring','recruitment','apply','role']},
    {file:'contact.html', words:['contact','quote','enquiry','inquiry','location','email','phone','get in touch']}
  ];
  toggle.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden) input.focus();
  });
  panel.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const query = input.value.trim().toLowerCase();
    if (!query) return;
    const target = pageTargets.find(page => page.words.some(word => word.includes(query) || query.includes(word)));
    if (target) { window.location.href = target.file + '?q=' + encodeURIComponent(input.value.trim()); return; }
    // If no page category matches, search visible text on the current page.
    const text = document.querySelector('main')?.innerText.toLowerCase() || '';
    if (text.includes(query)) {
      const candidates = Array.from(document.querySelectorAll('main h1, main h2, main h3, main p, main a'));
      const match = candidates.find(el => (el.innerText || '').toLowerCase().includes(query));
      if (match) { match.scrollIntoView({behavior:'smooth', block:'center'}); match.setAttribute('tabindex','-1'); match.focus({preventScroll:true}); return; }
    }
    const results = pageTargets.find(page => page.file !== location.pathname.split('/').pop());
    if (results) window.location.href = results.file + '?q=' + encodeURIComponent(input.value.trim());
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) { panel.hidden = true; toggle.setAttribute('aria-expanded','false'); toggle.focus(); }
  });
  document.addEventListener('click', event => {
    if (!panel.hidden && !panel.contains(event.target) && !toggle.contains(event.target)) { panel.hidden = true; toggle.setAttribute('aria-expanded','false'); }
  });
})();
