# Heart of the Valley Roadmap

Last updated: 2026-02-16

## What Exists Today
- Core gameplay loop: time progression, movement, interaction actions, random events, and saves (manual + autosave).
- Character progression systems: affection/lust/mood/love/dominance, flags, and event-history-based progression.
- Character story events are currently implemented for Iris, Yumi, Gwen, and Ruby.
- Dawn is present as a character in schedules/dialogues but does not yet have dedicated story event chains.

## Story Chapter Status

| Character | Chapter 1 | Chapter 2 | Chapter 3 | Chapter 4 | Chapter 5 |
| --- | --- | --- | --- | --- | --- |
| Iris | Implemented | Implemented | Planned | Planned | Planned |
| Yumi | Implemented | Implemented | Planned | Planned | Planned |
| Gwen | Implemented | Not implemented yet | Planned | Planned | Planned |
| Ruby | Implemented | Not implemented yet | Planned | Planned | Planned |
| Dawn | Not implemented yet | Not implemented yet | Planned | Planned | Planned |

## Interaction Dialogue Status (Chat / Flirt / Kiss)

| Character | Chapter 1 | Chapter 2 | Chapter 3 | Chapter 4 | Chapter 5 |
| --- | --- | --- | --- | --- | --- |
| Iris | Implemented | Implemented | Implemented | Implemented | Implemented |
| Dawn | Implemented | Implemented | Implemented | Implemented | Implemented |
| Gwen | Implemented | Implemented | Implemented | Implemented | Implemented |
| Ruby | Implemented | Implemented | Implemented | Implemented | Implemented |
| Yumi | Implemented | Implemented | Implemented | Implemented | Implemented |

## Interaction Routing Rules
- Chat and Flirt are always available (subject to existing stat/mood checks in interaction code).
- Kiss unlocks after progression flags per character.
- Iris/Gwen/Ruby/Yumi: kiss unlocks after Chapter 1 completion.
- Dawn: kiss unlocks after `hasMetDawn`.
- Interaction text now resolves by chapter using progression flags/history with fallbacks to earlier chapters when needed.

## Next Priority Work
1. Implement Dawn Chapter 1 story event chain and chapter-complete flag.
2. Implement Gwen Chapter 2 event chain.
3. Implement Ruby Chapter 2 event chain.
4. Add explicit Chapter 3-5 flags/events for each character so interaction chapter routing can advance beyond current implemented story content.
