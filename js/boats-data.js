/* ============================================
   POPEY — Featured boats data
   Per-city, per-tab curated list. Rendered by main.js.
   ============================================ */
window.POPEY_BOATS = (() => {
  const IMG = 'assets/images/';
  // Base pool per city
  const boats = {
    miami: [
      { name: "40′ Azimut Miami",        desc: "Hit the water in style with this 40′ Azimut",     img: IMG+'boat-azimut.jpg',   len:'16m', ppl:12, rating:4.3, price:'USD 275', badge:'Captain Included', tags:['top','captain','popular'] },
      { name: "50ft Party Pontoon Miami", desc: "Up to 40 guests",                                  img: IMG+'boat-pontoon.jpg',  len:'26m', ppl:40, rating:4.2, price:'USD 500', badge:'Captain Included', tags:['captain','popular','instant'] },
      { name: "55′ Azimut Miami",         desc: "Immaculate 55 Sea Ray",                            img: IMG+'boat-yacht.jpg',    len:'14m', ppl:6,  beds:2, rating:4.8, price:'USD 525', tags:['top','popular','instant'] },
      { name: "75′ Azimut Flybridge",     desc: "Experience luxury on the water",                   img: IMG+'boat-sail.jpg',     len:'21m', ppl:10, beds:3, rating:4.9, price:'USD 780', badge:'Captain Included', tags:['top','captain','instant'] },
      { name: "60′ Princess V60",         desc: "Indulge in opulence on the 60′ Princess",          img: IMG+'boat-yacht.jpg',    len:'18.3m',ppl:16, beds:8, rating:3.9, price:'USD 500', tags:['captain','instant'] },
      { name: "45′ Jeanneau Sun Odyssey", desc: "Sail with elegance aboard the 45′ Jeanneau",       img: IMG+'boat-sail.jpg',     len:'13.7m',ppl:10, beds:4, rating:4.1, price:'USD 250', tags:['top','popular'] },
    ],
    ibiza: [
      { name: "38′ Sunseeker Portofino",  desc: "Cruise the Balearic sunsets",                      img: IMG+'boat-azimut.jpg',   len:'11.6m',ppl:8,  rating:4.7, price:'USD 320', badge:'Captain Included', tags:['top','captain','popular','instant'] },
      { name: "50′ Beneteau Oceanis",     desc: "Sail to Formentera in comfort",                    img: IMG+'boat-sail.jpg',     len:'15.2m',ppl:10, beds:4, rating:4.6, price:'USD 380', tags:['top','popular'] },
      { name: "55′ Riva Rivale",          desc: "Italian icon in the Med",                          img: IMG+'boat-yacht.jpg',    len:'16.8m',ppl:8,  beds:2, rating:4.9, price:'USD 950', badge:'Captain Included', tags:['top','captain','instant'] },
      { name: "42′ Party Catamaran",      desc: "Group escapes to Es Vedrà",                        img: IMG+'boat-pontoon.jpg',  len:'12.8m',ppl:24, rating:4.4, price:'USD 640', tags:['captain','popular','instant'] },
    ],
    barcelona: [
      { name: "36′ Bavaria Cruiser",      desc: "Explore the Costa Brava",                          img: IMG+'boat-sail.jpg',     len:'11m',  ppl:8,  beds:3, rating:4.5, price:'USD 260', tags:['top','popular'] },
      { name: "48′ Sea Ray Sundancer",    desc: "Sunset cruise from Port Olímpic",                  img: IMG+'boat-yacht.jpg',    len:'14.6m',ppl:10, beds:2, rating:4.7, price:'USD 420', badge:'Captain Included', tags:['top','captain','instant'] },
      { name: "40′ Lagoon Catamaran",     desc: "Family day sailing the Med",                       img: IMG+'boat-pontoon.jpg',  len:'12.2m',ppl:12, beds:4, rating:4.6, price:'USD 500', badge:'Captain Included', tags:['captain','popular'] },
      { name: "55′ Sunseeker Manhattan",  desc: "Luxury flybridge experience",                      img: IMG+'boat-azimut.jpg',   len:'16.8m',ppl:10, beds:3, rating:4.8, price:'USD 880', tags:['top','instant'] },
    ],
    mykonos: [
      { name: "62′ Ferretti",             desc: "Yacht to Delos and Rhenia",                        img: IMG+'boat-yacht.jpg',    len:'18.9m',ppl:10, beds:4, rating:4.9, price:'USD 1,200', badge:'Captain Included', tags:['top','captain','popular','instant'] },
      { name: "48′ Bali Catamaran",       desc: "Snorkel the Aegean",                               img: IMG+'boat-sail.jpg',     len:'14.6m',ppl:12, beds:4, rating:4.6, price:'USD 720', tags:['popular','instant'] },
      { name: "34′ Fjord Speedboat",      desc: "Fast escape to hidden coves",                      img: IMG+'boat-azimut.jpg',   len:'10.3m',ppl:8,  rating:4.7, price:'USD 480', badge:'Captain Included', tags:['top','captain'] },
      { name: "72′ Princess Y72",         desc: "Overnight VIP charter",                            img: IMG+'boat-pontoon.jpg',  len:'21.9m',ppl:10, beds:5, rating:4.8, price:'USD 2,100', tags:['top','instant'] },
    ],
    monaco: [
      { name: "80′ Sunseeker Predator",   desc: "Grand-Prix week luxury",                           img: IMG+'boat-yacht.jpg',    len:'24m',  ppl:12, beds:4, rating:4.9, price:'USD 3,200', badge:'Captain Included', tags:['top','captain','instant'] },
      { name: "50′ Riva Aquariva",        desc: "Iconic day cruiser",                               img: IMG+'boat-azimut.jpg',   len:'15m',  ppl:8,  rating:4.8, price:'USD 1,100', tags:['top','popular'] },
      { name: "62′ Azimut Grande",        desc: "Cap-Ferrat weekend",                               img: IMG+'boat-pontoon.jpg',  len:'19m',  ppl:10, beds:3, rating:4.7, price:'USD 1,600', badge:'Captain Included', tags:['captain','instant'] },
    ],
    santorini: [
      { name: "42′ Sailing Yacht Zeus",   desc: "Caldera sunset sail",                              img: IMG+'boat-sail.jpg',     len:'12.8m',ppl:10, beds:3, rating:4.9, price:'USD 340', badge:'Captain Included', tags:['top','captain','popular','instant'] },
      { name: "38′ Motor Yacht Poseidon", desc: "Red Beach & White Beach tour",                     img: IMG+'boat-azimut.jpg',   len:'11.6m',ppl:8,  rating:4.7, price:'USD 420', tags:['top','popular'] },
    ],
  };

  const tabsFilter = (list, tab) => list.filter(b => b.tags.includes(tab));

  return { boats, tabsFilter };
})();
