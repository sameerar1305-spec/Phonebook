# 📱 Contact Directory App — Build Instructions

## OVERVIEW
This app has 2 parts:
1. **Google Apps Script** — serves your Sheet data as a JSON API
2. **HTML App** — mobile UI that fetches & displays contacts
3. **APK Conversion** — wrapping the HTML app into an Android APK

---

## STEP 1: Setup Google Apps Script (Backend)

1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete any existing code, paste the contents of `GoogleAppsScript_Code.gs`
4. Click **Save** (💾)
5. Click **Deploy → New Deployment**
6. Choose type: **Web App**
7. Settings:
   - **Description**: Contact Directory API
   - **Execute as**: Me (your Google account)
   - **Who has access**: Anyone
8. Click **Deploy** → Authorize the app when prompted
9. **Copy the Web App URL** — looks like:
   `https://script.google.com/macros/s/AKfy.../exec`

> ⚠️ Your sheet columns MUST be in this order (Row 1):
> `Name | Phone | Email | Profession | Address`

---

## STEP 2: Test the App in Browser

1. Open `index.html` in Chrome on your phone or desktop
2. Paste the Apps Script URL from Step 1
3. Tap **Connect & Load Contacts**
4. Verify contacts load correctly

---

## STEP 3: Convert to APK (3 Methods)

### METHOD A — Capacitor (Recommended, Free)

**Prerequisites:** Node.js 18+, Android Studio

```bash
# 1. Create a new Capacitor project
npm create @capacitor/app
# Choose: com.yourname.contactdir | Contact Directory

# 2. Copy app files
cp index.html manifest.json <your-project>/src/

# 3. Install dependencies
cd <your-project>
npm install @capacitor/core @capacitor/android

# 4. Initialize and add Android
npx cap init "Contact Directory" "com.yourname.contactdir"
npx cap add android

# 5. Copy web assets to native
npx cap copy android

# 6. Open in Android Studio
npx cap open android

# 7. In Android Studio:
#    Build → Generate Signed Bundle/APK → APK
#    Follow wizard to create keystore & sign APK
```

**Output:** `app/build/outputs/apk/release/app-release.apk`

---

### METHOD B — PWABuilder (Easiest, No Coding)

1. Host the app files online (options below)
2. Go to **https://www.pwabuilder.com**
3. Enter your hosted URL
4. Click **Package for Stores → Android → APK**
5. Download the APK

**Free hosting options:**
- GitHub Pages (free): Push files to a GitHub repo, enable Pages
- Netlify (free): Drag & drop the folder at netlify.app
- Firebase Hosting (free): `firebase deploy`

---

### METHOD C — WebIntoApp / AppsGeyser (No Code, Online)

1. Go to **https://appsgeyser.com** or **https://webintoapp.com**
2. Choose "Website to App"
3. Enter your hosted URL
4. Customize app name & icon
5. Download APK directly

---

## STEP 4: Install APK on Android

1. Transfer APK to your Android phone
2. Go to **Settings → Security → Install Unknown Apps** → Allow
3. Tap the APK file to install

---

## FEATURES

| Feature | Status |
|---|---|
| View contacts | ✅ |
| Search by name/phone/email/profession | ✅ |
| Filter by profession | ✅ |
| Tap to call | ✅ |
| Tap to email | ✅ |
| Add/Edit/Delete contacts | ❌ (view-only) |
| Auto-refresh from Google Sheet | ✅ |
| Works offline (last loaded) | ✅ |

---

## TROUBLESHOOTING

**"Failed to fetch contacts"**
- Make sure the Apps Script deployment is set to "Anyone" access
- Re-deploy the script (changes require a new deployment)
- Check the URL ends in `/exec`, not `/dev`

**Contacts show but no phone/email**
- Verify your Sheet column headers match exactly: `Name`, `Phone`, `Email`, `Profession`, `Address`

**APK won't install**
- Enable "Install from Unknown Sources" in Android settings
- Make sure APK was built for Android 5.0+

---

## FILE STRUCTURE
```
ContactDirectory_App/
├── index.html          ← Main app (UI + logic)
├── manifest.json       ← PWA manifest for APK conversion
└── GoogleAppsScript_Code.gs  ← Paste this in Apps Script
```
