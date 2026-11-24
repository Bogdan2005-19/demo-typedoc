# Demo de TypeDoc

Pequeña librería de ejemplo para explorar la documentación generada con TypeDoc.

Incluye modelos, una clase abstracta y un hub de sensores con sobrecargas,
métodos obsoletos y documentación TSDoc.

```bash
npx typedoc --entryPoints src/index.ts --out docs
npx tsc --noEmit
```
