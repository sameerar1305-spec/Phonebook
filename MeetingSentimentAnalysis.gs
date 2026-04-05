/**
 * Meeting Sentiment Analysis Google Apps Script
 * Processes meeting transcripts and performs detailed sentiment analysis
 * Integrates with Anthropic Claude API for NLP analysis
 */

// Configuration
var CONFIG = {
  CLAUDE_API_KEY: 'YOUR_ANTHROPIC_API_KEY', // Replace with actual API key
  CLAUDE_API_URL: 'https://api.anthropic.com/v1/messages',
  MODEL: 'claude-3-5-sonnet-20241022'
};

/**
 * Main endpoint handler for sentiment analysis requests
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.action === 'analyzeSentiment') {
      return handleSentimentAnalysis(data);
    }

    return respond({
      success: false,
      error: 'Unknown action: ' + data.action
    });
  } catch (err) {
    return respond({
      success: false,
      error: 'Request processing error: ' + err.message
    });
  }
}

/**
 * Handle sentiment analysis request
 */
function handleSentimentAnalysis(data) {
  try {
    var meetingTitle = data.meetingTitle || 'Untitled Meeting';
    var participants = data.participants || '';
    var transcript = data.transcript || '';
    var analysisFocus = data.analysisFocus || '';

    if (!transcript || transcript.trim().length < 10) {
      return respond({
        success: false,
        error: 'Transcript too short. Please provide at least 10 characters.'
      });
    }

    // Perform sentiment analysis using Claude API
    var analysis = performSentimentAnalysis(
      transcript,
      meetingTitle,
      participants,
      analysisFocus
    );

    return respond({
      success: true,
      analysis: analysis
    });
  } catch (err) {
    return respond({
      success: false,
      error: 'Sentiment analysis error: ' + err.message
    });
  }
}

/**
 * Perform detailed sentiment analysis using Claude API
 */
function performSentimentAnalysis(transcript, title, participants, focus) {
  var prompt = buildAnalysisPrompt(transcript, title, participants, focus);

  try {
    var response = callClaudeAPI(prompt);
    var analysis = parseAnalysisResponse(response);
    return analysis;
  } catch (err) {
    // Fallback to local analysis if API fails
    Logger.log('Claude API error, using fallback: ' + err.message);
    return performLocalSentimentAnalysis(transcript, title, participants);
  }
}

/**
 * Build the analysis prompt for Claude
 */
function buildAnalysisPrompt(transcript, title, participants, focus) {
  var prompt = `You are an expert meeting analyst specializing in sentiment analysis and team dynamics.

Analyze the following meeting transcript and provide a detailed sentiment analysis report.

MEETING TITLE: ${title}
${participants ? 'PARTICIPANTS: ' + participants + '\n' : ''}
${focus ? 'ANALYSIS FOCUS: ' + focus + '\n' : ''}

TRANSCRIPT:
${transcript}

Please provide a comprehensive analysis in the following JSON format (respond ONLY with valid JSON, no other text):
{
  "overallSentiment": "POSITIVE|NEUTRAL|NEGATIVE",
  "sentimentScores": {
    "positive": 0.0-1.0,
    "neutral": 0.0-1.0,
    "negative": 0.0-1.0
  },
  "summary": "2-3 sentence overall summary of the meeting sentiment",
  "keyInsights": "Bullet points of key insights about the meeting tone and dynamics",
  "emotionalTones": "Identified emotional tones (e.g., enthusiastic, frustrated, uncertain, confident)",
  "recommendations": "Actionable recommendations based on sentiment analysis",
  "participantInsights": "If participants mentioned, brief insights about individual contributions",
  "engagementLevel": "HIGH|MEDIUM|LOW",
  "decisionSatisfaction": "Assessment of satisfaction with decisions made",
  "conflictLevel": "NONE|LOW|MEDIUM|HIGH",
  "teamMorale": "EXCELLENT|GOOD|FAIR|POOR"
}`;

  return prompt;
}

/**
 * Call Claude API for sentiment analysis
 */
