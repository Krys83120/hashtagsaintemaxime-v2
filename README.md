# #SAINTEMAXIME Lifestyle V2 - Boutique Officielle

> **Next.js 14 | TypeScript | Prisma | PostgreSQL | Printful API | Stripe | Tailwind CSS | Framer Motion**

## 🎨 Charte Graphique #SAINTEMAXIME Lifestyle

### Logo
- **#** : Blanc avec contour noir (stroke), même taille que le texte
- **SAINTE MAXIME** : Bleu turquoise `#00D4FF`, police Montserrat Black, uppercase
- **Lifestyle** : Script Dancing Script, noir `#1A1A1A`
- **❤** : Rouge `#E63946`, cœur plein
- **®** : Petit, en haut à droite

### Couleurs
| Couleur | Hex | Usage |
|---------|-----|-------|
| Turquoise | `#00D4FF` | Primary, liens, CTA, accents |
| Turquoise Dark | `#00B8E0` | Hover states |
| Turquoise Light | `#4DE3FF` | Gradients, accents légers |
| Rouge | `#E63946` | Cœur, badges promo, alertes |
| Rouge Dark | `#C62828` | Hover rouge |
| Noir | `#1A1A1A` | Texte principal, contour # |
| Blanc | `#FFFFFF` | # du logo, fonds |
| Crème | `#F8F6F0` | Fond principal |
| Sable | `#D4A574` | Accents secondaires |

### Polices
- **Montserrat** (Black/700) : Titres, navigation, boutons
- **Inter** (400/600) : Corps de texte
- **Dancing Script** : "Lifestyle", accents script

---

## 🚀 Déploiement Rapide

### 1. Configuration

```bash
# Cloner le repo
git clone https://github.com/Krys83120/hashtagsaintemaxime-v2.git
cd hashtagsaintemaxime-v2

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos credentials

# Initialiser la base de données
npx prisma db push
npx prisma generate

# Lancer le serveur de développement
npm run dev
```

### 2. Variables d'Environnement (.env)

```env
# Database (Neon, Supabase, ou locale)
DATABASE_URL="postgresql://user:password@host:5432/hashtagsaintemaxime?schema=public"

# Auth
NEXTAUTH_URL="https://hashtagsaintemaxime.fr"
NEXTAUTH_SECRET="votre-secret-tres-securise-min-32-caracteres"

# Printful API
PRINTFUL_API_KEY="votre-cle-api-printful"
PRINTFUL_STORE_ID="votre-store-id"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Admin initial
ADMIN_EMAIL="votre-email@domaine.com"
ADMIN_PASSWORD="mot-de-passe-admin"

# SEO
SITE_URL="https://hashtagsaintemaxime.fr"
```

### 3. Déploiement Vercel

```bash
# Connecter à Vercel
vercel login

# Déployer
vercel --prod
```

**Configuration Vercel requise :**
- Build Command: `prisma generate && next build`
- Output Directory: `.next`
- Environment Variables: copier depuis .env

---

## 📁 Architecture

```
hashtagsaintemaxime-v2/
├── public/
│   └── images/
│       ├── #saintemaxime.jpg          # Photo monument #SAINTEMAXIME
│       ├── Logo-saintemaxime.png       # Logo officiel charte graphique
│       ├── 98rq09d97v.png            # Logo alternatif
│       └── pochette pc.jpg           # Mockup produit
├── src/
│   ├── app/
│   │   ├── (site)/                   # Frontend public
│   │   │   ├── page.tsx              # Homepage avec photo monument
│   │   │   ├── boutique/             # Catalogue produits
│   │   │   ├── produit/[slug]/       # Fiche produit
│   │   │   ├── panier/               # Panier
│   │   │   ├── a-propos/             # Notre histoire + logo
│   │   │   └── contact/              # Contact
│   │   ├── admin/                    # Dashboard admin
│   │   │   ├── dashboard/            # Vue d'ensemble
│   │   │   ├── produits/             # Gestion catalogue
│   │   │   ├── commandes/            # Gestion commandes
│   │   │   └── utilisateurs/         # Gestion utilisateurs
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/                 # Login/Register
│   │   │   ├── products/             # CRUD produits
│   │   │   ├── orders/               # CRUD commandes
│   │   │   └── printful/             # Sync & Webhooks
│   │   ├── login/                    # Page connexion
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── site/                     # Composants publics
│   │   │   ├── Navbar.tsx            # Logo officiel intégré
│   │   │   ├── Hero.tsx              # Photo monument #saintemaxime.jpg
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── CartProvider.tsx
│   │   │   └── ...
│   │   └── admin/                    # Composants admin
│   │       ├── AdminSidebar.tsx      # Logo officiel
│   │       ├── DashboardStats.tsx
│   │       ├── SalesChart.tsx
│   │       ├── ProductsTable.tsx
│   │       ├── OrdersTable.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── prisma.ts                 # Client Prisma
│   │   ├── auth.ts                   # JWT + bcrypt
│   │   └── printful.ts               # API Printful v2
│   ├── types/
│   │   └── index.ts                  # Types TypeScript
│   └── styles/
│       └── globals.css               # Tailwind + charte graphique
├── prisma/
│   └── schema.prisma                 # Modèle de données
└── package.json
```

