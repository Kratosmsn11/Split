const algo = require("line-segmentation-algorithm-to-gcp-vision");
const GoogleVisionAPIKey = "AIzaSyDObkkIXv2l9NxLaIfIc72vgZvpZhShBaY";
const URL = "https://vision.googleapis.com/v1/images:annotate?key=";
const fullURL = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDObkkIXv2l9NxLaIfIc72vgZvpZhShBaY";

export async function getReceiptInfo(imageURL) {
    try {
      let body = JSON.stringify({
        "requests":[
          {
            "image":{
              "source":{
                "imageUri":
                 imageURL
              }
            },
            "features":[
              {
                "type":"DOCUMENT_TEXT_DETECTION",
                "maxResults":1
              }
            ]
          }
        ]
      });
      let response = await fetch(URL + GoogleVisionAPIKey,
        {
          method: "POST",
          body: body
        }
      );
      let responseJson= await response.json();
      let data = responseJson.responses[0];
      let lineByLineData = await algo.initLineSegmentation(data);
      return lineByLineData;
    } catch (error) {
      console.log(error);
    }
  };