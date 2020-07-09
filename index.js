//Custom Skill Code - Not based upon AWS Lambda

// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const https=require("https");
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },

    handle(handlerInput) {
        const speakOutput = 'Hi! You have reached me. Its aleena! What can I do for you?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
           //.reprompt(speakOutput)
            .getResponse();
    }

};

const VolumeIntentHandler = {
    canHandle(handlerInput) {
         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VolumeIntent';
    },
    handle(handlerInput) {
        var appliance= handlerInput.requestEnvelope.request.intent.slots.appliance.value;
        var answerSlot= handlerInput.requestEnvelope.request.intent.slots.number.value;
        var  speakOutput;
        var actiontwo= handlerInput.requestEnvelope.request.intent.slots.actiontwo.value;
        var accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
        
        if(actiontwo==="mute")
        {
            answerSlot=0;
           speakOutput='The volume of' +appliance+ 'has been muted';
        }
        if(actiontwo==="unmute")
        {
            answerSlot=7;
            speakOutput='The volume has been unmuted and put to seven';
        }
        
        

        

const options = {
  hostname: 'api.teczen.in',
  port: 443,
  path: '',
  method: 'POST',
  headers: {
    'accessToken':accessToken,  
    'appliance':appliance,
    'action':'volume up',
    'actionTwo': actiontwo,
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
      if(d===true){
         var speakOutput="Changing volume of"+ appliance+ "now by"+answerSlot;//write the output for done 
          return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
      }
      else{
          speakOutput="Error changing the volume";
          //write the output of not done
      }
    process.stdout.write(d);
  })
})

req.on('error', error => {
  console.error(error);
})

req.write();
req.end();
speakOutput = 'Changing volume of'+ appliance + 'now by'+ answerSlot;
 return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse(); 
    }
    

};

const StatusOfApplianceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StatusOfApplianceIntent';
    },
    handle(handlerInput) {
         var action= handlerInput.requestEnvelope.request.intent.slots.action.value;
           var appliance= handlerInput.requestEnvelope.request.intent.slots.appliance.value;
          //  const time= handlerInput.requestEnvelope.request.intent.slots.AMAZON.TIME.value;
            var time= handlerInput.requestEnvelope.request.intent.slots.time.value;
            var accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
           var myVal=null;
           if(time===undefined){
               time=0;
           }

 var data = JSON.stringify({
  appliance: appliance, 
  action: action, 
 

});

const options = {
  hostname: 'api.teczen.in',
  port: 443,
  path: '',
  method: 'POST',
  headers: {
    'accessToken':accessToken,  
    'appliance':appliance,
    'action':action,
    'time':time
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d);
  })
})

req.on('error', error => {
  console.error(error);
})

req.write(data);
req.end();

const speakOutput = 'OK! As per your request, Im turning '+ action + ' the ' + appliance;
//console.log("Checking return");
return handlerInput.responseBuilder
.speak(speakOutput)
// .reprompt(speakOutput)
 .getResponse();
        }
    }; 
    
    
const ChangeChannelIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
         && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChangeChannelIntent';
    },
    handle(handlerInput) {
        var channeltwo=handlerInput.requestEnvelope.request.intent.slots.channeltwo.value;
      //  var channelone=handlerInput.requestEnvelope.request.intent.slots.channelone.value;
       // var actionone=handlerInput.requestEnvelope.request.intent.slots.actionone.value;
      const actionone="change";


var accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;

var data = JSON.stringify({
  channeltwo: channeltwo, 
  //channelone: channelone, 
  actionone: actionone,
 });

const options = {
  hostname: 'api.teczen.in',
  port: 443,
  path: '',
  method: 'POST',
  headers: {
    'accessToken':accessToken,  
    'channeltwo':channeltwo,
    'action':actionone,
   // 'channelone':channelone,
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d);
  })
})

req.on('error', error => {
  console.error(error);
})

req.write(data);
req.end();
        const speakOutput = 'Done! The channel has been changed as per your request to'+ channeltwo;

        return handlerInput.responseBuilder
            .speak(speakOutput)
           // .reprompt(speakOutput)
            .getResponse();
    }
};

const TemperatureIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
         && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TemperatureIntent';
    },
    handle(handlerInput) {
        const temp= handlerInput.requestEnvelope.request.intent.slots.temperature.value;
        const appliance= handlerInput.requestEnvelope.request.intent.slots.appliance.value;
var accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;

var data = JSON.stringify({
  temperature: temp, 
  appliance: appliance, 
 });

const options = {
  hostname: 'api.teczen.in',
  port: 443,
  path: '',
  method: 'POST',
  headers: {
    'accessToken':accessToken,  
    'appliance':appliance,
    'temperature':temp,
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d);
  })
})

req.on('error', error => {
  console.error(error);
})

req.write(data);
req.end();
       
       
        const speakOutput = 'Okay! The temperature of' + appliance + 'is now changing to' + temp;
        return handlerInput.responseBuilder
            .speak(speakOutput)
           // .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

const AccessTokenIntentHandler = {

    //...

    handle(handlerInput){
       
        var accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;

        if (accessToken === undefined){
        // The request did not include a token, so tell the user to link
        // accounts and return a LinkAccount card
        var speechText = "You must have a Okta account account to use this skill. " +
                    "Please use the Alexa app for this linking";

        return handlerInput.responseBuilder
            .speak(speechText)
            .withLinkAccountCard()
            .getResponse();

    }
  }
};
// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        TemperatureIntentHandler,
        VolumeIntentHandler,
        StatusOfApplianceIntentHandler,
        HelpIntentHandler,
        ChangeChannelIntentHandler,
       AccessTokenIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();