function callClaudeAPI(prompt) {
  if (!CONFIG.CLAUDE_API_KEY || CONFIG.CLAUDE_API_KEY === 'YOUR_ANTHROPIC_API_KEY') {
    throw new Error('Claude API key not configured. Please set CLAUDE_API_KEY in CONFIG.');
  }

  var payload = {
    model: CONFIG.MODEL,
    max_tokens: 2000,
    system: "You are an expert meeting sentiment analyst. Provide analysis in valid JSON format only.",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  };

  var options = {
    method: 'post',
    headers: {
      'x-api-key': CONFIG.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(CONFIG.CLAUDE_API_URL, options);
  var result = JSON.parse(response.getContentText());

  if (response.getResponseCode() !== 200) {
    throw new Error('API Error: ' + (result.error?.message || 'Unknown error'));
  }

  if (!result.content || !result.content[0]) {
    throw new Error('Invalid API response structure');
  }

  return result.content[0].text;
}

/**
 * Parse Claude API response
 */
function parseAnalysisResponse(responseText) {
  try {
    // Extract JSON from response (Claude may include extra text)
    var jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    var analysis = JSON.parse(jsonMatch[0]);

    // Validate required fields
    if (!analysis.overallSentiment || !analysis.sentimentScores || !analysis.summary) {
      throw new Error('Missing required analysis fields');
    }

    return analysis;
  } catch (err) {
    throw new Error('Failed to parse analysis response: ' + err.message);
  }
}

/**
 * Fallback: Local sentiment analysis without API
 * Uses keyword-based approach when API is unavailable
 */
function performLocalSentimentAnalysis(transcript, title, participants) {
  var transcriptLower = transcript.toLowerCase();

  var positiveKeywords = ['excellent', 'great', 'good', 'amazing', 'awesome', 'perfect', 'fantastic', 'love', 'happy', 'excited', 'confident', 'agree', 'success', 'productive', 'efficient'];
  var negativeKeywords = ['bad', 'terrible', 'awful', 'poor', 'worst', 'hate', 'frustrated', 'angry', 'disappointed', 'confused', 'disagree', 'problem', 'issue', 'fail', 'concern', 'worried'];

  var positiveCount = 0, negativeCount = 0;

  positiveKeywords.forEach(function(kw) {
    var regex = new RegExp('\\b' + kw + '\\b', 'gi');
    var matches = transcriptLower.match(regex);
    positiveCount += matches ? matches.length : 0;
  });

  negativeKeywords.forEach(function(kw) {
    var regex = new RegExp('\\b' + kw + '\\b', 'gi');
    var matches = transcriptLower.match(regex);
    negativeCount += matches ? matches.length : 0;
  });

  var total = positiveCount + negativeCount || 1;
  var positiveScore = positiveCount / total;
  var negativeScore = negativeCount / total;
  var neutralScore = 1 - positiveScore - negativeScore;

  var overallSentiment = 'NEUTRAL';
  if (positiveScore > negativeScore && positiveScore > 0.4) {
    overallSentiment = 'POSITIVE';
  } else if (negativeScore > positiveScore && negativeScore > 0.3) {
    overallSentiment = 'NEGATIVE';
  }

  return {
    overallSentiment: overallSentiment,
    sentimentScores: {
      positive: Math.round(positiveScore * 100) / 100,
      neutral: Math.round(neutralScore * 100) / 100,
      negative: Math.round(negativeScore * 100) / 100
    },
    summary: 'Meeting sentiment analysis shows ' + overallSentiment.toLowerCase() + ' overall tone. The conversation contained ' + positiveCount + ' positive indicators and ' + negativeCount + ' negative indicators.',
    keyInsights: 'Local analysis mode (API not configured)\n- Sentiment based on keyword frequency\n- ' + (positiveCount > negativeCount ? 'Positive language dominated the discussion' : negativeCount > positiveCount ? 'Negative language present in discussion' : 'Balanced sentiment throughout') + '\n- Configure Claude API for advanced analysis',
    emotionalTones: overallSentiment === 'POSITIVE' ? 'Optimistic, Engaged' : overallSentiment === 'NEGATIVE' ? 'Concerned, Skeptical' : 'Neutral, Professional',
    recommendations: 'For detailed sentiment analysis, configure the Claude API key in the Google Apps Script settings. This will enable advanced NLP analysis of emotional tones, participant dynamics, and actionable insights.',
    participantInsights: participants ? 'Participant analysis requires Claude API configuration for detailed insights.' : 'No participant information provided.',
    engagementLevel: 'MEDIUM',
    decisionSatisfaction: 'Unclear - use Claude API for detailed assessment',
    conflictLevel: negativeCount > 5 ? 'MEDIUM' : negativeCount > 2 ? 'LOW' : 'NONE',
    teamMorale: overallSentiment === 'POSITIVE' ? 'GOOD' : overallSentiment === 'NEGATIVE' ? 'FAIR' : 'GOOD'
  };
}

/**
 * Respond with JSON
 */
function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function for development
 */
function testAnalysis() {
  var testTranscript = `
    John: Good morning everyone, thanks for joining. I wanted to discuss our Q4 goals.
    Sarah: Thanks for organizing this. I'm really excited about the new direction.
    Mike: I have some concerns about the timeline. It seems aggressive.
    John: Fair point. Let's break it down into phases.
    Sarah: I think that's a great approach. Much more manageable.
    Mike: Yeah, that makes more sense. I'm on board with this plan.
  `;

  var result = performLocalSentimentAnalysis(
    testTranscript,
    'Q4 Planning Session',
    'John, Sarah, Mike'
  );

  Logger.log(JSON.stringify(result, null, 2));
}
