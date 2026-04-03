# Android APK Setup — Network Fix Instructions

## THE PROBLEM
APK WebViews block outgoing HTTP/HTTPS requests by default.
You must explicitly grant INTERNET permission and configure network security.

---

## IF USING CAPACITOR (Android Studio)

### 1. AndroidManifest.xml
Add these lines inside `<manifest>` (before `<application>`):

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

Also add inside `<application ...>` tag:
```xml
android:networkSecurityConfig="@xml/network_security_config"
android:usesCleartextTraffic="true"
```

Full example:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:networkSecurityConfig="@xml/network_security_config"
        android:usesCleartextTraffic="true"
        android:allowBackup="true"
        android:label="@string/app_name"
        ... >
```

### 2. Copy network_security_config.xml
Copy `android_network_security_config.xml` (from this zip) to:
`app/src/main/res/xml/network_security_config.xml`
(Create the `xml` folder if it doesn't exist)

### 3. capacitor.config.json — Enable mixed content in WebView
```json
{
  "appId": "com.yourname.contactdir",
  "appName": "Contact Directory",
  "webDir": "www",
  "android": {
    "allowMixedContent": true,
    "webContentsDebuggingEnabled": true
  },
  "server": {
    "androidScheme": "https"
  }
}
```

### 4. MainActivity.java — Enable JavaScript & DOM storage
In `android/app/src/main/java/.../MainActivity.java`, add:
```java
import android.webkit.WebSettings;
import android.webkit.WebView;

// Inside onCreate(), after super.onCreate(savedInstanceState):
WebView.setWebContentsDebuggingEnabled(true);
```

---

## IF USING APPSGEYSER / WEBINTOAPP

These tools wrap your HTML in a WebView.
When setting up the app, look for settings like:
- ✅ Enable JavaScript
- ✅ Allow external URLs / open links in app
- ✅ Internet access / network access
- ✅ Mixed content allowed

---

## IF USING PWAB UILDER

After downloading the APK package:
1. Open `android/app/src/main/AndroidManifest.xml`
2. Add the INTERNET permission and networkSecurityConfig as shown above
3. Rebuild the APK in Android Studio

---

## VERIFY YOUR APPS SCRIPT DEPLOYMENT

Go to Apps Script → Deploy → Manage Deployments
Make sure:
- Type: Web App
- Execute as: Me (your Google account)  ← CRITICAL
- Who has access: Anyone                ← CRITICAL (NOT "Anyone with Google account")
- Status: Active

After ANY code change, you MUST create a NEW deployment — existing deployments cache the old code.
