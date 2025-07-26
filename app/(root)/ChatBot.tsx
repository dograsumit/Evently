"use client"
import Script from 'next/script';
import React from 'react'

const ChatBot = () => {
    const initBotpress = () => {
        window.botpressWebChat.init({
          composerPlaceholder: "E-Sewa",
          botConversationDescription: "Made by Aayush Rahul Divyanshu",
          botId: "4d28685c-b40a-420c-ab3b-52b6a264e4a7",
          hostUrl: "https://cdn.botpress.cloud/webchat/v1",
          messagingUrl: "https://messaging.botpress.cloud",
          clientId: "4d28685c-b40a-420c-ab3b-52b6a264e4a7",
        });
      };
  return (
    // <Script
    // src="https://cdn.botpress.cloud/webchat/v0/inject.js"
    // onLoad={() => {
    //   initBotpress();
    // }}
//   />

<>
<Script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"></Script>
<Script src="https://files.bpcontent.cloud/2024/12/01/11/20241201111753-0DYNUU71.js"></Script></>
    
  )
}

export default ChatBot