---

## 🎨 Design System

### Tokens Tailwind
```
sm-turquoise:     #00D4FF  (primary)
sm-turquoiseDark:  #00B8E0  (hover)
sm-turquoiseLight: #4DE3FF  (gradients)
sm-red:            #E63946  (cœur, promo)
sm-redDark:        #C62828  (hover rouge)
sm-white:          #FFFFFF  (# logo)
sm-black:          #1A1A1A  (texte, contour)
sm-cream:          #F8F6F0  (fond)
sm-sand:           #D4A574  (accents)
```

### Logo Intégration
Le logo officiel `Logo-saintemaxime.png` est utilisé dans :
- **Navbar** : Desktop + Mobile menu
- **Hero** : Centré sur la homepage
- **Footer** : Inversé (blanc sur fond noir)
- **A Propos** : Grande version centrée
- **Login** : Page connexion admin
- **Admin Sidebar** : Version compacte

### Photo Monument
La photo `#saintemaxime.jpg` (monument turquoise sur la plage) est utilisée en :
- **Hero background** : Full-screen avec overlay gradient
- **A Propos** : Section histoire

---

## 🔐 Sécurité

- **JWT** avec `jose` pour l'authentification admin
- **bcryptjs** pour le hashage des mots de passe
- **Middleware** pour la protection des routes admin
- **RBAC** : 4 rôles (USER, EDITOR, MANAGER, ADMIN)
- **CSRF** protection via SameSite cookies
- **Rate limiting** recommandé en production

---

## 📦 Intégration Printful

### Synchronisation
```bash
POST /api/printful/sync
```
- Importe automatiquement les produits du catalogue Printful
- Crée les entrées dans la base de données
- Met à jour les stocks

### Webhooks
Configurez l'URL webhook dans Printful :
```
https://hashtagsaintemaxime.fr/api/printful/webhook
```

Événements gérés :
- `order_created` / `order_updated`
- `package_shipped` → tracking number
- `package_delivered`
- `order_failed`
- `stock_updated`

---

## 🌐 SEO

### Meta tags auto-générés
- Title, Description, Keywords par page
- OpenGraph (Facebook, LinkedIn)
- Twitter Cards
- Schema.org JSON-LD
- Canonical URLs
- Sitemap XML auto-généré

### Structure H1/H2
- **H1** : Titre principal de chaque page
- **H2** : Sections, catégories, collections
- **H3** : Sous-sections produits

---

## 📊 Dashboard Admin

### KPIs en temps réel
- CA aujourd'hui / total
- Commandes aujourd'hui / total
- Produits actifs
- Utilisateurs
- Stock faible (alertes)
- Commandes en attente

### Graphiques
- Évolution des ventes (7 derniers jours)
- Top produits avec barres de progression
- Pipeline de commandes visuel

### Gestion
- **Produits** : CRUD complet, filtres avancés, pagination
- **Commandes** : Pipeline visuel, statuts, tracking
- **Utilisateurs** : Rôles, permissions, historique
- **Printful** : Sync manuelle, statut connexion

---

## 🚀 Idées Virales Intégrées

1. **#SAINTEMAXIME Challenge** - Concours Instagram mensuel
2. **Pack Lifestyle** - Box cadeau coordonnée
3. **Drop Coucher de Soleil** - Collections limitées avec compte à rebours
4. **Serviette Connectée** - QR code → contenu exclusif
5. **Collab Serveurs de Plage** - Ambassadeurs locaux
6. **Mur UGC Live** - Photos clients en direct

---

## 📝 Scripts Utiles

```bash
# Reset DB et seed
npx prisma db push --force-reset
npm run db:seed

# Studio Prisma
npm run db:studio

# Build production
npm run build

# Lint
npm run lint
```

---

## 🆘 Support

- Email : contact@hashtagsaintemaxime.fr
- Issues GitHub : [github.com/Krys83120/hashtagsaintemaxime-v2/issues](https://github.com/Krys83120/hashtagsaintemaxime-v2/issues)

---

**© 2026 #SAINTEMAXIME Lifestyle** - Marque déposée depuis 2019. Tous droits réservés.
