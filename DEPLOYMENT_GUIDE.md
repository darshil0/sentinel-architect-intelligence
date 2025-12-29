# 🚀 DEPLOYMENT_GUIDE.md
## Production Deployment: Railway + Vercel Architecture

### 1. Environment Configuration
| Variable | Value | Purpose |
|----------|-------|---------|
| `API_KEY` | `sk-gemini-...` | Principal Model Auth (Gemini 3 Pro) |
| `DATABASE_URL` | `postgres://...` | Persistence for signals & artifacts |
| `VITE_API_URL` | `https://api.your-domain.com` | Frontend -> Backend bridge |

### 2. Backend Node (Railway)
- **Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Integrity**: Ensure the Python environment includes `pydantic>=2.0` and `fastapi>=0.100`.
- **CORS**: Set `allow_origins` to your production Vercel domain exclusively.

### 3. Frontend Node (Vercel)
- **Framework**: Vite + React.
- **Build Command**: `npm run build`.
- **Optimization**: All assets are minified and purged of unused Tailwind classes.

### 4. Continuous Integration
- **Step 1**: Pre-deployment audit (`npm test` + `pytest`).
- **Step 2**: Semantic versioning of Blueprints.
- **Step 3**: Zero-downtime rollover on Railway.

---
*Lead Architect Note: Monitor API Rate Limits (5/min for Gemini 3 Pro Free Tier, 2000/min for Paid).*