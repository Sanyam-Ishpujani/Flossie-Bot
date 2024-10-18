const express = require('express');
const bodyParser = require('body-parser');
const recommendations = require('./recommendations.json');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const userQuery = req.body.queryResult.queryText;
    const response = getRecommendation(userQuery);

    res.json({
        fulfillmentText: response
    });
});

function getRecommendation(userQuery) {
    let concern = userQuery.toLowerCase();
    
    if (concern.includes('sensitive')) {
        return recommendations.sensitivity;
    } else if (concern.includes('cavity')) {
        return recommendations.cavity;
    } else if (concern.includes('gum')) {
        return recommendations.gum;
    } else if (concern.includes('whitening')) {
        return recommendations.whitening;
    } else if (concern.includes('breath')) {
        return recommendations.freshBreath;
    } else {
        return "Please choose from sensitivity, cavity, gum health, whitening, or fresh breath.";
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Flossy bot running on port ${PORT}`);
});
