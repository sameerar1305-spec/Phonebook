# 📋 Quick Reference Card - Meeting Sentiment Analysis

## 🚀 Getting Started (2 minutes)

### For Web Users
```
1. Open: meeting-sentiment-analysis.html
2. Paste meeting transcript
3. Click "Analyze Sentiment"
4. Review results
```

### For Copilot Users
```
1. Invite @Meeting Sentiment to Teams meeting
2. Meeting ends → Analysis posted automatically
3. View results in Teams channel
```

---

## 📊 Understanding Results

### Sentiment Levels

| Sentiment | Meaning | Action |
|-----------|---------|--------|
| 🟢 POSITIVE | Enthusiastic, collaborative, satisfied | Maintain momentum |
| 🟡 NEUTRAL | Professional, factual, balanced | Monitor for issues |
| 🔴 NEGATIVE | Frustrated, concerned, dissatisfied | Take corrective action |

### Key Metrics

| Metric | Definition | Good Range |
|--------|-----------|-----------|
| **Engagement** | Participation level | HIGH (>70%) |
| **Decision Satisfaction** | Team buy-in on decisions | High (>60%) |
| **Conflict Level** | Disagreements/tension | NONE-LOW |
| **Team Morale** | Overall team health | GOOD-EXCELLENT |

---

## 💡 Tips & Tricks

### Best Practices

✅ **DO:**
- Analyze important meetings (planning, retrospectives)
- Include full names in transcript for participant analysis
- Review recommendations for follow-up actions
- Track sentiment trends over time
- Use insights to improve team dynamics

❌ **DON'T:**
- Use as sole basis for performance reviews
- Share raw sentiment scores without context
- Ignore human judgment
- Analyze meetings without participants' awareness
- Focus only on negative results

### Transcript Tips

```
GOOD FORMAT:
John: "I think we should move forward with this"
Sarah: "I agree, let's do it"

BAD FORMAT:
Meeting on Jan 15. John and Sarah talked.
No clear speakers or dialogue.
```

### Focus Areas

Use to highlight specific aspects:
- "Team morale"
- "Decision satisfaction"
- "Communication effectiveness"
- "Innovation & creativity"
- "Conflict resolution"
- "Employee engagement"

---

## 🔍 Example Interpretations

### Example 1: POSITIVE Result
```
Sentiment: POSITIVE (72% positive, 18% neutral, 10% negative)
Interpretation: Team is engaged and collaborative
Action: Acknowledge good teamwork, maintain approach
```

### Example 2: NEGATIVE Result
```
Sentiment: NEGATIVE (15% positive, 25% neutral, 60% negative)
Interpretation: Team has significant concerns or frustration
Action: Schedule 1-on-1s, identify root causes, address quickly
```

### Example 3: MIXED Result
```
Sentiment: NEUTRAL (45% positive, 40% neutral, 15% negative)
Interpretation: Some progress but concerns remain
Action: Address identified issues, celebrate wins, communicate clearly
```

---

## ⚡ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Analyze | `Ctrl+Enter` (in textarea) |
| Clear form | `Ctrl+Shift+Delete` |
| View history | Tab to "History" then Enter |
| Copy results | `Ctrl+C` (select text) |

---

## 📱 Mobile Tips

- **Portrait mode**: Scroll down to see all results
- **Landscape mode**: All results visible at once
- **History**: Swipe left on items to delete
- **Share**: Use browser share button to forward results

---

## 🆘 Quick Troubleshooting

### "Analysis Failed"
```
Try:
1. Check internet connection
2. Paste longer transcript (>10 characters)
3. Refresh page
4. Try again in 30 seconds
```

### "No Results"
```
Try:
1. Clear browser cache
2. Check if API key is configured
3. Use fallback mode (no API)
```

### "History Not Saving"
```
Try:
1. Enable cookies in browser
2. Check browser privacy settings
3. Try different browser
```

### "Sentiment Seems Wrong"
```
Try:
1. Check transcript formatting
2. Use longer transcript with more context
3. Review emotional words in text
4. Provide more meeting details
```

---

## 🔗 Useful Links

