// Lesson Configuration for Byrjun Unit
// This file defines all lessons in the unit and their order

const LESSON_CONFIG = {
  lessons: [
    { 
      id: 'innlogn', 
      name: 'Innlögn', 
      icon: '📖',
      url: 'innlogn.html',
      description: 'Lestu textann og læra orðaforða'
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
      icon: '🎯',
      url: 'para_myndir.html',
      description: 'Dragðu orðin að myndunum'
    },
    { 
      id: 'hlustun', 
      name: 'Hlustun', 
      icon: '🎧',
      url: 'hlustun.html',
      description: 'Hlustunaræfingar'
    },
    { 
      id: 'spjall', 
      name: 'Spjall: Kaffihús', 
      icon: '💬',
      url: 'spjall.html',
      description: 'Æfðu samtal við AI'
    },
    { 
      id: 'sjalfsprof', 
      name: 'Sjálfspróf', 
      icon: '📊',
      url: 'sjalfsprof.html',
      description: 'Prófaðu hvað þú hefur lært'
    }
  ]
};

// Make config available globally
if (typeof window !== 'undefined') {
  window.LESSON_CONFIG = LESSON_CONFIG;
}
