const axios = require("axios");

const moreInfo = async (token) => {
  let data = JSON.stringify({
    labelListVisibility: "labelShow",
    messageListVisibility: "show",
    name: "More information",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gmail.googleapis.com/gmail/v1/users/me/labels",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
      Cookie:
        "COMPASS=gmail-api-uploads-blobstore=CgAQnKSUsAYafwAJa4lXzqzE7-nSmcB6RKF0yejVmMQqaofsdZPu4AtwjL5uWEwV5a7uVM2I2-TXCULqg0Q5h3tbg4RfTNeb5DM6o_YQPrr0KnfmniCiFo3-8f9UW0b95jI6L9S7UpPh2kv2_fcAT1P6ztUOQGQ6VhEPgXQIOc_AWHT5f9M1PuYwAQ",
    },
    data: data,
  };

   try{
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
   }catch(error)  {
      console.log(error);
    };
};

const interested = async (token) => {
  let data = JSON.stringify({
    labelListVisibility: "labelShow",
    messageListVisibility: "show",
    name: "interested",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gmail.googleapis.com/gmail/v1/users/me/labels",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
      Cookie:
        "COMPASS=gmail-api-uploads-blobstore=CgAQnKSUsAYafwAJa4lXzqzE7-nSmcB6RKF0yejVmMQqaofsdZPu4AtwjL5uWEwV5a7uVM2I2-TXCULqg0Q5h3tbg4RfTNeb5DM6o_YQPrr0KnfmniCiFo3-8f9UW0b95jI6L9S7UpPh2kv2_fcAT1P6ztUOQGQ6VhEPgXQIOc_AWHT5f9M1PuYwAQ",
    },
    data: data,
  };

  try{
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
   }catch(error)  {
      console.log(error);
    };
};

const notInterested = async (token) => {
  let data = JSON.stringify({
    labelListVisibility: "labelShow",
    messageListVisibility: "show",
    name: "not interested",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gmail.googleapis.com/gmail/v1/users/me/labels",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
      Cookie:
        "COMPASS=gmail-api-uploads-blobstore=CgAQnKSUsAYafwAJa4lXzqzE7-nSmcB6RKF0yejVmMQqaofsdZPu4AtwjL5uWEwV5a7uVM2I2-TXCULqg0Q5h3tbg4RfTNeb5DM6o_YQPrr0KnfmniCiFo3-8f9UW0b95jI6L9S7UpPh2kv2_fcAT1P6ztUOQGQ6VhEPgXQIOc_AWHT5f9M1PuYwAQ",
    },
    data: data,
  };

  try{
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
   }catch(error)  {
      console.log(error);
    };
};

const check = (labels, s) => {
  const names = [];
  for (let label of labels) {
    names.push(label.name);
  }
  return names;
};
exports.createLabels = async (token) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://gmail.googleapis.com/gmail/v1/users/me/labels",
    headers: {
      Authorization: `Bearer ${token} `,
      Cookie:
        "COMPASS=gmail-api-uploads-blobstore=CgAQnKSUsAYafwAJa4lXzqzE7-nSmcB6RKF0yejVmMQqaofsdZPu4AtwjL5uWEwV5a7uVM2I2-TXCULqg0Q5h3tbg4RfTNeb5DM6o_YQPrr0KnfmniCiFo3-8f9UW0b95jI6L9S7UpPh2kv2_fcAT1P6ztUOQGQ6VhEPgXQIOc_AWHT5f9M1PuYwAQ",
    },
  };

  try {
    const response = await axios.request(config);
    const labels = await response.data.labels;

    const names = check(labels);
    if (names.includes("More information")) {
      console.log("Already More information label exits");
    } else {
      await moreInfo(token);
    }

    if (names.includes("interested")) {
      console.log("Already interested label exits");
    } else {
      await interested(token);
    }

    if (names.includes("not interested")) {
      console.log("Already not interested label exits");
    } else {
      await notInterested(token);
    }
    return labels;
  } catch (error) {
    console.log(error);
  }
};

exports.returnId =async (labels, key) => {
  const interestedLabel =await labels.find((label) => label.name === key);
  return interestedLabel.id;
};

exports.addLabel = async (labelId, msgid, token) => {
  const axios = require("axios");
  let data = JSON.stringify({
    addLabelIds: [labelId],
    removeLabelIds: ["UNREAD"],
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msgid}/modify`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,

      Cookie:
        "COMPASS=gmail-api-uploads-blobstore=CgAQnKSUsAYafwAJa4lXzqzE7-nSmcB6RKF0yejVmMQqaofsdZPu4AtwjL5uWEwV5a7uVM2I2-TXCULqg0Q5h3tbg4RfTNeb5DM6o_YQPrr0KnfmniCiFo3-8f9UW0b95jI6L9S7UpPh2kv2_fcAT1P6ztUOQGQ6VhEPgXQIOc_AWHT5f9M1PuYwAQ",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

exports.updatedLabels = async (token) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://gmail.googleapis.com/gmail/v1/users/me/labels",
    headers: {
      Authorization: `Bearer ${token} `,
      Cookie:
        "COMPASS=gmail-api-uploads-blobstore=CgAQnKSUsAYafwAJa4lXzqzE7-nSmcB6RKF0yejVmMQqaofsdZPu4AtwjL5uWEwV5a7uVM2I2-TXCULqg0Q5h3tbg4RfTNeb5DM6o_YQPrr0KnfmniCiFo3-8f9UW0b95jI6L9S7UpPh2kv2_fcAT1P6ztUOQGQ6VhEPgXQIOc_AWHT5f9M1PuYwAQ",
    },
  };

  try {
    const response = await axios.request(config);
    const labels = await response.data.labels;
    return labels;
  } catch (error) {
    console.log(error);
  }

}