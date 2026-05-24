#!/usr/bin/env python3
import os
import sys

base_dir = '/home/user/malstodin/isat1ia/lestextar'

files_map = [
    ('01_arni_elsa_harpa_hulda.html', 1),
    ('02_ysa_i_raspi.html', 2),
    ('03_forum_i_leikhus.html', 3),
    ('04_hulda_og_halima.html', 4),
    ('05_harpa_og_eirikur.html', 5),
    ('06_hrekkjavaka.html', 6),
    ('07_harpa_og_eirikur_kaupa.html', 7),
    ('08_harpa_og_eirikur_elda.html', 8),
    ('09_hulda_og_halima_leika.html', 9),
    ('10_hulda_og_halima_i_skola.html', 10),
    ('11_starfsheiti.html', 11),
    ('12_harpa_og_eirikur_vinna.html', 12),
    ('13_hulda_og_halima_spjalla.html', 13),
]

# Change 1: CSS to insert before </style>
CSS_TO_ADD = (
    '    /* Þýðingarpopup */\n'
    '    .selectable-text {\n'
    '      user-select: text;\n'
    '      -webkit-user-select: text;\n'
    '      cursor: text;\n'
    '    }\n'
    '    .selectable-text::selection { background: #dbeafe; }\n'
    '\n'
    '    @keyframes popupIn {\n'
    '      from { opacity: 0; transform: translateX(-50%) translateY(6px); }\n'
    '      to   { opacity: 1; transform: translateX(-50%) translateY(0); }\n'
    '    }\n'
    '    .popup-anim { animation: popupIn 0.2s ease both; }\n'
    '\n'
    '    @keyframes dots {\n'
    "      0%, 20% { content: '.'; }\n"
    "      40%      { content: '..'; }\n"
    "      60%, 100%{ content: '...'; }\n"
    '    }\n'
    '    .loading-dots::after {\n'
    "      content: '...';\n"
    '      animation: dots 1.5s steps(4, end) infinite;\n'
    '    }\n'
    '\n'
)

# Change 2: ThyðingarPopup component to insert before App
THYDING_COMPONENT = (
    '    /* ══════════════════════════════════════════\n'
    '       ÞÝÐINGARPOPUP\n'
    '    ══════════════════════════════════════════ */\n'
    '    function ThyðingarPopup({ selectedText, position, language, onClose }) {\n'
    "      const [translation, setTranslation] = useState('');\n"
    '      const [loading, setLoading]         = useState(false);\n'
    '\n'
    '      const handleTranslate = async () => {\n'
    '        setLoading(true);\n'
    '        try {\n'
    '          const result = await callOpenAI([\n'
    "            { role: 'system', content: 'You are a helpful language learning assistant for Icelandic students.' },\n"
    '            { role: \'user\',   content: `A student learning Icelandic has selected this text and needs help understanding it in ${language}.\\n\\nSELECTED TEXT (Icelandic): "${selectedText}"\\n\\nProvide:\\n1. Translation to ${language}\\n2. Brief explanation if needed (in ${language})\\n\\nKeep it concise. Respond ONLY in ${language}.` }\n'
    '          ], 300, 0.3);\n'
    '          setTranslation(result);\n'
    '        } catch (e) {\n'
    "          setTranslation('Villa kom upp. Reyndu aftur.');\n"
    '        } finally {\n'
    '          setLoading(false);\n'
    '        }\n'
    '      };\n'
    '\n'
    '      return (\n'
    '        <>\n'
    '          <div className="fixed inset-0 z-40" onClick={onClose} />\n'
    '          <div className="popup-anim fixed z-50 bg-white border-2 border-blue-300 rounded-2xl shadow-xl p-5"\n'
    '            style={{\n'
    "              left: position.x + 'px',\n"
    "              top:  position.y + 'px',\n"
    "              transform: 'translateX(-50%)',\n"
    "              width: '340px',\n"
    "              maxWidth: '90vw',\n"
    '            }}>\n'
    '            <div className="flex items-start justify-between mb-3">\n'
    '              <div className="flex-1">\n'
    '                <p className="text-xs text-gray-400 mb-1">Valinn texti:</p>\n'
    '                <p className="text-sm text-gray-700 italic font-light">„{selectedText}"</p>\n'
    '              </div>\n'
    '              <button onClick={onClose}\n'
    '                className="text-gray-300 hover:text-gray-600 text-2xl leading-none ml-3">×</button>\n'
    '            </div>\n'
    '            {!translation ? (\n'
    '              <button onClick={handleTranslate} disabled={loading}\n'
    '                className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700\n'
    '                  disabled:bg-gray-300 transition-colors font-light text-sm">\n'
    '                {loading\n'
    '                  ? <span className="loading-dots">Þýði</span>\n'
    '                  : `🌐 Þýða á ${language}`}\n'
    '              </button>\n'
    '            ) : (\n'
    '              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 fade-in">\n'
    '                <p className="text-xs text-blue-400 mb-2">🌐 Þýðing:</p>\n'
    '                <p className="text-sm text-gray-800 font-light whitespace-pre-wrap">{translation}</p>\n'
    '              </div>\n'
    '            )}\n'
    '          </div>\n'
    '        </>\n'
    '      );\n'
    '    }\n'
    '\n'
)

