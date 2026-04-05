# 📊 Meeting Sentiment Analysis Module

A comprehensive solution for analyzing Teams meeting transcripts and performing detailed sentiment analysis. This module integrates with Copilot Studio for automated meeting analysis and provides both web-based and API interfaces.

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Core Capabilities
- ✅ **Sentiment Analysis**: Positive, Neutral, Negative sentiment classification
- ✅ **Detailed Scores**: Percentage breakdown of sentiment distribution
- ✅ **Key Insights**: Automatic extraction of important conversation points
- ✅ **Emotional Tones**: Detection of emotional patterns (enthusiasm, frustration, etc.)
- ✅ **Team Metrics**: Engagement level, decision satisfaction, conflict assessment
- ✅ **Recommendations**: Actionable insights based on analysis
- ✅ **Participant Insights**: Individual contribution analysis (when names provided)
- ✅ **History Tracking**: Stores all analyses locally for comparison

### Advanced Features
- 🤖 **Claude API Integration**: Advanced NLP for deeper analysis
- 🔄 **Fallback Analysis**: Keyword-based analysis when API unavailable
- 📱 **Mobile-Friendly UI**: Responsive design for phones and tablets
- 💾 **Local Storage**: Saves analysis history in browser
- 🔗 **Teams Integration**: Via Copilot Studio
- 📊 **Visualization**: Charts and progress bars for sentiment scores

---

## 🚀 Quick Start

### Option 1: Web Interface (Fastest)

1. **Open the sentiment analysis page**:
   ```
   meeting-sentiment-analysis.html
   ```

2. **Fill in the form**:
   - Meeting Title: "Q4 Planning Session"
   - Participants: "John Doe, Jane Smith"
   - Transcript: Paste your Teams meeting transcript
   - Analysis Focus (optional): "Team morale"

3. **Click "Analyze Sentiment"**

4. **View results**:
   - Overall sentiment (POSITIVE/NEUTRAL/NEGATIVE)
   - Sentiment score breakdown (%)
   - Key insights
   - Recommendations

### Option 2: Via Copilot Studio

1. **Deploy the Google Apps Script** (see Installation)
2. **Set up Copilot Studio** (see COPILOT_STUDIO_SETUP.md)
3. **Add bot to Teams meeting**
4. **Copilot automatically**:
   - Joins meeting
   - Captures transcript
   - Performs analysis
   - Posts results to Teams

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface Layer                      │
├─────────────────────────────────────────────────────────────┤
│  meeting-sentiment-analysis.html (Web UI)                   │
│  - Capture meeting data                                      │
│  - Display results                                           │
│  - Manage history                                            │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐     ┌─────▼──────┐   ┌───▼──────┐
   │ Copilot │     │  Teams Bot │   │   Web    │
   │ Studio  │     │            │   │Interface │
   └────┬────┘     └─────┬──────┘   └───┬──────┘
        │                │              │
        └────────────────┼──────────────┘
                         │
        ┌────────────────▼────────────────┐
        │    API Layer (Google Apps Script)│
        │  MeetingSentimentAnalysis.gs    │
        ├─────────────────────────────────┤
        │ - Request Handler                │
        │ - Validation                     │
        │ - Orchestration                  │
        └────────────────┬────────────────┘
                         │
        ┌────────────────┼──────────────────┐
        │                │                  │
   ┌────▼──────┐    ┌────▼────┐    ┌──────▼──┐
   │   Claude  │    │ Fallback │    │Response │
   │   API     │    │ Analysis │    │Formatter│
   └────┬──────┘    └────┬─────┘    └──────┬──┘
        │                │                  │
        └────────────────┼──────────────────┘
                         │
        ┌────────────────▼────────────────┐
        │   Sentiment Analysis Output     │
        │  - Overall Sentiment             │
        │  - Sentiment Scores              │
        │  - Summary & Insights            │
        │  - Recommendations               │
        │  - Emotional Tones               │
        │  - Team Metrics                  │
        └─────────────────────────────────┘
```

---

## 📦 Installation

### Step 1: Deploy Google Apps Script

1. Open your Google Sheet (or create a new one)
2. Go to **Extensions → Apps Script**
3. Delete default code
4. Copy entire contents of `MeetingSentimentAnalysis.gs`
5. Paste into Apps Script editor
6. Click **Save** (Ctrl+S)

### Step 2: Configure API Keys

#### Option A: Use Claude API (Recommended)
1. Get API key from [Anthropic Console](https://console.anthropic.com)
2. In `MeetingSentimentAnalysis.gs`, find line with `CLAUDE_API_KEY`:
   ```javascript
   CONFIG.CLAUDE_API_KEY = 'sk-ant-YOUR_API_KEY_HERE';
   ```
3. Save the script

#### Option B: Use Fallback Analysis (No API Key)
- Leave `CLAUDE_API_KEY` as-is or set to empty string
- System will use keyword-based analysis automatically

### Step 3: Deploy as Web App

1. In Apps Script, click **Deploy** → **New Deployment**
2. Type: **Web App**
3. Execute as: **Your Google Account**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the URL (format: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 4: Update Configuration

In `meeting-sentiment-analysis.html`, update line 112:
```javascript
const ANALYSIS_API = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

