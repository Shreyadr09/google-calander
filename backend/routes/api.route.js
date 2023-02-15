const router = require('express').Router();
const { google } = require('googleapis')

const GOOGLE_CLIENT_ID = '307616713274-4pmphkla4ngs6g686kn8gqph8049svmu.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
const REFRESH_TOKEN = '1//0gQzDXBjVcmGVCgYIARAAGBASNwF-L9IrO83BGyZUo6lc5Wuu_Zqvm7hu2WUM9TY20E9mOCZqEB8SuG3vV2lywuO4jkLd_Uz52N0'

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
)

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/create-tokens', async (req, res, next) => {
  try {
    const { code } = req.body
    const tokens = await oauth2Client.getToken(code)
    res.send(tokens)
  } catch (error) {
    next(error)
  }
})

router.post('/create-event', async (req, res, next) => {
  try {
    const { summary, description, startDateTime, endDatetime } = req.body
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
    const calendar = google.calendar('v3')
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: {
        summary: summary,
        description: description,
        colorId: '7',
        start: {
          dateTime: new Date(startDateTime),
        },
        end: {
          dateTime: new Date(endDatetime),
        },
      },
    })
    res.send(res)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
