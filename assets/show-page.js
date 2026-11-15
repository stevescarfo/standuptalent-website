// A show shared from the app: show.html?id=<show>; &beta=1 reads the Beta (test) database.
(function () {
  const params = new URLSearchParams(location.search);
  const beta = params.get('beta') === '1';
  const BASE = beta ? 'https://bzqchosraktuzpdyrvqz.supabase.co' : 'https://fqyfwrzwzdafqqyygvvg.supabase.co';
  const KEY = beta
    ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cWNob3NyYWt0dXpwZHlydnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4MTczNzcsImV4cCI6MjEwOTM5MzM3N30.NohBONtCgKm-mqBSZFLO7ADr8mOdvf_w7zBykTrSng0'
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxeWZ3cnp3emRhZnFxeXlndnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzYxNzQsImV4cCI6MjA5NjkxMjE3NH0.MNAQlIOY8R1_rAPvTtMsJ1UsHgu15zilCJf8wMeD3iM';
  const id = params.get('id') || '';
  const root = document.getElementById('show');

  const el = (tag, attrs, kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'text') n.textContent = v;
      else if (v != null) n.setAttribute(k, v);
    }
    (kids || []).forEach((c) => c && n.appendChild(c));
    return n;
  };

  // Open in the app (people who have it) and Get the app (everyone else).
  const getApp = () =>
    el('div', { class: 'get-app' }, [
      el('p', { text: 'Follow the comics and clubs you like and get an alert when they add a show. Stand Up Talent is free.' }),
      el('div', { class: 'badges' }, [
        el('a', { class: 'button', href: 'standuptalent://show/' + id, text: 'Open in the app' }),
        el('a', { class: 'button secondary', href: './#get', text: 'Get the app' }),
      ]),
    ]);

  const notFound = () =>
    root.replaceChildren(
      el('h1', { text: 'Show not found' }),
      el('p', { class: 'lead', text: 'This show isn’t shared, or the link is out of date. Ask whoever sent it for a new link.' }),
      getApp(),
    );

  const day = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const time = (t) => {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    return ' · ' + (h % 12 || 12) + ':' + String(m).padStart(2, '0') + (h < 12 ? ' AM' : ' PM');
  };
  const initials = (name) =>
    (name || '?')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2);

  if (!/^[0-9a-f-]{36}$/i.test(id)) return notFound();

  fetch(BASE + '/rest/v1/rpc/show_page', {
    method: 'POST',
    headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ show: id }),
  })
    .then((r) => (r.ok ? r.json() : null))
    .then((s) => {
      if (!s || !s.shared) return notFound();
      document.title = s.title + ' · Stand Up Talent';
      const where = [s.venue_name, [s.city, s.state].filter(Boolean).join(', ')].filter(Boolean).join(' · ');
      const kids = [];
      if (beta) kids.push(el('p', { class: 'beta-note', text: 'BETA · test data' }));
      kids.push(
        el('h1', { text: s.title }),
        el('p', { class: 'when', text: day(s.show_date) + time(s.start_time) }),
        el('p', { class: 'where', text: where }),
        el('p', { class: 'by', text: 'Presented by ' + s.agent_name }),
      );
      if (s.ticket_url && /^https?:\/\//.test(s.ticket_url)) {
        kids.push(el('div', { class: 'actions' }, [el('a', { class: 'button', href: s.ticket_url, rel: 'noopener', text: 'Get tickets' })]));
      }
      if (s.lineup && s.lineup.length) {
        kids.push(el('h2', { text: 'Lineup' }));
        kids.push(
          el(
            'ul',
            { class: 'lineup' },
            s.lineup.map((p) =>
              el('li', {}, [
                p.avatar_url && /^https:\/\//.test(p.avatar_url)
                  ? el('img', { src: p.avatar_url, alt: '' })
                  : el('span', { class: 'initials', text: initials(p.name) }),
                el('div', {}, [el('div', { class: 'name', text: p.name }), p.role ? el('div', { class: 'role', text: p.role }) : null]),
              ]),
            ),
          ),
        );
      }
      kids.push(getApp());
      root.replaceChildren(...kids);
    })
    .catch(notFound);
})();