### Step 5: Host the HTML File

#### Option A: GitHub Pages
```bash
# 1. Push to GitHub repo with Pages enabled
# 2. Access at: https://yourname.github.io/Phonebook/meeting-sentiment-analysis.html
```

#### Option B: Firebase Hosting
```bash
firebase init hosting
# Copy meeting-sentiment-analysis.html to public/
firebase deploy
```

#### Option C: Local Testing
```bash
# Open directly in browser
file:///path/to/meeting-sentiment-analysis.html
```

---

## 💻 Usage

### Basic Usage: Web Interface

1. **Fill Meeting Details**:
   ```
   Title: "Quarterly Business Review"
   Participants: "Sarah, Mike, Emily"
   Transcript: [paste transcript]
   ```

2. **Click Analyze**

3. **Review Results**:
   - Sentiment breakdown
   - Key insights
   - Recommendations
   - Emotional tones

4. **History Tab**:
   - View past analyses
   - Click to view details
   - Data stored locally in browser

### Advanced Usage: API Integration

#### Direct HTTP Request

```bash
curl -X POST \
  'https://script.google.com/macros/s/ABC123/exec' \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "analyzeSentiment",
    "meetingTitle": "Team Standup",
    "participants": "John, Jane, Bob",
    "transcript": "John: Good morning. Jane: Hi John. Bob: Present.",
    "analysisFocus": "Team morale"
  }'
```

#### Response Format

```json
{
  "success": true,
  "analysis": {
    "overallSentiment": "POSITIVE",
    "sentimentScores": {
      "positive": 0.72,
      "neutral": 0.18,
      "negative": 0.10
    },
    "summary": "The meeting had an overall positive tone...",
    "keyInsights": "- Team is engaged\n- Clear action items...",
    "emotionalTones": "Enthusiastic, Collaborative",
    "recommendations": "Maintain this momentum...",
    "engagementLevel": "HIGH",
    "decisionSatisfaction": "High",
    "conflictLevel": "NONE",
    "teamMorale": "EXCELLENT",
    "participantInsights": "Optional insights about individuals"
  }
}
```

---

## 🔌 API Reference

### Endpoint
```
POST https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec
```

### Request Payload

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| action | string | Yes | Must be `"analyzeSentiment"` |
| meetingTitle | string | Yes | Title of the meeting |
| participants | string | No | Comma-separated list of participant names |
| transcript | string | Yes | Meeting transcript (min 10 characters) |
| analysisFocus | string | No | Specific aspect to focus on (e.g., "Team morale") |

### Response Format

#### Success Response
```json
{
  "success": true,
  "analysis": { /* analysis object */ }
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Error message describing the issue"
}
```

### Analysis Object Fields

| Field | Type | Description |
|-------|------|-------------|
| overallSentiment | string | One of: POSITIVE, NEUTRAL, NEGATIVE |
| sentimentScores | object | Contains positive, neutral, negative (0-1) |
| summary | string | 2-3 sentence summary of sentiment |
| keyInsights | string | Bullet-point insights about the meeting |
| emotionalTones | string | Detected emotional patterns |
| recommendations | string | Actionable next steps |
| engagementLevel | string | HIGH, MEDIUM, or LOW |
| decisionSatisfaction | string | Assessment of team satisfaction with decisions |
| conflictLevel | string | NONE, LOW, MEDIUM, or HIGH |
| teamMorale | string | EXCELLENT, GOOD, FAIR, or POOR |
| participantInsights | string | Optional analysis of individual contributions |

---

## ⚙️ Configuration

### Environment Variables

Set in `MeetingSentimentAnalysis.gs`:

```javascript
CONFIG = {
  CLAUDE_API_KEY: 'sk-ant-YOUR_KEY',     // Anthropic API key
  CLAUDE_API_URL: 'https://api.anthropic.com/v1/messages',
  MODEL: 'claude-3-5-sonnet-20241022'    // Claude model version
}
```

### UI Configuration

In `meeting-sentiment-analysis.html`:

```javascript
// API endpoint URL
const ANALYSIS_API = 'https://script.google.com/macros/s/YOUR_ID/exec';

// Storage key for history
const HISTORY_KEY = 'meetingSentimentHistory';

// Max history items to keep
const MAX_HISTORY = 100;
```

### Sentiment Thresholds (Fallback Mode)

In `MeetingSentimentAnalysis.gs`:

```javascript
var POSITIVE_THRESHOLD = 0.4;  // > 40% = POSITIVE
var NEGATIVE_THRESHOLD = 0.3;  // > 30% = NEGATIVE
```

---

## 📝 Examples

### Example 1: Positive Meeting

**Input**:
```
Title: "Product Launch Success"
Transcript: "John: Excellent work everyone! Sarah: Amazing results, great job. 
Mike: Perfect execution. Emily: Fantastic team effort. All celebrating success."
```

**Output**:
```
{
  "overallSentiment": "POSITIVE",
  "sentimentScores": { "positive": 0.95, "neutral": 0.05, "negative": 0.0 },
  "teamMorale": "EXCELLENT",
  "recommendations": "Maintain momentum and document best practices."
}
```

