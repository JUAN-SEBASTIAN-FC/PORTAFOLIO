import json
from pathlib import Path

# Create basic extraction from the codebase structure
nodes = []
edges = []

# Extract from code files listed in detection
detect = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8'))

# Add component nodes
components_map = {
    'App': 'src/App.jsx',
    'Hero': 'src/components/sections/Hero.jsx',
    'About': 'src/components/sections/About.jsx',
    'Skills': 'src/components/sections/Skills.jsx',
    'Experience': 'src/components/sections/Experience.jsx',
    'Projects': 'src/components/sections/Projects.jsx',
    'Contact': 'src/components/sections/Contact.jsx',
    'Header': 'src/components/layout/Header.jsx',
    'Footer': 'src/components/layout/Footer.jsx',
    'CaveBackground': 'src/components/ui/CaveBackground.jsx',
    'DragonSequence': 'src/components/ui/DragonSequence.jsx',
    'PulseIndicator': 'src/components/ui/PulseIndicator.jsx',
    'Stalactites': 'src/components/ui/Stalactites.jsx',
}

for comp_name, comp_file in components_map.items():
    nodes.append({
        'id': comp_name.lower(),
        'label': comp_name,
        'file_type': 'code',
        'source_file': comp_file,
        'source_location': None
    })

# Add data module nodes
data_modules = {
    'experience': 'src/data/experience.js',
    'projects': 'src/data/projects.js',
    'skills': 'src/data/skills.js',
}

for mod_name, mod_file in data_modules.items():
    nodes.append({
        'id': 'data_' + mod_name,
        'label': mod_name.capitalize() + ' Data',
        'file_type': 'code',
        'source_file': mod_file,
        'source_location': None
    })

# Add hook nodes
nodes.append({
    'id': 'scroll_animation_hook',
    'label': 'useScrollAnimation',
    'file_type': 'code',
    'source_file': 'src/hooks/useScrollAnimation.js',
    'source_location': None
})

# Add config nodes
nodes.extend([
    {
        'id': 'vite_config',
        'label': 'Vite Config',
        'file_type': 'code',
        'source_file': 'vite.config.js',
        'source_location': None
    },
    {
        'id': 'eslint_config',
        'label': 'ESLint Config',
        'file_type': 'code',
        'source_file': 'eslint.config.js',
        'source_location': None
    },
    {
        'id': 'main_entry',
        'label': 'Main Entry',
        'file_type': 'code',
        'source_file': 'src/main.jsx',
        'source_location': None
    }
])

# Add edges for component relationships
edges.extend([
    {'source': 'app', 'target': 'header', 'relation': 'renders', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    {'source': 'app', 'target': 'hero', 'relation': 'renders', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    {'source': 'app', 'target': 'about', 'relation': 'renders', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    {'source': 'app', 'target': 'skills', 'relation': 'renders', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    {'source': 'app', 'target': 'experience', 'relation': 'renders', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    {'source': 'app', 'target': 'projects', 'relation': 'renders', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    {'source': 'app', 'target': 'contact', 'relation': 'renders', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    {'source': 'app', 'target': 'footer', 'relation': 'renders', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    
    # Hero uses cave background and dragon sequence
    {'source': 'hero', 'target': 'cavebackground', 'relation': 'uses', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    {'source': 'hero', 'target': 'dragonsequence', 'relation': 'uses', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    
    # Data dependencies
    {'source': 'experience', 'target': 'data_experience', 'relation': 'imports', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    {'source': 'projects', 'target': 'data_projects', 'relation': 'imports', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    {'source': 'skills', 'target': 'data_skills', 'relation': 'imports', 'confidence': 'EXTRACTED', 'confidence_score': 1.0},
    
    # Hook usage
    {'source': 'hero', 'target': 'scroll_animation_hook', 'relation': 'uses', 'confidence': 'INFERRED', 'confidence_score': 0.7},
    {'source': 'about', 'target': 'scroll_animation_hook', 'relation': 'uses', 'confidence': 'INFERRED', 'confidence_score': 0.7},
    {'source': 'skills', 'target': 'scroll_animation_hook', 'relation': 'uses', 'confidence': 'INFERRED', 'confidence_score': 0.7},
    {'source': 'experience', 'target': 'scroll_animation_hook', 'relation': 'uses', 'confidence': 'INFERRED', 'confidence_score': 0.7},
    {'source': 'projects', 'target': 'scroll_animation_hook', 'relation': 'uses', 'confidence': 'INFERRED', 'confidence_score': 0.7},
    {'source': 'contact', 'target': 'scroll_animation_hook', 'relation': 'uses', 'confidence': 'INFERRED', 'confidence_score': 0.7},
    
    # Pulse indicator used in UI
    {'source': 'pulseindicator', 'target': 'hero', 'relation': 'used_by', 'confidence': 'INFERRED', 'confidence_score': 0.6},
    
    # Stalactites visual
    {'source': 'stalactites', 'target': 'cavebackground', 'relation': 'complements', 'confidence': 'INFERRED', 'confidence_score': 0.6},
])

result = {
    'nodes': nodes,
    'edges': edges,
    'hyperedges': [],
    'input_tokens': 0,
    'output_tokens': 0
}

Path('graphify-out/.graphify_extract.json').write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8')
print('Extraction complete: {} nodes, {} edges'.format(len(nodes), len(edges)))