- 📖 Full Documentation: `MEETING_SENTIMENT_README.md`
- 🤖 Copilot Setup: `COPILOT_STUDIO_SETUP.md`
- 📝 Implementation: `IMPLEMENTATION_GUIDE.md`
- 🐛 Report Issues: GitHub Issues
- 💬 Questions: Check FAQ section

---

## 📊 Sentiment Score Meaning

```
POSITIVE (>60%)
├─ High team satisfaction
├─ Good collaboration
├─ Clear agreement on direction
└─ Positive momentum

NEUTRAL (40-60%)
├─ Balanced discussion
├─ Some concerns
├─ Need for clarity
└─ Mixed opinions

NEGATIVE (<40%)
├─ Team frustration
├─ Disagreements
├─ Unclear decisions
└─ Action needed
```

---

## 🎯 Common Meeting Types & Focus

### Standup Meeting
- Focus: "Team morale"
- Expected: POSITIVE-NEUTRAL
- Alert if: NEGATIVE

### Retrospective
- Focus: "Team collaboration"
- Expected: NEUTRAL-POSITIVE
- Key metric: "Conflict resolution"

### Planning Meeting
- Focus: "Decision satisfaction"
- Expected: POSITIVE
- Alert if: NEGATIVE

### 1-on-1 Review
- Focus: "Employee satisfaction"
- Expected: POSITIVE-NEUTRAL
- Key metric: "Engagement level"

### Crisis/Issue Discussion
- Focus: "Conflict resolution"
- Expected: NEUTRAL (focused on solving)
- Alert if: NEGATIVE (indicates no solution)

---

## 📈 Tracking Sentiment Over Time

### Create a Tracking Sheet

```
Date | Meeting | Sentiment | Score | Action Items
-----|---------|-----------|-------|---------------
1/15 | Standup | POSITIVE  | 0.82  | None
1/16 | Standup | NEUTRAL   | 0.55  | Address timeline
1/17 | Standup | NEGATIVE  | 0.32  | 1-on-1s scheduled
1/18 | Standup | POSITIVE  | 0.68  | Continue momentum
```

### Watch For Trends

- **Declining sentiment**: Something needs addressing
- **Improving sentiment**: Positive changes working
- **Consistent negative**: Systemic issue needs solving
- **Volatile sentiment**: Emotional team, high stakes

---

## 🤖 Using with Copilot

### Inviting the Bot
```
1. Open Teams
2. Schedule or start meeting
3. Search for "@Meeting Sentiment"
4. Add to participants
5. Bot attends automatically
6. Analysis posts when meeting ends
```

### What Bot Needs
- Clear speaker names in transcript
- Full conversations (not just summaries)
- Meeting title or topic
- Minimum 5 minutes of discussion

### What Bot Provides
- Real-time sentiment analysis
- Key insights extracted
- Recommendations for follow-up
- Team health indicators

---

## 💰 Cost Management

### No Costs
- Web interface (always free)
- Google Apps Script (free tier covers most uses)
- Copilot Studio (no sentiment analysis charges)

### Optional Costs
- Claude API: $0.003 per 1K input tokens (~$0.01 per meeting)
- Storage: No charges with localStorage
- Teams: Included with Microsoft 365

### Monitoring Costs
- Check Claude API usage in console
- Set spending alerts (if using paid API)
- Review monthly costs (if applicable)

---

## 🔐 Privacy Reminder

- ✅ Your data stays private (no external storage)
- ✅ Only sent to Claude if API configured
- ✅ Browser data persists locally only
- ✅ You control what's analyzed
- ✅ Can delete history anytime

**Note**: Meeting transcripts are sensitive data. Always ensure participants consent to analysis.

---

## 📞 Getting Help

### Documentation
- Read full guide: `MEETING_SENTIMENT_README.md`
- Copilot setup: `COPILOT_STUDIO_SETUP.md`
- Implementation steps: `IMPLEMENTATION_GUIDE.md`

### Debug Info to Share
When reporting issues, include:
- Browser type and version
- API error messages
- Transcript sample (if not sensitive)
- Steps to reproduce

### Contact
- 🐛 GitHub Issues: [Report here](https://github.com/sameerar1305-spec/phonebook/issues)
- 📧 Email: [Your team contact]
- 💬 Teams: [Team channel]

---

**Print this guide or save as PDF for quick reference!**

---

Version 1.0 | Updated January 15, 2024