# Change 3: State and handlers to insert inside App after existing useState lines
STATE_AND_HANDLER = (
    "      const [language, setLanguage]   = useState('');\n"
    "      const [langInput, setLangInput] = useState('');\n"
    '      const [confirmed, setConfirmed] = useState(false);\n'
    '      const [popup, setPopup]         = useState(null);\n'
    '\n'
    '      const handleSelection = () => {\n'
    '        if (!confirmed) return;\n'
    '        setTimeout(() => {\n'
    '          const sel  = window.getSelection();\n'
    '          const text = sel.toString().trim();\n'
    '          if (!text || text.length < 2) return;\n'
    '          const range = sel.getRangeAt(0);\n'
    '          const rect  = range.getBoundingClientRect();\n'
    '          const x = Math.min(Math.max(rect.left + rect.width / 2, 180), window.innerWidth - 180);\n'
    '          const y = rect.bottom + window.scrollY + 12;\n'
    '          setPopup({ text, x, y });\n'
    '        }, 80);\n'
    '      };\n'
    '\n'
)

# Change 4: Old text div to find
OLD_TEXT_DIV = (
    '            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 fade-in">\n'
    '              <p className="text-gray-700 leading-relaxed font-light">{READING_TEXT}</p>\n'
    '            </div>'
)

def make_new_text_div(n):
    return (
        '            {/* Tungumálval */}\n'
        '            <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-4">\n'
        '              {!confirmed ? (\n'
        '                <div className="flex gap-2 items-center flex-wrap">\n'
        '                  <span className="text-sm text-gray-500 font-light">🌐 Móðurmál:</span>\n'
        '                  <input\n'
        '                    type="text"\n'
        '                    value={langInput}\n'
        '                    onChange={e => setLangInput(e.target.value)}\n'
        "                    onKeyDown={e => e.key === 'Enter' && langInput.trim() && (setLanguage(langInput.trim()), setConfirmed(true))}\n"
        '                    placeholder="t.d. English, Polski, 中文…"\n'
        '                    className="flex-1 min-w-0 px-3 py-1.5 border border-gray-200 rounded-lg text-sm\n'
        '                      font-light focus:outline-none focus:ring-2 focus:ring-blue-400"\n'
        '                  />\n'
        '                  <button\n'
        "                    onClick={() => { if (langInput.trim()) { setLanguage(langInput.trim()); setConfirmed(true); } }}\n"
        '                    disabled={!langInput.trim()}\n'
        '                    className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-light\n'
        '                      hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">\n'
        '                    Staðfesta\n'
        '                  </button>\n'
        '                </div>\n'
        '              ) : (\n'
        '                <div className="flex items-center justify-between">\n'
        '                  <p className="text-sm text-gray-600 font-light">\n'
        '                    🌐 <span className="font-medium">{language}</span>\n'
        '                    <span className="text-gray-400 ml-2">— Merktu orð í textanum til að þýða</span>\n'
        '                  </p>\n'
        "                  <button onClick={() => { setConfirmed(false); setLangInput(''); setPopup(null); }}\n"
        '                    className="text-xs text-blue-500 hover:text-blue-700 font-light">Breyta</button>\n'
        '                </div>\n'
        '              )}\n'
        '            </div>\n'
        '\n'
        '            {/* Texti með mynd og þýðingarfúnksjón */}\n'
        '            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 fade-in">\n'
        '              <img\n'
        '                src="../media/texti' + str(n) + '.png"\n'
        '                alt="Myndskreyting"\n'
        '                className="w-full rounded-xl border border-gray-100 shadow-sm object-cover mb-5"\n'
        "                style={{ maxHeight: '280px' }}\n"
        '              />\n'
        '              <div\n'
        '                className={`selectable-text ${!confirmed ? \'opacity-60\' : \'\'}`}\n'
        '                onMouseUp={handleSelection}\n'
        '                onTouchEnd={handleSelection}>\n'
        '                <p className="text-gray-700 leading-relaxed font-light">{READING_TEXT}</p>\n'
        '              </div>\n'
        '              {!confirmed && (\n'
        '                <p className="text-xs text-gray-400 font-light mt-3 text-center">\n'
        '                  ⬆️ Skráðu móðurmál þitt til að geta þýtt orð í textanum\n'
        '                </p>\n'
        '              )}\n'
        '            </div>\n'
        '\n'
        '            {/* Popup */}\n'
        '            {popup && confirmed && (\n'
        '              <ThyðingarPopup\n'
        '                selectedText={popup.text}\n'
        '                position={{ x: popup.x, y: popup.y }}\n'
        '                language={language}\n'
        "                onClose={() => { setPopup(null); window.getSelection().removeAllRanges(); }}\n"
        '              />\n'
        '            )}'
    )

