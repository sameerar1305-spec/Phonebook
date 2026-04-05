# 🤖 Meeting Sentiment Analysis - Copilot Studio Setup Guide

This guide explains how to set up a Copilot agent in Microsoft Copilot Studio to automatically attend Teams meetings, capture transcripts, and perform sentiment analysis.

---

## TABLE OF CONTENTS
1. [Prerequisites](#prerequisites)
2. [Step 1: Create the Copilot Agent](#step-1-create-the-copilot-agent)
3. [Step 2: Configure Teams Integration](#step-2-configure-teams-integration)
4. [Step 3: Create the Analysis Workflow](#step-3-create-the-analysis-workflow)
5. [Step 4: Set Up Meeting Attendance](#step-4-set-up-meeting-attendance)
6. [Step 5: Configure Transcript Processing](#step-5-configure-transcript-processing)
7. [Step 6: Enable Sentiment Analysis](#step-6-enable-sentiment-analysis)
8. [Step 7: Deploy & Test](#step-7-deploy--test)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- ✅ Microsoft 365 account with Teams
- ✅ Copilot Studio access (microsoft.com/en-us/microsoft-copilot/copilot-studio)
- ✅ Azure subscription for API connections
- ✅ Anthropic API key for Claude (optional, for advanced analysis)
- ✅ Power Automate license (included with Microsoft 365)
- ✅ Admin access to create automations

---

## Step 1: Create the Copilot Agent

### 1.1 Access Copilot Studio
1. Go to **[Copilot Studio](https://copilotstudio.microsoft.com)**
2. Sign in with your Microsoft 365 account
3. Click **"Create"** → **"New copilot"**

### 1.2 Configure Basic Settings
- **Name**: "Meeting Sentiment Analyzer"
- **Display name**: "📊 Meeting Sentiment"
- **Description**: "Attends Teams meetings, captures transcripts, and performs sentiment analysis"
- **Language**: English
- **Create in**: Select your organization

### 1.3 Enable Required Features
Go to **Settings** → **Generative AI**:
- ✅ Enable "Generative answers"
- ✅ Enable "Citations"
- ✅ Set Tone: "Professional"

---

## Step 2: Configure Teams Integration

### 2.1 Connect to Microsoft Graph
1. In Copilot Studio, go to **Plugins** → **Connectors**
2. Click **"New connection"**
3. Search for **"Microsoft Teams"**
4. Select **"Microsoft Teams Connector"**
5. Click **"Sign in"** and authorize with your Teams account

### 2.2 Set Meeting Attendance Permissions
1. Go to **Settings** → **Permissions**
2. Grant these scopes:
   - `TeamSettings.Read.All` - Read team settings
   - `OnlineMeeting.Read.All` - Read meeting details
   - `OnlineMeeting.ReadWrite.All` - Join and leave meetings
   - `CallRecords.Read.All` - Read call/meeting records
   - `Chat.Read.All` - Read chat transcripts

### 2.3 Create Teams Connection in Power Automate
1. Open **Power Automate** (make.powerautomate.com)
2. Click **"New flow"** → **"Cloud flow"** → **"Instant"**
3. Name it: "Get Meeting Transcript"
4. Add action: **"Microsoft Teams"** → **"Post message in chat"**
5. Select your Teams channel/chat

---

## Step 3: Create the Analysis Workflow

### 3.1 Create a Power Automate Flow
1. In Copilot Studio, go to **Topics** → **New Topic**
2. Name: "Analyze Meeting Sentiment"
3. Add trigger: **"When called from a copilot"**

### 3.2 Configure Flow Steps
```
Trigger: Copilot receives meeting transcript
↓
Step 1: Parse meeting metadata (title, participants, date)
↓
Step 2: Get meeting transcript from Teams
↓
Step 3: Call sentiment analysis API
↓
Step 4: Generate analysis report
↓
Step 5: Post report to Teams channel
↓
Step 6: Store analysis in database
```

### 3.3 Add Flow Actions
In the flow editor, add these steps:

**Step 1: Compose - Extract Meeting Info**
```
Inputs: transcriptText
Outputs: 
  - meetingTitle
  - participants
  - timestamp
```

**Step 2: HTTP Request - Call Analysis API**
```
Method: POST
URI: [Your Google Apps Script URL]/exec
Headers: Content-Type: application/json
Body:
{
  "action": "analyzeSentiment",
  "meetingTitle": "@{outputs('Extract Meeting Info').meetingTitle}",
  "participants": "@{outputs('Extract Meeting Info').participants}",
  "transcript": "@{triggerBody()['transcript']}",
  "analysisFocus": "@{triggerBody()['focus']}"
}
```

**Step 3: Parse JSON - Process Analysis Response**
```
Content: @body('HTTP Request')
Schema:
{
  "type": "object",
  "properties": {
    "overallSentiment": { "type": "string" },
    "sentimentScores": {
      "type": "object",
      "properties": {
        "positive": { "type": "number" },
        "neutral": { "type": "number" },
        "negative": { "type": "number" }
      }
    },
    "summary": { "type": "string" },
    "recommendations": { "type": "string" }
  }
}
```

---

## Step 4: Set Up Meeting Attendance

### 4.1 Enable Bot Meeting Attendance
1. In Copilot Studio, go to **Channels** → **Teams**
2. Under **"Advanced settings"**, enable:
   - ✅ "Allow bot to join meetings"
   - ✅ "Record meeting transcripts"
   - ✅ "Auto-transcribe meetings"

### 4.2 Create Meeting Join Automation
1. Go to **Power Automate** → **Create new cloud flow** → **Automated**
2. Trigger: **"When a Teams meeting is scheduled"**
3. Add condition: Check if bot should attend (based on keywords/channels)
4. Action: **"Join a Teams meeting"** with the copilot

### 4.3 Configure Meeting Keywords
Create a trigger that activates when:
- Meeting title contains: "sentiment", "analysis", "feedback", "retrospective", "standup", etc.
- Or manually add the bot (@Sentiment Analyzer) to meeting invite

---

## Step 5: Configure Transcript Processing

### 5.1 Set Up Automatic Transcript Capture
1. In Power Automate, create a flow: **"Process Meeting Transcript"**
2. Trigger: **"When a Teams meeting ends"**
3. Add actions:

```
Step 1: Get meeting recording/transcript
  Action: "Get Teams meeting transcript"
  
Step 2: Convert transcript to structured format
  Action: "Compose" - format as JSON with speakers and timestamps
  
Step 3: Clean and normalize text
  Action: "Replace" - remove timestamps, normalize formatting
  
Step 4: Call sentiment analysis
  Action: "Call your analysis HTTP endpoint"
```

### 5.2 Handle Real-Time Transcription
For real-time analysis during meetings:
1. Enable **"Live transcript"** in Teams
2. Set up webhook to receive transcript chunks
3. Process with sliding window analysis (last 5 minutes of conversation)

---

## Step 6: Enable Sentiment Analysis

### 6.1 Connect to Your Analysis Engine

**Option A: Using Claude API (Recommended)**
```
1. Get API key from Anthropic (https://console.anthropic.com)
2. In Google Apps Script, update CONFIG:
   CONFIG.CLAUDE_API_KEY = 'sk-ant-...'
3. Deploy and get the Web App URL
4. In Power Automate, use this URL in HTTP action
```

**Option B: Using Azure Text Analytics**
```
1. Create Azure Cognitive Services account
2. In Power Automate, use "Analyze Sentiment" action
3. Filter by: Language = "en", includeOpinionMining = true
4. Use results to enhance analysis
```

### 6.2 Configure Analysis Parameters
In Copilot Studio, create variables:
```javascript
// Analysis Focus Options
var ANALYSIS_FOCUSES = [
  "Team Morale",
  "Decision Satisfaction",
  "Conflict Resolution",
  "Action Items & Engagement",
  "Communication Effectiveness",
  "Innovation & Creativity"
];

// Sentiment Thresholds
var THRESHOLDS = {
  positive: 0.6,      // > 60% = POSITIVE
  negative: 0.3,      // > 30% = NEGATIVE
  neutral: 0.5        // 50-60% = NEUTRAL
};
```

### 6.3 Create Analysis Output Template
```json
{
  "meetingId": "uuid",
  "timestamp": "2024-01-15T14:30:00Z",
  "title": "Meeting Title",
  "duration": "45 minutes",
  "participants": ["Name1", "Name2"],
  "overallSentiment": "POSITIVE",
  "sentimentScores": {
    "positive": 0.72,
    "neutral": 0.18,
    "negative": 0.10
  },
  "summary": "...",
  "keyInsights": "...",
  "recommendations": "...",
  "emotionalTones": ["Enthusiastic", "Collaborative"],
  "engagementLevel": "HIGH",
  "conflictLevel": "NONE",
  "teamMorale": "EXCELLENT"
}
```

---

## Step 7: Deploy & Test

### 7.1 Deploy Google Apps Script
1. Open **MeetingSentimentAnalysis.gs** in Google Apps Script
2. Set your Claude API key in CONFIG
3. Click **"Deploy"** → **"New Deployment"**
4. Type: **"Web App"**
5. Execute as: Your account
6. Access: **Anyone**
7. Copy the deployment URL

### 7.2 Create Test Topic in Copilot
1. In Copilot Studio, add a new **Topic**:
   - Name: "Test Sentiment Analysis"
   - Trigger phrase: "analyze meeting"
2. Add conversation starters:
   ```
   - "Test sentiment analysis"
   - "Analyze a meeting"
   - "Run sentiment analysis"
   ```
3. Test with sample transcript:
```
Topic: Test Meeting Analysis
Trigger: User says "test sentiment"
Action: 
  - Ask for meeting title
  - Ask for transcript
  - Call analysis API
  - Display results
```

### 7.3 Test the Full Flow
1. **Test 1**: Manual analysis via web interface
   - Open `meeting-sentiment-analysis.html`
   - Enter meeting title and transcript
   - Verify sentiment analysis works

2. **Test 2**: Schedule a Teams meeting
   - Mention the sentiment bot in invite
   - Conduct a short test meeting
   - Verify bot captures transcript and analyzes sentiment

3. **Test 3**: Power Automate flow
   - Trigger meeting end event
   - Verify flow executes all steps
   - Check Teams channel for analysis report

### 7.4 Publish the Copilot
1. Go to **Publish** → **Publish to live**
2. Select channels:
   - ✅ Teams
   - ✅ Web
   - ✅ Mobile
3. Set availability:
   - Specific Teams channels
   - Or all channels
4. Click **"Publish"**

---

## Step 8: Monitor & Manage

### 8.1 View Analytics
1. Go to **Analytics** dashboard
2. Monitor:
   - Total meetings analyzed
   - Average sentiment scores
   - Usage trends
   - User feedback

### 8.2 Set Up Notifications
Create alerts for:
- **Negative sentiment** in meetings → Escalate to manager
- **High conflict levels** → Schedule follow-up
- **Repeated issues** → Trend analysis

---

## Troubleshooting

### Issue: Bot can't join Teams meetings
**Solution**:
- Verify bot has `OnlineMeeting.ReadWrite.All` permission
- Check that meeting allows bot participation in Teams admin settings
- Ensure bot account has Teams license assigned

### Issue: Transcript not captured
**Solution**:
- Verify **"Transcription"** is enabled in Teams meeting settings
- Check that meeting includes the bot in participants
- Review Teams admin settings for transcription policies

### Issue: Sentiment analysis returns errors
**Solution**:
- Verify Claude API key is set correctly
- Check transcript text is > 10 characters
- Review error logs in Power Automate flow

### Issue: Analysis takes too long
**Solution**:
- Enable **"Async processing"** in flow settings
- Process transcripts in batches instead of real-time
- Use fallback keyword-based analysis for immediate results

### Issue: API calls failing
**Solution**:
- Check Google Apps Script deployment status
- Verify URL ends with `/exec`
- Test with curl: `curl -X POST [your-url] -d '{"action":"analyzeSentiment","transcript":"test"}'`
- Review Apps Script logs for errors

---

## Integration Examples

### Example 1: Daily Standup Analysis
```
Trigger: Daily at 10:00 AM
Action 1: Get all standup meetings from calendar
Action 2: For each meeting, get transcript
Action 3: Run sentiment analysis
Action 4: Post summary to #team-sentiment channel
Output: Daily team morale report
```

### Example 2: 1-on-1 Meeting Insights
```
Trigger: 1-on-1 meeting ends
Action 1: Capture transcript
Action 2: Analyze sentiment with focus on "Employee satisfaction"
Action 3: Send report to manager's inbox
Action 4: Track trends over time
Output: Personalized employee engagement report
```

### Example 3: Decision Quality Assessment
```
Trigger: "Decision review" in meeting title
Action 1: Extract meeting transcript
Action 2: Analyze with focus on "Decision satisfaction"
Action 3: Assess team alignment
Action 4: Generate action items
Output: Decision quality scorecard
```

---

## Best Practices

✅ **DO:**
- Run sentiment analysis on important meetings (planning, retrospectives, reviews)
- Monitor trends over time to identify team health issues
- Use insights to improve meeting effectiveness
- Schedule follow-ups based on negative sentiment
- Document action items identified during analysis

❌ **DON'T:**
- Use sentiment analysis as sole basis for performance evaluations
- Share raw sentiment scores without context
- Over-automate - maintain human judgment
- Ignore context - sentiment alone doesn't tell the full story
- Store sensitive personal data without proper controls

---

## Advanced Features

### Custom Metrics
Add custom sentiment metrics:
```javascript
// Leadership effectiveness
// Psychological safety
// Decision consensus
// Action item clarity
// Cross-team collaboration
```

### Machine Learning Integration
```
1. Store all sentiment analyses
2. Train custom ML model on your organization's language patterns
3. Improve accuracy over time
4. Predict meeting outcomes
```

### Visualization Dashboard
```
1. Create Power BI dashboard
2. Connect to sentiment analysis data
3. Show trends, comparisons, insights
4. Share with leadership team
```

---

## Support & Resources

- 📖 [Copilot Studio Docs](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
- 📖 [Power Automate Docs](https://learn.microsoft.com/en-us/power-automate/)
- 📖 [Microsoft Teams API](https://docs.microsoft.com/en-us/graph/api/resources/teams-api-overview)
- 📖 [Claude API Docs](https://docs.anthropic.com/)
- 🆘 [GitHub Issues](https://github.com/sameerar1305-spec/phonebook/issues)

---

**Version**: 1.0  
**Last Updated**: 2024-01-15  
**Maintained by**: Development Team
