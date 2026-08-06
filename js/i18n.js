/* ============================================
   POPEY — i18n dictionary + apply logic
   ============================================ */
window.POPEY_I18N = (() => {
  const dict = {
    en: {
      // ---- Nav / footer ----
      'nav.catalogue': 'Catalogue',
      'nav.cities': 'Cities',
      'nav.how': 'How it Works',
      'nav.help': 'Help',
      'nav.contact': 'Contact',
      'footer.tagline': 'Nautical experiences for everyone',
      'footer.legal': '© 2026 Popey All rights reserved.',
      'footer.cta.line1': 'Find and book unforgettable',
      'footer.cta.line2': 'experiences at sea',
      'footer.cta.btn': 'See Catalogue',

      // ---- Cities dropdown ----
      'cities.title': 'Our destinations',
      'cities.sub': "Explore the world's most prestigious marinas and hidden archipelagos.",
      'cities.discover': 'Discover more shores',
      'cities.discover.sub': 'Over 50+ coastal cities currently available for seasonal charter.',
      'cities.exploreAll': 'Explore All Destinations',
      'cities.count.yachts': 'Yachts available',
      'cities.count.vessels': 'Vessels available',
      'cities.count.sailboats': 'Sailboats available',
      'cities.count.charters': 'Charters available',

      // ---- Hero (home) ----
      'hero.title.line1': 'Rent boats and',
      'hero.title.line2': 'yachts worldwide',
      'hero.sub': 'Find and book your perfect day at sea',
      'hero.search.location': 'Where would you like to sail?',
      'hero.search.date': 'Pick a date',
      'hero.search.btn': 'Search',
      'hero.rating': '4.9 average rating from 10,000+ guests',

      // ---- Boats in [City] ----
      'rotator.prefix': 'Boats in',
      'stats.boats': 'Boats available',
      'stats.rating': 'Avg. Rating',
      'stats.guests': 'Happy guests',
      'stats.cities': 'Cities',

      // ---- How it works ----
      'how.1.title': 'Choose your destination',
      'how.1.desc': 'Browse boats available in marinas around the world.',
      'how.2.title': 'Find the perfect match',
      'how.2.desc': 'From sailboats to luxury yachts, discover the right vessel for your trip.',
      'how.3.title': 'Book and set sail',
      'how.3.desc': 'Connect with the owner and get ready for an unforgettable experience.',

      // ---- Escape ----
      'escape.title': 'Escape the ordinary',
      'escape.sub.line1': 'Spend a day exploring hidden beaches, celebrating with friends or',
      'escape.sub.line2': 'watching the sunset from the water.',

      // ---- Featured boats ----
      'featured.prefix': 'Featured boats in',
      'featured.count': 'Boats featured',
      'featured.tab.top': 'Top Rated',
      'featured.tab.captain': 'Captain Included',
      'featured.tab.popular': 'Popular',
      'featured.tab.instant': 'Instant Booking',
      'featured.seeAll': 'See All',

      // ---- Why travelers ----
      'why.title.part1': 'Why travelers',
      'why.title.part2': 'choose us',
      'why.cta.note': 'We have more than 1,420 boats available',
      'why.1.dt': 'Verified boats',
      'why.1.dd': 'Every boat is reviewed and verified before it appears in our marketplace.',
      'why.2.dt': 'Licensed captains',
      'why.2.dd': 'Choose experienced captains for a worry-free experience.',
      'why.3.dt': 'Direct owner communication',
      'why.3.dd': 'Coordinate every detail directly with the owner.',
      'why.4.dt': 'Weather flexibility',
      'why.4.dd': 'Reschedule easily when weather conditions change.',

      // ---- Reviews ----
      'reviews.title': 'What our travelers say',
      'reviews.sub': "Real stories from thousands of guests who've sailed with Popey.",

      // ---- Catalogue ----
      'cat.results': 'boats available in',
      'cat.sort.by': 'Sort by:',
      'cat.sort.recommended': 'Recommended',
      'cat.filter.price': 'Price range',
      'cat.filter.filters': 'Filters',
      'cat.filter.boat': 'Boat Type',
      'cat.filter.charter': 'Charter type',
      'cat.filter.capacity': 'Capacity',
      'cat.filter.clearAll': 'Clear all',
      'cat.filter.showResults': 'Show Results',
      'cat.hourly': 'Hourly Rate from',

      // ---- Boat detail ----
      'boat.back': 'Back',
      'boat.specs.capacity': 'Capacity',
      'boat.specs.length': 'Length',
      'boat.specs.cabins': 'Cabins',
      'boat.specs.sleeps': 'Sleeps',
      'boat.specs.buildYear': 'Build Year',
      'boat.specs.captain': 'Captain Included',
      'boat.onboard': "What's on board",
      'boat.hostedBy': 'Hosted by',
      'boat.messageOwner': 'Message Owner',
      'boat.bestPrice': 'Best Price Guarantee',
      'boat.perDay': '/ day',
      'boat.checkin': 'Check-in date',
      'boat.duration': 'Duration',
      'boat.serviceFee': 'Service fee',
      'boat.total': 'Total',
      'boat.book': 'Book and Set Sail',
      'boat.noCharge': "You won't be charged yet",
      'boat.gallery.title': "Ship's Gallery",
      'boat.gallery.sub': 'Explore the vessel from flybridge to bow',
      'boat.gallery.all': 'View all 26 photos',
      'boat.similar': 'Similar boats you might like',

      // ---- Success ----
      'success.title': 'Booking confirmed!',
      'success.sub.line1': 'Your reservation for',
      'success.sub.line2': 'has been confirmed.',
      'success.sub.line3': 'A confirmation email has been sent to your inbox.',
      'success.totalAmount': 'Total Amount',
      'success.departure': 'Departure',
      'success.guests': 'Guests',
      'success.captain': 'Captain',
      'success.next.title': 'What happens next?',
      'success.next.1.title': 'Check your email',
      'success.next.1.desc': 'A detailed itinerary and booking voucher have been sent.',
      'success.next.2.title': 'Prepare for your trip',
      'success.next.2.desc': 'Review our checklist of what to bring and safety guidelines.',
      'success.next.3.title': 'Meet your captain',
      'success.next.3.desc': 'Contact Marc V. through our app to coordinate the meeting point.',

      // ---- City page ----
      'city.whySail': 'Why sail here',
      'city.topMarinas': 'Top marinas',
      'city.more': 'More destinations',
    },
    es: {
      // ---- Nav / footer ----
      'nav.catalogue': 'Catálogo',
      'nav.cities': 'Ciudades',
      'nav.how': 'Cómo funciona',
      'nav.help': 'Ayuda',
      'nav.contact': 'Contacto',
      'footer.tagline': 'Experiencias náuticas para todos',
      'footer.legal': '© 2026 Popey. Todos los derechos reservados.',
      'footer.cta.line1': 'Encontrá y reservá',
      'footer.cta.line2': 'experiencias inolvidables en el mar',
      'footer.cta.btn': 'Ver Catálogo',

      // ---- Cities dropdown ----
      'cities.title': 'Nuestros destinos',
      'cities.sub': 'Explorá las marinas más prestigiosas del mundo y archipiélagos escondidos.',
      'cities.discover': 'Descubrí más costas',
      'cities.discover.sub': 'Más de 50 ciudades costeras disponibles para charter de temporada.',
      'cities.exploreAll': 'Explorar todos los destinos',
      'cities.count.yachts': 'Yates disponibles',
      'cities.count.vessels': 'Embarcaciones disponibles',
      'cities.count.sailboats': 'Veleros disponibles',
      'cities.count.charters': 'Charters disponibles',

      // ---- Hero ----
      'hero.title.line1': 'Alquilá barcos y',
      'hero.title.line2': 'yates en todo el mundo',
      'hero.sub': 'Encontrá y reservá tu día perfecto en el mar',
      'hero.search.location': '¿A dónde te gustaría navegar?',
      'hero.search.date': 'Elegí una fecha',
      'hero.search.btn': 'Buscar',
      'hero.rating': 'Puntaje 4.9 de más de 10.000 pasajeros',

      // ---- Boats in [City] ----
      'rotator.prefix': 'Barcos en',
      'stats.boats': 'Barcos disponibles',
      'stats.rating': 'Puntaje prom.',
      'stats.guests': 'Pasajeros felices',
      'stats.cities': 'Ciudades',

      // ---- How it works ----
      'how.1.title': 'Elegí tu destino',
      'how.1.desc': 'Explorá los barcos disponibles en marinas de todo el mundo.',
      'how.2.title': 'Encontrá el barco ideal',
      'how.2.desc': 'De veleros a yates de lujo, descubrí la embarcación perfecta para tu viaje.',
      'how.3.title': 'Reservá y zarpá',
      'how.3.desc': 'Conectá con el dueño y preparate para una experiencia inolvidable.',

      // ---- Escape ----
      'escape.title': 'Escapá de la rutina',
      'escape.sub.line1': 'Pasá el día explorando playas escondidas, celebrando con amigos o',
      'escape.sub.line2': 'mirando el atardecer desde el agua.',

      // ---- Featured boats ----
      'featured.prefix': 'Barcos destacados en',
      'featured.count': 'Barcos destacados',
      'featured.tab.top': 'Mejor puntuados',
      'featured.tab.captain': 'Con capitán',
      'featured.tab.popular': 'Populares',
      'featured.tab.instant': 'Reserva inmediata',
      'featured.seeAll': 'Ver todos',

      // ---- Why travelers ----
      'why.title.part1': 'Por qué los viajeros',
      'why.title.part2': 'nos eligen',
      'why.cta.note': 'Tenemos más de 1.420 barcos disponibles',
      'why.1.dt': 'Barcos verificados',
      'why.1.dd': 'Todos los barcos son revisados y verificados antes de aparecer en el marketplace.',
      'why.2.dt': 'Capitanes matriculados',
      'why.2.dd': 'Elegí capitanes con experiencia para una travesía sin preocupaciones.',
      'why.3.dt': 'Contacto directo con el dueño',
      'why.3.dd': 'Coordiná cada detalle directamente con el dueño del barco.',
      'why.4.dt': 'Flexibilidad por clima',
      'why.4.dd': 'Reprogramá fácilmente si las condiciones del clima cambian.',

      // ---- Reviews ----
      'reviews.title': 'Qué dicen nuestros viajeros',
      'reviews.sub': 'Historias reales de miles de pasajeros que ya navegaron con Popey.',

      // ---- Catalogue ----
      'cat.results': 'barcos disponibles en',
      'cat.sort.by': 'Ordenar por:',
      'cat.sort.recommended': 'Recomendados',
      'cat.filter.price': 'Rango de precio',
      'cat.filter.filters': 'Filtros',
      'cat.filter.boat': 'Tipo de barco',
      'cat.filter.charter': 'Tipo de charter',
      'cat.filter.capacity': 'Capacidad',
      'cat.filter.clearAll': 'Limpiar todo',
      'cat.filter.showResults': 'Ver resultados',
      'cat.hourly': 'Precio por hora desde',

      // ---- Boat detail ----
      'boat.back': 'Volver',
      'boat.specs.capacity': 'Capacidad',
      'boat.specs.length': 'Eslora',
      'boat.specs.cabins': 'Camarotes',
      'boat.specs.sleeps': 'Duerme',
      'boat.specs.buildYear': 'Año',
      'boat.specs.captain': 'Capitán incluido',
      'boat.onboard': 'Qué hay a bordo',
      'boat.hostedBy': 'Anfitrión:',
      'boat.messageOwner': 'Mensajear al dueño',
      'boat.bestPrice': 'Mejor precio garantizado',
      'boat.perDay': '/ día',
      'boat.checkin': 'Fecha de check-in',
      'boat.duration': 'Duración',
      'boat.serviceFee': 'Cargo de servicio',
      'boat.total': 'Total',
      'boat.book': 'Reservar y zarpar',
      'boat.noCharge': 'Todavía no se te cobra',
      'boat.gallery.title': 'Galería del barco',
      'boat.gallery.sub': 'Explorá el barco desde el flybridge hasta la proa',
      'boat.gallery.all': 'Ver las 26 fotos',
      'boat.similar': 'Barcos similares que te pueden gustar',

      // ---- Success ----
      'success.title': '¡Reserva confirmada!',
      'success.sub.line1': 'Tu reserva para',
      'success.sub.line2': 'fue confirmada.',
      'success.sub.line3': 'Te enviamos un email de confirmación.',
      'success.totalAmount': 'Total',
      'success.departure': 'Salida',
      'success.guests': 'Pasajeros',
      'success.captain': 'Capitán',
      'success.next.title': '¿Qué sigue?',
      'success.next.1.title': 'Revisá tu email',
      'success.next.1.desc': 'Te enviamos el itinerario detallado y el voucher de reserva.',
      'success.next.2.title': 'Preparate para el viaje',
      'success.next.2.desc': 'Revisá nuestra checklist de qué llevar y las guías de seguridad.',
      'success.next.3.title': 'Conocé al capitán',
      'success.next.3.desc': 'Contactate con Marc V. desde la app para coordinar el punto de encuentro.',

      // ---- City page ----
      'city.whySail': 'Por qué navegar acá',
      'city.topMarinas': 'Marinas destacadas',
      'city.more': 'Otros destinos',
    },
  };

  const STORAGE_KEY = 'popey_lang';

  const getLang = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') return saved;
    // Auto-detect: use Spanish if browser lang starts with 'es'
    return (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  };

  const t = (key, lang) => (dict[lang] && dict[lang][key]) || (dict.en && dict.en[key]) || key;

  const apply = (lang) => {
    if (!dict[lang]) lang = 'en';
    // Update text content of every [data-i18n] element
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key, lang);
    });
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key, lang));
    });
    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key, lang));
    });
    // Document lang attribute + toggle state
    document.documentElement.lang = lang;
    document.querySelectorAll('.nav__lang').forEach(group => {
      group.querySelectorAll('.lang-btn').forEach(b => {
        const isMatch = b.textContent.trim().toLowerCase() === lang;
        b.classList.toggle('is-active', isMatch);
        b.setAttribute('aria-pressed', String(isMatch));
      });
    });
    // Persist
    localStorage.setItem(STORAGE_KEY, lang);
    // Broadcast so pages can update dynamic content (like the city rotator, tab labels rendered from JS)
    document.dispatchEvent(new CustomEvent('popey:langchange', { detail: { lang } }));
  };

  return { apply, getLang, t, dict };
})();
