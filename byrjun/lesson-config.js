// Lesson Configuration
// This is the SINGLE source of truth for all lessons in Byrjun
// To add a new lesson: just add an object to the lessons array
// All pages will automatically update!

const LESSON_CONFIG = {
  lessons: [
    { 
      id: 'innlogn', 
      name: 'Innlögn', 
      icon: '📖',
      url: 'innlogn.html',
      description: 'Lestu textann og fáðu þýðingar'
    },
    { 
      id: 'eydufylling', 
      name: 'Eyðufylling', 
      icon: '📝',
      url: 'eydufylling.html',
      description: 'Fylltu í eyðurnar'
    },
    { 
      id: 'para_myndir', 
      name: 'Paraðu orð og mynd', 
      icon: '🧩',
      url: 'para_myndir',
      description: 'Para orð við myndir'
    },
    { 
      id: 'kaffihusid', 
      name: 'Kaffihúsið', 
      icon: '☕',
      url: 'kaffihusid.html',
      description: 'Panta á kaffihúsi'
    },
    { 
      id: 'spjallleikrit', 
      name: 'Spjallleikrit: Kynning', 
      icon: '💬',
      url: 'spjallleikrit.html',
      description: 'Kynntu þig'
    }
  ]
};
