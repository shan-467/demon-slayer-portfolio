<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Story architecture
- Compose the story in chapter order on the index route using focused chapter components; the navigation targets section IDs from the chapter manifest.
- Lazy-load the R3F castle behind ClientOnly and a scene error boundary, preserving the painted fallback; this isolates browser rendering failures from the story.
- Use instanced, procedurally generated architecture for the fictional shifting castle and CSS palette tokens for its materials; this keeps the impossible scene distinctive and inexpensive to render.
