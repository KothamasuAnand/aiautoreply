const { getToken, getList, getContent, getDecodedMsg, getSenderMail } = require("./gmail");
const { getAiResponse } = require('./gemini');
const {createLabels,returnId,addLabel,updatedLabels} = require('./labels');
const {sendMail} = require("./reply");

const l= ["interested","More information","not interested"];

async function start() {
  //getting token
  const token = await getToken();
  //getting list of labels and adding labels that are not present 
  let InitialLabels = await createLabels(token);
  //getting list of updated labels
  const labels = await updatedLabels(token);
  //getting list of unread mails id's
  const threadId = await getList(token);
  //getting body of the first message
  const content = await getContent(threadId[0].id,token);
  //getting sender email address
  const senderEmail= await getSenderMail(content.payload.headers);
  //decoding the encoded message
  const bodyForAI=await getDecodedMsg(content.payload["parts"][0].body.data)  
  //finding labelId of labels
  const interestedId=await returnId(labels,l[0]);
  const moreInformationId=await returnId(labels,l[1]);
  const notInterestedId=await returnId(labels,l[2]);

  let finalId;
  let opinion = l[0]
  if((bodyForAI.toLowerCase()).includes("not")){
    finalId = notInterestedId;
    opinion=l[2];
  }
  else if((bodyForAI.toLowerCase()).includes("more")){
    finalId = moreInformationId;
    opinion=l[1];
  }else{
    finalId = interestedId;
    opinion=l[0];
  }
  //adding label to the message
  const response = await addLabel(finalId,threadId[0].id,token);
  //getting response from AI
  const receiverBody = await getAiResponse(bodyForAI,opinion);
  //sending email to sendermail address
  const result = await sendMail(senderEmail,receiverBody,"REACHINBOX");
  console.log(result);

  
}

const begin = async () => {
  for(let i=0;i<3;i++){
    await start();  
  }
}
//calling the start function iteratively
begin();