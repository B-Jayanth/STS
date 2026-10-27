/* Smart Technical Services admin workspace
   Front-end persistence uses localStorage. Real authentication, shared database writes,
   and actual outbound email require server-side integrations. */
(() => {
  "use strict";
  const STORAGE_KEY = "sts_admin_workspace_v1";
  const SERVICE_CATEGORIES = [
    "Fire Detection & Firefighting", "Security Systems", "Audio-Visual Systems",
    "Building Management Systems", "Specialized Solutions"
  ];
  const serviceIcons = ["♨","◉","▣","⌘","⌁"];
  const initialData = {
    enquiries: [
      {id:"ENQ-1048",name:"Aisha Al Balushi",email:"aisha@example.com",phone:"+968 9210 3344",company:"Al Noor Properties",service:"Security Systems",subject:"CCTV installation for a new office",message:"Hello, we are fitting out a new office in Muscat and need a CCTV system with remote monitoring. Could you recommend a suitable package and arrange a site visit?",date:"2026-10-21",status:"New",priority:"High",assignee:"Site Administrator",replies:[]},
      {id:"ENQ-1047",name:"Khalid Al Harthy",email:"khalid@example.com",phone:"+968 9672 1180",company:"Horizon Hospitality",service:"Audio-Visual Systems",subject:"Conference room AV quotation",message:"We need a display, wireless presentation, microphones, and room audio for a 12-seat meeting room. Please share your options.",date:"2026-10-21",status:"In Progress",priority:"Medium",assignee:"Mariam Hassan",replies:[]},
      {id:"ENQ-1046",name:"Sara Nasser",email:"sara@example.com",phone:"+968 9923 4051",company:"Nasser Medical Centre",service:"Fire Detection & Firefighting",subject:"Fire alarm maintenance enquiry",message:"We would like to arrange a maintenance visit for our existing fire alarm system. Please let us know what information you need.",date:"2026-10-20",status:"Awaiting Customer",priority:"High",assignee:"Omar Said",replies:[{date:"2026-10-20T10:30:00",subject:"Re: Fire alarm maintenance enquiry",body:"Hello Sara, thank you for contacting us. Could you share the panel make/model and your preferred maintenance date so our team can plan the visit?",by:"Omar Said"}]},
      {id:"ENQ-1045",name:"Rashid Trading LLC",email:"projects@example.com",phone:"+968 2450 8012",company:"Rashid Trading LLC",service:"Building Management Systems",subject:"BMS for warehouse extension",message:"We are extending a warehouse and would like to integrate HVAC monitoring and energy meters into a BMS.",date:"2026-10-19",status:"In Progress",priority:"Medium",assignee:"Mariam Hassan",replies:[]},
      {id:"ENQ-1044",name:"Noor Al Farsi",email:"noor@example.com",phone:"+968 9530 7711",company:"Private Residence",service:"Specialized Solutions",subject:"Smart home automation",message:"I am interested in lighting and climate control for a villa renovation. Can I book an initial consultation?",date:"2026-10-18",status:"New",priority:"Low",assignee:"Site Administrator",replies:[]},
      {id:"ENQ-1043",name:"Oman Crest Group",email:"admin@example.com",phone:"+968 2455 6622",company:"Oman Crest Group",service:"Security Systems",subject:"Access control for two entrances",message:"Please provide information about card access and visitor entry for two office entrances.",date:"2026-10-17",status:"Resolved",priority:"Low",assignee:"Omar Said",replies:[{date:"2026-10-17T14:00:00",subject:"Re: Access control for two entrances",body:"Thank you for your enquiry. Our team has shared the initial information and will be happy to assist with a site survey.",by:"Omar Said"}]},
      {id:"ENQ-1042",name:"Mina Hospitality",email:"mina@example.com",phone:"+968 2420 9876",company:"Mina Hospitality",service:"Audio-Visual Systems",subject:"Public address system",message:"We are looking for a public-address system for a small hotel. Please contact us about available options.",date:"2026-10-16",status:"Resolved",priority:"Medium",assignee:"Mariam Hassan",replies:[]},
      {id:"ENQ-1041",name:"Blue Coast Offices",email:"office@example.com",phone:"+968 2411 0987",company:"Blue Coast Offices",service:"Fire Detection & Firefighting",subject:"Emergency lighting inspection",message:"Please advise whether your team can inspect emergency lighting at our office building.",date:"2026-10-15",status:"Resolved",priority:"Low",assignee:"Omar Said",replies:[]}
    ],
    services: [
      {id:"SRV-01",name:"Fire Detection & Firefighting",category:SERVICE_CATEGORIES[0],description:"Fire alarm detection, suppression, evacuation, inspection, and maintenance solutions for safer buildings.",status:"Published",icon:"♨"},
      {id:"SRV-02",name:"CCTV & Video Surveillance",category:SERVICE_CATEGORIES[1],description:"IP CCTV, remote monitoring, video recording, and integrated surveillance solutions.",status:"Published",icon:"◉"},
      {id:"SRV-03",name:"Access Control & Intrusion",category:SERVICE_CATEGORIES[1],description:"Controlled entry, card readers, intrusion alarms, and integrated premises protection.",status:"Published",icon:"⌑"},
      {id:"SRV-04",name:"Conference Room AV",category:SERVICE_CATEGORIES[2],description:"Displays, conferencing equipment, microphones, speakers, and room control systems.",status:"Published",icon:"▣"},
      {id:"SRV-05",name:"Public Address Systems",category:SERVICE_CATEGORIES[2],description:"Public-address, background audio, and voice evacuation solutions for commercial premises.",status:"Published",icon:"♫"},
      {id:"SRV-06",name:"Building Management Systems",category:SERVICE_CATEGORIES[3],description:"Centralized monitoring and control for compatible HVAC, lighting, and energy systems.",status:"Published",icon:"⌘"},
      {id:"SRV-07",name:"Smart Home Automation",category:SERVICE_CATEGORIES[4],description:"Connected lighting, climate, and selected smart-home controls tailored to each property.",status:"Published",icon:"⌂"},
      {id:"SRV-08",name:"Structured Cabling & Networks",category:SERVICE_CATEGORIES[4],description:"Structured data cabling, network cabinets, and communications infrastructure.",status:"Published",icon:"⌁"},
      {id:"SRV-09",name:"PABX Telephone Systems",category:SERVICE_CATEGORIES[4],description:"Business telephony and internal communications solutions.",status:"Published",icon:"☎"},
      {id:"SRV-10",name:"Parking Management",category:SERVICE_CATEGORIES[4],description:"Technology to support parking access, occupancy, and vehicle flow.",status:"Draft",icon:"P"},
      {id:"SRV-11",name:"Queue Management",category:SERVICE_CATEGORIES[4],description:"Queue ticketing and customer-flow management for service environments.",status:"Published",icon:"≋"},
      {id:"SRV-12",name:"Digital Signage",category:SERVICE_CATEGORIES[2],description:"Managed displays for announcements, wayfinding, and business communications.",status:"Draft",icon:"▤"}
    ],
    projects: [
      {id:"PRJ-201",name:"Corporate Office Security Upgrade",client:"Al Noor Properties",category:"Security Systems",status:"In Progress",date:"2026-10-08",description:"CCTV coverage and access-control upgrade for a multi-floor office.",icon:"◉"},
      {id:"PRJ-202",name:"Healthcare Fire Safety Maintenance",client:"Nasser Medical Centre",category:"Fire Detection & Firefighting",status:"Completed",date:"2026-09-19",description:"Scheduled inspection and maintenance of fire detection equipment.",icon:"♨"},
      {id:"PRJ-203",name:"Hospitality Conference Room",client:"Horizon Hospitality",category:"Audio-Visual Systems",status:"Planning",date:"2026-10-12",description:"Integrated display, room audio, and conferencing equipment.",icon:"▣"},
      {id:"PRJ-204",name:"Warehouse Monitoring Integration",client:"Rashid Trading LLC",category:"Building Management Systems",status:"In Progress",date:"2026-10-15",description:"Planning for HVAC and energy monitoring integration.",icon:"⌘"},
      {id:"PRJ-205",name:"Villa Smart Controls",client:"Private Residence",category:"Specialized Solutions",status:"Planning",date:"2026-10-17",description:"Smart lighting and climate control consultation.",icon:"⌂"}
    ],
    careers: [
      {id:"CAR-01",role:"Security Engineer",title:"Senior ELV / Security Systems Engineer",description:"Lead the design and commissioning of integrated security & ELV systems for landmark projects across Oman.",location:"Muscat, Oman",employmentType:"Full-time",experience:"5+ years",image:"https://smart-technichal-services.vercel.app/_astro/projects.DGk2a4Fq_Z2k3Acy.webp",status:"Published",detailsUrl:"",applyUrl:""},
      {id:"CAR-02",role:"Project Manager",title:"Project Manager — ELV",description:"Plan, resource and deliver multi-discipline ELV projects on time, on budget and to specification.",location:"Muscat, Oman",employmentType:"Full-time",experience:"5+ years",image:"https://smart-technichal-services.vercel.app/_astro/fire.GSaP2QM9_Z1IarId.webp",status:"Published",detailsUrl:"",applyUrl:""},
      {id:"CAR-03",role:"Fire Technician",title:"Fire Alarm & Fire Fighting Technician",description:"Install, test and maintain addressable fire alarm, suppression and emergency lighting systems.",location:"Muscat, Oman",employmentType:"Full-time",experience:"2+ years",image:"https://smart-technichal-services.vercel.app/_astro/security.Bkit5sj7_Z2rvOkW.webp",status:"Published",detailsUrl:"",applyUrl:""},
      {id:"CAR-04",role:"Security Technician",title:"CCTV & Access Control Technician",description:"Deploy and configure IP CCTV, video analytics and access control across client sites.",location:"Muscat, Oman",employmentType:"Full-time",experience:"2+ years",image:"https://smart-technichal-services.vercel.app/_astro/av.C2WAIwNI_Z1WxR6X.webp",status:"Published",detailsUrl:"",applyUrl:""},
      {id:"CAR-05",role:"AV Technician",title:"Audio-Visual (AV) Technician",description:"Set up professional AV, digital signage, IPTV and public address / voice evacuation systems.",location:"Muscat, Oman",employmentType:"Full-time",experience:"2+ years",image:"https://smart-technichal-services.vercel.app/_astro/team.DiIT81qC_Z1mJ6kN.webp",status:"Published",detailsUrl:"",applyUrl:""},
      {id:"CAR-06",role:"Sales Engineer",title:"Sales Engineer — ELV Solutions",description:"Translate client requirements into engineered ELV proposals and grow STS across Oman.",location:"Muscat, Oman",employmentType:"Full-time",experience:"3+ years",image:"https://smart-technichal-services.vercel.app/_astro/projects.DGk2a4Fq_Z2k3Acy.webp",status:"Published",detailsUrl:"",applyUrl:""}
    ],
    employees: [],
    team: [
      {id:"USR-01",name:"Site Administrator",email:"admin@smarttechnical.example",role:"Administrator",status:"Active"},
      {id:"USR-02",name:"Mariam Hassan",email:"mariam@smarttechnical.example",role:"Service Manager",status:"Active"},
      {id:"USR-03",name:"Omar Said",email:"omar@smarttechnical.example",role:"Support Agent",status:"Active"}
    ],
    content:{headline:"Integrated Technical Solutions for Modern Buildings",description:"Fire, security, audio-visual, and smart-building systems delivered with care and precision.",email:"info@smarttechnicalservices.com",phone:"+968 0000 0000",location:"Ghala, Muscat, Oman",cta:"Request a site survey"},
    settings:{newAlerts:true,replyReminders:true,projectUpdates:true}
  };
  let state = loadState();
  let activeEnquiryId = null;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const esc = (v="") => String(v).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const initials = name => String(name||"?").split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase();
  const fmtDate = value => { if(!value) return "—"; const d = new Date(value+"T00:00:00"); return Number.isNaN(d.getTime())?value:d.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}); };
  const shortDate = value => { if(!value) return "—"; const d = new Date(value); return Number.isNaN(d.getTime())?value:d.toLocaleDateString("en-GB",{day:"2-digit",month:"short"}); };
  const slug = v => String(v||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  function clone(v){return JSON.parse(JSON.stringify(v));}
  function emailDraftUrl(to, subject="", body=""){
    return "mailto:"+encodeURIComponent(to||"")+
      "?subject="+encodeURIComponent(subject||"")+
      "&body="+encodeURIComponent(body||"");
  }
  function openEmailDraft(to, subject="", body=""){
    if(!to){toast("This contact does not have an email address.","info");return;}
    window.location.href=emailDraftUrl(to,subject,body);
  }
  function loadState(){try{const saved=localStorage.getItem(STORAGE_KEY);if(saved){const parsed=JSON.parse(saved);return {...clone(initialData),...parsed,employees:Array.isArray(parsed.employees)?parsed.employees:[],careers:Array.isArray(parsed.careers)?parsed.careers.map(c=>({...c,status:c.status==="Draft"?"Draft":c.status==="On Hold"?"On Hold":"Published"})):clone(initialData.careers),content:{...initialData.content,...parsed.content},settings:{...initialData.settings,...parsed.settings}}}}catch(e){console.warn("Unable to read workspace storage",e)}return clone(initialData)}
  function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true}catch(e){toast("Browser storage is unavailable or full.","error");return false}}
  function toast(message,type="success"){const el=document.createElement("div");el.className="toast "+type;el.textContent=message;$("#toastRegion").appendChild(el);setTimeout(()=>el.remove(),3800)}
  function empty(msg,title="Nothing to show"){return `<tr><td colspan="8"><div class="empty-state"><strong>${esc(title)}</strong>${esc(msg)}</div></td></tr>`}
  function statusClass(s){return "status-"+slug(s)}
  function statusPill(s){return `<span class="status-pill ${statusClass(s)}">${esc(s)}</span>`}
  function priorityPill(s){return `<span class="priority-pill priority-${slug(s)}">${esc(s)}</span>`}
  function options(items,selected){return items.map(v=>`<option value="${esc(v)}" ${v===selected?"selected":""}>${esc(v)}</option>`).join("")}
  function nextId(prefix,records){const max=records.reduce((n,r)=>{const m=String(r.id).match(/(\d+)$/);return Math.max(n,m?Number(m[1]):0)},1000);return `${prefix}-${max+1}`}
  function go(view){const el=$("#view-"+view);if(!el)return;$$(".page-view").forEach(x=>x.classList.toggle("active",x===el));$$(".nav-link").forEach(x=>x.classList.toggle("active",x.dataset.view===view));const label=$(`.nav-link[data-view="${view}"]`)?.textContent.trim().replace(/\s+\d+$/,"")||"Overview";$("#crumbCurrent").textContent=label;$("#sidebar").classList.remove("open");renderView(view);window.scrollTo({top:0,behavior:"smooth"})}
  function renderView(view){if(view==="overview")renderOverview();if(view==="enquiries")renderEnquiries();if(view==="services")renderServices();if(view==="projects")renderProjects();if(view==="careers")renderCareers();if(view==="applications")renderApplications();if(view==="customers")renderCustomers();if(view==="employees")renderEmployees();if(view==="team")renderTeam();if(view==="content")renderContent();if(view==="reports")renderReports();if(view==="settings")renderSettings()}
  function renderAll(){renderOverview();renderEnquiries();renderServices();renderProjects();renderCareers();renderApplications();renderCustomers();renderEmployees();renderTeam();renderContent();renderReports();renderSettings();$("#navEnquiryCount").textContent=state.enquiries.filter(e=>["New","In Progress"].includes(e.status)).length}
  function renderOverview(){
    const es=state.enquiries;$("#statEnquiries").textContent=es.length;$("#statPending").textContent=es.filter(e=>["New","In Progress","Awaiting Customer"].includes(e.status)).length;$("#statServices").textContent=state.services.filter(s=>s.status==="Published").length;$("#statProjects").textContent=state.projects.length;
    $("#recentEnquiries").innerHTML=es.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5).map(e=>`<tr><td><div class="customer-cell"><div class="customer-avatar">${esc(initials(e.name))}</div><div><div class="customer-name">${esc(e.name)}</div><div class="customer-sub">${esc(e.id)}</div></div></div></td><td>${esc(e.service)}</td><td>${fmtDate(e.date)}</td><td>${statusPill(e.status)}</td><td><button class="row-action" data-open-enquiry="${esc(e.id)}">Open</button></td></tr>`).join("")||empty("New enquiries will appear here.");
    renderActivity();renderBreakdown();
  }
  function renderActivity(){
    const days=Number($("#activityRange")?.value||7),labels=[],vals=[];
    for(let i=days-1;i>=0;i--){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-i);const key=d.toISOString().slice(0,10);labels.push({key,label:d.toLocaleDateString("en",{weekday:days===7?"short":undefined,day:days===7?undefined:"numeric",month:days===7?undefined:"short"})});vals.push({all:state.enquiries.filter(e=>e.date===key).length,replied:state.enquiries.filter(e=>e.date===key&&e.replies?.length).length})}
    if(!vals.some(v=>v.all)){const fallback=days===7?[2,4,3,5,3,6,4]:Array.from({length:days},(_,i)=>Math.round(2+3*Math.abs(Math.sin(i*.7))));vals.forEach((v,i)=>{v.all=fallback[i]||0;v.replied=Math.max(0,v.all-1)})}
    const max=Math.max(1,...vals.map(v=>v.all));$("#activityChart").innerHTML=vals.map((v,i)=>`<div class="bar-group"><div class="bar-pair"><div class="bar" title="${v.all} enquiries" style="height:${Math.max(3,v.all/max*100)}%"></div><div class="bar replied" title="${v.replied} replied" style="height:${Math.max(3,v.replied/max*100)}%"></div></div><span class="bar-label">${esc(labels[i].label)}</span></div>`).join("");
  }
  function renderBreakdown(){
    const counts=SERVICE_CATEGORIES.map(cat=>({cat,count:state.enquiries.filter(e=>e.service===cat||state.services.some(s=>s.category===cat&&s.name===e.service)).length}));const max=Math.max(1,...counts.map(x=>x.count));
    $("#serviceBreakdown").innerHTML=counts.map(x=>`<div class="breakdown-row"><span class="name">${esc(x.cat)}</span><span class="count">${x.count} enquiries</span><div class="progress-track"><div class="progress-fill" style="width:${x.count/max*100}%"></div></div></div>`).join("");
  }
  function renderEnquiries(){
    const search=($("#enquirySearch")?.value||"").trim().toLowerCase(),sf=$("#statusFilter")?.value||"all",cf=$("#serviceFilter")?.value||"all";
    const svc=$("#serviceFilter");if(svc&&svc.options.length<=1)svc.innerHTML='<option value="all">All services</option>'+options([...new Set(state.services.map(s=>s.category).concat(SERVICE_CATEGORIES))].sort(),null);
    const filtered=state.enquiries.filter(e=>(sf==="all"||e.status===sf)&&(cf==="all"||e.service===cf||state.services.some(s=>s.name===e.service&&s.category===cf))&&[e.id,e.name,e.email,e.company,e.service,e.subject].join(" ").toLowerCase().includes(search)).sort((a,b)=>b.date.localeCompare(a.date));
    $("#enquiriesTable").innerHTML=filtered.map(e=>`<tr><td><div class="customer-cell"><div class="customer-avatar">${esc(initials(e.name))}</div><div><div class="customer-name">${esc(e.subject)}</div><div class="customer-sub">${esc(e.name)} · ${esc(e.id)}</div></div></div></td><td>${esc(e.service)}</td><td>${fmtDate(e.date)}</td><td><select class="inline-priority" data-priority-id="${esc(e.id)}" aria-label="Priority for ${esc(e.id)}">${options(["Low","Medium","High"],e.priority||"Medium")}</select></td><td><select class="inline-status" data-status-id="${esc(e.id)}" aria-label="Status for ${esc(e.id)}">${options(["New","In Progress","Awaiting Customer","Resolved"],e.status)}</select></td><td>${esc(e.assignee||"Unassigned")}</td><td><button class="row-action" data-open-enquiry="${esc(e.id)}">View / reply</button></td></tr>`).join("")||empty("Try changing the filters or create a new enquiry.");
    $("#enquiryTableCount").textContent=`Showing ${filtered.length} of ${state.enquiries.length} enquiries`;
    $("#enquiryTotal").textContent=state.enquiries.length;$("#enquiryNew").textContent=state.enquiries.filter(e=>e.status==="New").length;$("#enquiryProgress").textContent=state.enquiries.filter(e=>["In Progress","Awaiting Customer"].includes(e.status)).length;$("#enquiryResolved").textContent=state.enquiries.filter(e=>e.status==="Resolved").length;
  }
  function renderServices(){
    const search=($("#serviceSearch")?.value||"").toLowerCase(),cat=$("#categoryFilter")?.value||"all",status=$("#serviceStatusFilter")?.value||"all";
    const cf=$("#categoryFilter");if(cf&&cf.options.length===1)cf.innerHTML='<option value="all">All categories</option>'+options(SERVICE_CATEGORIES,null);
    const items=state.services.filter(s=>(cat==="all"||s.category===cat)&&(status==="all"||s.status===status)&&[s.name,s.category,s.description].join(" ").toLowerCase().includes(search));
    $("#serviceCards").innerHTML=items.map(s=>`<article class="service-card"><div class="service-card-top"><span class="service-card-icon">${esc(s.icon||"◇")}</span><span class="visibility-pill visibility-${slug(s.status)}">${esc(s.status)}</span></div><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p><div class="service-card-bottom"><span class="customer-sub">${esc(s.category)}</span><div class="card-actions"><button class="row-action" data-edit-service="${esc(s.id)}">Edit</button><button class="row-action" data-delete-service="${esc(s.id)}">Delete</button></div></div></article>`).join("")||`<div class="panel empty-state"><strong>No services found</strong>Try another search or add a service.</div>`;
  }
  function renderProjects(){
    const search=($("#projectSearch")?.value||"").toLowerCase(),status=$("#projectStatusFilter")?.value||"all";
    const items=state.projects.filter(p=>(status==="all"||p.status===status)&&[p.name,p.client,p.category,p.description].join(" ").toLowerCase().includes(search));
    $("#projectGrid").innerHTML=items.map((p,i)=>`<article class="project-card"><div class="project-cover cover-${i%4}">${esc(p.icon||"▤")}</div><div class="project-body"><h3>${esc(p.name)}</h3><p>${esc(p.client)} · ${esc(p.category)}</p><p>${esc(p.description)}</p><div class="project-meta">${statusPill(p.status==="Completed"?"Resolved":p.status==="In Progress"?"In Progress":"Awaiting Customer")}<small>${fmtDate(p.date)}</small></div><div class="card-actions" style="margin-top:13px"><button class="row-action" data-edit-project="${esc(p.id)}">Edit</button><button class="row-action" data-delete-project="${esc(p.id)}">Delete</button></div></div></article>`).join("")||`<div class="panel empty-state"><strong>No projects found</strong>Add a project to build your portfolio.</div>`;
  }
  function readApplications(){try{return JSON.parse(localStorage.getItem("stsCareerApplications")||"[]")}catch{return []}}
  function renderApplications(){
    const apps=readApplications(),q=( $("#applicationSearch")?.value||"").toLowerCase(),filter=$("#applicationStatusFilter")?.value||"all";
    const rows=apps.filter(a=>(filter==="all"||(a.status||"New")===filter)&&[a.name,a.email,a.phone,a.role,a.currentTitle].join(" ").toLowerCase().includes(q));
    $("#applicationTotal").textContent=apps.length;$("#applicationNew").textContent=apps.filter(a=>(a.status||"New")==="New").length;$("#applicationReviewed").textContent=apps.filter(a=>(a.status||"New")!=="New").length;
    $("#navApplicationCount").textContent=apps.filter(a=>(a.status||"New")==="New").length;
    $("#applicationsTable").innerHTML=rows.map(a=>`<tr><td><div class="customer-cell"><div class="customer-avatar">${esc(initials(a.name))}</div><div><div class="customer-name">${esc(a.name||"Candidate")}</div><div class="customer-sub">${esc(a.id||"Application")}</div></div></div></td><td>${esc(a.role||"—")}</td><td>${esc(a.email||"")}<div class="customer-sub">${esc(a.phone||"")}</div></td><td>${esc(a.experience||"Not specified")}</td><td>${esc(shortDate(a.submittedAt))}</td><td><select class="inline-status" data-application-status="${esc(a.id)}" aria-label="Application status">${options(["New","Reviewed","Shortlisted","Rejected"],a.status||"New")}</select></td><td><button class="row-action" data-view-application="${esc(a.id)}">View details</button></td></tr>`).join("")||`<tr><td colspan="7"><div class="empty-state"><strong>No applications yet</strong>New candidate submissions will appear here.</div></td></tr>`;
  }
  function openApplicationDetails(id){const a=readApplications().find(x=>x.id===id);if(!a)return;showModal("Candidate application",`<div class="detail-grid"><div><small>Candidate</small><strong>${esc(a.name)}</strong></div><div><small>Applied role</small><strong>${esc(a.role)}</strong></div><div><small>Email</small><strong>${esc(a.email)}</strong></div><div><small>Phone</small><strong>${esc(a.phone||"—")}</strong></div><div><small>Location</small><strong>${esc(a.location||"—")}</strong></div><div><small>Experience</small><strong>${esc(a.experience||"—")}</strong></div><div><small>Current title</small><strong>${esc(a.currentTitle||"—")}</strong></div><div><small>Qualification</small><strong>${esc(a.qualification||"—")}</strong></div><div><small>Resume filename</small><strong>${esc(a.resumeName||"Not attached")}</strong></div><div><small>Portfolio</small><strong>${a.portfolio?`<a href="${esc(a.portfolio)}" target="_blank" rel="noopener">Open link ↗</a>`:"—"}</strong></div><div class="detail-full"><small>Statement of interest</small><p>${esc(a.note||"No statement provided.")}</p></div><div class="modal-actions"><button type="button" class="btn btn-secondary" id="applicationEmailDraft">Email candidate</button><button type="button" class="btn btn-primary" id="applicationMarkReviewed">Mark reviewed</button></div></div>`);$("#applicationEmailDraft").onclick=()=>{window.location.href="mailto:"+encodeURIComponent(a.email||"")+"?subject="+encodeURIComponent("STS recruitment — "+(a.role||"Application"));};$("#applicationMarkReviewed").onclick=()=>{const all=readApplications().map(x=>x.id===id?{...x,status:"Reviewed",read:true}:x);localStorage.setItem("stsCareerApplications",JSON.stringify(all));closeModal();renderApplications();toast("Application marked as reviewed.")};}
  function renderCareers(){
    const q=($("#careerSearch")?.value||"").toLowerCase();
    const status=$("#careerStatusFilter")?.value||"all";
    const items=(state.careers||[]).filter(c=>(status==="all"||c.status===status)&&[c.role,c.title,c.description,c.location,c.employmentType,c.experience].join(" ").toLowerCase().includes(q));
    $("#careerGrid").innerHTML=items.map(c=>`<article class="career-card career-card-admin">
      <button class="career-card-open" type="button" data-open-career="${esc(c.id)}" aria-label="Open editor for ${esc(c.title)}">
        <div class="career-image-wrap">${(c.imageData||c.image)?`<img class="career-image" src="${esc(c.imageData||c.image)}" alt="${esc(c.title)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">`:""}<div class="career-image-fallback" ${(c.imageData||c.image)?'style="display:none"':""}>STS · Careers</div><span class="career-ribbon">We’re Hiring</span><span class="visibility-pill visibility-${slug(c.status)} career-visibility">${esc(c.status)}</span></div>
        <div class="career-card-body"><div class="career-role">${esc(c.role)}</div><h3>${esc(c.title)}</h3><p class="career-description">${esc(c.description)}</p>
        <div class="career-meta"><span>⌖ ${esc(c.location)}</span><span>◷ ${esc(c.employmentType)}</span><span>▣ ${esc(c.experience)}</span></div>
        <span class="career-edit-hint">Click to open full editor <span aria-hidden="true">↗</span></span></div>
      </button>
      <div class="career-admin-actions"><button class="row-action" data-edit-career="${esc(c.id)}">Edit details</button>
        ${c.status==="On Hold"?`<button class="row-action career-resume" data-toggle-career="${esc(c.id)}">Resume hiring</button>`:`<button class="row-action career-hold" data-toggle-career="${esc(c.id)}">${c.status==="Draft"?"Publish":"Place on hold"}</button>`}
        <button class="row-action danger-text" data-delete-career="${esc(c.id)}">Remove</button></div></article>`).join("")||`<div class="panel empty-state"><strong>No careers found</strong>Try a different search or add a career.</div>`;
    $("#careerTotal").textContent=(state.careers||[]).length;
    $("#careerPublished").textContent=(state.careers||[]).filter(c=>c.status==="Published").length;
    $("#careerDrafts").textContent=(state.careers||[]).filter(c=>c.status==="Draft").length;
    $("#careerFullTime").textContent=(state.careers||[]).filter(c=>c.employmentType==="Full-time").length;
    const hold=$("#careerOnHold");if(hold)hold.textContent=(state.careers||[]).filter(c=>c.status==="On Hold").length;
  }
  function openCareerEditor(id=null){
    const c=id?(state.careers||[]).find(x=>x.id===id):null;
    const form=$("#careerEditorForm");form.reset();
    form.elements.id.value=c?.id||"";
    form.elements.role.value=c?.role||"";
    form.elements.title.value=c?.title||"";
    form.elements.description.value=c?.description||"";
    form.elements.location.value=c?.location||"Muscat, Oman";
    form.elements.employmentType.value=c?.employmentType||"Full-time";
    form.elements.experience.value=c?.experience||"2+ years";
    form.elements.image.value=c?.image||"";
    form.elements.status.value=c?.status||"Published";
    form.elements.detailsUrl.value=c?.detailsUrl||"";
    form.elements.applyUrl.value=c?.applyUrl||"";
    form.dataset.imageData=c?.imageData||"";
    $("#careerEditorHeading").textContent=c?"Edit career":"Add career";
    updateCareerImagePreview(form.dataset.imageData||form.elements.image.value);
    go("career-editor");window.scrollTo({top:0,behavior:"smooth"});
  }
  function updateCareerImagePreview(src){
    const img=$("#careerImagePreview"),empty=$("#careerImageEmpty");
    if(src){img.src=src;img.style.display="block";empty.style.display="none";}
    else{img.removeAttribute("src");img.style.display="none";empty.style.display="grid";}
  }
  function saveCareerEditor(ev){
    ev.preventDefault();const form=ev.currentTarget;
    const d=Object.fromEntries(new FormData(form));
    d.role=d.role.trim();d.title=d.title.trim();d.description=d.description.trim();d.image=d.image.trim();
    if(!d.role||!d.title||!d.description||!d.location.trim()||!d.experience.trim()){toast("Please complete the required career details.","error");return;}
    const id=d.id;delete d.id;const imageData=form.dataset.imageData||"";
    if(id){const target=state.careers.find(x=>x.id===id);if(!target)return;Object.assign(target,d);
      if(imageData)target.imageData=imageData;else if(!d.image)delete target.imageData;
      else delete target.imageData;
    }else{state.careers.push({id:nextId("CAR",state.careers),...d,...(imageData?{imageData}:{})});}
    persist();go("careers");renderAll();toast(id?"Career details saved.":"Career added.");
  }
  function toggleCareerStatus(id){
    const c=state.careers.find(x=>x.id===id);if(!c)return;
    c.status=(c.status==="On Hold"||c.status==="Draft")?"Published":"On Hold";
    persist();renderAll();toast(c.status==="On Hold"?"Hiring placed on hold.":"Hiring is published.");
  }
  function deleteCareer(id){
    const c=(state.careers||[]).find(x=>x.id===id);if(!c)return;
    if(!confirm(`Remove the "${c.title}" career listing? This cannot be undone.`))return;
    state.careers=state.careers.filter(x=>x.id!==id);persist();renderAll();toast("Career removed from this workspace.");
  }
  function getCustomers(){const map=new Map();state.enquiries.forEach(e=>{const key=e.email.toLowerCase();if(!map.has(key))map.set(key,{name:e.name,email:e.email,phone:e.phone,company:e.company,count:0,last:e.date});const c=map.get(key);c.count++;if(e.date>c.last)c.last=e.date});return [...map.values()].sort((a,b)=>b.last.localeCompare(a.last))}
  function readCustomerSignups(){try{return JSON.parse(localStorage.getItem("sts_customer_accounts")||"[]")}catch{return []}}
  function renderCustomerSignups(){const rows=readCustomerSignups();const enquiryRows=(()=>{try{return JSON.parse(localStorage.getItem("sts_customer_enquiries")||"[]")}catch{return []}})();const body=$("#registeredCustomersTable");if(!body)return;const q=String($("#customerSearch")?.value||"").toLowerCase();const filtered=rows.filter(c=>[c.name,c.email,c.phone,c.company].join(" ").toLowerCase().includes(q));body.innerHTML=filtered.slice().reverse().map(c=>{const count=enquiryRows.filter(e=>String(e.email||"").toLowerCase()===String(c.email||"").toLowerCase()).length;return `<tr><td><strong>${esc(c.name||"")}</strong></td><td>${esc(c.email||"")}</td><td>${esc(c.phone||"—")}</td><td>${esc(c.company||"Individual")}</td><td>${esc(c.createdAt?new Date(c.createdAt).toLocaleString():"—")}</td><td>${count?`<button class="row-action" data-signup-enquiries="${esc(c.email)}">View enquiry (${count})</button>`:'<span class="customer-sub">No enquiries</span>'}</td><td><a class="row-action" href="mailto:${encodeURIComponent(c.email||"")}">Email customer</a></td></tr>`}).join("")||empty("No website signups yet.","Only registered customers appear here");}
  function renderCustomers(){renderCustomerSignups();}
  function renderEmployees(){
    const q=String($("#employeeSearch")?.value||"").toLowerCase();const filter=$("#employeeStatusFilter")?.value||"all";
    const rows=(state.employees||[]).filter(e=>(filter==="all"||e.status===filter)&&[e.name,e.employeeId,e.phone,e.email,e.department,e.jobTitle].some(v=>String(v||"").toLowerCase().includes(q)));
    $("#employeesTable").innerHTML=rows.map(e=>`<tr><td><div class="customer-cell"><div class="customer-avatar">${esc(initials(e.name))}</div><div><div class="customer-name">${esc(e.name)}</div><div class="customer-sub">${esc(e.email||"No email")}</div></div></div></td><td>${esc(e.employeeId||"—")}</td><td>${e.phone?`<a class="email-link" href="tel:${esc(e.phone)}">${esc(e.phone)}</a>`:"—"}</td><td>${esc(e.department||"—")}<div class="customer-sub">${esc(e.jobTitle||"")}</div></td><td><span class="visibility-pill ${e.status==="Active"?"visibility-published":"visibility-draft"}">${esc(e.status||"Active")}</span></td><td><button class="row-action" data-employee-docs="${esc(e.id)}">${(e.documents||[]).length} file(s)</button></td><td><div class="card-actions"><button class="row-action" data-edit-employee="${esc(e.id)}">Edit</button><button class="row-action" data-delete-employee="${esc(e.id)}">Remove</button></div></td></tr>`).join("")||empty("Add employee records to build your secure directory.","No employees found");
  }
  function fileToDataUrl(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve({name:file.name,type:file.type||"application/octet-stream",size:file.size,data:String(r.result||"")});r.onerror=reject;r.readAsDataURL(file)})}
  function openEmployeeForm(id=null){
    const e=id?(state.employees||[]).find(x=>x.id===id):null;
    const docs=(e?.documents||[]).map((d,i)=>`<div class="employee-doc-row"><span>${esc(d.name)} <small>(${Math.ceil((d.size||0)/1024)} KB)</small></span><button type="button" class="row-action" data-remove-employee-doc="${i}">Remove</button></div>`).join("")||'<p class="form-help">No documents uploaded yet.</p>';
    showModal(e?"Edit employee record":"Add employee record",`<form id="employeeForm" class="modal-form" data-employee-id="${esc(e?.id||"")}">
      ${field("name","Full legal name",e?.name||"")}${field("employeeId","Employee ID",e?.employeeId||"")}
      ${field("email","Work email",e?.email||"","email",false)}${field("phone","Contact number",e?.phone||"","tel")}
      ${field("personalEmail","Personal email (optional)",e?.personalEmail||"","email",false)}${field("dateOfBirth","Date of birth (optional)",e?.dateOfBirth||"","date",false)}
      ${field("department","Department",e?.department||"")}${field("jobTitle","Job title / designation",e?.jobTitle||"")}
      ${field("joinDate","Joining date",e?.joinDate||"","date",false)}${selectField("status","Employment status",["Active","On Leave","Inactive"],e?.status||"Active")}
      ${area("address","Residential address",e?.address||"",true,false)}${field("emergencyName","Emergency contact name",e?.emergencyName||"","text",false)}
      ${field("emergencyPhone","Emergency contact number",e?.emergencyPhone||"","tel",false)}${field("emergencyRelation","Relationship",e?.emergencyRelation||"","text",false)}
      <label class="full"><span>Background verification status</span><select name="bgcStatus"><option ${(!e?.bgcStatus||e?.bgcStatus==="Pending")?"selected":""}>Pending</option><option ${e?.bgcStatus==="In Progress"?"selected":""}>In Progress</option><option ${e?.bgcStatus==="Verified"?"selected":""}>Verified</option><option ${e?.bgcStatus==="Needs Review"?"selected":""}>Needs Review</option></select></label>
      <div class="full employee-doc-section"><strong>Background-check (BGC) documents</strong><p class="form-help">Upload police clearance, identity proof, education verification, previous-employment verification, or other relevant documents. PDF or image files only; maximum 1 MB per file in this demo.</p><div class="employee-doc-list">${docs}</div><label class="form-field"><span>Add documents</span><input type="file" name="bgcFiles" id="employeeBGCFiles" accept=".pdf,image/*" multiple /></label></div>
      <div class="modal-actions"><button type="button" class="btn btn-secondary" data-close-modal>Cancel</button><button type="submit" class="btn btn-primary">${e?"Save employee":"Add employee"}</button></div>
    </form>`);
    $("#employeeForm").addEventListener("submit",async ev=>{ev.preventDefault();const form=ev.currentTarget;const files=[...($("#employeeBGCFiles").files||[])];if(files.some(f=>f.size>1048576)){toast("Each BGC document must be 1 MB or smaller in this browser demo.","error");return;}if(files.some(f=>!(f.type==="application/pdf"||f.type.startsWith("image/")))){toast("Upload PDF or image files only.","error");return;}try{const d=Object.fromEntries(new FormData(form));delete d.bgcFiles;const uploaded=await Promise.all(files.map(fileToDataUrl));d.documents=[...(e?.documents||[]),...uploaded];if(e)Object.assign(e,d);else state.employees.push({id:nextId("EMP",state.employees||[]),...d});if(!persist())return;closeModal();renderAll();toast(e?"Employee record updated.":"Employee added.");}catch(err){toast("Unable to read one of the selected documents.","error")}});
    $("#modalBody").addEventListener("click",ev=>{const rm=ev.target.closest("[data-remove-employee-doc]");if(!rm)return;const idx=Number(rm.dataset.removeEmployeeDoc);if(!e)return;const f=$("#employeeForm");const docs=(e.documents||[]).slice();docs.splice(idx,1);e.documents=docs;persist();openEmployeeForm(e.id);});
  }
  function showEmployeeDocs(id){const e=(state.employees||[]).find(x=>x.id===id);if(!e)return;const docs=e.documents||[];showModal(`${e.name} — BGC documents`,`<p class="muted">Background verification status: <strong>${esc(e.bgcStatus||"Pending")}</strong></p>${docs.length?`<div class="employee-doc-list">${docs.map((d,i)=>`<div class="employee-doc-row"><div><strong>${esc(d.name)}</strong><small>${Math.ceil((d.size||0)/1024)} KB · ${esc(d.type||"file")}</small></div><div class="card-actions"><button class="row-action" data-download-employee-doc="${i}">Download</button><button class="row-action" data-delete-employee-doc="${i}">Delete</button></div></div>`).join("")}</div>`:'<div class="empty-state"><strong>No BGC documents</strong>No documents have been uploaded for this employee.</div>'}<div class="modal-actions"><button class="btn btn-secondary" data-close-modal>Close</button><button class="btn btn-primary" data-edit-employee="${esc(e.id)}">Edit employee</button></div>`);$("#modalBody").addEventListener("click",ev=>{const edit=ev.target.closest("[data-edit-employee]");if(edit){ev.stopPropagation();openEmployeeForm(edit.dataset.editEmployee);return;}const dl=ev.target.closest("[data-download-employee-doc]");if(dl){const d=docs[Number(dl.dataset.downloadEmployeeDoc)];if(d?.data){const a=document.createElement("a");a.href=d.data;a.download=d.name;document.body.appendChild(a);a.click();a.remove()}return}const del=ev.target.closest("[data-delete-employee-doc]");if(del&&confirm("Delete this saved document from this browser?")){e.documents.splice(Number(del.dataset.deleteEmployeeDoc),1);persist();showEmployeeDocs(e.id)}})}
  function renderTeam(){$("#teamTable").innerHTML=state.team.map(t=>`<tr><td><div class="customer-cell"><div class="customer-avatar">${esc(initials(t.name))}</div><div class="customer-name">${esc(t.name)}</div></div></td><td><a class="email-link" href="${emailDraftUrl(t.email, "Hello "+t.name, "")}" title="Compose email to ${esc(t.name)}">${esc(t.email)}</a></td><td>${esc(t.role)}</td><td><span class="visibility-pill visibility-${t.status==="Active"?"published":"draft"}">${esc(t.status)}</span></td><td><div class="card-actions"><button class="row-action" data-edit-team="${esc(t.id)}">Edit</button><button class="row-action" data-delete-team="${esc(t.id)}">Remove</button></div></td></tr>`).join("")}
  function renderContent(){const c=state.content;$("#contentHeadline").value=c.headline;$("#contentDescription").value=c.description;$("#contentEmail").value=c.email;$("#contentPhone").value=c.phone;$("#contentLocation").value=c.location;$("#contentCta").value=c.cta;updatePreview()}
  function updatePreview(){const c={headline:$("#contentHeadline").value,description:$("#contentDescription").value,cta:$("#contentCta").value};$("#previewHeadline").textContent=c.headline;$("#previewDescription").textContent=c.description;$("#previewCta").textContent=c.cta+" →"}
  function renderReports(){
    const es=state.enquiries,resolved=es.filter(e=>e.status==="Resolved").length;$("#reportResolution").textContent=(es.length?Math.round(resolved/es.length*100):0)+"%";$("#reportCustomers").textContent=getCustomers().length;
    const counts=state.services.map(s=>({name:s.name,count:es.filter(e=>e.service===s.name||e.service===s.category).length})).sort((a,b)=>b.count-a.count);$("#reportTopService").textContent=counts[0]?.name||"—";
    const statuses=["New","In Progress","Awaiting Customer","Resolved"];const statusCounts=statuses.map(s=>({name:s,count:es.filter(e=>e.status===s).length}));const sm=Math.max(1,...statusCounts.map(x=>x.count));$("#statusReport").innerHTML=statusCounts.map(x=>`<div class="report-row"><span>${esc(x.name)}</span><div class="report-track"><div class="report-fill" style="width:${x.count/sm*100}%"></div></div><strong>${x.count}</strong></div>`).join("");
    const grouped=SERVICE_CATEGORIES.map(cat=>({name:cat,count:es.filter(e=>e.service===cat||state.services.some(s=>s.category===cat&&s.name===e.service)).length}));const gm=Math.max(1,...grouped.map(x=>x.count));$("#serviceReport").innerHTML=grouped.map(x=>`<div class="report-row"><span>${esc(x.name.replace(" & Firefighting","").replace(" Systems",""))}</span><div class="report-track"><div class="report-fill" style="width:${x.count/gm*100}%"></div></div><strong>${x.count}</strong></div>`).join("");
  }
  function renderSettings(){$("#settingNew").checked=state.settings.newAlerts;$("#settingReminder").checked=state.settings.replyReminders;$("#settingProject").checked=state.settings.projectUpdates;try{const profile=JSON.parse(localStorage.getItem("stsAdminProfile")||"{}");$("#adminDisplayName").value=profile.displayName||"Site Administrator";$("#adminWorkEmail").value=profile.workEmail||"admin@stselv.com"}catch(e){}}
  function showModal(title,html){$("#modalTitle").textContent=title;const oldBody=$("#modalBody");const freshBody=oldBody.cloneNode(false);oldBody.replaceWith(freshBody);freshBody.innerHTML=html;$("#modalBackdrop").hidden=false;document.body.style.overflow="hidden";const first=$("#modalBody input,#modalBody textarea,#modalBody select");if(first)setTimeout(()=>first.focus(),50)}
  function closeModal(){$("#modalBackdrop").hidden=true;$("#modalBody").innerHTML="";document.body.style.overflow="";activeEnquiryId=null}
  function modalActions(label="Save record"){return `<div class="modal-actions"><button type="button" class="btn btn-secondary" data-close-modal>Cancel</button><button type="submit" class="btn btn-primary">${esc(label)}</button></div>`}
  function field(name,label,value="",type="text",required=true,full=false,extra=""){return `<label class="${full?"full":""}">${esc(label)}<input name="${esc(name)}" type="${type}" value="${esc(value)}" ${required?"required":""} ${extra}></label>`}
  function area(name,label,value="",full=true,required=true){return `<label class="${full?"full":""}">${esc(label)}<textarea name="${esc(name)}" rows="3" ${required?"required":""}>${esc(value)}</textarea></label>`}
  function selectField(name,label,items,selected,full=false){return `<label class="${full?"full":""}">${esc(label)}<select name="${esc(name)}" required>${options(items,selected)}</select></label>`}
  function openEnquiryForm(id=null){
    const e=id?state.enquiries.find(x=>x.id===id):null;
    showModal(e?"Edit enquiry":"Create enquiry",`<form id="enquiryForm" class="modal-form">
      ${field("name","Customer name",e?.name||"")}${field("email","Email address",e?.email||"","email")}
      ${field("phone","Phone number",e?.phone||"", "tel",false)}${field("company","Company / organization",e?.company||"", "text",false)}
      ${selectField("service","Requested service",[...new Set(state.services.map(s=>s.name).concat(SERVICE_CATEGORIES))],e?.service||state.services[0]?.name||"")}
      ${field("subject","Subject",e?.subject||"","text",true,true)}
      ${area("message","Customer message",e?.message||"")}
      ${selectField("priority","Priority",["Low","Medium","High"],e?.priority||"Medium")}
      ${selectField("status","Status",["New","In Progress","Awaiting Customer","Resolved"],e?.status||"New")}
      ${selectField("assignee","Assigned to",["Site Administrator",...state.team.map(t=>t.name)],e?.assignee||"Site Administrator")}
      ${modalActions(e?"Save changes":"Create enquiry")}</form>`);
    $("#enquiryForm").addEventListener("submit",ev=>{ev.preventDefault();const d=Object.fromEntries(new FormData(ev.currentTarget));if(e){Object.assign(e,d)}else{state.enquiries.unshift({id:nextId("ENQ",state.enquiries),...d,date:new Date().toISOString().slice(0,10),replies:[]});if(state.settings.newAlerts)toast("New enquiry added to the workspace.","info")}persist();closeModal();renderAll();toast(e?"Enquiry updated.":"Enquiry created.");});
  }
  function openEnquiryDetail(id){
    const e=state.enquiries.find(x=>x.id===id);if(!e)return;activeEnquiryId=id;
    const replies=(e.replies||[]).map(r=>`<div class="detail-message"><strong>${esc(r.subject||"Reply")}</strong><br><small>${esc(r.by||"Administrator")} · ${esc(new Date(r.date).toLocaleString())}</small><p>${esc(r.body)}</p></div>`).join("");
    showModal("Enquiry details",`<div class="detail-top"><div><h3>${esc(e.subject)}</h3><p>${esc(e.id)} · Received ${fmtDate(e.date)}</p></div><div>${statusPill(e.status)}</div></div>
      <div class="detail-grid"><div class="detail-item"><span>Customer</span><strong>${esc(e.name)}</strong></div><div class="detail-item"><span>Company</span><strong>${esc(e.company||"—")}</strong></div><div class="detail-item"><span>Email</span><strong><a class="email-link" href="${emailDraftUrl(e.email, "Re: "+e.subject, "Hello "+e.name+",\\n\\n")}">${esc(e.email)}</a></strong><div style="margin-top:8px"><a class="btn btn-secondary btn-small" href="${emailDraftUrl(e.email, "Re: "+e.subject, "Hello "+e.name+",\\n\\n")}">Compose email ↗</a></div></div><div class="detail-item"><span>Phone</span><strong>${esc(e.phone||"—")}</strong></div><div class="detail-item"><span>Service</span><strong>${esc(e.service)}</strong></div><div class="detail-item"><span>Priority / owner</span><strong>${esc(e.priority)} · ${esc(e.assignee||"Unassigned")}</strong></div></div>
      <div class="detail-item"><span>Customer message</span><div class="detail-message">${esc(e.message)}</div></div>
      ${replies?`<div class="reply-box"><h4>Reply / draft history</h4>${replies}</div>`:""}
      <div class="reply-box"><h4>Reply to customer</h4><form id="replyForm"><input name="replySubject" value="Re: ${esc(e.subject)}" aria-label="Email subject" required maxlength="180"/><textarea name="replyBody" placeholder="Write a professional response to the customer's enquiry..." required maxlength="8000"></textarea><p class="reply-note">Clicking the button opens your default email application with the recipient, subject, and reply prefilled. You must send the email from that application. This page cannot confirm delivery.</p><div class="modal-actions"><button type="button" class="btn btn-secondary" data-edit-enquiry="${esc(e.id)}">Edit enquiry</button><button type="submit" class="btn btn-primary">Open Email Draft ↗</button></div></form></div>`);
    $("#replyForm").addEventListener("submit",ev=>{
      ev.preventDefault();
      const d=Object.fromEntries(new FormData(ev.currentTarget));
      if(!d.replyBody.trim())return;
      const target=state.enquiries.find(x=>x.id===id);
      const url=emailDraftUrl(target.email,d.replySubject.trim(),"Hello "+target.name+",\\n\\n"+d.replyBody.trim()+"\\n\\nRegards,\\nSmart Technical Services");
      target.replies=target.replies||[];
      target.replies.push({date:new Date().toISOString(),subject:d.replySubject.trim(),body:d.replyBody.trim(),by:"Site Administrator · Draft prepared (not confirmed sent)"});
      persist();
      window.location.href=url;
      closeModal();
      renderAll();
      toast("Email draft opened. Send it in your email application; delivery is not confirmed here.","info");
    });
  }
  function openServiceForm(id=null){const s=id?state.services.find(x=>x.id===id):null;showModal(s?"Edit service":"Add service",`<form id="serviceForm" class="modal-form">${field("name","Service name",s?.name||"")}${selectField("category","Category",SERVICE_CATEGORIES,s?.category||SERVICE_CATEGORIES[0])}${field("icon","Card icon (one symbol)",s?.icon||"◇","text",false)}${selectField("status","Visibility",["Published","Draft"],s?.status||"Draft")}${area("description","Description",s?.description||"")}${modalActions(s?"Save changes":"Add service")}</form>`);$("#serviceForm").addEventListener("submit",ev=>{ev.preventDefault();const d=Object.fromEntries(new FormData(ev.currentTarget));if(s)Object.assign(s,d);else state.services.push({id:nextId("SRV",state.services),...d});persist();closeModal();renderAll();toast(s?"Service updated.":"Service added.")})}
  function openProjectForm(id=null){const p=id?state.projects.find(x=>x.id===id):null;showModal(p?"Edit project":"Add project",`<form id="projectForm" class="modal-form">${field("name","Project name",p?.name||"")}${field("client","Client / organization",p?.client||"")}${selectField("category","Service category",SERVICE_CATEGORIES,p?.category||SERVICE_CATEGORIES[0])}${selectField("status","Project status",["Planning","In Progress","Completed"],p?.status||"Planning")}${field("date","Project date",p?.date||new Date().toISOString().slice(0,10),"date")}${field("icon","Card icon",p?.icon||"▤","text",false)}${area("description","Project description",p?.description||"")}${modalActions(p?"Save changes":"Add project")}</form>`);$("#projectForm").addEventListener("submit",ev=>{ev.preventDefault();const d=Object.fromEntries(new FormData(ev.currentTarget));if(p)Object.assign(p,d);else state.projects.unshift({id:nextId("PRJ",state.projects),...d});persist();closeModal();renderAll();toast(p?"Project updated.":"Project added.")})}
  function openTeamForm(id=null){const t=id?state.team.find(x=>x.id===id):null;showModal(t?"Edit team member":"Add team member",`<form id="teamForm" class="modal-form">${field("name","Full name",t?.name||"")}${field("email","Work email",t?.email||"","email")}${selectField("role","Role",["Administrator","Service Manager","Support Agent","Content Editor"],t?.role||"Support Agent")}${selectField("status","Status",["Active","Inactive"],t?.status||"Active")}${modalActions(t?"Save changes":"Add team member")}</form>`);$("#teamForm").addEventListener("submit",ev=>{ev.preventDefault();const d=Object.fromEntries(new FormData(ev.currentTarget));if(t)Object.assign(t,d);else state.team.push({id:nextId("USR",state.team),...d});persist();closeModal();renderAll();toast(t?"Team member updated.":"Team member added.")})}
  function deleteRecord(type,id){const config={service:{arr:state.services,label:"service"},project:{arr:state.projects,label:"project"},team:{arr:state.team,label:"team member"}}[type];if(!config)return;const item=config.arr.find(x=>x.id===id);if(!item)return;if(!confirm(`Remove ${item.name||item.title||item.label||item.email}? This cannot be undone.`))return;config.arr=config.arr.filter(x=>x.id!==id);if(type==="service")state.services=state.services.filter(x=>x.id!==id);if(type==="project")state.projects=state.projects.filter(x=>x.id!==id);if(type==="team")state.team=state.team.filter(x=>x.id!==id);persist();renderAll();toast(`${config.label[0].toUpperCase()+config.label.slice(1)} removed.`)}
  function exportCSV(filename,rows){if(!rows.length){toast("There is no data to export.","info");return}const headers=[...new Set(rows.flatMap(r=>Object.keys(r)))];const cell=v=>{if(Array.isArray(v)||typeof v==="object")v=JSON.stringify(v);let s=String(v??"");if(/^[=+\-@\t\r]/.test(s))s="'"+s;return `"${s.replace(/"/g,'""')}"`};const csv=[headers.map(cell).join(","),...rows.map(r=>headers.map(h=>cell(r[h])).join(","))].join("\r\n");const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);toast("CSV export downloaded.")}
  function backup(){const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="smart-technical-workspace-backup.json";a.click();URL.revokeObjectURL(url);toast("Workspace backup downloaded.")}
  function openHelp(){showModal("Workspace help",`<div class="detail-message">• Enquiries: open a record to review customer details and write a reply. Replies are stored in this browser only; they are not sent by email.<br><br>• Services and Projects: add, edit, filter, and remove records. Changes are saved locally.<br><br>• Customers: records are derived from enquiry contact details.<br><br>• Reports: export CSV data for offline review.<br><br>• Production setup: connect a secure backend database, authenticated admin sessions, server-side permissions, and a transactional email service to make data shared and deliver emails.</div><div style="display:flex;justify-content:flex-end;margin-top:18px"><button class="btn btn-primary" data-close-modal>Close</button></div>`)}
  function handleAction(action){if(action==="new-enquiry")openEnquiryForm();if(action==="new-service")openServiceForm();if(action==="new-project")openProjectForm();if(action==="new-career")openCareerEditor();if(action==="new-team")openTeamForm();if(action==="new-employee")openEmployeeForm();if(action==="help")openHelp()}
  $("#exportCustomerSignups")?.addEventListener("click",()=>{const rows=readCustomerSignups();const cols=["name","email","phone","company","createdAt"];const csv=[cols.join(","),...rows.map(r=>cols.map(k=>'"'+String(r[k]||"").replace(/"/g,'""')+'"').join(","))].join("\n");const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="sts-customer-signups.csv";a.click();URL.revokeObjectURL(url)});
  document.addEventListener("click",ev=>{
    const nav=ev.target.closest("[data-view]");if(nav){go(nav.dataset.view);return}
    const navLink=ev.target.closest("[data-view-link]");if(navLink){go(navLink.dataset.viewLink);return}
    const action=ev.target.closest("[data-action]");if(action){handleAction(action.dataset.action);return}
    if(ev.target.closest("#closeModal")||ev.target.closest("[data-close-modal]")){closeModal();return}
    const signupEnquiries=ev.target.closest("[data-signup-enquiries]");if(signupEnquiries){const email=signupEnquiries.dataset.signupEnquiries;let items=[];try{items=JSON.parse(localStorage.getItem("sts_customer_enquiries")||"[]").filter(e=>String(e.email||"").toLowerCase()===email.toLowerCase())}catch{};showModal("Customer enquiries",items.map(e=>`<div class="detail-item"><span>${esc(e.subject||e.service||"Enquiry")} · ${esc(e.submittedAt?new Date(e.submittedAt).toLocaleString():"")}</span><div class="detail-message">${esc(e.message||"No message provided.")}</div><small>Reference: ${esc(e.id||"—")} · ${esc(e.status||"Submitted")}</small></div>`).join("")||'<p>No enquiries from this customer.</p>');return}
    const open=ev.target.closest("[data-open-enquiry]");if(open){openEnquiryDetail(open.dataset.openEnquiry);return}
    const editE=ev.target.closest("[data-edit-enquiry]");if(editE){const id=editE.dataset.editEnquiry;closeModal();openEnquiryForm(id);return}
    const editS=ev.target.closest("[data-edit-service]");if(editS){openServiceForm(editS.dataset.editService);return}
    const delS=ev.target.closest("[data-delete-service]");if(delS){deleteRecord("service",delS.dataset.deleteService);return}
    const openC=ev.target.closest("[data-open-career]");if(openC){openCareerEditor(openC.dataset.openCareer);return}
    const editC=ev.target.closest("[data-edit-career]");if(editC){openCareerEditor(editC.dataset.editCareer);return}
    const toggleC=ev.target.closest("[data-toggle-career]");if(toggleC){toggleCareerStatus(toggleC.dataset.toggleCareer);return}
    const delC=ev.target.closest("[data-delete-career]");if(delC){deleteCareer(delC.dataset.deleteCareer);return}
    const careerPreview=ev.target.closest("[data-career-preview]");if(careerPreview){ev.preventDefault();toast(careerPreview.dataset.careerPreview==="apply"?"Add an application link when one is available.":"Add a details page link when one is available.","info");return}
    const editP=ev.target.closest("[data-edit-project]");if(editP){openProjectForm(editP.dataset.editProject);return}
    const delP=ev.target.closest("[data-delete-project]");if(delP){deleteRecord("project",delP.dataset.deleteProject);return}
    const editT=ev.target.closest("[data-edit-team]");if(editT){openTeamForm(editT.dataset.editTeam);return}
    const delT=ev.target.closest("[data-delete-team]");if(delT){deleteRecord("team",delT.dataset.deleteTeam);return}

    const addEmployee=ev.target.closest("[data-edit-employee]");if(addEmployee){openEmployeeForm(addEmployee.dataset.editEmployee);return}
    const employeeDocs=ev.target.closest("[data-employee-docs]");if(employeeDocs){showEmployeeDocs(employeeDocs.dataset.employeeDocs);return}
    const deleteEmployee=ev.target.closest("[data-delete-employee]");if(deleteEmployee){const emp=state.employees.find(x=>x.id===deleteEmployee.dataset.deleteEmployee);if(emp&&confirm(`Remove employee ${emp.name}? This also removes their locally stored BGC documents.`)){state.employees=state.employees.filter(x=>x.id!==emp.id);persist();renderAll();toast("Employee record removed.")};return}
    const viewApp=ev.target.closest("[data-view-application]");if(viewApp){openApplicationDetails(viewApp.dataset.viewApplication);return}
    if(ev.target.id==="refreshApplications"){renderApplications();toast("Applications refreshed.","info");return}
    if(ev.target.id==="notificationBtn"){go("applications");$("#statusFilter").value="New";renderEnquiries();return}
    if(ev.target.id==="profileMenu"){openHelp();return}
  });
  document.addEventListener("change",ev=>{
    const appStatus=ev.target.closest("[data-application-status]");if(appStatus){const all=readApplications().map(a=>a.id===appStatus.dataset.applicationStatus?{...a,status:appStatus.value,read:true}:a);localStorage.setItem("stsCareerApplications",JSON.stringify(all));renderApplications();toast("Application status updated.");return}
    const priority=ev.target.closest("[data-priority-id]");if(priority){const e=state.enquiries.find(x=>x.id===priority.dataset.priorityId);if(e){e.priority=priority.value;persist();renderAll();toast(`Priority updated to ${e.priority} for ${e.id}.`)}return}
    const status=ev.target.closest("[data-status-id]");if(status){const e=state.enquiries.find(x=>x.id===status.dataset.statusId);if(e){e.status=status.value;persist();renderAll();toast(`Status updated for ${e.id}.`)}}
  });
  $("#closeModal").addEventListener("click",closeModal);
  $("#modalBackdrop").addEventListener("click",ev=>{if(ev.target===$("#modalBackdrop"))closeModal()});
  document.addEventListener("keydown",ev=>{if(ev.key==="Escape"&&!$("#modalBackdrop").hidden)closeModal()});
  $("#mobileMenu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
  $("#activityRange").addEventListener("change",renderActivity);
  $("#applicationSearch").addEventListener("input",renderApplications);$("#applicationStatusFilter").addEventListener("change",renderApplications);window.addEventListener("storage",ev=>{if(ev.key==="stsCareerApplications"||ev.key==="stsCareerApplicationsUpdatedAt")renderApplications()});
  [["#enquirySearch",renderEnquiries],["#statusFilter",renderEnquiries],["#serviceFilter",renderEnquiries],["#serviceSearch",renderServices],["#categoryFilter",renderServices],["#serviceStatusFilter",renderServices],["#projectSearch",renderProjects],["#projectStatusFilter",renderProjects],["#careerSearch",renderCareers],["#careerStatusFilter",renderCareers],["#customerSearch",renderCustomers],["#employeeSearch",renderEmployees],["#employeeStatusFilter",renderEmployees]].forEach(([sel,fn])=>$(sel).addEventListener("input",fn));
  $("#clearEnquiryFilters").addEventListener("click",()=>{$("#enquirySearch").value="";$("#statusFilter").value="all";$("#serviceFilter").value="all";renderEnquiries()});
  $("#exportOverview").addEventListener("click",()=>exportCSV("sts-overview-enquiries.csv",state.enquiries));
  $("#exportEnquiries").addEventListener("click",()=>exportCSV("sts-enquiries.csv",state.enquiries));
  $("#exportServices").addEventListener("click",()=>exportCSV("sts-services.csv",state.services));
  $("#exportProjects").addEventListener("click",()=>exportCSV("sts-projects.csv",state.projects));
  $("#exportCareers").addEventListener("click",()=>exportCSV("sts-careers.csv",state.careers));
  $("#careerEditorForm").addEventListener("submit",saveCareerEditor);
  $("#cancelCareerEdit").addEventListener("click",()=>go("careers"));
  $("#cancelCareerEditBottom").addEventListener("click",()=>go("careers"));
  $("#careerImageUrl").addEventListener("input",ev=>{if(!$("#careerEditorForm").dataset.imageData)updateCareerImagePreview(ev.target.value.trim());});
  $("#careerImageUpload").addEventListener("change",ev=>{
    const file=ev.target.files?.[0];if(!file)return;
    if(!file.type.startsWith("image/")){toast("Please select an image file.","error");return;}
    if(file.size>1200000){toast("Please use an image under 1.2 MB, or provide an image URL.","error");ev.target.value="";return;}
    const reader=new FileReader();reader.onload=()=>{$("#careerEditorForm").dataset.imageData=String(reader.result||"");$("#careerImageUrl").value="";updateCareerImagePreview(String(reader.result||""));};reader.readAsDataURL(file);
  });
  $("#removeCareerImage").addEventListener("click",()=>{$("#careerEditorForm").dataset.imageData="";$("#careerImageUpload").value="";$("#careerImageUrl").value="";updateCareerImagePreview("");});

  $("#exportCustomers").addEventListener("click",()=>exportCSV("sts-customers.csv",getCustomers()));
  $("#exportEmployees").addEventListener("click",()=>exportCSV("sts-employees.csv",(state.employees||[]).map(({documents,...e})=>({...e,bgcDocumentCount:(documents||[]).length}))));
  $("#exportFullReport").addEventListener("click",()=>exportCSV("sts-report.csv",state.enquiries.map(e=>({id:e.id,customer:e.name,email:e.email,service:e.service,subject:e.subject,date:e.date,status:e.status,priority:e.priority,replyCount:e.replies?.length||0}))));
  $("#saveContent").addEventListener("click",()=>{state.content=Object.fromEntries(new FormData($("#contentForm")));persist();updatePreview();toast("Website content saved in this browser.")});
  $("#contentForm").addEventListener("input",updatePreview);
  $("#saveSettings").addEventListener("click",()=>{state.settings={newAlerts:$("#settingNew").checked,replyReminders:$("#settingReminder").checked,projectUpdates:$("#settingProject").checked};persist();toast("Settings saved.")});
  $("#adminProfileForm").addEventListener("submit",ev=>{ev.preventDefault();const profile={displayName:$("#adminDisplayName").value.trim(),workEmail:$("#adminWorkEmail").value.trim()};localStorage.setItem("stsAdminProfile",JSON.stringify(profile));const name=$(".profile-text strong");if(name)name.textContent=profile.displayName;const avatarText=profile.displayName.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0].toUpperCase()).join("")||"SA";$(".avatar").textContent=avatarText;$(".top-avatar").textContent=avatarText;toast("Admin profile saved in this browser.")});
  $("#backupData").addEventListener("click",backup);
  $("#resetData").addEventListener("click",()=>{if(confirm("Restore the initial workspace records? All local changes will be replaced.")){state=clone(initialData);persist();renderAll();toast("Initial records restored.")}});
  $("#clearData").addEventListener("click",()=>{if(confirm("Clear all workspace records from this browser? This cannot be undone unless you exported a backup.")){state={enquiries:[],services:[],projects:[],careers:[],employees:[],team:[],content:clone(initialData.content),settings:clone(initialData.settings)};persist();renderAll();toast("Local workspace data cleared.","info")}});
  $("#todayLabel").textContent=new Date().toLocaleDateString("en",{weekday:"long",month:"long",day:"numeric"}).toUpperCase();
  renderAll();
  if(window.lucide?.createIcons)window.lucide.createIcons();
})();