### Example 2: Mixed Sentiment Meeting

**Input**:
```
Title: "Project Timeline Review"
Transcript: "John: Great progress so far. Sarah: But we have some concerns about 
the timeline. Mike: The budget is tight but manageable. Emily: I'm confident we 
can adjust and succeed."
```

**Output**:
```
{
  "overallSentiment": "NEUTRAL",
  "sentimentScores": { "positive": 0.45, "neutral": 0.35, "negative": 0.20 },
  "keyInsights": "- Progress is positive\n- Timeline concerns need addressing\n- Overall confidence remains",
  "teamMorale": "GOOD",
  "recommendations": "Schedule timeline review meeting to address concerns."
}
```

### Example 3: Negative Meeting

**Input**:
```
Title: "Q3 Performance Review"
Transcript: "John: Results are disappointing. Sarah: I'm frustrated with the 
missed targets. Mike: This is concerning. Emily: We need major changes."
```

**Output**:
```
{
  "overallSentiment": "NEGATIVE",
  "sentimentScores": { "positive": 0.05, "neutral": 0.15, "negative": 0.80 },
  "conflictLevel": "MEDIUM",
  "teamMorale": "POOR",
  "recommendations": "Schedule leadership 1-on-1s and create improvement plan."
}
```

---

## 🔧 Troubleshooting

### "Cannot read property 'CLAUDE_API_KEY' of undefined"

**Cause**: CONFIG object not defined in Google Apps Script

**Solution**:
1. Open `MeetingSentimentAnalysis.gs`
2. Ensure CONFIG is defined at top of file
3. Save and re-deploy

### "Transcript too short"

**Cause**: Transcript less than 10 characters

**Solution**:
- Provide a longer meeting transcript
- Include full conversation with speaker names

### "Invalid API response"

**Cause**: Claude API key invalid or request malformed

**Solution**:
1. Verify API key in CONFIG
2. Check Claude API status: https://status.anthropic.com
3. Ensure transcript is valid text (not corrupted)

### "Analysis takes too long"

**Cause**: API latency, large transcript, or network issues

**Solution**:
- Try again (temporary network glitch)
- Reduce transcript size (break into parts)
- Check internet connection
- Consider using fallback mode (no API)

### "No API key configured"

**Cause**: CONFIG.CLAUDE_API_KEY not set

**Solution**:
- System will use fallback keyword-based analysis
- Get API key from https://console.anthropic.com (free account)
- Set in Google Apps Script CONFIG

### "Meeting sentiment analysis not responding"

**Cause**: Google Apps Script deployment URL incorrect or expired

**Solution**:
1. Check URL in meeting-sentiment-analysis.html
2. Deploy new version in Google Apps Script
3. Update URL to new deployment ID
4. Test with curl command

### Local Storage Not Working

**Cause**: Browser privacy settings blocking localStorage

**Solution**:
1. Allow cookies in browser settings
2. Try in different browser
3. Use incognito mode (may not persist data)

---

## 📊 Data Privacy & Security

### Data Handling
- ✅ All analysis data can be stored locally in browser (localStorage)
- ✅ Transcripts are sent to Claude API only if API key configured
- ✅ No data stored on our servers by default
- ✅ Optional: Set up database to store historical analysis

### Security Best Practices
1. **Never share Claude API key** in code
2. **Use environment variables** for sensitive config
3. **Deploy Google Apps Script** with appropriate access controls
4. **Monitor API usage** to detect unauthorized access
5. **Encrypt sensitive** meeting transcripts at rest

### GDPR & Compliance
- Consider data residency requirements
- Implement data retention policies
- Get consent before analyzing personal conversations
- Provide data export/deletion capabilities

---

## 📈 Advanced Features

### Custom Sentiment Model

Train on your organization's language:

```javascript
// Save historical analyses
function saveAnalysis(meetingId, analysis) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([
    meetingId,
    new Date(),
    analysis.overallSentiment,
    analysis.summary,
    // ... more data
  ]);
}

// Build custom training data
function exportTrainingData() {
  // Export all analyses for ML model training
  // Use with custom Claude model fine-tuning
}
```

### Integration with Tools

Connect with:
- **Slack**: Post sentiment summaries to channels
- **Jira**: Create tickets based on issues identified
- **HubSpot**: Track customer call sentiment
- **Power BI**: Visualize sentiment trends

---

## 📚 Resources

- [Anthropic Claude API Docs](https://docs.anthropic.com/)
- [Google Apps Script Guide](https://developers.google.com/apps-script)
- [Microsoft Teams APIs](https://docs.microsoft.com/en-us/graph/api/resources/teams-api-overview)
- [Copilot Studio Docs](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)

---

## 📝 License

This project is part of the Phonebook Contact Directory application.

---

## 🤝 Contributing

Found a bug or have a feature request? [Open an issue on GitHub](https://github.com/sameerar1305-spec/phonebook/issues)

---

**Version**: 1.0.0  
**Last Updated**: January 15, 2024  
**Maintainer**: Development Team