errors = []

for filename, img_num in files_map:
    filepath = os.path.join(base_dir, filename)
    print(f'Processing {filename} (image: texti{img_num}.png)...')

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # --- Change 1: Add CSS before </style> ---
    style_close = '  </style>'
    if style_close not in content:
        print(f'  ERROR: Could not find </style> in {filename}')
        errors.append(filename + ': no </style>')
        continue

    # Check if already modified
    if '.selectable-text' in content:
        print(f'  SKIP: CSS already present in {filename}')
    else:
        content = content.replace(style_close, CSS_TO_ADD + style_close)
        print(f'  OK: CSS added')

    # --- Change 2: Add ThyðingarPopup before App ---
    # Look for `const App = ` or `function App(`
    app_markers = ['    const App = ', '    function App(']
    app_marker_found = None
    for marker in app_markers:
        if marker in content:
            app_marker_found = marker
            break

    if not app_marker_found:
        print(f'  ERROR: Could not find App component in {filename}')
        errors.append(filename + ': no App marker')
        continue

    if 'function ThyðingarPopup' in content:
        print(f'  SKIP: ThyðingarPopup already present in {filename}')
    else:
        content = content.replace(app_marker_found, THYDING_COMPONENT + app_marker_found, 1)
        print(f'  OK: ThyðingarPopup added')

    # --- Change 3: Add state and handler inside App ---
    # Find the first useState inside App and add after the block of useStates
    # We look for the pattern: the activeTab useState and tabs useState, then insert after
    # In file 01 the pattern is:
    #   const [activeTab, setActiveTab] = useState(0);
    #   const [tabs, setTabs] = useState([
    # We need to find the end of the tabs useState block and insert after it
    # Strategy: find "const [tabs, setTabs] = useState([" and find the closing "]);" then insert after

    if 'const [language, setLanguage]' in content:
        print(f'  SKIP: State already present in {filename}')
    else:
        # Find the insertion point: after the tabs useState block
        # The tabs block ends with ]);
        # We'll find "const [tabs, setTabs] = useState([" and then find the matching "]);"
        tabs_marker = '      const [tabs, setTabs] = useState(['
        if tabs_marker not in content:
            print(f'  ERROR: Could not find tabs useState in {filename}')
            errors.append(filename + ': no tabs useState')
            continue

        idx = content.index(tabs_marker)
        # Find the closing ]);\n after this point
        end_marker = ']);\n'
        end_idx = content.index(end_marker, idx)
        insert_pos = end_idx + len(end_marker)
        content = content[:insert_pos] + '\n' + STATE_AND_HANDLER + content[insert_pos:]
        print(f'  OK: State and handler added')

    # --- Change 4: Replace old text div ---
    if OLD_TEXT_DIV not in content:
        print(f'  ERROR: Could not find old text div in {filename}')
        errors.append(filename + ': old text div not found')
        continue

    if 'ThyðingarPopup' in content and 'texti' + str(img_num) + '.png' in content:
        print(f'  SKIP: New text div already present in {filename}')
    else:
        new_div = make_new_text_div(img_num)
        content = content.replace(OLD_TEXT_DIV, new_div, 1)
        print(f'  OK: Text div replaced with image texti{img_num}.png')

    if content == original:
        print(f'  INFO: No changes made to {filename}')
    else:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'  WRITTEN: {filename}')

print()
if errors:
    print('ERRORS:')
    for e in errors:
        print(' -', e)
else:
    print('All files processed successfully.')
