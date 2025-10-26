// File summary: Generates synthetic sports events (Oct–Dec 2025), writes them to src/data/generated-events.json,
// and prints a browser snippet to merge them into localStorage for testing/demo purposes.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
// Explanation: ES modules don't provide __dirname by default. Convert import.meta.url to a file path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateAndAddEvents() {
  // Purpose: build an array of synthetic events across multiple sports and dates.
  // Each generated event includes id, date, time, teams, stage, status and result when applicable.

  const sports = ['football', 'basketball', 'hockey', 'volleyball', 'tennis'];
  
  // teams: object keyed by sport with arrays of [home, away] team pairs used to create matchups.
  const teams = {
    football: [
      ['Real Madrid', 'Barcelona'], ['Manchester United', 'Liverpool'],
      ['Bayern Munich', 'Borussia Dortmund'], ['PSG', 'Lyon'],
      ['Juventus', 'AC Milan'], ['Ajax', 'Feyenoord']
    ],
    basketball: [
      ['Lakers', 'Celtics'], ['Warriors', 'Nets'],
      ['Bulls', 'Heat'], ['Mavericks', 'Suns'],
      ['Bucks', 'Knicks'], ['Clippers', 'Nuggets']
    ],
    hockey: [
      ['Rangers', 'Bruins'], ['Maple Leafs', 'Canadiens'],
      ['Penguins', 'Capitals'], ['Blackhawks', 'Red Wings'],
      ['Avalanche', 'Wild'], ['Flames', 'Oilers']
    ],
    volleyball: [
      ['Zenit Kazan', 'Lube Civitanova'], ['Perugia', 'Modena'],
      ['Fenerbahce', 'Vakifbank'], ['Berlin', 'Friedrichshafen']
    ],
    tennis: [
      ['Djokovic', 'Nadal'], ['Federer', 'Murray'],
      ['Alcaraz', 'Sinner'], ['Medvedev', 'Zverev']
    ]
  };

  // stages: typical competition phases used to add context to each match.
  const stages = [
    'Group Stage', 'Round of 16', 'Quarter Finals', 
    'Semi Finals', 'Finals', 'Regular Season'
  ];

  const generatedEvents = [];
  
  const months = [
    { month: 10, days: 31 }, // October 2025
    { month: 11, days: 30 }, // November 2025
    { month: 12, days: 31 }  // December 2025
  ];

  months.forEach(({ month, days }) => {
    // eventsPerMonth: randomized count per month so output varies between runs.
    const eventsPerMonth = 20 + Math.floor(Math.random() * 11);
    
    for (let i = 0; i < eventsPerMonth; i++) {
      // Random day/time, random sport and teams, random stage.
      const day = Math.floor(Math.random() * days) + 1;
      const sport = sports[Math.floor(Math.random() * sports.length)];
      const teamPair = teams[sport][Math.floor(Math.random() * teams[sport].length)];
      const stage = stages[Math.floor(Math.random() * stages.length)];
      
      // isPast: small heuristic marking some October dates as already played (to simulate results).
      const isPast = month === 10 && day < 27;
      const status = isPast ? 'played' : 'scheduled';
      
      // For played matches we generate random scores; otherwise set 0 and no winner.
      const homeGoals = isPast ? Math.floor(Math.random() * 5) : 0;
      const awayGoals = isPast ? Math.floor(Math.random() * 5) : 0;

      generatedEvents.push({
        // id uses timestamp + indices to keep ids unique per run.
        id: `gen-${Date.now()}-${i}-${month}-${day}`,
        date: `2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        time: `${10 + Math.floor(Math.random() * 10)}:${Math.random() > 0.5 ? '00' : '30'}`,
        sport: sport,
        homeTeam: teamPair[0],
        awayTeam: teamPair[1],
        title: `${teamPair[0]} vs ${teamPair[1]}`,
        stage: stage,
        status: status,
        result: {
          homeGoals: homeGoals,
          awayGoals: awayGoals,
          // winner is null for scheduled or draws; otherwise the team with more goals.
          winner: isPast && homeGoals !== awayGoals 
            ? (homeGoals > awayGoals ? teamPair[0] : teamPair[1])
            : null
        }
      });
    }
  });

  generatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  // output: object containing events plus metadata (generated timestamp and count).
  const output = {
    events: generatedEvents,
    generated: new Date().toISOString(),
    count: generatedEvents.length
  };
  
  // Write the JSON file into the project's src/data folder for frontend consumption.
  const outputPath = path.join(__dirname, '../src/data/generated-events.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  
  // Console logs: summary and a small browser snippet you can paste in DevTools to merge into localStorage.
  console.log(`✅ Generated ${generatedEvents.length} events!`);
  console.log(`📁 Saved to: src/data/generated-events.json`);
  console.log(`📅 Events spread across October, November, and December 2025`);
  console.log(`🏆 Sports: ${sports.join(', ')}`);
  console.log(`\n🎯 Next: Open browser console and run:`);
  console.log(`\nfetch('/src/data/generated-events.json')
  .then(r => r.json())
  .then(data => {
    const current = JSON.parse(localStorage.getItem('sports-calendar-events') || '[]');
    const combined = [...current, ...data.events];
    localStorage.setItem('sports-calendar-events', JSON.stringify(combined));
    alert('Added ' + data.events.length + ' events!');
    window.location.reload();
  });\n`);
}

generateAndAddEvents();