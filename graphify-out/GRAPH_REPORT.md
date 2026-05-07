# Graph Report - .  (2026-05-07)

## Corpus Check
- Large corpus: 227 files · ~450,501 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 20 nodes · 21 edges · 7 communities (3 shown, 4 thin omitted)
- Extraction: 62% EXTRACTED · 38% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.67)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Main Navigation & Layout|Main Navigation & Layout]]
- [[_COMMUNITY_Hero Visual Effects|Hero Visual Effects]]
- [[_COMMUNITY_Content Sections & Animations|Content Sections & Animations]]
- [[_COMMUNITY_Portfolio Data|Portfolio Data]]
- [[_COMMUNITY_Build Configuration|Build Configuration]]
- [[_COMMUNITY_Code Quality|Code Quality]]
- [[_COMMUNITY_Application Entry|Application Entry]]

## God Nodes (most connected - your core abstractions)
1. `App` - 8 edges
2. `useScrollAnimation` - 6 edges
3. `Hero` - 5 edges
4. `Skills` - 3 edges
5. `Experience` - 3 edges
6. `Projects` - 3 edges
7. `About` - 2 edges
8. `Contact` - 2 edges
9. `CaveBackground` - 2 edges
10. `Header` - 1 edges

## Surprising Connections (you probably didn't know these)
- `App` --renders--> `About`  [EXTRACTED]
  src/App.jsx → src/components/sections/About.jsx
- `App` --renders--> `Contact`  [EXTRACTED]
  src/App.jsx → src/components/sections/Contact.jsx
- `Hero` --uses--> `useScrollAnimation`  [INFERRED]
  src/components/sections/Hero.jsx → src/hooks/useScrollAnimation.js
- `PulseIndicator` --used_by--> `Hero`  [INFERRED]
  src/components/ui/PulseIndicator.jsx → src/components/sections/Hero.jsx
- `About` --uses--> `useScrollAnimation`  [INFERRED]
  src/components/sections/About.jsx → src/hooks/useScrollAnimation.js

## Communities (7 total, 4 thin omitted)

### Community 0 - "Main Navigation & Layout"
Cohesion: 0.4
Nodes (5): App, Experience Data, Experience, Footer, Header

### Community 1 - "Hero Visual Effects"
Cohesion: 0.4
Nodes (5): CaveBackground, DragonSequence, Hero, PulseIndicator, Stalactites

### Community 2 - "Content Sections & Animations"
Cohesion: 0.4
Nodes (5): About, Contact, Skills Data, useScrollAnimation, Skills

## Knowledge Gaps
- **11 isolated node(s):** `Header`, `Footer`, `DragonSequence`, `PulseIndicator`, `Stalactites` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `App` connect `Main Navigation & Layout` to `Hero Visual Effects`, `Content Sections & Animations`, `Portfolio Data`?**
  _High betweenness centrality (0.360) - this node is a cross-community bridge._
- **Why does `Hero` connect `Hero Visual Effects` to `Main Navigation & Layout`, `Content Sections & Animations`?**
  _High betweenness centrality (0.313) - this node is a cross-community bridge._
- **Why does `useScrollAnimation` connect `Content Sections & Animations` to `Main Navigation & Layout`, `Hero Visual Effects`, `Portfolio Data`?**
  _High betweenness centrality (0.190) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `useScrollAnimation` (e.g. with `Hero` and `About`) actually correct?**
  _`useScrollAnimation` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Hero` (e.g. with `useScrollAnimation` and `PulseIndicator`) actually correct?**
  _`Hero` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Header`, `Footer`, `DragonSequence` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._